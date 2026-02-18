import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const noticeRows = [
  {
    id: 1,
    title: "2026년 새해 복 많이 받으세요.",
    author: "관리자",
    date: "2026-01-02",
    views: 128,
    content: [
      "안녕하십니까. 더원산업입니다.",
      "지난 한 해 동안 보내주신 신뢰와 성원에 진심으로 감사드립니다. 고객사 여러분의 관심과 협력 덕분에 당사는 안정적인 품질과 납기 대응을 바탕으로 한 단계 더 성장할 수 있었습니다.",
      "다가오는 설 명절에는 가족, 동료와 함께 따뜻하고 평안한 시간 보내시길 바랍니다. 연휴 기간 동안 쌓인 피로는 충분히 쉬시고, 새해에는 하시는 모든 일에 건강과 행복이 늘 함께하시기를 기원합니다.",
      "더원산업은 앞으로도 책임 있는 자세로 고객의 요구에 성실히 대응하고, 더 나은 제품과 서비스로 보답하겠습니다. 새해에도 변함없는 관심과 격려 부탁드립니다.",
      "감사합니다.",
    ],
  },
];

const tabs = [
  { id: "notice", label: "공지사항" },
  { id: "inquiry", label: "고객문의" },
];

export default function SupportPage() {
  const { pathname, search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const currentTab = searchParams.get("tab") === "inquiry" ? "inquiry" : "notice";
  const noticeId = Number(searchParams.get("notice") || 0);

  const [keywordInput, setKeywordInput] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [inquiryStatus, setInquiryStatus] = useState({ type: "", message: "" });
  const [isSending, setIsSending] = useState(false);

  const filteredNoticeRows = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();
    if (!keyword) return noticeRows;
    return noticeRows.filter((row) => row.title.toLowerCase().includes(keyword));
  }, [searchKeyword]);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchKeyword(keywordInput);
  };

  const selectedNotice = useMemo(
    () => noticeRows.find((row) => row.id === noticeId) ?? null,
    [noticeId]
  );

  const handleInquiryChange = (field) => (event) => {
    setInquiryForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleInquirySubmit = async (event) => {
    event.preventDefault();
    setIsSending(true);
    setInquiryStatus({ type: "", message: "" });

    try {
      const response = await fetch("https://formsubmit.co/ajax/kpd4444@naver.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `[더원산업] 고객문의 - ${inquiryForm.name}`,
          이름: inquiryForm.name,
          연락처: inquiryForm.phone,
          이메일: inquiryForm.email,
          문의내용: inquiryForm.message,
        }),
      });

      if (!response.ok) {
        throw new Error("메일 전송에 실패했습니다.");
      }

      setInquiryStatus({
        type: "success",
        message:
          "문의가 접수되었습니다.",
      });
      setInquiryForm({ name: "", phone: "", email: "", message: "" });
    } catch {
      setInquiryStatus({
        type: "error",
        message: "전송 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="about-page section support-page">
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
              {tabs.map((tab) => (
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
                        <span>조회 {selectedNotice.views}</span>
                      </div>
                    </header>

                    <div className="support-notice-body">
                      {selectedNotice.content.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>

                    <div className="support-notice-actions">
                      <Link to={`${pathname}?tab=notice`} className="support-back-link">
                        목록으로
                      </Link>
                    </div>
                  </article>
                ) : (
                  <>
                    <div className="support-board-top">Total {filteredNoticeRows.length}건 1 페이지</div>

                    <div className="support-table-wrap" role="table" aria-label="공지사항 목록">
                      <div className="support-table-head" role="rowgroup">
                        <div role="columnheader">번호</div>
                        <div role="columnheader">제목</div>
                        <div role="columnheader">글쓴이</div>
                        <div role="columnheader">날짜</div>
                        <div role="columnheader">조회</div>
                      </div>

                      {filteredNoticeRows.map((row) => (
                        <div key={row.id} className="support-table-row" role="row">
                          <div>{row.id}</div>
                          <div>
                            <Link to={`${pathname}?tab=notice&notice=${row.id}`}>{row.title}</Link>
                          </div>
                          <div>{row.author}</div>
                          <div>{row.date}</div>
                          <div>{row.views}</div>
                        </div>
                      ))}

                      {filteredNoticeRows.length === 0 && (
                        <div className="support-empty">검색 결과가 없습니다.</div>
                      )}
                    </div>

                    <form className="support-search-box" onSubmit={handleSearch}>
                      <select aria-label="검색 분류">
                        <option>제목</option>
                      </select>
                      <input
                        placeholder="검색어"
                        aria-label="검색어"
                        value={keywordInput}
                        onChange={(event) => setKeywordInput(event.target.value)}
                      />
                      <button type="submit">검색</button>
                    </form>
                  </>
                )}
              </>
            ) : (
              <>
                <header className="support-head">
                  <h1>고객문의</h1>
                  <p>문의 내용을 남겨주시면 확인 후 빠르게 연락드리겠습니다.</p>
                </header>

                <form
                  className="support-inquiry-form"
                  onSubmit={handleInquirySubmit}
                >
                  <label>
                    이름
                    <input
                      required
                      placeholder="이름을 입력하세요"
                      value={inquiryForm.name}
                      onChange={handleInquiryChange("name")}
                    />
                  </label>
                  <label>
                    연락처
                    <input
                      required
                      placeholder="연락처를 입력하세요"
                      value={inquiryForm.phone}
                      onChange={handleInquiryChange("phone")}
                    />
                  </label>
                  <label>
                    이메일
                    <input
                      required
                      type="email"
                      placeholder="이메일을 입력하세요"
                      value={inquiryForm.email}
                      onChange={handleInquiryChange("email")}
                    />
                  </label>
                  <label>
                    문의내용
                    <textarea
                      required
                      rows={7}
                      placeholder="문의 내용을 입력하세요"
                      value={inquiryForm.message}
                      onChange={handleInquiryChange("message")}
                    />
                  </label>
                  <button type="submit" disabled={isSending}>
                    {isSending ? "전송 중..." : "문의 보내기"}
                  </button>

                  {inquiryStatus.message && (
                    <p className={`support-inquiry-status ${inquiryStatus.type}`}>
                      {inquiryStatus.message}
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
