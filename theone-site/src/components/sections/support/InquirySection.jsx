export default function InquirySection() {
  return (
    <section id="inquiry" className="section section-muted">
      <div className="container">
        <h2>고객문의</h2>
        <p style={{ color: "var(--muted)", marginTop: 8 }}>
          문의 내용을 남겨주시면 확인 후 연락드리겠습니다.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("문의가 접수되었습니다! (임시)");
          }}
          style={{
            marginTop: 16,
            display: "grid",
            gap: 12,
            maxWidth: 720,
          }}
        >
          <input
            required
            placeholder="이름"
            style={inputStyle}
          />
          <input
            required
            placeholder="연락처"
            style={inputStyle}
          />
          <input
            required
            type="email"
            placeholder="이메일"
            style={inputStyle}
          />
          <textarea
            required
            placeholder="문의 내용"
            rows={6}
            style={{ ...inputStyle, resize: "vertical" }}
          />
          <button className="btn btn-primary" type="submit" style={{ width: "fit-content" }}>
            문의 보내기
          </button>
        </form>
      </div>
    </section>
  );
}

const inputStyle = {
  padding: "12px 14px",
  borderRadius: 12,
  border: "1px solid var(--line)",
  background: "white",
  outline: "none",
};
