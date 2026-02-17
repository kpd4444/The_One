export default function ServicesSection() {
  return (
    <section id="services" className="section">
      <div className="container">
        <div className="section-head">
          <p className="tag">Services</p>
          <h2>필요한 만큼, 정확하게</h2>
        </div>

        <div className="card-grid">
          <article className="feature-card">
            <h3>웹사이트 구축</h3>
            <p>브랜드 목적에 맞춘 반응형 기업 홈페이지/랜딩 페이지를 설계하고 제작합니다.</p>
          </article>

          <article className="feature-card">
            <h3>운영 자동화</h3>
            <p>반복 업무를 자동화하여 운영 효율을 높이고, 팀의 실행 속도를 끌어올립니다.</p>
          </article>

          <article className="feature-card">
            <h3>데이터 기반 개선</h3>
            <p>트래픽과 전환 데이터를 바탕으로 우선순위를 정해 지속 개선 사이클을 운영합니다.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
