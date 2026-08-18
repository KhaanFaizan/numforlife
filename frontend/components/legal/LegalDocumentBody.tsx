import type { LegalBlock } from "@/lib/legal/types";

const LONG_HEADING_THRESHOLD = 120;

function isSectionTitle(text: string) {
  return text.length <= LONG_HEADING_THRESHOLD;
}

export function LegalDocumentBody({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === "list") {
          return (
            <ul key={`ul-${index}`}>
              {block.items.map((item) => (
                <li key={item}>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "paragraph" || !isSectionTitle(block.text)) {
          return <p key={`p-${index}`}>{block.text}</p>;
        }

        return <h2 key={`h-${index}`}>{block.text}</h2>;
      })}
    </>
  );
}
