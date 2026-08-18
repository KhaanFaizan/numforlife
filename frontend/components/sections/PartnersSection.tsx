import { FadeIn } from "@/components/ui/FadeIn";
import { partners } from "@/lib/content";

export function PartnersSection() {
  return (
    <section className="partners">
      <FadeIn>
        <p className="section-eyebrow">合作伙伴</p>
      </FadeIn>
      <FadeIn>
        <h2 className="section-title">PROUD TO WORK WITH</h2>
      </FadeIn>
      <div className="partners-logos">
        {partners.map((partner, index) => (
          <FadeIn
            key={partner.name}
            type={index === 0 ? "fadeInLeft" : "fadeInRight"}
            className={`partners-logo ${index === 0 ? "partners-logo-left" : "partners-logo-right"}`}
          >
            <a href={partner.href} target="_blank" rel="noreferrer">
              <img src={partner.logo} alt={partner.name} />
            </a>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
