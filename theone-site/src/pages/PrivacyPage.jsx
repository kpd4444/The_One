import Seo from "../components/Seo";

export default function PrivacyPage() {
  return (
    <main className="privacy-page section">
      <Seo title="개인정보처리방침" description="더원산업 고객문의 개인정보 수집 및 이용 안내입니다." path="/privacy" />
      <div className="container legal-content">
        <h1>개인정보처리방침</h1>
        <p>더원산업은 고객문의 처리에 필요한 최소한의 개인정보만 수집·이용합니다.</p>
        <section>
          <h2>수집 항목 및 이용 목적</h2>
          <p>이름, 연락처, 이메일, 문의내용을 수집하며, 견적 상담과 문의 답변을 위해 이용합니다.</p>
        </section>
        <section>
          <h2>보유 및 이용 기간</h2>
          <p>문의 처리 완료 후 1년간 보관한 뒤 지체 없이 파기합니다. 관계 법령에 별도 보존 의무가 있는 경우 해당 기간 동안 보관합니다.</p>
        </section>
        <section>
          <h2>동의 거부 권리</h2>
          <p>개인정보 수집·이용에 동의하지 않을 수 있으나, 필수 정보 수집에 동의하지 않으면 온라인 문의 접수가 제한됩니다.</p>
        </section>
        <section>
          <h2>개인정보 관련 문의</h2>
          <p>대표전화 <a href="tel:0319974020">031-997-4020</a>을 통해 개인정보 관련 요청을 접수할 수 있습니다.</p>
        </section>
        <p className="legal-effective-date">시행일: 2026년 9월 11일</p>
      </div>
    </main>
  );
}
