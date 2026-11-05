import { ToolsAndReporting } from "@/components/sections/reporting";
import { NumberedSteps } from "@/components/steps";
import { Container, Highlight } from "@/components/ui";
import { processSteps } from "@/lib/content";
import { ServiceLayout } from "@/pages/services/service-layout";

export default function OurProcessPage() {
  return (
    <ServiceLayout
      path="/our-process"
      crumb="Our process"
      seoTitle="Our Process & Tools"
      description="From the first call to the monthly report: how working with Elistohub looks, the tools we plug into and how we keep you updated every week."
      eyebrow="Our process"
      title={
        <>
          How we work. <Highlight onLoad>Without the chaos.</Highlight>
        </>
      }
      intro="From the first call to the monthly report, here’s what working with Elistohub looks like."
    >
      <section className="pb-20 sm:pb-24" aria-labelledby="process-steps">
        <Container>
          <h2 id="process-steps" className="sr-only">
            The four steps
          </h2>
          <NumberedSteps steps={processSteps} />
        </Container>
      </section>
      <ToolsAndReporting />
    </ServiceLayout>
  );
}
