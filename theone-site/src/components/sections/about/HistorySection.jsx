const history = [
  { date: "2018.04", title: "주식회사 더원산업 설립" },
  { date: "2019.04", title: "벤처기업 등록" },
  { date: "2022.05", title: "공장 공간 확장 및 정밀기계 설비 도입" },
  { date: "2023.02", title: "소재·부품·장비 전문기업 인증" },
  {
    date: "2023.03",
    title: "연구개발부서 설립",
    details: [
      "특허출원 1: 통신함체 냉각 인입출부의 외부 이물질 차폐 필터 장치",
      "특허출원 2: 광섬유 설치부를 갖는 통신 단자함",
      "특허출원 3: 통신함체 냉각 인입출부의 외부 이물질 차폐필터 장치",
    ],
  },
  { date: "2023.04", title: "벤처기업 등록 갱신" },
  {
    date: "2023.05",
    title: "ISO 9001 인증 / 경영혁신형 중소기업 인증(메인비즈)",
  },
  { date: "2023.08", title: "지점 설치(창고) - 경기 김포 대곶 오니산로 100" },
  {
    date: "2024.12",
    title: "인천 서구 왕길동(임차) → 경기 김포시 대곶면 오니산로 100(자가) 이전",
  },
];

export default function HistorySection() {
  return (
    <section id="history" className="section section-muted">
      <div className="container">
        <h2>회사연혁</h2>
        <p style={{ color: "var(--muted)", marginTop: 8 }}>
          더원산업의 성장 과정과 주요 이력을 소개합니다.
        </p>

        <div className="timeline">
          {history.map((item) => (
            <div className="timeline-item" key={`${item.date}-${item.title}`}>
              <div className="timeline-date">{item.date}</div>

              <div className="timeline-content">
                <div className="timeline-title">{item.title}</div>

                {item.details && (
                  <ul className="timeline-list">
                    {item.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}