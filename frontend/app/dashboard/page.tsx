import { redirect } from "next/navigation";
import { DashboardPanels } from "@/components/dashboard/DashboardPanels";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { getMemberSession } from "@/lib/auth/member-service";
import { getMemberDashboard } from "@/lib/member/repository";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "我的账户",
  description: "查看会员状态、能量点余额与最近测算记录。",
  path: "/dashboard",
  noIndex: true,
});

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getMemberSession();

  if (!session) {
    redirect("/login?next=/dashboard");
  }

  const data = await getMemberDashboard(session.memberId);

  if (!data) {
    return (
      <div className="page-shell">
        <div className="section-container py-16">
          <p className="rounded-3xl border border-border bg-surface px-6 py-8 text-center font-sans text-sm text-fg-muted">
            暂时无法加载账户数据。请确认服务器已配置只读数据库连接。
          </p>
        </div>
      </div>
    );
  }

  return (
    <DashboardShell session={session} data={data}>
      <DashboardPanels data={data} />
    </DashboardShell>
  );
}
