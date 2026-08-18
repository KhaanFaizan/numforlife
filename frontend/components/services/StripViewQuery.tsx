"use client";

import { useEffect } from "react";

/** Drop the cache-busting ?view=page without triggering a cached 308 for /number. */
export function StripViewQuery() {
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("view") !== "page") return;
    url.searchParams.delete("view");
    const next = `${url.pathname}${url.search}${url.hash}`;
    window.history.replaceState(window.history.state, "", next);
  }, []);

  return null;
}
