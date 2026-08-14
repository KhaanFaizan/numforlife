import { Suspense } from "react";
import { Spinner } from "@/components/ui/Spinner";
import { AdminLoginForm } from "./AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#050505]">
          <Spinner />
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
