"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { defaultCMSContent, STORAGE_KEY } from "./defaults";
import type { CMSContent } from "./types";

type ContentContextValue = {
  content: CMSContent;
  draft: CMSContent;
  isHydrated: boolean;
  setDraft: (next: CMSContent) => void;
  updateDraft: (updater: (current: CMSContent) => CMSContent) => void;
  saveDraft: () => void;
  resetContent: () => void;
};

const ContentContext = createContext<ContentContextValue | null>(null);

const defaultFeatureIcons = Object.fromEntries(
  defaultCMSContent.features.items.map((item) => [item.id, item.icon]),
);

function resolveFeatureIcon(
  item: CMSContent["features"]["items"][number],
  index: number,
) {
  const fallbackById = defaultFeatureIcons[item.id];
  const fallbackByIndex = defaultCMSContent.features.items[index]?.icon;
  const icon =
    item.icon?.trim() ||
    fallbackById ||
    fallbackByIndex ||
    `/icons/ecosystem/${index + 1}.png`;

  return icon;
}

function mergeWithDefaults(stored: Partial<CMSContent>): CMSContent {
  return {
    ...defaultCMSContent,
    ...stored,
    hero: { ...defaultCMSContent.hero, ...stored.hero },
    gallery: {
      ...defaultCMSContent.gallery,
      ...stored.gallery,
      images: stored.gallery?.images ?? defaultCMSContent.gallery.images,
    },
    features: {
      ...defaultCMSContent.features,
      ...stored.features,
      items:
        stored.features?.items?.map((item, index) => ({
          ...defaultCMSContent.features.items[index],
          ...item,
          icon: resolveFeatureIcon(item, index),
        })) ?? defaultCMSContent.features.items,
    },
    footer: {
      ...defaultCMSContent.footer,
      ...stored.footer,
      links: stored.footer?.links ?? defaultCMSContent.footer.links,
    },
    homepageBlocks: (
      stored.homepageBlocks ?? defaultCMSContent.homepageBlocks
    ).filter((block) => (block.type as string) !== "faq"),
    pages: stored.pages ?? defaultCMSContent.pages,
  };
}

function readStoredContent(): CMSContent {
  if (typeof window === "undefined") return defaultCMSContent;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultCMSContent;
    return mergeWithDefaults(JSON.parse(raw) as Partial<CMSContent>);
  } catch {
    return defaultCMSContent;
  }
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<CMSContent>(defaultCMSContent);
  const [draft, setDraftState] = useState<CMSContent>(defaultCMSContent);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const stored = readStoredContent();
    setContent(stored);
    setDraftState(stored);
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      const next = readStoredContent();
      setContent(next);
      setDraftState(next);
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [isHydrated]);

  const setDraft = useCallback((next: CMSContent) => {
    setDraftState(next);
  }, []);

  const updateDraft = useCallback(
    (updater: (current: CMSContent) => CMSContent) => {
      setDraftState((current) => updater(current));
    },
    [],
  );

  const saveDraft = useCallback(() => {
    setDraftState((currentDraft) => {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(currentDraft));
      setContent(currentDraft);
      window.dispatchEvent(new Event("cms-content-updated"));
      return currentDraft;
    });
  }, []);

  const resetContent = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setContent(defaultCMSContent);
    setDraftState(defaultCMSContent);
    window.dispatchEvent(new Event("cms-content-updated"));
  }, []);

  const value = useMemo(
    () => ({
      content,
      draft,
      isHydrated,
      setDraft,
      updateDraft,
      saveDraft,
      resetContent,
    }),
    [content, draft, isHydrated, resetContent, saveDraft, setDraft, updateDraft],
  );

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useCMS must be used within ContentProvider");
  }
  return context;
}

export function useLiveCMS() {
  const { content, isHydrated } = useCMS();
  return { content, isHydrated };
}
