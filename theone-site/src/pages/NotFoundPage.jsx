import { Link } from "react-router-dom";
import Seo from "../components/Seo";

export default function NotFoundPage() {
  return (
    <main className="not-found-page section">
      <Seo title="페이지를 찾을 수 없습니다" description="요청하신 페이지를 찾을 수 없습니다." robots="noindex,nofollow" />
      <div className="container not-found-content">
        <p className="home-kicker">404 NOT FOUND</p>
        <h1>페이지를 찾을 수 없습니다.</h1>
        <p>주소가 변경되었거나 삭제된 페이지입니다.</p>
        <Link className="btn btn-primary" to="/">홈으로 돌아가기</Link>
      </div>
    </main>
  );
}
