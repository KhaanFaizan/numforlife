import { Suspense } from "react";
import { MemberLoginForm } from "@/components/auth/MemberLoginForm";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "登录",
  description: "使用 KCC ID 登录数易赋能网站账户。",
  path: "/login",
  noIndex: true,
});

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="auth-page dmt-filter-1" />}>
      <MemberLoginForm />
    </Suspense>
  );
}
