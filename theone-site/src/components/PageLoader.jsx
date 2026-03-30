export default function PageLoader({ label = "페이지를 불러오는 중입니다." }) {
  return (
    <div className="page-loading" role="status" aria-live="polite">
      <div className="page-loading-shell">
        <div className="page-loading-mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="page-loading-kicker">THE ONE INDUSTRY</p>
        <strong>{label}</strong>
      </div>
    </div>
  );
}
