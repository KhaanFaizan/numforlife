"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { DEFAULT_APP_EXPERIENCE_URL } from "@/lib/calculators/constants";

const HOURS = [
  "未知",
  "23-01 子时",
  "01-03 丑时",
  "03-05 寅时",
  "05-07 卯时",
  "07-09 辰时",
  "09-11 巳时",
  "11-13 午时",
  "13-15 未时",
  "15-17 申时",
  "17-19 酉时",
  "19-21 戌时",
  "21-23 亥时",
];

export function MemberLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"login" | "register">(
    searchParams.get("mode") === "register" ? "register" : "login",
  );
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [message, setMessage] = useState("");

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

  async function onLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/member/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const body = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        setMessage(body?.error ?? "无法登录，请稍后再试。");
        return;
      }

      const next = searchParams.get("next") || "/dashboard";
      router.push(next);
      router.refresh();
    } catch {
      setMessage("无法登录，请稍后再试。");
    } finally {
      setLoading(false);
    }
  }

  function onRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const nextPassword = (form.elements.namedItem("password") as HTMLInputElement)?.value;
    const confirm = (form.elements.namedItem("confirmPassword") as HTMLInputElement)?.value;

    if (nextPassword !== confirm) {
      setMessage("两次输入的密码不一致");
      return;
    }

    setMessage("网站不支持直接注册。请前往 App 创建账户后再登录。");
    window.open(DEFAULT_APP_EXPERIENCE_URL, "_blank", "noopener,noreferrer");
  }

  function sendCode() {
    setMessage("请前往 App 获取验证码并完成注册。");
    window.open(DEFAULT_APP_EXPERIENCE_URL, "_blank", "noopener,noreferrer");
  }

  if (checkingSession) {
    return (
      <div className="auth-page dmt-filter-1">
        <p className="auth-ok">正在检查登录状态…</p>
      </div>
    );
  }

  return (
    <div className={`auth-page dmt-filter-1${mode === "register" ? " is-register" : ""}`}>
      {mode === "login" ? (
        <form key="login" className="auth-form" onSubmit={onLogin}>
          <input
            type="text"
            name="username"
            autoComplete="username"
            required
            placeholder="账号名字"
            aria-label="账号名字"
            value={identifier ?? ""}
            onChange={(event) => setIdentifier(event.target.value)}
          />
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            required
            placeholder="密码"
            aria-label="密码"
            value={password ?? ""}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? "登录中…" : "登录"}
          </button>
          <button
            type="button"
            className="auth-switch"
            onClick={() => {
              setMode("register");
              setMessage("");
            }}
          >
            还没有账号？注册
          </button>
        </form>
      ) : (
        <form key="register" className="auth-form auth-signup" onSubmit={onRegister}>
          <input
            type="text"
            name="chineseName"
            autoComplete="name"
            required
            placeholder="中文名字"
            aria-label="中文名字"
          />
          <select name="gender" required defaultValue="" aria-label="选择性别">
            <option value="" disabled hidden>
              选择性别
            </option>
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
          <input type="date" name="birthday" required aria-label="生日" />
          <select name="birthHour" required defaultValue="" aria-label="出生时间">
            <option value="" disabled hidden>
              出生时间（便于测算）
            </option>
            {HOURS.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="username"
            autoComplete="username"
            required
            placeholder="账号名字"
            aria-label="账号名字"
          />
          <div className="auth-email-row">
            <input
              id="reg-email"
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder="电子邮箱"
              aria-label="电子邮箱"
            />
            <button type="button" className="auth-code-btn" onClick={sendCode}>
              发送验证码
            </button>
          </div>
          <input
            type="text"
            name="code"
            inputMode="numeric"
            required
            placeholder="输入验证码"
            aria-label="输入验证码"
          />
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            required
            placeholder="设置密码"
            aria-label="设置密码"
          />
          <input
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
            required
            placeholder="重新输入密码"
            aria-label="重新输入密码"
          />
          <button type="submit" className="auth-submit">
            注册
          </button>
          <button
            type="button"
            className="auth-switch"
            onClick={() => {
              setMode("login");
              setMessage("");
            }}
          >
            已有账号？登录
          </button>
        </form>
      )}
      {message ? <p className="auth-ok">{message}</p> : null}
    </div>
  );
}
