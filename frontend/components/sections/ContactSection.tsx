"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { marketingNavLinks } from "@/lib/content";
import type { CMSContent } from "@/lib/cms/types";
import { cn } from "@/lib/utils";

type ContactSectionProps = {
  content: CMSContent;
  /** When true, content fits in a single viewport (contact page) */
  fitViewport?: boolean;
};

const columnStackClass = "flex flex-col gap-8 lg:gap-[52px]";

export function ContactSection({ content, fitViewport = false }: ContactSectionProps) {
  
  const { footer } = content;
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  return (
    <section
      id="contact"
      className={cn(
        "site-footer-section w-full bg-black text-white",
        fitViewport
          ? "flex min-h-[calc(100vh-72px)] flex-col md:min-h-[calc(100vh-80px)] lg:min-h-[95vh]"
          : "pb-6 pt-8 md:pb-10 md:pt-12 lg:min-h-[90vh] lg:pb-16 lg:pt-10",
      )}
    >
      {/* Title — larger, positioned higher */}
      <div
        className={cn(
          "section-container text-center",
          fitViewport ? "pb-6 pt-2 md:pb-8 lg:pb-12 lg:pt-4" : "pb-8 md:pb-14 lg:pb-16 lg:pt-2",
        )}
      >
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "cjk font-sans font-semibold leading-[1.05] text-white",
            fitViewport
              ? "text-[clamp(2.5rem,12vw,8.125rem)]"
              : "text-[clamp(2.25rem,11vw,8.125rem)]",
          )}
        >
          {footer.title}
        </motion.h1>
      </div>

      {/* Three-column layout — spacious desktop spacing */}
      <div
        className={cn(
          "section-container grid grid-cols-1 items-start gap-8 sm:gap-10",
          "lg:flex lg:items-start lg:justify-between lg:gap-0 lg:pb-8 lg:pr-8 xl:pr-10",
        )}
      >
        {/* Left group — contact info + nav, top-aligned */}
        <div className="lg:flex lg:items-start lg:gap-24 xl:gap-32">
          {/* Contact information */}
          <FadeIn direction="left" className={columnStackClass}>
            <a
              href={`mailto:${footer.email}`}
              className="font-sans text-[15px] font-bold leading-snug text-accent hover:underline md:text-base"
            >
              {footer.email}
            </a>
            <p className="font-sans text-[15px] font-bold leading-snug text-white md:text-base">
              {footer.contactText}
            </p>
            <p className="font-sans text-[15px] font-bold leading-snug text-white md:text-base">
              {footer.addressText}
            </p>
          </FadeIn>

          {/* Navigation links */}
          <FadeIn delay={0.08}>
            <nav className={columnStackClass}>
              {marketingNavLinks.slice(0, 3).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-sans text-[15px] font-bold leading-snug text-white transition-opacity hover:opacity-70 md:text-base"
                >
                  {link.label === "联系" ? "联系我们" : link.label}
                </Link>
              ))}
            </nav>
          </FadeIn>
        </div>

        {/* Spacer — large negative space before form on desktop */}
        <div aria-hidden className="hidden lg:block lg:min-w-[60px] lg:flex-1" />

        {/* Contact form — wider, lower, pushed right */}
        <FadeIn
          direction="right"
          delay={0.12}
          className="lg:mt-10 lg:w-[580px] lg:shrink-0 xl:mt-14 xl:w-[600px]"
        >
          <div
            className={cn(
              "form-card-reference w-full px-7 py-8 md:px-9 md:py-9",
              "lg:min-h-[440px] lg:px-[50px] lg:py-[50px]",
            )}
          >
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-5 md:space-y-5 lg:space-y-[22px]"
            >
              {[
                {
                  id: "name",
                  label: "Name",
                  placeholder: "阿桑林",
                  type: "text",
                  mono: false,
                },
                {
                  id: "phone",
                  label: "Phone",
                  placeholder: "+ 6 0 1 2 3 4 5 6 7 8",
                  type: "tel",
                  mono: true,
                },
                {
                  id: "email",
                  label: "Email",
                  placeholder: "abc@email.com",
                  type: "email",
                  mono: true,
                },
              ].map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    className="font-sans text-[13px] font-bold text-black md:text-sm"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.id as keyof typeof form]}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        [field.id]: e.target.value,
                      }))
                    }
                    className={cn(
                      "focus-accent mt-1.5 w-full border-b border-black/85 bg-transparent pb-2 text-[13px] text-black outline-none transition-colors placeholder:text-[#7a7a7a] focus:border-black md:text-sm",
                      field.mono && "font-mono tracking-wide",
                    )}
                  />
                </div>
              ))}

              <div>
                <label
                  htmlFor="message"
                  className="font-sans text-[13px] font-bold text-black md:text-sm"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={fitViewport ? 2 : 3}
                  placeholder="问题、技术障碍，意见或任何反馈。"
                  value={form.message}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, message: e.target.value }))
                  }
                  className="focus-accent mt-1.5 w-full resize-none border-b border-black/85 bg-transparent pb-3 font-sans text-[13px] text-black outline-none transition-colors placeholder:text-[#7a7a7a] focus:border-black md:text-sm lg:min-h-[52px]"
                />
              </div>

              <button type="submit" className="btn-submit-reference">
                Submit
              </button>
            </form>
          </div>
        </FadeIn>
      </div>

      {/* Footer — integrated policy links */}
      <div className="section-container flex flex-col items-start justify-between gap-6 pt-10 pb-8 sm:pt-12 md:flex-row md:items-center lg:pt-16">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {footer.links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-sans text-xs font-bold text-white underline-offset-4 transition-opacity hover:opacity-70 hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <p className="font-mono text-xs font-medium text-white">{footer.copyright}</p>
      </div>
    </section>
  );
}
