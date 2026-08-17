"use client";

import { SiteErrorView } from "@/components/errors/SiteErrorView";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-[#fafafa] text-[#111] antialiased">
        <SiteErrorView
          code="Error"
          title="网站遇到问题"
          description="应用发生未预期的错误。请重试，若问题持续请联系支持团队。"
          onRetry={reset}
        />
      </body>
    </html>
  );
}
