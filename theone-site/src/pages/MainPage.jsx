const metrics = [
  { label: "연간 프로젝트", value: "210+" },
  { label: "납기 준수율", value: "98.2%" },
  { label: "재구매율", value: "84%" },
];

const capabilities = [
  {
    title: "정밀 판금 가공",
    desc: "레이저 가공, 절곡, 용접을 통합 운영해 품질 편차를 안정적으로 관리합니다.",
  },
  {
    title: "장비 하우징 설계",
    desc: "열, 분진, 유지보수 동선을 고려한 구조 설계로 현장 적합성을 높입니다.",
  },
  {
    title: "시제품부터 양산",
    desc: "파일럿 검증부터 양산 이관까지 안정적인 생산 전환을 지원합니다.",
  },
];

const projects = [
  {
    title: "스마트 물류 제어함 케이스",
    image:
      "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1400&q=80",
    badge: "물류",
  },
  {
    title: "산업용 카메라 케이스",
    image:
      "https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?auto=format&fit=crop&w=1400&q=80",
    badge: "정밀",
  },
  {
    title: "배터리 라인 안전 커버",
    image:
      "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=1400&q=80",
    badge: "생산",
  },
];

export default function MainPage() {
  return (
    <main>
      <section className="home-hero">
        <div className="container">
          <div className="home-hero-grid">
            <div className="home-hero-copy">
              <p className="home-kicker">더원산업</p>
              <h1>정밀 제조 파트너, 품질과 납기를 기준으로 대응합니다.</h1>
              <p>
                더원산업은 산업 장비용 케이스 및 함체를 설계 의도에 맞춰 제작하며,
                시제품부터 양산까지 일관된 품질로 제공합니다.
              </p>
              <div className="home-hero-cta">
                <a className="btn btn-primary" href="/products">
                  제품 보기
                </a>
                <a className="btn btn-outline" href="/support#inquiry">
                  견적 문의
                </a>
              </div>
            </div>

            <aside className="home-hero-panel" aria-label="Core metrics">
              <h2>운영 지표</h2>
              <div className="home-metric-list">
                {metrics.map((item) => (
                  <div key={item.label} className="home-metric-item">
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
              <p className="home-panel-note">최근 12개월 기준</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="home-trust">
        <div className="container">
          <div className="home-trust-strip">
            <span>ISO 9001 품질 시스템</span>
            <span>설계-제작 통합 대응</span>
            <span>출하 전 리스크 점검 프로세스</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="home-section-head">
            <p className="home-kicker">핵심 역량</p>
            <h2>기획부터 제작까지 연결된 제조 역량</h2>
          </div>
          <div className="home-capability-grid">
            {capabilities.map((item) => (
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
          <div className="home-section-head">
            <p className="home-kicker">프로젝트</p>
            <h2>최근 수행 사례</h2>
          </div>
          <div className="home-project-grid">
            {projects.map((project) => (
              <article key={project.title} className="home-project-card">
                <img src={project.image} alt={project.title} loading="lazy" />
                <div className="home-project-overlay">
                  <span>{project.badge}</span>
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
            <p className="home-kicker">프로젝트 시작</p>
            <h2>요구사항 정리가 먼저여도 괜찮습니다. 초기 검토부터 함께합니다.</h2>
          </div>
          <a className="btn btn-primary" href="/support#inquiry">
            상담 시작하기
          </a>
        </div>
      </section>
    </main>
  );
}
