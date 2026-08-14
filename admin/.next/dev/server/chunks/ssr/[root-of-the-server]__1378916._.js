module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[project]/packages/shared/lib/cms/content-provider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ContentProvider",
    ()=>ContentProvider,
    "useCMS",
    ()=>useCMS,
    "useLiveCMS",
    ()=>useLiveCMS
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$cms$2f$merge$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/lib/cms/merge.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const ContentContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
async function readEditorPayload() {
    const response = await fetch("/api/cms/content", {
        cache: "no-store"
    });
    if (response.status === 401) {
        throw new Error("Session expired. Please sign in again.");
    }
    if (!response.ok) {
        throw new Error("Unable to load CMS content.");
    }
    return await response.json();
}
function applyEditorPayload(payload) {
    return {
        published: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$cms$2f$merge$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeWithDefaults"])(payload.published),
        draft: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$cms$2f$merge$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeWithDefaults"])(payload.draft),
        hasDraft: payload.hasDraft,
        hasUnpublishedChanges: payload.hasUnpublishedChanges
    };
}
function isAdminEditorRoute(pathname) {
    return Boolean(pathname?.startsWith("/admin") && pathname !== "/admin/login");
}
function ContentProvider({ children, initialPublished }) {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const editorMode = isAdminEditorRoute(pathname);
    const [published, setPublished] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialPublished);
    const [draft, setDraftState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialPublished);
    const [hasDraft, setHasDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasUnpublishedChanges, setHasUnpublishedChanges] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isHydrated, setIsHydrated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSaving, setIsSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const draftRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(draft);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        draftRef.current = draft;
    }, [
        draft
    ]);
    const applyState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((payload)=>{
        const next = applyEditorPayload(payload);
        setPublished(next.published);
        setDraftState(next.draft);
        setHasDraft(next.hasDraft);
        setHasUnpublishedChanges(next.hasUnpublishedChanges);
        setError(null);
    }, []);
    const reloadEditor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        applyState(await readEditorPayload());
    }, [
        applyState
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
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
        (async ()=>{
            try {
                const payload = await readEditorPayload();
                if (cancelled) return;
                applyState(payload);
            } catch (loadError) {
                if (cancelled) return;
                setError(loadError instanceof Error ? loadError.message : "Unable to load CMS content.");
            } finally{
                if (!cancelled) setIsHydrated(true);
            }
        })();
        return ()=>{
            cancelled = true;
        };
    }, [
        applyState,
        editorMode,
        initialPublished
    ]);
    const setDraft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((next)=>{
        setDraftState(next);
        setHasUnpublishedChanges(true);
    }, []);
    const updateDraft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((updater)=>{
        setDraftState((current)=>{
            const next = updater(current);
            setHasUnpublishedChanges(true);
            return next;
        });
    }, []);
    const saveDraft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (override)=>{
        const payload = override ?? draftRef.current;
        setIsSaving(true);
        setError(null);
        try {
            const response = await fetch("/api/cms/draft", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                const body = await response.json().catch(()=>null);
                throw new Error(body?.error ?? "Failed to save draft.");
            }
            await reloadEditor();
        } catch (saveError) {
            setError(saveError instanceof Error ? saveError.message : "Failed to save draft.");
            throw saveError;
        } finally{
            setIsSaving(false);
        }
    }, [
        reloadEditor
    ]);
    const publishDraft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        setIsSaving(true);
        setError(null);
        try {
            await fetch("/api/cms/draft", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(draftRef.current)
            });
            const response = await fetch("/api/cms/publish", {
                method: "POST"
            });
            if (!response.ok) {
                const body = await response.json().catch(()=>null);
                throw new Error(body?.error ?? "Failed to publish.");
            }
            await reloadEditor();
        } catch (publishError) {
            setError(publishError instanceof Error ? publishError.message : "Failed to publish.");
            throw publishError;
        } finally{
            setIsSaving(false);
        }
    }, [
        reloadEditor
    ]);
    const discardDraft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        setIsSaving(true);
        setError(null);
        try {
            const response = await fetch("/api/cms/draft", {
                method: "DELETE"
            });
            if (!response.ok) {
                throw new Error("Failed to discard draft.");
            }
            await reloadEditor();
        } catch (discardError) {
            setError(discardError instanceof Error ? discardError.message : "Failed to discard draft.");
            throw discardError;
        } finally{
            setIsSaving(false);
        }
    }, [
        reloadEditor
    ]);
    const resetToDefaults = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        setIsSaving(true);
        setError(null);
        try {
            const response = await fetch("/api/cms/content/reset", {
                method: "POST"
            });
            if (!response.ok) {
                throw new Error("Failed to reset content.");
            }
            await reloadEditor();
        } catch (resetError) {
            setError(resetError instanceof Error ? resetError.message : "Failed to reset content.");
            throw resetError;
        } finally{
            setIsSaving(false);
        }
    }, [
        reloadEditor
    ]);
    const restoreVersion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (versionId)=>{
        setIsSaving(true);
        setError(null);
        try {
            const response = await fetch(`/api/cms/versions/${versionId}/restore`, {
                method: "POST"
            });
            if (!response.ok) {
                const body = await response.json().catch(()=>null);
                throw new Error(body?.error ?? "Failed to restore version.");
            }
            await reloadEditor();
        } catch (restoreError) {
            setError(restoreError instanceof Error ? restoreError.message : "Failed to restore version.");
            throw restoreError;
        } finally{
            setIsSaving(false);
        }
    }, [
        reloadEditor
    ]);
    const listVersions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        const response = await fetch("/api/cms/versions", {
            cache: "no-store"
        });
        if (!response.ok) {
            throw new Error("Failed to load version history.");
        }
        const body = await response.json();
        return body.versions;
    }, []);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
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
            listVersions
        }), [
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
        updateDraft
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ContentContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/packages/shared/lib/cms/content-provider.tsx",
        lineNumber: 341,
        columnNumber: 5
    }, this);
}
function useCMS() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ContentContext);
    if (!context) {
        throw new Error("useCMS must be used within ContentProvider");
    }
    return context;
}
function useLiveCMS() {
    const { published, isHydrated } = useCMS();
    return {
        content: published,
        isHydrated
    };
}
}),
"[project]/packages/shared/lib/cms/defaults.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultCMSContent",
    ()=>defaultCMSContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$content$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/lib/content.ts [app-ssr] (ecmascript)");
