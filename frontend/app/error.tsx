"use client";

import { useEffect } from "react";

import { SiteErrorView } from "@/components/errors/SiteErrorView";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app/error]", error);
  }, [error]);

  return (
    <SiteErrorView
      code="500"
      title="页面暂时不可用"
      description="加载此页面时出现问题。请重试，或返回首页继续浏览。"
      onRetry={reset}
    />
  );
}
