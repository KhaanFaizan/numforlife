import Link from "next/link";
import { GuideGrid } from "@/components/services/GuideGrid";
import { StripViewQuery } from "@/components/services/StripViewQuery";

export type ServiceStat = {
  value: string;
  label: string;
};

export type ServiceDetailContent = {
  title: string;
  tagline: string;
  introTitle: string;
  intro: string;
  ideaTitle: string;
  idea: string;
  image: string;
  ctaHref?: string;
  ctaLabel?: string;
  stats: readonly ServiceStat[];
  gallery?: readonly string[];
  pageClass?: string;
};

function CopyBlock({ text }: { text: string }) {
  const lines = text.split("\n").filter((line) => line.length > 0);
  if (lines.length <= 1) {
    return <p className="service-copy-body">{text}</p>;
  }
  return (
    <p className="service-copy-body is-broken">
      {lines.map((line, index) =>
        index === lines.length - 1 ? (
          <span key={index} className="service-copy-end">
            {line}
          </span>
        ) : (
          <span key={index}>
            {line}
            <br />
          </span>
        ),
      )}
    </p>
  );
}

function ServiceCta({ href, label }: { href: string; label: string }) {
  if (href.startsWith("http")) {
    return (
      <a href={href} className="service-cta">
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className="service-cta">
      {label}
    </Link>
  );
}

export function ServiceDetail({ content }: { content: ServiceDetailContent }) {
  const {
    title,
    tagline,
    introTitle,
    intro,
    ideaTitle,
    idea,
    image,
    ctaHref = "/login",
    ctaLabel = "点我测算",
    stats,
    gallery = [],
    pageClass = "",
  } = content;

  return (
    <article className={`service-page${pageClass ? ` ${pageClass}` : ""}`}>
      <StripViewQuery />
      <section className="page-hero service-hero">
        <h1>{title}</h1>
        <p>{tagline}</p>
      </section>

      <section className="service-split">
        <div className="service-copy">
          <h2>{introTitle}</h2>
          <CopyBlock text={intro} />
          <h2>{ideaTitle}</h2>
          <CopyBlock text={idea} />
        </div>
        <div className="service-visual">
          <img src={image} alt="" />
        </div>
      </section>

      <p className="service-cta-wrap">
        <ServiceCta href={ctaHref} label={ctaLabel} />
      </p>

      <div className="stats-row">
        {stats.map((stat) => (
          <div className="stat" key={`${stat.value}-${stat.label}`}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>

      {gallery.length > 0 ? (
        <div
          className={`service-gallery${
            gallery.length === 1
              ? " is-single"
              : gallery.length === 3
                ? " is-triple"
                : ""
          }`}
        >
          {gallery.map((src) => (
            <div className="service-gallery-item" key={src}>
              <img src={src} alt="" />
            </div>
          ))}
        </div>
      ) : null}

      <GuideGrid heading="所有指引" />
    </article>
  );
}
