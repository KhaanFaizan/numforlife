import { LegalPageView, legalMetadata } from "@/components/legal/LegalPageView";

export const metadata = legalMetadata("privacy-policy");

export default function PrivacyPolicyPage() {
  return <LegalPageView pageKey="privacy-policy" />;
}
