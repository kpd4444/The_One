import { Link, useLocation } from "react-router-dom";
import GreetingSection from "../components/sections/about/GreetingSection";
import HistorySection from "../components/sections/about/HistorySection";
import OrgChartSection from "../components/sections/about/OrgChartSection";
import LocationSection from "../components/sections/about/LocationSection";

const aboutSections = [
  {
    id: "greeting",
    menu: "인사말",
    component: GreetingSection,
  },
  {
    id: "history",
    menu: "회사 연혁",
    component: HistorySection,
  },
  {
    id: "org",
    menu: "조직도",
    component: OrgChartSection,
  },
  {
    id: "location",
    menu: "찾아오시는 길",
    component: LocationSection,
  },
];

export default function AboutPage() {
  const { hash } = useLocation();
  const activeId = hash ? hash.replace("#", "") : "greeting";

  const activeSection =
    aboutSections.find((section) => section.id === activeId) ?? aboutSections[0];

  const ActiveComponent = activeSection.component;

  return (
    <main className="about-page section">
      <div className="container">
        <div className="about-breadcrumb">
          <span>HOME</span>
          <span className="about-crumb-sep">&gt;</span>
          <span>회사소개</span>
          <span className="about-crumb-sep">&gt;</span>
          <strong>{activeSection.menu}</strong>
        </div>

        <div className="about-layout">
          <aside className="about-sidebar" aria-label="회사소개 메뉴">
            <h2>회사소개</h2>
            <ul>
              {aboutSections.map((section) => (
                <li key={section.id}>
                  <Link
                    to={`/about#${section.id}`}
                    className={section.id === activeSection.id ? "active" : ""}
                  >
                    {section.menu}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          <section className="about-content">
            <header className="about-content-head">
              <h1>{activeSection.menu}</h1>
            </header>

            <div className="about-section-panel">
              <ActiveComponent />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
