export default function OrgChartSection() {
  return (
    <section id="org" className="section">
      <div className="container">
        <div className="org-modern">
          <header className="org-modern-head">
            <p>ORGANIZATION</p>
            <h3>책임과 전문성을 기반으로 협업하는 조직 구조</h3>
          </header>

          <div className="org-ceo-card">
            <span className="org-role">대표이사</span>
            <strong>조성록</strong>
          </div>

          <div className="org-link-line" aria-hidden="true" />

          <div className="org-core-grid">
            <article className="org-card core">
              <h4>경영지원실</h4>
              <p>재무, 인사, 총무, 구매</p>
            </article>
            <article className="org-card core">
              <h4>기술·개발팀</h4>
              <p>도면 검토, 공정 설계, 기술 개선</p>
            </article>
          </div>

          <div className="org-team-grid">
            <article className="org-card team">
              <h4>생산팀</h4>
              <ul>
                <li>가공</li>
                <li>조립</li>
                <li>설비 운영</li>
              </ul>
            </article>

            <article className="org-card team">
              <h4>품질관리팀</h4>
              <ul>
                <li>공정 품질 점검</li>
                <li>출하 검사</li>
                <li>품질 개선 관리</li>
              </ul>
            </article>

            <article className="org-card team">
              <h4>영업·고객지원</h4>
              <ul>
                <li>견적 및 일정 협의</li>
                <li>프로젝트 커뮤니케이션</li>
                <li>납품 후 고객 대응</li>
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
