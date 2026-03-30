import { Suspense, lazy, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import PageLoader from "../components/PageLoader";
import Seo from "../components/Seo";

const GreetingSection = lazy(() => import("../components/sections/about/GreetingSection"));
const HistorySection = lazy(() => import("../components/sections/about/HistorySection"));
const OrgChartSection = lazy(() => import("../components/sections/about/OrgChartSection"));
const LocationSection = lazy(() => import("../components/sections/about/LocationSection"));

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

  const activeSection = useMemo(
    () => aboutSections.find((section) => section.id === activeId) ?? aboutSections[0],
    [activeId],
  );

  const ActiveComponent = activeSection.component;

  return (
    <main className="about-page section">
      <Seo
        title={`회사소개 - ${activeSection.menu}`}
        description={`더원산업의 ${activeSection.menu} 정보를 확인할 수 있는 회사소개 페이지입니다.`}
        path={`/about#${activeSection.id}`}
        keywords={["더원산업", "회사소개", activeSection.menu, "함체 제작 기업"]}
      />

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
              <Suspense fallback={<PageLoader label="섹션을 불러오는 중입니다." />}>
                <ActiveComponent />
              </Suspense>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
