"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import type { CMSContent } from "@/lib/cms/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const FOOTER_NAV = [
  { href: "/portfolio", label: "产品服务" },
  { href: "/about-us", label: "关于我们" },
  { href: "/contact-us", label: "联系我们" },
];

type ContactSectionProps = {
  content: CMSContent;
  /** When true, content fits in a single viewport (contact page) */
  fitViewport?: boolean;
};

export function ContactSection({ content, fitViewport = false }: ContactSectionProps) {
  const { footer } = content;
  const [ok, setOk] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOk(true);
  }

  return (
    <footer className={cn("footer", fitViewport && "footer--fit")} id="contact">
      <h2 className="footer-title">{footer.title}</h2>
      <div className="footer-grid">
        <div className="footer-col footer-col-info">
          <p>
            <a href={`mailto:${footer.email}`}>{footer.email}</a>
          </p>
          <p>{footer.contactText}</p>
          <p>{footer.addressText}</p>
        </div>
        <div className="footer-col footer-col-nav">
          <nav className="footer-nav" aria-label="Footer">
            {FOOTER_NAV.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="footer-col footer-form-card">
          <form className="footer-form" onSubmit={onSubmit} name="Contact Form">
            <div className="field">
              <label htmlFor="form-field-name">Name</label>
              <input id="form-field-name" name="name" placeholder="阿莫林" />
            </div>
            <div className="field">
              <label htmlFor="form-field-phone">Phone</label>
              <input
                id="form-field-phone"
                name="phone"
                type="tel"
                placeholder="＋６０１２３４５６７８"
              />
            </div>
            <div className="field">
              <label htmlFor="form-field-email">Email</label>
              <input
                id="form-field-email"
                name="email"
                type="email"
                required
                placeholder="abc＠email.com"
              />
            </div>
            <div className="field">
              <label htmlFor="form-field-message">Message</label>
              <textarea
                id="form-field-message"
                name="message"
                rows={4}
                placeholder="问题、技术障碍、意见或任何反馈。"
              />
            </div>
            <Button type="submit" variant="black">
              SUBMIT
            </Button>
            {ok ? (
              <p className="form-ok">Thank you. Your message has been received.</p>
            ) : null}
          </form>
        </div>
      </div>
      <div className="footer-legal">
        <nav className="footer-legal-links">
          {footer.links.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="copyright">{footer.copyright}</p>
      </div>
    </footer>
  );
}
