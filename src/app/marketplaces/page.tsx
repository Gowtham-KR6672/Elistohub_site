import { ComingSoon, comingSoonMetadata } from "@/components/coming-soon";

export const metadata = comingSoonMetadata("marketplaces");

export default function Page() {
  return <ComingSoon slug="marketplaces" />;
}
