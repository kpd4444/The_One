import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Seo from "../components/Seo";
import { noticeRows, supportTabs } from "../data/supportData";

export default function SupportPage() {
  const { pathname, search } = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);
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

  const selectedNotice = useMemo(
    () => noticeRows.find((row) => row.id === noticeId) ?? null,
    [noticeId],
  );

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchKeyword(keywordInput);
  };

  const handleInquiryChange = (field) => (event) => {
    setInquiryForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleInquirySubmit = async (event) => {
    event.preventDefault();
    setIsSending(true);
    setInquiryStatus({ type: "", message: "" });

    try {
      const response = await fetch("https://formsubmit.co/ajax/theone412@naver.com", {
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
        message: "문의가 접수되었습니다.",
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
      <Seo
        title={
          currentTab === "notice"
            ? selectedNotice
              ? `고객센터 - ${selectedNotice.title}`
              : "고객센터 - 공지사항"
            : "고객센터 - 문의하기"
        }
        description={
          currentTab === "notice"
            ? "더원산업 공지사항과 안내 내용을 확인할 수 있는 고객센터 페이지입니다."
            : "더원산업 제품 및 제작 관련 문의를 남길 수 있는 고객센터 페이지입니다."
        }
        path={
          currentTab === "notice" && selectedNotice
            ? `/support?tab=notice&notice=${selectedNotice.id}`
            : `/support?tab=${currentTab}`
        }
        keywords={[
          "더원산업 고객센터",
          currentTab === "notice" ? "공지사항" : "문의하기",
          "제품 문의",
          "견적 문의",
        ]}
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

                <form className="support-inquiry-form" onSubmit={handleInquirySubmit}>
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
