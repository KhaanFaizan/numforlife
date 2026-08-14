"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { defaultCMSContent } from "./defaults";
import { mergeWithDefaults } from "./merge";
import type { CMSContent, ContentVersionSummary } from "./types";

type EditorPayload = {
  published: Partial<CMSContent>;
  draft: Partial<CMSContent>;
  hasDraft: boolean;
  hasUnpublishedChanges: boolean;
};

type ContentContextValue = {
  published: CMSContent;
  draft: CMSContent;
  hasDraft: boolean;
  hasUnpublishedChanges: boolean;
  isHydrated: boolean;
  isSaving: boolean;
  error: string | null;
  setDraft: (next: CMSContent) => void;
  updateDraft: (updater: (current: CMSContent) => CMSContent) => void;
  saveDraft: (content?: CMSContent) => Promise<void>;
  publishDraft: () => Promise<void>;
  discardDraft: () => Promise<void>;
  resetToDefaults: () => Promise<void>;
  reloadEditor: () => Promise<void>;
  restoreVersion: (versionId: string) => Promise<void>;
  listVersions: () => Promise<ContentVersionSummary[]>;
};

const ContentContext = createContext<ContentContextValue | null>(null);

async function readEditorPayload(): Promise<EditorPayload> {
  const response = await fetch("/api/cms/content", { cache: "no-store" });

  if (response.status === 401) {
    throw new Error("Session expired. Please sign in again.");
  }

  if (!response.ok) {
    throw new Error("Unable to load CMS content.");
  }

  return (await response.json()) as EditorPayload;
}

function applyEditorPayload(payload: EditorPayload) {
  return {
    published: mergeWithDefaults(payload.published),
    draft: mergeWithDefaults(payload.draft),
    hasDraft: payload.hasDraft,
    hasUnpublishedChanges: payload.hasUnpublishedChanges,
  };
}

function isAdminEditorRoute(pathname: string | null) {
  return Boolean(
    pathname?.startsWith("/admin") && pathname !== "/admin/login",
  );
}

export function ContentProvider({
  children,
  initialPublished,
}: {
  children: ReactNode;
  initialPublished: CMSContent;
}) {
  const pathname = usePathname();
  const editorMode = isAdminEditorRoute(pathname);

  const [published, setPublished] = useState<CMSContent>(initialPublished);
  const [draft, setDraftState] = useState<CMSContent>(initialPublished);
  const [hasDraft, setHasDraft] = useState(false);
  const [hasUnpublishedChanges, setHasUnpublishedChanges] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const draftRef = useRef(draft);

  useEffect(() => {
    draftRef.current = draft;
  }, [draft]);

  const applyState = useCallback((payload: EditorPayload) => {
    const next = applyEditorPayload(payload);
    setPublished(next.published);
    setDraftState(next.draft);
    setHasDraft(next.hasDraft);
    setHasUnpublishedChanges(next.hasUnpublishedChanges);
    setError(null);
  }, []);

  const reloadEditor = useCallback(async () => {
    applyState(await readEditorPayload());
  }, [applyState]);

  useEffect(() => {
    if (!editorMode) {
      setPublished(initialPublished);
      setDraftState(initialPublished);
      setHasDraft(false);
      setHasUnpublishedChanges(false);
      setError(null);
      setIsHydrated(true);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const payload = await readEditorPayload();
        if (cancelled) return;
        applyState(payload);
      } catch (loadError) {
        if (cancelled) return;
        setError(
          loadError instanceof Error ? loadError.message : "Unable to load CMS content.",
        );
      } finally {
        if (!cancelled) setIsHydrated(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [applyState, editorMode, initialPublished]);

  const setDraft = useCallback((next: CMSContent) => {
    setDraftState(next);
    setHasUnpublishedChanges(true);
  }, []);

  const updateDraft = useCallback(
    (updater: (current: CMSContent) => CMSContent) => {
      setDraftState((current) => {
        const next = updater(current);
        setHasUnpublishedChanges(true);
        return next;
      });
    },
    [],
  );

  const saveDraft = useCallback(
    async (override?: CMSContent) => {
      const payload = override ?? draftRef.current;
      setIsSaving(true);
      setError(null);

      try {
        const response = await fetch("/api/cms/draft", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const body = (await response.json().catch(() => null)) as {
            error?: string;
          } | null;
          throw new Error(body?.error ?? "Failed to save draft.");
        }

        await reloadEditor();
      } catch (saveError) {
        setError(saveError instanceof Error ? saveError.message : "Failed to save draft.");
        throw saveError;
      } finally {
        setIsSaving(false);
      }
    },
    [reloadEditor],
  );

  const publishDraft = useCallback(async () => {
    setIsSaving(true);
    setError(null);

    try {
      await fetch("/api/cms/draft", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draftRef.current),
      });

      const response = await fetch("/api/cms/publish", { method: "POST" });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(body?.error ?? "Failed to publish.");
      }

      await reloadEditor();
    } catch (publishError) {
      setError(publishError instanceof Error ? publishError.message : "Failed to publish.");
      throw publishError;
    } finally {
      setIsSaving(false);
    }
  }, [reloadEditor]);

  const discardDraft = useCallback(async () => {
    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch("/api/cms/draft", { method: "DELETE" });

      if (!response.ok) {
        throw new Error("Failed to discard draft.");
      }

      await reloadEditor();
    } catch (discardError) {
      setError(discardError instanceof Error ? discardError.message : "Failed to discard draft.");
      throw discardError;
    } finally {
      setIsSaving(false);
    }
  }, [reloadEditor]);

  const resetToDefaults = useCallback(async () => {
    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch("/api/cms/content/reset", { method: "POST" });

      if (!response.ok) {
        throw new Error("Failed to reset content.");
      }

      await reloadEditor();
    } catch (resetError) {
      setError(resetError instanceof Error ? resetError.message : "Failed to reset content.");
      throw resetError;
    } finally {
      setIsSaving(false);
    }
  }, [reloadEditor]);

  const restoreVersion = useCallback(
    async (versionId: string) => {
      setIsSaving(true);
      setError(null);

      try {
        const response = await fetch(`/api/cms/versions/${versionId}/restore`, {
          method: "POST",
        });

        if (!response.ok) {
          const body = (await response.json().catch(() => null)) as {
            error?: string;
          } | null;
          throw new Error(body?.error ?? "Failed to restore version.");
        }

        await reloadEditor();
      } catch (restoreError) {
        setError(
          restoreError instanceof Error ? restoreError.message : "Failed to restore version.",
        );
        throw restoreError;
      } finally {
        setIsSaving(false);
      }
    },
    [reloadEditor],
  );

  const listVersions = useCallback(async () => {
    const response = await fetch("/api/cms/versions", { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Failed to load version history.");
    }

    const body = (await response.json()) as { versions: ContentVersionSummary[] };
    return body.versions;
  }, []);

  const value = useMemo(
    () => ({
      published,
      draft,
      hasDraft,
      hasUnpublishedChanges,
      isHydrated,
      isSaving,
      error,
      setDraft,
      updateDraft,
      saveDraft,
      publishDraft,
      discardDraft,
      resetToDefaults,
      reloadEditor,
      restoreVersion,
      listVersions,
    }),
    [
      published,
      draft,
      discardDraft,
      error,
      hasDraft,
      hasUnpublishedChanges,
      isHydrated,
      isSaving,
      listVersions,
      publishDraft,
      reloadEditor,
      resetToDefaults,
      restoreVersion,
      saveDraft,
      setDraft,
      updateDraft,
    ],
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
  const { published, isHydrated } = useCMS();
  return { content: published, isHydrated };
}
