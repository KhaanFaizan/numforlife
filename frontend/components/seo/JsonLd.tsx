type JsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

/** Render schema.org JSON-LD for crawlers. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
