import type { Metadata } from "next";
import { Work_Sans, Azeret_Mono } from "next/font/google";
import { ContentProvider } from "@/lib/cms/content-provider";
import { getPublishedContent } from "@/lib/cms/server";
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
  title: "NumForLife Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const publishedContent = await getPublishedContent();

  return (
    <html lang="zh-CN" className={`${workSans.variable} ${azeretMono.variable}`}>
      <body className="min-h-screen bg-bg font-sans text-fg antialiased">
        <ContentProvider initialPublished={publishedContent}>{children}</ContentProvider>
      </body>
    </html>
  );
}
