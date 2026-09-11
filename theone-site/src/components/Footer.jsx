import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-wrap">
        <div className="footer-brand">
          <strong>더원산업</strong>
          <p>
            각종 장비 보조 케이스와 함체를 맞춤 설계 및 제작하며, 장비의
            보호성과 운용 효율을 함께 고려하는 제조 파트너입니다.
          </p>
        </div>

        <div className="footer-info">
          <div>
            <span>회사</span>
            <strong>더원산업 · 대표이사 조성록</strong>
          </div>
          <div>
            <span>주소</span>
            <strong>경기도 김포시 대곶면 오니산로 100</strong>
          </div>
          <div>
            <span>연락처</span>
            <strong>
              <a href="tel:0319974020">TEL 031-997-4020</a> / FAX 031-997-1025
            </strong>
          </div>
        </div>

        <div className="footer-meta">
          <span>THE ONE INDUSTRY</span>
          <Link to="/privacy">개인정보처리방침</Link>
          <strong>© 2026 All rights reserved.</strong>
        </div>
      </div>
    </footer>
  );
}
