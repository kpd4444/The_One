import GreetingSection from "../components/sections/about/GreetingSection";
import HistorySection from "../components/sections/about/HistorySection";
import OrgChartSection from "../components/sections/about/OrgChartSection";
import LocationSection from "../components/sections/about/LocationSection";

export default function AboutPage() {
  return (
    <main>
      <GreetingSection />
      <HistorySection />
      <OrgChartSection />
      <LocationSection />
    </main>
  );
}
