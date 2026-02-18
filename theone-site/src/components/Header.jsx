import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const navItems = [
  {
    label: "회사소개",
    to: "/about",
    subLinks: [
      { label: "인사말", href: "/about#greeting" },
      { label: "회사연혁", href: "/about#history" },
      { label: "조직도", href: "/about#org" },
      { label: "찾아오시는 길", href: "/about#location" },
    ],
  },
  {
    label: "제품소개",
    to: "/products",
    subLinks: [
      { label: "제품특성", href: "/products#feature" },
      { label: "적용분야", href: "/products#apply" },
    ],
  },
  {
    label: "갤러리",
    to: "/gallery",
    subLinks: [],
  },
  {
    label: "고객센터",
    to: "/support",
    subLinks: [
      { label: "공지사항", href: "/support#notice" },
      { label: "고객문의", href: "/support#inquiry" },
    ],
  },
];

export default function Header() {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <header className="pg-header">
      <div className="pg-nav-hover-area" onMouseLeave={() => setOpenMenu(null)}>
        <div className="container pg-nav-wrap">
          <Link className="pg-logo" to="/" aria-label="더원산업 홈">
            <img src={logo} alt="T.ONE (주)더원산업" className="pg-logo-img" />
          </Link>

          <nav className="pg-nav-menu" aria-label="메인 메뉴">
            {navItems.map((item) => {
              const hasDropdown = item.subLinks && item.subLinks.length > 0;

              return (
                <div
                  key={item.label}
                  className="pg-nav-item"
                  onMouseEnter={() => setOpenMenu(item.label)}
                >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `pg-nav-main-link ${isActive ? "active" : ""}`
                    }
                  >
                    {item.label}
                  </NavLink>

                  {hasDropdown && openMenu === item.label && (
                    <div className="pg-dropdown" role="menu" aria-label={`${item.label} 메뉴`}>
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
            <Link to="/gallery">블로그</Link>
            <Link to="/support">기업 서비스</Link>
            <Link className="pg-login-btn" to="/support#inquiry">
              로그인
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
