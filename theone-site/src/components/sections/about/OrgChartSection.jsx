export default function OrgChartSection() {
  return (
    <section className="section">
      <div className="container">
        <h2>조직도</h2>
        <p style={{ color: "var(--muted)", marginTop: 8 }}>
          더원산업의 조직 구성입니다.
        </p>

        <div className="org">
          {/* 대표이사 */}
          <div className="org-row org-row-center">
            <div className="org-box ceo">대표이사</div>
          </div>

          {/* 대표이사 -> 총괄이사 (세로선) */}
          <div className="org-line-v" />

          {/* 총괄이사 */}
          <div className="org-row org-row-center">
            <div className="org-box exec">총괄이사</div>
          </div>

          {/* 총괄이사 아래 연결: 개발팀(오른쪽) + 아래로 내려가는 선 */}
          <div className="org-branch">
            <div className="org-branch-top">
              <div className="org-stem" />
              <div className="org-arm" />
              <div className="org-box dev">개발팀</div>
            </div>

            {/* 아래 3팀으로 내려가는 줄 + 가로줄 */}
            <div className="org-branch-mid">
              <div className="org-stem" />
              <div className="org-bar" />
            </div>

            {/* 하위 3팀 */}
            <div className="org-teams">
              <div className="org-team">
                <div className="org-drop" />
                <div className="org-box team">
                  <strong>지 원 팀</strong>
                  <span>경리/인사/총무/자재/구매</span>
                </div>
              </div>

              <div className="org-team">
                <div className="org-drop" />
                <div className="org-box team">
                  <strong>설계팀</strong>
                  <span>영업관리</span>
                </div>
              </div>

              <div className="org-team">
                <div className="org-drop" />
                <div className="org-box team">
                  <strong>생 산 팀</strong>
                  <span>생산/가공/조립/품질</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
