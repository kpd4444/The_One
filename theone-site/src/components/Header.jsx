import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const navItems = [
  {
    label: "회사소개",
    to: "/about",
    accent: "기업",
    groups: [
      {
        title: "회사 정보",
        links: [
          { label: "인사말", href: "/about#greeting" },
          { label: "회사연혁", href: "/about#history" },
          { label: "조직도", href: "/about#" },
          { label: "찾아오시는 길", href: "/about#location" },
        ],
      },
      {
        title: "고객 안내",
        links: [
          { label: "공지사항", href: "/support#notice" },
          { label: "고객문의", href: "/support#inquiry" },
        ],
      },
    ],
  },
  {
    label: "제품소개",
    to: "/products",
    accent: "주요",
    groups: [
      {
        title: "제품 라인업",
        links: [
          { label: "제품특성", href: "/products" },
          { label: "적용분야", href: "/products" },
          { label: "상담/견적 문의", href: "/support#inquiry" },
        ],
      },
      {
        title: "지원 서비스",
        links: [
          { label: "공지사항 및 자료실", href: "/support#notice" },
          { label: "고객지원 문의", href: "/support#inquiry" },
        ],
      },
    ],
  },
  {
    label: "갤러리",
    to: "/gallery",
    groups: [
      {
        title: "포트폴리오",
        links: [
          { label: "시공 사례 보기", href: "/gallery" },
          { label: "최근 프로젝트", href: "/gallery" },
        ],
      },
    ],
  },
  {
    label: "고객센터",
    to: "/support",
    groups: [
      {
        title: "지원 메뉴",
        links: [
          { label: "공지사항", href: "/support#notice" },
          { label: "고객문의", href: "/support#inquiry" },
        ],
      },
    ],
  },
];

function flattenLinks(groups = []) {
  const out = [];
  for (const g of groups) {
    for (const l of g.links || []) out.push(l);
  }
  return out;
}

export default function ProgrammersHeader() {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <header className="pg-header">
      <div className="container pg-nav-wrap">
        <Link className="pg-logo" to="/" aria-label="더원산업 홈">
          <img src={logo} alt="T.ONE (주)더원산업" className="pg-logo-img" />
        </Link>

        <nav className="pg-nav-menu" aria-label="메인 메뉴">
          {navItems.map((item) => {
            const links = flattenLinks(item.groups);

            return (
              <div
                key={item.label}
                className="pg-nav-item"
                onMouseEnter={() => setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `pg-nav-main-link ${isActive ? "active" : ""}`
                  }
                >
                  {item.label}
                  {item.accent ? (
                    <span className="pg-nav-accent">{item.accent}</span>
                  ) : null}
                </NavLink>

                {/* ✅ 심플 드롭다운 (링크만) */}
                {openMenu === item.label && (
                  <div className="pg-dropdown" role="menu" aria-label={`${item.label} 메뉴`}>
                    <ul className="pg-dropdown-list">
                      {links.map((link) => (
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
          <Link to="/gallery">블로그</Link>
          <Link to="/support">기업 서비스</Link>
          <Link className="pg-login-btn" to="/support#inquiry">
            로그인
          </Link>
        </div>
      </div>
    </header>
  );
}
