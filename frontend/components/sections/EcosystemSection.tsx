import { FadeIn } from "@/components/ui/FadeIn";
import type { CMSContent, FeatureItem } from "@/lib/cms/types";

const FEATURE_ICON_FALLBACKS: Record<string, string> = {
  "divination-1": "/icons/ecosystem/1.png",
  "divination-2": "/icons/ecosystem/2.png",
  knowledge: "/icons/ecosystem/3.png",
  tools: "/icons/ecosystem/4.png",
  archive: "/icons/ecosystem/5.png",
  mentor: "/icons/ecosystem/6.png",
};

function resolveIconSrc(feature: FeatureItem, index: number) {
  return (
    feature.icon?.trim() ||
    FEATURE_ICON_FALLBACKS[feature.id] ||
    `/icons/ecosystem/${index + 1}.png`
  );
}

function EcoBox({
  feature,
  index,
}: {
  feature: FeatureItem;
  index: number;
}) {
  const iconSrc = resolveIconSrc(feature, index);

  return (
    <FadeIn className="eco-item" delay={(index + 1) * 100}>
      <div className={`eco-icon${index === 1 ? " muted" : ""}`}>
        <img src={iconSrc} alt="" width={100} height={100} />
      </div>
      <div className="eco-content">
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
      </div>
    </FadeIn>
  );
}

export function EcosystemSection({ content }: { content: CMSContent }) {
  const items = content.features.items;
  const firstRow = items.slice(0, 3);
  const secondRow = items.slice(3);

  return (
    <section id="ecosystem" className="ecosystem">
      <div className="eco-head">
        <FadeIn>
          <p className="section-eyebrow">{content.features.sectionLabel}</p>
        </FadeIn>
        <FadeIn>
          <h2 className="section-title">{content.features.sectionHeading}</h2>
        </FadeIn>
      </div>
      <div className="eco-rows">
        {firstRow.length > 0 ? (
          <div className="eco-row eco-row-1">
            {firstRow.map((feature, index) => (
              <EcoBox key={feature.id} feature={feature} index={index} />
            ))}
          </div>
        ) : null}
        {secondRow.length > 0 ? (
          <div className="eco-row eco-row-2">
            {secondRow.map((feature, index) => (
              <EcoBox key={feature.id} feature={feature} index={index + 3} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
