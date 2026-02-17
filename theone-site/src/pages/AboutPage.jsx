import GreetingSection from "../components/sections/about/GreetingSection";
import HistorySection from "../components/sections/about/HistorySection";
import OrgChartSection from "../components/sections/about/OrgChartSection";
import LocationSection from "../components/sections/about/LocationSection";

export default function AboutPage() {
  return (
    <main>
      {/* 서브 네비 */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              padding: 12,
              border: "1px solid var(--line)",
              borderRadius: 999,
              background: "var(--surface)",
              width: "fit-content",
            }}
          >
            <a className="btn btn-ghost" href="#greeting">인사말</a>
            <a className="btn btn-ghost" href="#history">회사연혁</a>
            <a className="btn btn-ghost" href="#org">조직도</a>
            <a className="btn btn-ghost" href="#location">찾아오시는길</a>
          </div>
        </div>
      </section>

      <GreetingSection />
      <HistorySection />
      <OrgChartSection />
      <LocationSection />
    </main>
  );
}
