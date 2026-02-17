export default function ContactSection() {
  return (
    <section id="contact" className="section section-contact">
      <div className="container contact-grid">
        <div>
          <p className="tag">Contact</p>
          <h2>프로젝트 문의</h2>
          <p className="hero-desc">
            제작 문의부터 납기/사양 협의까지 빠르게 안내드립니다. 전화 또는 메일로 편하게
            연락주세요.
          </p>

          <div className="contact-list">
            <div>
              <span>대표번호</span>
              <strong>031-997-4020</strong>
            </div>
            <div>
              <span>이메일</span>
              <strong>hello@theone.com</strong>
            </div>
            <div>
              <span>운영시간</span>
              <strong>평일 09:00 - 18:00</strong>
            </div>
          </div>
        </div>

        <form
          className="contact-form"
          onSubmit={(e) => {
            e.preventDefault();
            alert("문의가 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.");
          }}
        >
          <label>
            이름
            <input required type="text" placeholder="홍길동" />
          </label>
          <label>
            연락처
            <input required type="tel" placeholder="010-0000-0000" />
          </label>
          <label>
            이메일
            <input required type="email" placeholder="hello@company.com" />
          </label>
          <label>
            문의 내용
            <textarea required rows={5} placeholder="문의 내용을 입력해주세요." />
          </label>
          <button className="btn btn-primary" type="submit">
            문의 접수하기
          </button>
        </form>
      </div>
    </section>
  );
}
