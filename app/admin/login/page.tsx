"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Mail, Shield, Sparkles } from "lucide-react";
import { useState } from "react";
import { Spinner } from "@/components/ui/Spinner";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@kccdigital.com");
  const [password, setPassword] = useState("demo1234");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    await new Promise((resolve) => window.setTimeout(resolve, 500));
    router.push("/admin/dashboard");
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#050505]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-accent/15 blur-[140px]" />
        <div className="absolute right-[-5%] bottom-[-10%] h-[400px] w-[400px] rounded-full bg-orange-500/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative hidden flex-1 flex-col justify-between p-12 lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-[#ffb300]">
            <Sparkles className="h-5 w-5 text-black" />
          </div>
          <div>
            <p className="font-sans text-lg font-bold text-white">数易 CMS</p>
            <p className="font-mono text-[11px] text-white/40">Content Management Demo</p>
          </div>
        </div>

        <div className="max-w-md">
          <h1 className="font-sans text-5xl leading-[1.1] font-bold tracking-tight text-white">
            Manage your website visually
          </h1>
          <p className="mt-5 font-mono text-sm leading-relaxed text-white/45">
            Edit homepage content, reorder sections, and publish changes to the
            live site — all from one beautiful dashboard.
          </p>

          <div className="mt-10 space-y-4">
            {[
              "Drag-and-drop block editor",
              "Instant live preview updates",
              "No backend required",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/15">
                  <Shield className="h-3 w-3 text-accent" />
                </span>
                <span className="font-sans text-sm text-white/70">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="font-mono text-xs text-white/25">
          © 2035 数易赋能 — CMS Demonstration
        </p>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[420px]"
        >
          <div className="mb-8 lg:hidden">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent">
              <Sparkles className="h-6 w-6 text-black" />
            </div>
            <h1 className="font-sans text-3xl font-bold text-white">Welcome back</h1>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-2xl">
            <div className="mb-6 hidden lg:block">
              <h2 className="font-sans text-2xl font-bold text-white">Sign in</h2>
              <p className="mt-1 font-mono text-xs text-white/40">
                Access the admin dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block">
                <span className="mb-2 block font-sans text-sm font-medium text-white/75">
                  Email
                </span>
                <div className="relative">
                  <Mail className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-white/30" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/50 py-3.5 pr-4 pl-11 font-sans text-sm text-white outline-none transition-all focus:border-accent focus:shadow-[0_0_0_3px_rgba(255,193,7,0.15)]"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block font-sans text-sm font-medium text-white/75">
                  Password
                </span>
                <div className="relative">
                  <Lock className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-white/30" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/50 py-3.5 pr-4 pl-11 font-sans text-sm text-white outline-none transition-all focus:border-accent focus:shadow-[0_0_0_3px_rgba(255,193,7,0.15)]"
                  />
                </div>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="focus-accent group mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-accent py-3.5 font-sans text-sm font-semibold text-black shadow-[0_8px_30px_rgba(255,193,7,0.25)] transition-all hover:bg-accent-hover hover:shadow-[0_12px_40px_rgba(255,193,7,0.35)] disabled:opacity-70"
              >
                {loading ? <Spinner /> : null}
                Sign In
                {!loading && (
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                )}
              </button>
            </form>

            <p className="mt-6 text-center font-mono text-[11px] text-white/35">
              Demo only — no authentication required
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
