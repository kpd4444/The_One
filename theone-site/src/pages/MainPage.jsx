import itsImg from "../assets/product-its-enclosure.png";
import kioskImg from "../assets/product-kiosk-body.png";
import projectBeamImg from "../assets/product-project-beam-case-a.png";
import { Link } from "react-router-dom";

const metrics = [
  { label: "진행 프로젝트", value: "210+" },
  { label: "납기 준수율", value: "98.2%" },
  { label: "재의뢰 비율", value: "84%" },
];

const productGroups = [
  "무인차량 번호 인식 카메라 및 케이스",
  "아파트 입구 로비폰",
  "무인 과속 카메라 케이스",
  "실내·야외 행사 프로젝터 빔 케이스",
  "ITS 장비 함체",
];

const strengths = [
  {
    title: "맞춤 설계 최적화",
    desc: "구성 장비의 발열, 방수, 유지보수 동선까지 고려해 케이스와 함체를 실사용 기준으로 설계합니다.",
  },
  {
    title: "정밀 가공부터 조립까지",
    desc: "판금, 절곡, 용접, 표면 처리, 최종 조립까지 이어지는 제작 흐름을 일관된 품질 기준으로 관리합니다.",
  },
  {
    title: "장비 수명과 안정성 중심",
    desc: "장비가 최적 상태로 유지되고 보존될 수 있도록 내구성과 운용 효율을 함께 고려합니다.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "요구사항 분석",
    desc: "설치 환경, 장비 구성, 유지보수 조건을 정리합니다.",
  },
  {
    step: "02",
    title: "구조 설계",
    desc: "현장 사용성을 반영한 맞춤형 케이스 구조를 설계합니다.",
  },
  {
    step: "03",
    title: "제작 및 품질 확인",
    desc: "정밀 가공과 조립 후 출하 전 상태를 점검합니다.",
  },
];

const featuredProjects = [
  {
    title: "ITS 장비 함체",
    category: "ITS / INFRA",
    image: itsImg,
  },
  {
    title: "무인 정산기 및 키오스크",
    category: "PARKING / KIOSK",
    image: kioskImg,
  },
  {
    title: "프로젝터 빔 케이스",
    category: "EVENT / CUSTOM CASE",
    image: projectBeamImg,
  },
];

export default function MainPage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="container">
          <div className="home-hero-shell">
            <div className="home-hero-copy">
              <p className="home-kicker">THE ONE INDUSTRY</p>
              <h1>
                <span className="home-hero-title-line">장비를 보호하는 케이스와</span>
                <span className="home-hero-title-line">함체를 더 정교하게</span>
                <span className="home-hero-title-line">만듭니다.</span>
              </h1>
              <p className="home-hero-lead">
                더원산업은 무인차량 번호 인식 카메라 케이스, 로비폰, 과속 카메라 케이스, 프로젝터 빔
                케이스, ITS 장비 함체 등 각종 장비 보조 케이스를 맞춤 설계 및 제작하는 전문 업체입니다.
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

            <div className="home-hero-visual" aria-hidden="true">
              <div className="home-orbit home-orbit-a" />
              <div className="home-orbit home-orbit-b" />
              <div className="home-orbit home-orbit-c" />
              <div className="home-globe">
                <div className="home-globe-atmosphere" />
                <div className="home-globe-ocean" />
                <div className="home-globe-continent home-globe-continent-a" />
                <div className="home-globe-continent home-globe-continent-b" />
                <div className="home-globe-continent home-globe-continent-c" />
                <div className="home-globe-cloud home-globe-cloud-a" />
                <div className="home-globe-cloud home-globe-cloud-b" />
                <div className="home-globe-shadow" />
              </div>

              <aside className="home-hero-panel" aria-label="핵심 지표">
                <h2>핵심 지표</h2>
                <div className="home-metric-list">
                  {metrics.map((item) => (
                    <div key={item.label} className="home-metric-item">
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </div>
                  ))}
                </div>
                <p className="home-panel-note">최근 12개월 운영 기준</p>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section className="home-trust">
        <div className="container">
          <div className="home-trust-strip">
            <span>맞춤형 케이스·함체 설계</span>
            <span>장비 수명과 안정성 중심 제작</span>
            <span>실내·야외 설치 환경 대응</span>
          </div>
        </div>
      </section>

      <section className="section">
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

      <section className="section section-muted">
        <div className="container">
          <div className="home-process-layout">
            <div className="home-section-head">
              <p className="home-kicker">Process</p>
              <h2>상담부터 설계, 제작, 출하까지 흐름이 명확한 제작 파트너</h2>
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

      <section className="section">
        <div className="container">
          <div className="home-section-head">
            <p className="home-kicker">Featured Work</p>
            <h2>현재 제작 품목과 가까운 대표 분야</h2>
          </div>

          <div className="home-project-grid">
            {featuredProjects.map((project) => (
              <article key={project.title} className="home-project-card">
                <img src={project.image} alt={project.title} loading="lazy" />
                <div className="home-project-overlay">
                  <span>{project.category}</span>
                  <h3>{project.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-bottom-cta section">
        <div className="container home-bottom-cta-wrap">
          <div>
            <p className="home-kicker">Start Your Project</p>
            <h2>장비 사양과 설치 환경만 정리되어 있어도 맞춤형 케이스 방향부터 함께 잡아드립니다.</h2>
          </div>
          <Link className="btn btn-primary" to="/support?tab=inquiry">
            상담 시작하기
          </Link>
        </div>
      </section>
    </main>
  );
}
