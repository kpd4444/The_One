const notices = [
  { id: 1, title: "홈페이지 리뉴얼 안내", date: "2026-02-17" },
  { id: 2, title: "설 연휴 휴무 공지", date: "2026-02-05" },
  { id: 3, title: "제품 카탈로그 업데이트", date: "2026-01-20" },
];

export default function NoticeSection() {
  return (
    <section id="notice" className="section">
      <div className="container">
        <h1>고객센터</h1>
        <h2 style={{ marginTop: 24 }}>공지사항</h2>

        <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
          {notices.map((n) => (
            <div
              key={n.id}
              style={{
                border: "1px solid var(--line)",
                background: "var(--surface)",
                borderRadius: 16,
                padding: 16,
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <span style={{ fontWeight: 700 }}>{n.title}</span>
              <span style={{ color: "var(--muted)" }}>{n.date}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