;
const defaultCMSContent = {
    hero: {
        tagline: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$content$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["siteConfig"].tagline,
        titleLines: [
            "We Don't Just Guide —",
            "We Empower You to",
            "Understand Yourself and",
            "Others."
        ],
        buttonText: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$content$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["siteConfig"].cta
    },
    gallery: {
        images: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$content$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["galleryImages"].map((image, index)=>({
                id: `gallery-${index + 1}`,
                src: image.src,
                alt: image.alt,
                tall: image.tall
            }))
    },
    features: {
        sectionLabel: "Data-driven ecosystem",
        sectionHeading: "More than just fortune telling, it's a guide for your life.",
        items: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$content$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ecosystemFeatures"].map((feature)=>({
                id: feature.id,
                title: feature.title,
                description: feature.description,
                icon: feature.icon
            }))
    },
    footer: {
        title: "联系我们",
        email: "support@kccdigital.com",
        contactText: "Contact Pending",
        addressText: "Address Pending",
        copyright: "© 2035 by 数码麒麟",
        links: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$content$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["footerLinks"].map((link)=>({
                ...link
            }))
    },
    homepageBlocks: [
        {
            id: "block-hero",
            type: "hero"
        },
        {
            id: "block-gallery",
            type: "gallery"
        },
        {
            id: "block-brand",
            type: "brand"
        },
        {
            id: "block-app",
            type: "app-download"
        },
        {
            id: "block-about",
            type: "about"
        },
        {
            id: "block-features",
            type: "features"
        },
        {
            id: "block-results",
            type: "results"
        },
        {
            id: "block-partners",
            type: "partners"
        },
        {
            id: "block-testimonials",
            type: "testimonials"
        },
        {
            id: "block-footer",
            type: "footer"
        }
    ],
    pages: [
        {
            id: "page-home",
            title: "Homepage",
            slug: "/",
            status: "published",
            lastUpdated: "2026-08-07"
        },
        {
            id: "page-portfolio",
            title: "Product Services",
            slug: "/portfolio",
            status: "published",
            lastUpdated: "2026-08-07"
        },
        {
            id: "page-about",
            title: "About Us",
            slug: "/about-us",
            status: "published",
            lastUpdated: "2026-08-07"
        },
        {
            id: "page-contact",
            title: "Contact",
            slug: "/contact-us",
            status: "published",
            lastUpdated: "2026-08-07"
        },
        {
            id: "page-shop",
            title: "Shop",
            slug: "/shopping",
            status: "published",
            lastUpdated: "2026-08-07"
        }
    ]
};
}),
"[project]/packages/shared/lib/cms/merge.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mergeWithDefaults",
    ()=>mergeWithDefaults
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$cms$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/lib/cms/defaults.ts [app-ssr] (ecmascript)");
;
const defaultFeatureIcons = Object.fromEntries(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$cms$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultCMSContent"].features.items.map((item)=>[
        item.id,
        item.icon
    ]));
