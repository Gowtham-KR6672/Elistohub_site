import { ComingSoon, comingSoonMetadata } from "@/components/coming-soon";

export const metadata = comingSoonMetadata("services");

export default function Page() {
  return <ComingSoon slug="services" />;
}
