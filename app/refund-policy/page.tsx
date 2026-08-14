import { LegalPageView, legalMetadata } from "@/components/legal/LegalPageView";

export const metadata = legalMetadata("refund-policy");

export default function RefundPolicyPage() {
  return <LegalPageView pageKey="refund-policy" />;
}
