"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/Spinner";

export function MemberLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const response = await fetch("/api/member/session", { cache: "no-store" });
        if (!cancelled && response.ok) {
          const next = searchParams.get("next") || "/dashboard";
          router.replace(next);
          return;
        }
      } finally {
        if (!cancelled) setCheckingSession(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router, searchParams]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/member/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const body = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        setError(body?.error ?? "无法登录，请稍后再试。");
        return;
      }

      const next = searchParams.get("next") || "/dashboard";
      router.push(next);
      router.refresh();
    } catch {
      setError("无法登录，请稍后再试。");
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <div className="page-shell flex min-h-[60vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="section-container flex min-h-[calc(100svh-72px)] items-center py-12 md:min-h-[calc(100svh-80px)] md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto w-full max-w-[480px]"
        >
          <p className="section-eyebrow cjk">Sign In</p>
          <h1 className="cjk section-heading mt-3">登录我的账户</h1>
          <p className="mt-4 font-sans text-sm leading-relaxed text-fg-muted">
            使用 KCC ID 登录。账户需已在数易 App 注册并完成 KCC 绑定。
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5 rounded-[28px] border border-border bg-surface p-6 md:p-8"
          >
            <label className="block">
              <span className="mb-2 block font-sans text-sm font-semibold text-fg">
                邮箱或用户名
              </span>
              <div className="relative">
                <Mail className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-fg-subtle" />
                <input
                  type="text"
                  autoComplete="username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="focus-accent min-h-[44px] w-full rounded-2xl border border-border bg-bg px-4 py-3 pl-11 font-sans text-sm text-fg outline-none transition-colors focus:border-accent"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block font-sans text-sm font-semibold text-fg">密码</span>
              <div className="relative">
                <Lock className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-fg-subtle" />
                <input
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus-accent min-h-[44px] w-full rounded-2xl border border-border bg-bg px-4 py-3 pl-11 font-sans text-sm text-fg outline-none transition-colors focus:border-accent"
                />
              </div>
            </label>

            {error ? (
              <p className="rounded-2xl border border-danger/20 bg-danger/10 px-4 py-3 font-sans text-sm text-danger">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="focus-accent group flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-accent py-3 font-sans text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover disabled:opacity-70"
            >
              {loading ? <Spinner /> : null}
              登录
              {!loading ? <ArrowRight className="h-4 w-4" /> : null}
            </button>
          </form>

          <p className="mt-6 text-center font-sans text-sm text-fg-muted">
            还没有账户？{" "}
            <Link href="https://app.numforlife.com/h5/" className="text-accent-ink hover:underline">
              前往 App 注册
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
