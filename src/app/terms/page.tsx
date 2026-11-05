import { ComingSoon, comingSoonMetadata } from "@/components/coming-soon";

export const metadata = comingSoonMetadata("terms");

export default function Page() {
  return <ComingSoon slug="terms" />;
}
