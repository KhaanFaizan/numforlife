import Link from "next/link";

import {
  MembershipAppCta,
  MembershipBenefitsSection,
  MembershipPricingSection,
} from "@/components/membership/MembershipSections";
import { PageSeo, metadataForPage } from "@/components/seo/PageSeo";
import { getMembershipCatalog } from "@/lib/membership/repository";
import { getSiteFlags } from "@/lib/settings/repository";
import { redirect } from "next/navigation";

export const metadata = metadataForPage("membership");

export const revalidate = 3600;

export default async function MembershipPage() {
  if (!getSiteFlags().membership_page_enabled) {
    redirect("/contact-us");
  }

  const catalog = await getMembershipCatalog();

  return (
    <>
      <PageSeo
        page="membership"
        breadcrumbs={[
          { name: "首页", path: "/" },
          { name: "会员", path: "/membership" },
        ]}
      />
      <div className="page-shell">
        <section className="section-container py-12 md:py-16">
          <p className="section-eyebrow cjk">Membership</p>
          <h1 className="cjk section-heading-lg mt-4 max-w-4xl">会员方案</h1>
          <p className="mt-5 max-w-3xl font-sans text-sm leading-relaxed text-fg-muted md:text-base">
            价格与权益均读取 App 后台数据库，不在网站硬编码。升级后可在 App 解锁完整测算解读、记录保存与商城优惠。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="https://app.numforlife.com/h5/"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-accent inline-flex min-h-[44px] items-center justify-center rounded-full bg-accent px-6 py-3 font-sans text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover"
            >
              在 App 开通会员
            </Link>
            <Link
              href="/celue/number"
              className="focus-accent inline-flex min-h-[44px] items-center justify-center rounded-full border border-border px-6 py-3 font-sans text-sm font-semibold text-fg transition-colors hover:border-accent"
            >
              先体验简版测算
            </Link>
          </div>
        </section>

        {catalog ? (
          <>
            <MembershipPricingSection catalog={catalog} />
            <MembershipBenefitsSection catalog={catalog} />
          </>
        ) : (
          <section className="section-container pb-14">
            <p className="rounded-3xl border border-border bg-surface px-6 py-8 text-center font-sans text-sm text-fg-muted">
              暂时无法加载会员数据。请确认服务器已配置只读数据库连接，或稍后再试。
            </p>
          </section>
        )}

        <MembershipAppCta />
      </div>
    </>
  );
}
