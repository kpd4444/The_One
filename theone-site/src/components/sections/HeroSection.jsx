export default function HeroSection() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <p className="tag">Brand-First Digital Partner</p>
          <h1>
            고객의 성장에 집중하는
            <br />
            디지털 솔루션 회사
          </h1>
          <p className="hero-desc">
            빠르게 만들고, 정확히 개선하고, 꾸준히 성장시키는 웹/앱 구축 파트너입니다.
            깔끔한 제품 경험과 실무 중심 실행력으로 결과를 만듭니다.
          </p>

          <div className="cta-group">
            <a className="btn btn-primary" href="#contact">
              프로젝트 상담하기
            </a>
            <a className="btn btn-ghost" href="#services">
              서비스 보기
            </a>
          </div>
        </div>

        <div className="hero-card" aria-label="서비스 개요 카드">
          <h2>이번 달 핵심 지표</h2>
          <ul>
            <li>
              <span>신규 프로젝트</span>
              <strong>12건</strong>
            </li>
            <li>
              <span>평균 납기 준수율</span>
              <strong>98.7%</strong>
            </li>
            <li>
              <span>재계약 비율</span>
              <strong>84%</strong>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
