import { LegalPageView, legalMetadata } from "@/components/legal/LegalPageView";

export const metadata = legalMetadata("shipping-policy");

export default function ShippingPolicyPage() {
  return <LegalPageView pageKey="shipping-policy" />;
}
