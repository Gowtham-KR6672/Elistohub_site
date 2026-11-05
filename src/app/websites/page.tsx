import { ComingSoon, comingSoonMetadata } from "@/components/coming-soon";

export const metadata = comingSoonMetadata("websites");

export default function Page() {
  return <ComingSoon slug="websites" />;
}
