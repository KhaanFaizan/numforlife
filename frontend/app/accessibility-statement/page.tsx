import { LegalPageView, legalMetadata } from "@/components/legal/LegalPageView";

export const metadata = legalMetadata("accessibility-statement");

export default function AccessibilityStatementPage() {
  return <LegalPageView pageKey="accessibility-statement" />;
}
