import type { Metadata } from "next";
import { Work_Sans, Azeret_Mono } from "next/font/google";
import { ContentProvider } from "@/lib/cms/content-provider";
import { LayoutShell } from "@/components/layout/LayoutShell";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const azeretMono = Azeret_Mono({
  variable: "--font-azeret-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "数易赋能 – 数易赋能，您的人生导航",
  description:
    "We Don't Just Guide — We Empower You to Understand Yourself and Others.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${workSans.variable} ${azeretMono.variable}`}>
      <body className="min-h-screen bg-black font-sans text-white antialiased">
        <ContentProvider>
          <LayoutShell>{children}</LayoutShell>
        </ContentProvider>
      </body>
    </html>
  );
}
