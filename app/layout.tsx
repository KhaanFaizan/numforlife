import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Work_Sans, Azeret_Mono } from "next/font/google";
import { ContentProvider } from "@/lib/cms/content-provider";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { THEME_COOKIE, resolveTheme } from "@/lib/theme";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const azeretMono = Azeret_Mono({
  variable: "--font-azeret-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "数易赋能 – 数易赋能，您的人生导航",
  description:
    "We Don't Just Guide — We Empower You to Understand Yourself and Others.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Read the stored preference on the server so the correct palette ships in
  // the first byte of HTML. `data-theme` is omitted for "system", letting the
  // prefers-color-scheme media query decide — no flash either way.
  const themePreference = (await cookies()).get(THEME_COOKIE)?.value;
  const theme = resolveTheme(themePreference);

  return (
    <html
      lang="zh-CN"
      data-theme={theme ?? undefined}
      className={`${workSans.variable} ${azeretMono.variable}`}
    >
      <body className="min-h-screen bg-bg font-sans text-fg antialiased">
        <ContentProvider>
          <LayoutShell>{children}</LayoutShell>
        </ContentProvider>
      </body>
    </html>
  );
}
