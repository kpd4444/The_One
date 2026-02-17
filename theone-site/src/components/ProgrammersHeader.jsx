import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const navItems = [
  {
    label: "회사소개",
    to: "/about",
    accent: "기업",
    links: [
      { label: "인사말", href: "/about#greeting" },
      { label: "회사연혁", href: "/about#history" },
      { label: "조직도", href: "/about#org" },
      { label: "찾아오시는 길", href: "/about#location" },
    ],
  },
  {
    label: "제품소개",
    to: "/products",
    accent: "주요",
    links: [
      { label: "제품특성 및 적용분야", href: "/products" },
      { label: "상담/견적 문의", href: "/support#inquiry" },
    ],
  },
  {
    label: "갤러리",
    to: "/gallery",
    links: [],
  },
  {
    label: "고객센터",
    to: "/support",
    links: [
      { label: "공지사항", href: "/support#notice" },
      { label: "고객문의", href: "/support#inquiry" },
    ],
  },
];

function resolveLinks(item) {
  if (Array.isArray(item.links)) return item.links;
  if (!Array.isArray(item.groups)) return [];

  return item.groups.flatMap((group) => Array.isArray(group.links) ? group.links : []);
}

export default function ProgrammersHeader() {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <header className="pg-header" onMouseLeave={() => setOpenMenu(null)}>
      <div className="container pg-nav-wrap">
        <Link className="pg-logo" to="/" aria-label="더원산업 홈">
          <img src={logo} alt="T.ONE (주)더원산업" className="pg-logo-img" />
        </Link>

        <nav className="pg-nav-menu" aria-label="메인 메뉴">
          {navItems.map((item) => {
            const menuLinks = resolveLinks(item);
            const hasLinks = menuLinks.length > 0;

            return (
              <div
                key={item.label}
                className="pg-nav-item"
                onMouseEnter={() => setOpenMenu(hasLinks ? item.label : null)}
                onFocus={() => setOpenMenu(hasLinks ? item.label : null)}
              >
                <NavLink to={item.to} className={({ isActive }) => `pg-nav-main-link ${isActive ? "active" : ""}`}>
                  {item.label}
                  {item.accent ? <span className="pg-nav-accent">{item.accent}</span> : null}
                </NavLink>

                {hasLinks && (
                  <div className={`pg-submenu ${openMenu === item.label ? "show" : ""}`}>
                    <ul>
                      {menuLinks.map((link) => (
                        <li key={link.label}>
                          <Link to={link.href} className="pg-submenu-link">
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
          <Link className="pg-login-btn" to="/support#inquiry">로그인</Link>
        </div>
      </div>
    </header>
  );
}