function resolveFeatureIcon(item, index) {
    const fallbackById = defaultFeatureIcons[item.id];
    const fallbackByIndex = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$cms$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultCMSContent"].features.items[index]?.icon;
    const icon = item.icon?.trim() || fallbackById || fallbackByIndex || `/icons/ecosystem/${index + 1}.png`;
    return icon;
}
function mergeWithDefaults(stored) {
    return {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$cms$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultCMSContent"],
        ...stored,
        hero: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$cms$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultCMSContent"].hero,
            ...stored.hero
        },
        gallery: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$cms$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultCMSContent"].gallery,
            ...stored.gallery,
            images: stored.gallery?.images ?? __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$cms$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultCMSContent"].gallery.images
        },
        features: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$cms$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultCMSContent"].features,
            ...stored.features,
            items: stored.features?.items?.map((item, index)=>({
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$cms$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultCMSContent"].features.items[index],
                    ...item,
                    icon: resolveFeatureIcon(item, index)
                })) ?? __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$cms$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultCMSContent"].features.items
        },
        footer: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$cms$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultCMSContent"].footer,
            ...stored.footer,
            links: stored.footer?.links ?? __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$cms$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultCMSContent"].footer.links
        },
        homepageBlocks: (stored.homepageBlocks ?? __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$cms$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultCMSContent"].homepageBlocks).filter((block)=>block.type !== "faq"),
        pages: stored.pages ?? __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$cms$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultCMSContent"].pages
    };
}
}),
"[project]/packages/shared/lib/content.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "aboutBio",
    ()=>aboutBio,
    "aboutContent",
    ()=>aboutContent,
    "aboutPartnerLogos",
    ()=>aboutPartnerLogos,
    "aboutPartnersText",
    ()=>aboutPartnersText,
    "aboutStory",
    ()=>aboutStory,
    "aboutTeam",
    ()=>aboutTeam,
    "aboutValues",
    ()=>aboutValues,
    "appScreenshot",
    ()=>appScreenshot,
    "ecosystemFeatures",
    ()=>ecosystemFeatures,
    "footerLinks",
    ()=>footerLinks,
    "galleryImages",
    ()=>galleryImages,
    "navLinks",
    ()=>navLinks,
    "partners",
    ()=>partners,
    "productServices",
    ()=>productServices,
    "resultsImages",
    ()=>resultsImages,
    "siteConfig",
    ()=>siteConfig,
    "testimonials",
    ()=>testimonials
]);
const siteConfig = {
    name: "数易赋能",
    tagline: "数易赋能，您的人生导航",
    subtitle: "We Don't Just Guide — We Empower You to Understand Yourself and Others.",
    cta: "请改变自己吧"
};
const navLinks = [
    {
        label: "测算",
        href: "/celue"
    },
    {
        label: "产品服务",
        href: "/portfolio"
    },
    {
        label: "关于我们",
        href: "/about-us"
    },
    {
        label: "联系",
        href: "/contact-us"
    },
    {
        label: "商店",
        href: "/shop"
    }
];
const footerLinks = [
    {
        label: "无障碍声明",
        href: "/accessibility-statement"
    },
    {
        label: "隐私政策",
        href: "/privacy-policy"
    },
    {
        label: "使用条款",
        href: "/terms-of-use"
    },
    {
        label: "退款政策",
        href: "/refund-policy"
    },
    {
        label: "配送政策",
        href: "/shipping-policy"
    }
];
const productServices = [
    {
        id: "digital-life",
        title: "Digital Life",
        image: "https://numforlife.com/wp-content/uploads/2025/06/11062b_0a4cc6bd468f4930924daa97e9cfcce3mv2-1.avif",
        href: "https://numforlife.com/number"
    },
    {
        id: "onomastics",
        title: "Onomastics",
        image: "https://numforlife.com/wp-content/uploads/2025/06/sc1.webp",
        href: "https://numforlife.com/name"
    },
    {
        id: "tarot",
        title: "Tarot reading",
        image: "https://numforlife.com/wp-content/uploads/2025/06/dt1.webp",
        href: "https://numforlife.com/tarot"
    },
    {
        id: "eastern",
        title: "Eastern divination",
        image: "https://numforlife.com/wp-content/uploads/2025/06/77a7d0_882b88deaff94da6973cb65bf6ddc250mv2-1.avif",
        href: "https://numforlife.com/eastern-divination"
    }
];
const galleryImages = [
    {
        src: "https://numforlife.com/wp-content/uploads/2025/06/77a7d0_0b3b028fa90c4fb9862f1f13c3ac2810mv2.png",
        alt: "数易赋能展示图 1",
        tall: true
    },
    {
        src: "https://numforlife.com/wp-content/uploads/2025/06/77a7d0_e07c2a2eb04f4c3fa61a769470821a8cmv2.jpg",
        alt: "数易赋能展示图 2",
        tall: false
    },
    {
        src: "https://numforlife.com/wp-content/uploads/2025/06/77a7d0_3ce398a3fd4a4b24be4963111688e2f8mv2.png",
        alt: "数易赋能展示图 3",
        tall: true
    }
];
const appScreenshot = "https://numforlife.com/wp-content/uploads/2025/06/数易赋能-｜-你的数字人生-06-04-2025_11_07_AM.png";
const aboutContent = {
    label: "ABOUT",
    text: `本程序受启发于国学易经，并基于数字生命能量学开发。

自2023至2024年，本产品仅限于内部测试阶段，主要服务于核心学员与小范围用户。随着学员数量不断增长，以及大众对命理与自我探索的兴趣日益提升，我们团队决定于2025年对产品进行全面改版升级。
经过数月筹备与测试，产品已于2025年6月22日正式上架至安卓、iOS等主流应用商店，向公众全面开放…`,
    cta: "READ MORE",
    bgImage: "https://numforlife.com/wp-content/uploads/2025/06/bg3.jpg"
};
const ecosystemFeatures = [
    {
        id: "divination-1",
        title: "占卜指引",
        description: "我们提供世界四大占卜指引，兼容多种设备，希望透过不同的学说与学派占卜基础为您全方位解决人生课题。",
        icon: "/icons/ecosystem/1.png"
    },
    {
        id: "divination-2",
        title: "占卜指引",
        description: "我们提供世界四大占卜指引，兼容多种设备，希望透过不同的学说与学派占卜基础为您全方位解决人生课题。",
        icon: "/icons/ecosystem/2.png"
    },
    {
        id: "knowledge",
        title: "知识与数据库",
        description: "我们的系统基于庞大的数据库，并且拥有AI辅助与导师亲自撰写，确保提供更准确的数据。",
        icon: "/icons/ecosystem/3.png"
    },
    {
        id: "tools",
        title: "工具",
        description: "我们严格筛选第三方供应，希望提供品质良好切价格平民的工具来提升您的能量与磁场。​这不是迷信。",
        icon: "/icons/ecosystem/4.png"
    },
    {
        id: "archive",
        title: "档案管理",
        description: "我们提供所有会员档案管理，用户可以对照不同时间点的解读自己与他人现况的变化，从而提升觉知。",
        icon: "/icons/ecosystem/5.png"
    },
    {
        id: "mentor",
        title: "导师辅导",
        description: "我们严格筛选导师，提供一定的认证体系（建立中），以最亲民的价格与方式与你探讨的人生课题。",
        icon: "/icons/ecosystem/6.png"
    }
];
const resultsImages = [
    {
        src: "https://numforlife.com/wp-content/uploads/2025/06/11062b_0a4cc6bd468f4930924daa97e9cfcce3mv2-1.avif",
        alt: "成果展示 1"
    },
    {
        src: "https://numforlife.com/wp-content/uploads/2025/06/77a7d0_cec088e711a54093ad46a5ab44ddacf4mv2.avif",
        alt: "成果展示 2"
    }
];
const partners = [
    {
        name: "SKKER",
        logo: "https://numforlife.com/wp-content/uploads/2025/06/Logo-1-1-300x297.png",
        href: "http://www.skker.com"
    },
    {
        name: "KCC Holdings",
        logo: "https://numforlife.com/wp-content/uploads/2025/06/KCC-Logo-300x161.webp",
        href: "https://kcc-holdings.com/"
    }
];
const aboutPartnerLogos = [
    {
        name: "SKKER",
        logo: "https://numforlife.com/wp-content/uploads/2025/06/Logo-1-1-150x150.png",
        href: "https://numforlife.com/wp-content/uploads/2025/06/Logo-1-1-scaled.png"
    },
    {
        name: "Inner Pattern",
        logo: "https://numforlife.com/wp-content/uploads/2025/06/Inner-Pattern-Logo-2.png",
        href: "https://numforlife.com/wp-content/uploads/2025/06/Inner-Pattern-Logo-2.png"
    },
    {
        name: "KCC Holdings",
        logo: "https://numforlife.com/wp-content/uploads/2025/06/KCC-Logo-150x150.webp",
        href: "https://numforlife.com/wp-content/uploads/2025/06/KCC-Logo.webp"
    }
];
const aboutStory = {
    label: "Our Story",
    heading: [
        "STORYTELLERS?",
        "WE'RE STORY",
        "MAKERS"
    ],
    paragraphs: [
        `本程序受启发于国学易经，并基于数字生命能量学开发。`,
        `自2023至2024年，本产品仅限于内部测试阶段，主要服务于核心学员与小范围用户。随着学员数量不断增长，以及大众对命理与自我探索的兴趣日益提升，我们团队决定于2025年对产品进行全面改版升级。`,
        `新版平台由智码先锋团队负责技术开发，并由科学方舟团队在后续运营中进行重点管理与优化。经过数月筹备与测试，产品已于2025年6月22日正式上架至安卓、iOS等主流应用商店，向公众全面开放。`,
        `为丰富平台内容与提升用户体验，我们同步拓展了占卜服务，融合东西方文化传统，将塔罗牌与东方占卜术（如小六壬、奇门遁甲等）一并纳入功能体系中。我们相信，命理与占卜不仅是一种预测工具，更是引导用户面对人生课题、进行内在觉察与外在决策的重要智慧资源。`
    ]
};
const aboutBio = {
    paragraphs: [
        `千寓为数字生命学的资深老师，现居住美国与马来西亚两地。作为一个数字生命学的倡导者，她相信人可以透过自身的努力去改变命运，好的名字与数字组合会为人生带来辅助。数字本无好坏之分，皆在与我们如何透过自身的能量去驾驭属于我们的生命密码。`,
        `俯宏为NLP高级导师（ABNLP与NLPU认证），催眠咨询与治疗师(ABH与NGH认证）与臼井与慈光灵气导师。他因千寓而认识了数字生命学。并希望结合自身经历与学问，协助，帮助有需要的人去达成目标。`
    ],
    image: "https://numforlife.com/wp-content/uploads/2025/06/Zodiac-Clock-Detail-1.avif"
};
const aboutValues = [
    {
        title: "崇尚科学 Committed to Science and Reasoning",
        text: "我们推崇中华传统智慧，相信一切命理外向皆由心生，不鼓吹迷信。我们希望用户以自我成长与觉察的心态，善用融合东西方玄学体系的智慧工具，从中获得方向与启发。"
    },
    {
        title: "透明与实惠的服务 Transparent and Affordable Product & Services",
        text: "我们不夸大其词，更不采用制造焦虑或误导性的恶意销售手法。命理的核心应是启发，而非贩卖神秘感；是助人思考，而非操控恐惧，承诺不打「玄学」的擦边球来获取不必要的付费。"
    },
    {
        title: "精益求精 Relentless Pursuit of Excellence",
        text: "我们持续检视平台所提供的价值与内容，重视每一位用户的反馈。我们相信，唯有不断优化内容与服务核心，才能真正陪伴用户走得更远、更深。"
    },
    {
        title: "承载古智慧，赋能新未来 Ancient wisdom, modern insight",
        text: "我们深信，古老的智慧蕴含着历久弥新的真理。通过融合传统命理、数字哲学与现代科技（如人工智能），我们在传承与创新之间架起桥梁，为当代人提供更有意义的指引。"
    },
    {
        title: "命运掌握在自己的手中 Destiny is in your own hands",
        text: "我们所提供的，皆以「指引」为核心，我们坚信，命运掌握在自己的手上。命理的本质，是帮助人们更深刻地了解自我、看清环境，从而做出更有智慧的选择，助你更快地迈向目标。"
    },
    {
        title: "尊重多元命理文化，倡导交流共融 Wisdom from all cultures, united in harmony",
        text: "我们尊重来自世界各地的命理体系与哲学思想了，并且抱持开放态度，广纳各路有志之士，共同探索命理智慧。我们相信，不同文的命理体系虽形式各异，都旨在帮助人们认识自我。"
    }
];
const aboutTeam = {
    heading: "OUR TEAM",
    subtitle: "我们是一群热爱东西方命理、玄学与身心灵成长的探索者，希望用我们的指引，点亮你的人生方向。",
    members: [
        {
            name: "郭俯宏 - Weaving Life Code into Wonders",
            image: "https://numforlife.com/wp-content/uploads/2025/06/GettyImages-638493478-1.avif"
        },
        {
            name: "高千寓 - Ruling the financial realm",
            image: "https://numforlife.com/wp-content/uploads/2025/06/GettyImages-1317309593.avif"
        },
        {
            name: "蔡子和 - Decoding the code jungle",
            image: "https://numforlife.com/wp-content/uploads/2025/06/mayagi_Medium_shot_of_a_diverse_smiling_tech_worker_in_portland_9130dee5-b27a-4307-a5d3-75.avif"
        }
    ]
};
const aboutPartnersText = `《数易赋能》的成功推出，离不开以下合作伙伴的鼎力支持与信任。在此，我们谨致以最诚挚的感谢： 感谢每一位合作单位、技术支持团队、内容贡献者以及早期参与测试的用户。正是你们在背后默默的付出与专业的协作，让我们的产品从理念走向现实。我们深知，一个优质的应用不仅仅是技术的堆砌，更需要智慧的融合与价值的共创。未来，《数易赋能》将持续优化体验、扩展功能，并携手更多伙伴共同打造一个融合东西方智慧、助力个人成长的命理生态圈。再次感谢你们的参与与支持。让我们一起见证成长的力量，赋能更多人生。`;
const testimonials = [
    {
        quote: "「以前从没想过名字也能隐藏这么多信息。正所谓相由心生，使用了姓名学，我知道了自己很多的优缺点以及名字带给我的煞气，我特意找了老师名正言顺，自此我的人生也改变了。好的名字，不仅告诉你'是什么'，还告诉你'可以怎么做'。很值得反复参考。」",
        author: "志轩，31岁，品牌策略顾问"
    },
    {
        quote: "我很荣幸在我30岁迷茫的时候认识了数易文化，透过数字了解自己，同时该网业的App也方便我测试与了解身边的人",
        author: "麻坡人（匿名），家私厂老板，32岁"
    },
    {
        quote: "我在一家科技公司担任PM，自从接触了这款App，我每天都运用数易赋能里的塔罗来占卜一些工作的事情，例如来临得Presentation与项目的问题，获益匪浅！",
        author: "V，美国旧金山，27岁"
    }
];
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1378916._.js.map