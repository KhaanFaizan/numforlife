"use client";

import type { AdminSession } from "@/lib/auth/types";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export function AdminShell({
  session,
  children,
}: {
  session: AdminSession;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-stretch bg-[#ececec] text-black">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,193,7,0.06),transparent_35%),radial-gradient(circle_at_80%_100%,rgba(0,0,0,0.04),transparent_40%)]" />
      <AdminSidebar session={session} />
      <div className="relative flex min-h-screen flex-1 flex-col">{children}</div>
    </div>
  );
}
