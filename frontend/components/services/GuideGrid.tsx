import Link from "next/link";
import { GUIDE_ITEMS } from "@/lib/services";

export function GuideGrid({ heading = "所有指引" }: { heading?: string }) {
  return (
    <section className="service-guides">
      <h2>{heading}</h2>
      <div className="guide-grid">
          {GUIDE_ITEMS.map((item) => (
          <Link key={item.href} href={`${item.href}?view=page`}>
            <img src={item.img} alt="" />
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
