import { SiteErrorView } from "@/components/errors/SiteErrorView";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "页面未找到",
  description: "您访问的页面不存在或已移动。",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <SiteErrorView
      code="404"
      title="找不到此页面"
      description="您访问的链接可能已失效，或页面已被移动。请返回首页，或从下方链接继续浏览。"
    />
  );
}
