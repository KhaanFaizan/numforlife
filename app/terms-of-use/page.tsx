import { LegalPageView, legalMetadata } from "@/components/legal/LegalPageView";

export const metadata = legalMetadata("terms-of-use");

export default function TermsOfUsePage() {
  return <LegalPageView pageKey="terms-of-use" />;
}
