import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const navItems = [
  {
    label: "회사소개",
    to: "/about",
    subLinks: [
      { label: "인사말", href: "/about#greeting" },
      { label: "회사 연혁", href: "/about#history" },
      { label: "조직도", href: "/about#org" },
      { label: "찾아오시는 길", href: "/about#location" },
    ],
  },
  {
    label: "제품소개",
    to: "/products?tab=feature",
    subLinks: [
      { label: "제품 특성", href: "/products?tab=feature" },
      { label: "적용 분야", href: "/products?tab=apply" },
    ],
  },
  {
    label: "갤러리",
    to: "/gallery",
    subLinks: [],
  },
  {
    label: "고객센터",
    to: "/support?tab=notice",
    subLinks: [
      { label: "공지사항", href: "/support?tab=notice" },
      { label: "고객문의", href: "/support?tab=inquiry" },
    ],
  },
];

export default function SiteHeader() {
  const [openMenu, setOpenMenu] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [panelSection, setPanelSection] = useState(navItems[0].label);
  const closeTimerRef = useRef(null);

  const clearCloseTimer = () => {
    if (!closeTimerRef.current) return;
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  };

  const scheduleCloseMenu = () => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setOpenMenu(null);
    }, 160);
  };

  useEffect(() => {
    if (!isPanelOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsPanelOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isPanelOpen]);

  const activePanelItem = navItems.find((item) => item.label === panelSection) ?? navItems[0];

  return (
    <header className="pg-header">
      <div
        className="pg-nav-hover-area"
        onMouseEnter={clearCloseTimer}
        onMouseLeave={scheduleCloseMenu}
      >
        <div className="container pg-nav-wrap">
          <Link className="pg-logo" to="/" aria-label="더원산업 홈">
            <img src={logo} alt="더원산업 로고" className="pg-logo-img" />
          </Link>

          <nav className="pg-nav-menu" aria-label="메인 메뉴">
            {navItems.map((item) => {
              const hasDropdown = item.subLinks && item.subLinks.length > 0;

              return (
                <div
                  key={item.label}
                  className="pg-nav-item"
                  onMouseEnter={() => {
                    clearCloseTimer();
                    setOpenMenu(item.label);
                  }}
                >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => `pg-nav-main-link ${isActive ? "active" : ""}`}
                  >
                    {item.label}
                  </NavLink>

                  {hasDropdown && openMenu === item.label && (
                    <div
                      className="pg-dropdown"
                      role="menu"
                      aria-label={`${item.label} 메뉴`}
                      onMouseEnter={clearCloseTimer}
                      onMouseLeave={scheduleCloseMenu}
                    >
                      <ul className="pg-dropdown-list">
                        {item.subLinks.map((link) => (
                          <li key={link.label}>
                            <Link
                              to={link.href}
                              className="pg-dropdown-link"
                              onClick={() => setOpenMenu(null)}
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="pg-nav-utils">
            <div className="pg-contact-pill">대표번호 031-997-4020</div>
            <button
              type="button"
              className="pg-menu-btn"
              onClick={() => setIsPanelOpen(true)}
              aria-label="전체 메뉴 열기"
            >
              <span className="pg-menu-btn-icon" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="pg-menu-btn-text">MENU</span>
            </button>
          </div>
        </div>
      </div>

      {isPanelOpen && (
        <div className="pg-panel-overlay" onClick={() => setIsPanelOpen(false)}>
          <section
            className="pg-panel"
            aria-label="전체 메뉴"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="pg-panel-head">
              <button
                type="button"
                className="pg-panel-close"
                onClick={() => setIsPanelOpen(false)}
                aria-label="전체 메뉴 닫기"
              >
                ×
              </button>
            </div>

            <div className="pg-panel-body">
              <aside className="pg-panel-main" aria-label="대메뉴">
                <ul>
                  {navItems.map((item) => (
                    <li key={item.label}>
                      <button
                        type="button"
                        className={`pg-panel-main-btn ${panelSection === item.label ? "active" : ""}`}
                        onClick={() => setPanelSection(item.label)}
                      >
                        <span>{item.label}</span>
                        <span aria-hidden="true">›</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </aside>

              <div className="pg-panel-sub" aria-label="하위 메뉴">
                <h2>{activePanelItem.label}</h2>

                {activePanelItem.subLinks.length > 0 ? (
                  <ul>
                    {activePanelItem.subLinks.map((link) => (
                      <li key={link.label}>
                        <Link to={link.href} onClick={() => setIsPanelOpen(false)}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul>
                    <li>
                      <Link to={activePanelItem.to} onClick={() => setIsPanelOpen(false)}>
                        {activePanelItem.label} 바로가기
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </section>
        </div>
      )}
    </header>
  );
}
