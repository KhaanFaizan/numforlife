import type { LegalBlock } from "@/lib/legal/types";

const LONG_HEADING_THRESHOLD = 120;

function isSectionTitle(text: string) {
  return text.length <= LONG_HEADING_THRESHOLD;
}

export function LegalDocumentBody({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <div className="legal-document space-y-6">
      {blocks.map((block, index) => {
        if (block.type === "paragraph") {
          return (
            <p
              key={`p-${index}`}
              className="font-sans text-sm leading-relaxed text-fg-muted md:text-base"
            >
              {block.text}
            </p>
          );
        }

        if (isSectionTitle(block.text)) {
          return (
            <h2
              key={`h-${index}`}
              className="cjk pt-2 font-sans text-xl font-semibold text-fg md:text-2xl"
            >
              {block.text}
            </h2>
          );
        }

        return (
          <p
            key={`lead-${index}`}
            className="font-sans text-sm leading-relaxed text-fg md:text-base"
          >
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
