export default function LocationSection() {
  return (
    <section id="location" className="section section-muted">
      <div className="container">
        <h2>찾아오시는길</h2>
        <p style={{ color: "var(--muted)", marginTop: 8 }}>
          경기도 김포시 대곶면 오니산로 100
        </p>

        <div
          style={{
            marginTop: 16,
            border: "1px dashed var(--line)",
            borderRadius: 16,
            padding: 24,
          }}
        >
          지도 영역(카카오/네이버 지도 자리)
        </div>
      </div>
    </section>
  );
}
