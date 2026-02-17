import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo.png";

const navItems = [
  {
    label: "회사소개",
    to: "/about",
    links: [
      { label: "인사말", to: "/about#greeting" },
      { label: "회사연혁", to: "/about#history" },
      { label: "조직도", to: "/about#org" },
      { label: "찾아오시는길", to: "/about#location" },
    ],
  },
  {
    label: "제품소개",
    to: "/products",
    links: [
      { label: "제품특성", to: "/products" },
      { label: "적용분야", to: "/products" },
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
      { label: "공지사항", to: "/support#notice" },
      { label: "고객문의", to: "/support#inquiry" },
    ],
  },
];

export default function Header() {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <header className="site-header" onMouseLeave={() => setOpenMenu(null)}>
      <div className="container nav-wrap">
        <Link className="logo" to="/" aria-label="더원산업 홈">
          <img src={logo} alt="T.ONE (주)더원산업" className="logo-img" />
        </Link>

        <nav className="nav-menu" aria-label="메인 메뉴">
          {navItems.map((item) => {
            const hasLinks = item.links.length > 0;

            return (
              <div
                key={item.label}
                className="nav-item"
                onMouseEnter={() => setOpenMenu(hasLinks ? item.label : null)}
                onFocus={() => setOpenMenu(hasLinks ? item.label : null)}
              >
                <NavLink to={item.to} className={({ isActive }) => (isActive ? "active" : "")}>{item.label}</NavLink>

                {hasLinks && (
                  <div className={`nav-submenu ${openMenu === item.label ? "show" : ""}`}>
                    <ul>
                      {item.links.map((link) => (
                        <li key={link.label}>
                          <Link to={link.to}>{link.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <Link className="btn btn-outline" to="/#contact">상담 신청</Link>
      </div>
      {openMenu && <div className="mega-backdrop" onMouseEnter={() => setOpenMenu(null)} />}
    </header>
  );
}
