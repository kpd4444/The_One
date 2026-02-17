const features = [
  {
    title: "내구성 중심 설계",
    desc: "현장 환경을 고려한 구조 설계로 장기간 안정적으로 사용 가능합니다.",
  },
  {
    title: "맞춤 제작/설치",
    desc: "용도와 공간에 맞춰 규격·사양을 커스터마이징하여 적용합니다.",
  },
  {
    title: "안전/품질 기준 준수",
    desc: "공정별 체크리스트로 품질을 관리하고 납기·안정성을 확보합니다.",
  },
];

const fields = [
  "제조 라인",
  "물류/창고",
  "설비/배관",
  "현장 시공",
  "산업 플랜트",
  "유지보수",
];

export default function ProductsPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <h1>제품소개</h1>
          <p style={{ color: "var(--muted)", marginTop: 8, maxWidth: 820 }}>
            (주)더원산업은 현장 요구에 맞춘 제품을 제작·설치합니다.
            제품 특성과 적용 분야를 확인해보세요.
          </p>

          <div className="product-hero" style={{ marginTop: 18 }}>
            <div>
              <div className="tag">Product</div>
              <h2 style={{ margin: 0 }}>제품특성</h2>
              <p style={{ color: "var(--muted)", marginTop: 10 }}>
                목적에 맞는 설계 → 제작 → 설치까지 한 번에 진행합니다.
              </p>
            </div>
            <div className="product-hero-box">
              <div style={{ fontWeight: 800 }}>상담/견적</div>
              <div style={{ color: "var(--muted)", marginTop: 6 }}>
                전화 또는 이메일로 문의주시면 빠르게 안내드립니다.
              </div>
              <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <a className="btn btn-primary" href="mailto:hello@theone.com">이메일 문의</a>
                <a className="btn btn-outline" href="/support#inquiry">문의 폼</a>
              </div>
            </div>
          </div>

          <div className="card-grid" style={{ marginTop: 22 }}>
            {features.map((f) => (
              <article key={f.title} className="feature-card">
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <h2>적용분야</h2>
          <p style={{ color: "var(--muted)", marginTop: 8 }}>
            아래 분야에서 다양한 프로젝트 경험을 보유하고 있습니다.
          </p>

          <div className="field-grid" style={{ marginTop: 16 }}>
            {fields.map((name) => (
              <div key={name} className="field-pill">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
