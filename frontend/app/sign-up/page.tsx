import { Suspense } from "react";
import { MemberLoginForm } from "@/components/auth/MemberLoginForm";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "登录 / 注册",
  description: "使用 KCC ID 登录数易赋能网站账户。新账户请在数易 App 注册。",
  path: "/sign-up",
  noIndex: true,
});

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="auth-page dmt-filter-1" />}>
      <MemberLoginForm />
    </Suspense>
  );
}
