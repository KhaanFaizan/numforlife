module.exports = [
"[project]/packages/shared/components/ui/PageTransition.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PageTransition",
    ()=>PageTransition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$animations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/lib/animations.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function PageTransition({ children }) {
    const reducedMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    if (reducedMotion) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: children
        }, void 0, false, {
            fileName: "[project]/packages/shared/components/ui/PageTransition.tsx",
            lineNumber: 10,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$animations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pageTransition"].initial,
        animate: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$animations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pageTransition"].animate,
        transition: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$animations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pageTransition"].transition,
        children: children
    }, void 0, false, {
        fileName: "[project]/packages/shared/components/ui/PageTransition.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
}),
"[project]/packages/shared/lib/animations.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fadeInLeft",
    ()=>fadeInLeft,
    "fadeInRight",
    ()=>fadeInRight,
    "fadeInUp",
    ()=>fadeInUp,
    "pageTransition",
    ()=>pageTransition,
    "popIn",
    ()=>popIn,
    "scaleIn",
    ()=>scaleIn,
    "staggerContainer",
    ()=>staggerContainer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/lib/motion.ts [app-ssr] (ecmascript)");
;
const fadeInUp = {
    hidden: {
        opacity: 0,
        y: 40
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["easeOutExpo"]
        }
    }
};
const fadeInLeft = {
    hidden: {
        opacity: 0,
        x: -50
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.7,
            ease: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["easeOutExpo"]
        }
    }
};
const fadeInRight = {
    hidden: {
        opacity: 0,
        x: 50
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.7,
            ease: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["easeOutExpo"]
        }
    }
};
const staggerContainer = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1
        }
    }
};
const scaleIn = {
    hidden: {
        opacity: 0,
        scale: 0.92
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["easeOutExpo"]
        }
    }
};
const popIn = {
    hidden: {
        opacity: 0,
        scale: 0.85
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 22
        }
    }
};
const pageTransition = {
    initial: {
        opacity: 0,
        y: 12
    },
    animate: {
        opacity: 1,
        y: 0
    },
    exit: {
        opacity: 0,
        y: -8
    },
    transition: {
        duration: 0.45,
        ease: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$lib$2f$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["easeOutExpo"]
    }
};
}),
];

//# sourceMappingURL=packages_shared_0d7ws8e._.js.map