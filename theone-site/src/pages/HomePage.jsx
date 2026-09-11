import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { resolveSiteUrl } from "../config/site";
import {
  featuredProjects,
  processSteps,
  productGroups,
  strengths,
} from "../data/mainPageData";

const SITE_URL = resolveSiteUrl();
const HOME_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: "더원산업",
    url: SITE_URL,
    logo: `${SITE_URL}/site-mark.svg`,
    telephone: "+82-31-997-4020",
    address: {
      "@type": "PostalAddress",
      addressCountry: "KR",
      addressRegion: "경기도",
      addressLocality: "김포시",
      streetAddress: "대곶면 오니산로 100",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.647563,
      longitude: 126.549588,
    },
    openingHours: "Mo-Fr 08:30-17:30",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "더원산업",
    url: SITE_URL,
  },
];

export default function HomePage() {
  return (
    <main className="home-page">
      <Seo
        title="더원산업 | 장비 보호 케이스 및 함체 설계·제작"
        description="더원산업은 장비 보호 케이스, 함체, 키오스크, ITS 장비 하우징을 설계·제작하는 산업 장비 전문 기업입니다."
        path="/"
        structuredData={HOME_SCHEMA}
      />
      <section className="home-hero">
        <div className="container">
          <div className="home-hero-shell">
            <div className="home-hero-copy">
              <p className="home-kicker">THE ONE INDUSTRY</p>
              <h1>
                <span className="home-hero-title-line">우리 더원 산업은</span>
                <span className="home-hero-title-line">세계 최고의 품질과</span>
                <span className="home-hero-title-line">
                  서비스를 지향합니다.
                </span>
              </h1>
              <p className="home-hero-lead">
                더원산업은 무인차량 번호 인식 카메라 케이스, 로비폰, 무인과속
                카메라 케이스, 프로젝트 빔 케이스, ITS 장비 함체 등 각종 장비
                보호 케이스를 맞춤 설계 및 제작하는 전문 업체입니다.
              </p>
              <div className="home-hero-cta">
                <Link className="btn btn-primary" to="/products">
                  제품 소개 보기
                </Link>
                <Link className="btn btn-outline" to="/support?tab=inquiry">
                  견적 문의하기
                </Link>
              </div>
              <div className="home-product-tags" aria-label="주요 제작 품목">
                {productGroups.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
            <div className="home-hero-visual is-ready">
              <div className="home-static-visual" aria-hidden="true">
                <span className="home-static-grid" />
                <span className="home-static-case" />
              </div>
              <aside className="home-hero-panel" aria-label="제작 역량">
                <h2>맞춤 제작 역량</h2>
                <p>설계 · 가공 · 조립 · 출하 검수</p>
                <strong>산업 장비에 맞춘 일괄 제작</strong>
              </aside>
            </div>
          </div>
        </div>
      </section>
      <section className="home-trust home-deferred-section">
        <div className="container">
          <div className="home-trust-strip">
            <span>맞춤 케이스·함체 설계</span>
            <span>장비 보호와 안정성 중심 제작</span>
            <span>실내·실외 설치 환경 대응</span>
          </div>
        </div>
      </section>
      <section className="section home-deferred-section">
        <div className="container">
          <div className="home-section-head">
            <p className="home-kicker">Why The One</p>
            <h2>구성 장비가 오래, 안정적으로 작동할 수 있도록 설계합니다.</h2>
          </div>
          <div className="home-capability-grid">
            {strengths.map((item) => (
              <article key={item.title} className="home-capability-card">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-muted home-deferred-section">
        <div className="container">
          <div className="home-process-layout">
            <div className="home-section-head">
              <p className="home-kicker">Process</p>
              <h2>상담부터 설계, 제작, 출하까지 흐름이 명확한 제작 프로세스</h2>
            </div>
            <div className="home-process-grid">
              {processSteps.map((item) => (
                <article key={item.step} className="home-process-card">
                  <span>{item.step}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section home-deferred-section">
        <div className="container">
          <div className="home-section-head">
            <p className="home-kicker">Featured Work</p>
            <h2>현재 제작 품목과 가까운 대표 분야</h2>
          </div>
          <div className="home-project-grid">
            {featuredProjects.map((project) => (
              <article key={project.title} className="home-project-card">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                />
                <div className="home-project-overlay">
                  <span>{project.category}</span>
                  <h3>{project.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="home-bottom-cta section home-deferred-section">
        <div className="container home-bottom-cta-wrap">
          <div>
            <p className="home-kicker">Start Your Project</p>
            <h2>
              장비 사양과 설치 환경만 정리되어 있어도 맞춤형 케이스 방향부터
              함께 잡아드립니다.
            </h2>
          </div>
          <Link className="btn btn-primary" to="/support?tab=inquiry">
            상담 시작하기
          </Link>
        </div>
      </section>
    </main>
  );
}
