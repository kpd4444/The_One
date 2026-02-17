import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const menus = [
  {
    label: "회사소개",
    to: "/about",
    items: [
      { label: "인사말", to: "/about#greeting" },
      { label: "회사연혁", to: "/about#history" },
      { label: "조직도", to: "/about#org" },
      { label: "찾아오시는길", to: "/about#location" },
    ],
  },
  {
    label: "제품소개",
    to: "/products",
    items: [
      { label: "제품특성", to: "/products" },
      { label: "적용분야", to: "/products" },
    ],
  },
  {
    label: "갤러리",
    to: "/gallery",
    items: [],
  },
  {
    label: "고객센터",
    to: "/support",
    items: [
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
          {menus.map((menu) => {
            const hasDropdown = menu.items.length > 0;
            const isOpen = openMenu === menu.label;

            return (
              <div
                key={menu.label}
                className="nav-item"
                onMouseEnter={() => setOpenMenu(hasDropdown ? menu.label : null)}
                onFocus={() => setOpenMenu(hasDropdown ? menu.label : null)}
              >
                <NavLink to={menu.to} className={({ isActive }) => (isActive ? "active" : "")}>{menu.label}</NavLink>

                {hasDropdown && (
                  <div className={`nav-submenu ${isOpen ? "show" : ""}`}>
                    <ul>
                      {menu.items.map((item) => (
                        <li key={item.label}>
                          <Link to={item.to}>{item.label}</Link>
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
