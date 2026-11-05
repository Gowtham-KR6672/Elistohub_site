import { ComingSoon, comingSoonMetadata } from "@/components/coming-soon";

export const metadata = comingSoonMetadata("ai");

export default function Page() {
  return <ComingSoon slug="ai" />;
}
