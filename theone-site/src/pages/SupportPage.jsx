import NoticeSection from "../components/sections/support/NoticeSection";
import InquirySection from "../components/sections/support/InquirySection";

export default function SupportPage() {
  return (
    <main>
      {/* 서브 네비 */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              padding: 12,
              border: "1px solid var(--line)",
              borderRadius: 999,
              background: "var(--surface)",
              width: "fit-content",
            }}
          >
            <a className="btn btn-ghost" href="#notice">공지사항</a>
            <a className="btn btn-ghost" href="#inquiry">고객문의</a>
          </div>
        </div>
      </section>

      <NoticeSection />
      <InquirySection />
    </main>
  );
}
