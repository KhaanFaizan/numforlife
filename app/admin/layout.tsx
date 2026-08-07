"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen items-stretch bg-[#ececec] text-black">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,193,7,0.06),transparent_35%),radial-gradient(circle_at_80%_100%,rgba(0,0,0,0.04),transparent_40%)]" />
      <AdminSidebar />
      <div className="relative flex min-h-screen flex-1 flex-col">
        {children}
      </div>
    </div>
  );
}
