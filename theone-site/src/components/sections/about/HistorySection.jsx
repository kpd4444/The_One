const history = [
  {
    date: "2018.04",
    title: "주식회사 더원산업 설립",
    description: "법인 설립 및 정밀 케이스/함체 제조 사업 시작",
  },
  {
    date: "2019.04",
    title: "벤처기업 등록",
    description: "기술 기반 제조 역량을 인정받아 벤처기업 등록",
  },
  {
    date: "2022.05",
    title: "공장 공간 확장 및 정밀 가공기계 설비 도입",
    description: "생산 대응력 강화를 위한 설비 증설 및 공정 확장",
  },
  {
    date: "2023.02",
    title: "전문기업 인증 취득",
    description: "대외 인증 체계 기반의 신뢰도 강화",
  },
  {
    date: "2023.03",
    title: "연구개발부서 설립",
    description: "지속 개선을 위한 R&D 기능 강화",
    details: ["특허 출원 1건 진행", "특허 출원 2건 진행", "특허 출원 3건 진행"],
  },
  {
    date: "2023.04",
    title: "벤처기업 등록 갱신",
    description: "기술/품질 고도화 기반으로 벤처기업 자격 유지",
  },
  {
    date: "2023.05",
    title: "ISO 9001 인증 / 경영혁신형 중소기업 인증(메인비즈)",
    description: "품질경영과 혁신 역량을 동시에 인증",
  },
  {
    date: "2023.08",
    title: "창고 이전",
    description: "경기도 김포시 대곶면 상마신기로 100",
  },
  {
    date: "2024.12",
    title: "본사 이전",
    description: "경기도 김포시 대곶면 오니산로 100",
  },
];

function groupByYear(items) {
  const sorted = [...items].sort((a, b) => b.date.localeCompare(a.date));
  const grouped = sorted.reduce((acc, item) => {
    const [year, month] = item.date.split(".");
    const found = acc.find((entry) => entry.year === year);
    const event = { ...item, month };

    if (found) {
      found.events.push(event);
      return acc;
    }

    return [...acc, { year, events: [event] }];
  }, []);

  return grouped;
}

export default function HistorySection() {
  const groupedHistory = groupByYear(history);

  return (
    <section id="history" className="section section-muted">
      <div className="container">
        <div className="history-v2" role="list" aria-label="회사 연혁 타임라인">
          <div className="history-badge-small">HISTORY</div>

          {groupedHistory.map(({ year, events }) => (
            <section key={year} className="history-year-section" aria-label={`${year}년 연혁`}>
              <header className="history-year-divider">
                <span>{year}</span>
              </header>

              <div className="history-year-events">
                {events.map((event, index) => {
                  const sideClass = index % 2 === 0 ? "right" : "left";
                  const majorClass = index === 0 ? "is-major" : "";

                  return (
                    <article
                      key={`${event.date}-${event.title}`}
                      role="listitem"
                      className={`history-event ${sideClass} ${majorClass}`.trim()}
                    >
                      <span className="history-dot" aria-hidden="true" />

                      <div className="history-card">
                        <div className="history-card-top">
                          <span className="history-month-badge">{event.month}월</span>
                        </div>

                        <h3>{event.title}</h3>

                        {event.description && <p className="history-description">{event.description}</p>}

                        {event.details && event.details.length > 0 && (
                          <details className="history-more">
                            <summary>상세 보기</summary>
                            <ul className="history-detail-list">
                              {event.details.map((detail) => (
                                <li key={detail}>{detail}</li>
                              ))}
                            </ul>
                          </details>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
