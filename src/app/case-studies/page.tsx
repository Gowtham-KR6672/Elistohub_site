import { ComingSoon, comingSoonMetadata } from "@/components/coming-soon";

export const metadata = comingSoonMetadata("case-studies");

export default function Page() {
  return <ComingSoon slug="case-studies" />;
}
