import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const menuItems = [
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

export default function CompanyHeader() {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <header className="ch-header" onMouseLeave={() => setOpenMenu(null)}>
      <div className="container ch-nav-wrap">
        <Link className="ch-logo" to="/" aria-label="더원산업 홈">
          <img src={logo} alt="T.ONE (주)더원산업" className="ch-logo-img" />
        </Link>

        <nav className="ch-nav-menu" aria-label="메인 메뉴">
          {menuItems.map((item) => {
            const hasLinks = item.links.length > 0;
            return (
              <div
                key={item.label}
                className="ch-nav-item"
                onMouseEnter={() => setOpenMenu(hasLinks ? item.label : null)}
                onFocus={() => setOpenMenu(hasLinks ? item.label : null)}
              >
                <NavLink to={item.to} className={({ isActive }) => (isActive ? "active" : "")}>{item.label}</NavLink>

                {hasLinks && (
                  <div className={`ch-submenu ${openMenu === item.label ? "show" : ""}`}>
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
    </header>
  );
}
