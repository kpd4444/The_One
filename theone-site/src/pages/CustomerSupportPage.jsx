import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Seo from "../components/Seo";
import "../styles/support.css";
import { noticeRows, supportTabs } from "../data/supportData";

const EMPTY_FORM = {
  name: "",
  phone: "",
  email: "",
  message: "",
  website: "",
  privacy: false,
};
const CONTACT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "더원산업 고객센터",
  url: "https://theone412.com/support",
};

export default function CustomerSupportPage() {
  const { pathname, search } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const currentTab = params.get("tab") === "inquiry" ? "inquiry" : "notice";
  const [notices, setNotices] = useState(noticeRows);
  const selectedNotice =
    notices.find((row) => row.id === Number(params.get("notice"))) ?? null;
  const [keyword, setKeyword] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [sending, setSending] = useState(false);
  const [lastSentAt, setLastSentAt] = useState(0);
  const filteredNotices = useMemo(
    () =>
      notices.filter((row) =>
        row.title.toLowerCase().includes(keyword.trim().toLowerCase()),
      ),
    [keyword, notices],
  );
  const update = (field) => (event) =>
    setForm((prev) => ({
      ...prev,
      [field]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    }));

  useEffect(() => {
    const controller = new AbortController();
    fetch("/notices.json", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((rows) => Array.isArray(rows) && setNotices(rows))
      .catch(() => {});
    return () => controller.abort();
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    if (Date.now() - lastSentAt < 60_000) {
      setStatus({
        type: "error",
        message: "문의는 1분 간격으로 전송할 수 있습니다.",
      });
      return;
    }
    setSending(true);
    setStatus({ type: "", message: "" });
    try {
      const result = await fetch(
        "https://formsubmit.co/ajax/theone412@naver.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            _subject: `[더원산업] 고객문의 - ${form.name}`,
            _honey: form.website,
            이름: form.name,
            연락처: form.phone,
            이메일: form.email,
            문의내용: form.message,
          }),
        },
      );
      const data = await result.json().catch(() => ({}));
      if (!result.ok) throw new Error(data.message || "전송에 실패했습니다.");
      setLastSentAt(Date.now());
      setForm(EMPTY_FORM);
      setStatus({
        type: "success",
        message: data.message || "문의가 접수되었습니다.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "전송 중 문제가 발생했습니다.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="about-page section support-page">
      <Seo
        title={
          currentTab === "notice"
            ? `고객센터 - ${selectedNotice?.title || "공지사항"}`
            : "고객센터 - 문의하기"
        }
        description={
          currentTab === "notice"
            ? "더원산업 공지사항과 안내 내용을 확인할 수 있습니다."
            : "더원산업 제품 및 제작 관련 문의를 남길 수 있습니다."
        }
        path="/support"
        structuredData={CONTACT_SCHEMA}
      />
      <div className="container">
        <div className="about-breadcrumb">
          <span>HOME</span>
          <span className="about-crumb-sep">&gt;</span>
          <span>고객센터</span>
          <span className="about-crumb-sep">&gt;</span>
          <strong>{currentTab === "notice" ? "공지사항" : "고객문의"}</strong>
        </div>
        <div className="about-layout">
          <aside className="about-sidebar" aria-label="고객센터 메뉴">
            <h2>고객센터</h2>
            <ul>
              {supportTabs.map((tab) => (
                <li key={tab.id}>
                  <Link
                    to={`${pathname}?tab=${tab.id}`}
                    className={currentTab === tab.id ? "active" : ""}
                  >
                    {tab.label}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
          <section className="about-content support-content">
            {currentTab === "notice" ? (
              <>
                <header className="support-head">
                  <h1>공지사항</h1>
                </header>
                {selectedNotice ? (
                  <article className="support-notice-detail">
                    <header className="support-notice-head">
                      <h2>{selectedNotice.title}</h2>
                      <div>
                        <span>작성자 {selectedNotice.author}</span>
                        <span>작성일 {selectedNotice.date}</span>
                      </div>
                    </header>
                    <div className="support-notice-body">
                      {selectedNotice.content.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                    <div className="support-notice-actions">
                      <Link
                        to={`${pathname}?tab=notice`}
                        className="support-back-link"
                      >
                        목록으로
                      </Link>
                    </div>
                  </article>
                ) : (
                  <>
                    <form
                      className="support-search-box"
                      onSubmit={(event) => event.preventDefault()}
                    >
                      <span className="support-board-count">
                        총 {filteredNotices.length}건
                      </span>
                      <input
                        type="search"
                        placeholder="제목 검색"
                        aria-label="공지사항 제목 검색"
                        value={keyword}
                        onChange={(event) => setKeyword(event.target.value)}
                      />
                      <button type="submit">검색</button>
                    </form>
                    <div
                      className="support-table-wrap"
                      role="table"
                      aria-label="공지사항 목록"
                    >
                      <div className="support-table-head" role="row">
                        <div role="columnheader">번호</div>
                        <div role="columnheader">제목</div>
                        <div role="columnheader">글쓴이</div>
                        <div role="columnheader">날짜</div>
                      </div>
                      {filteredNotices.map((row) => (
                        <div
                          key={row.id}
                          className="support-table-row"
                          role="row"
                        >
                          <div>{row.id}</div>
                          <div>
                            <Link
                              to={`${pathname}?tab=notice&notice=${row.id}`}
                            >
                              {row.title}
                            </Link>
                          </div>
                          <div>{row.author}</div>
                          <div>{row.date}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <header className="support-head">
                  <h1>고객문의</h1>
                  <p>문의 내용을 남겨주시면 확인 후 연락드리겠습니다.</p>
                </header>
                <form className="support-inquiry-form" onSubmit={submit}>
                  <label>
                    이름
                    <input
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={update("name")}
                    />
                  </label>
                  <label>
                    연락처
                    <input
                      required
                      type="tel"
                      inputMode="tel"
                      pattern="[0-9+()\\-\\s]{8,20}"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={update("phone")}
                    />
                  </label>
                  <label>
                    이메일
                    <input
                      required
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={update("email")}
                    />
                  </label>
                  <label>
                    문의내용
                    <textarea
                      required
                      minLength={10}
                      maxLength={2000}
                      rows={7}
                      value={form.message}
                      onChange={update("message")}
                    />
                  </label>
                  <label className="support-honeypot" aria-hidden="true">
                    웹사이트
                    <input
                      tabIndex="-1"
                      autoComplete="off"
                      value={form.website}
                      onChange={update("website")}
                    />
                  </label>
                  <label className="support-privacy-consent">
                    <input
                      required
                      type="checkbox"
                      checked={form.privacy}
                      onChange={update("privacy")}
                    />
                    <span>
                      이름, 연락처, 이메일, 문의내용을 문의 처리 목적으로
                      수집하고 처리 완료 후 1년간 보관하는 데 동의합니다.{" "}
                      <Link to="/privacy">자세히 보기</Link>
                    </span>
                  </label>
                  <button type="submit" disabled={sending || !form.privacy}>
                    {sending ? "전송 중..." : "문의 보내기"}
                  </button>
                  {status.message && (
                    <p
                      className={`support-inquiry-status ${status.type}`}
                      role="status"
                    >
                      {status.message}
                    </p>
                  )}
                </form>
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
