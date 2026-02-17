import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo.png";

const navItems = [
  {
    label: "회사소개",
    to: "/about",
    preview: {
      title: "더원산업 소개",
      desc: "인사말, 연혁, 조직도, 오시는 길까지 회사의 핵심 정보를 확인하세요.",
      cta: "회사소개 바로가기",
    },
    groups: [
      {
        title: "회사 정보",
        links: [
          { label: "인사말", href: "/about#greeting" },
          { label: "회사연혁", href: "/about#history" },
          { label: "조직도", href: "/about" },
          { label: "찾아오시는 길", href: "/about#location" },
        ],
      },
    ],
  },
  {
    label: "제품소개",
    to: "/products",
    preview: {
      title: "산업 현장 맞춤 제품",
      desc: "현장에 최적화된 설계·제작·설치까지 One-stop으로 제공합니다.",
      cta: "제품소개 바로가기",
    },
    groups: [
      {
        title: "제품 안내",
        links: [
          { label: "제품특성", href: "/products" },
          { label: "적용분야", href: "/products" },
          { label: "상담/견적 문의", href: "/support#inquiry" },
        ],
      },
    ],
  },
  {
    label: "갤러리",
    to: "/gallery",
    preview: {
      title: "프로젝트 갤러리",
      desc: "더원산업이 수행한 다양한 현장 시공과 완성 사례를 확인해보세요.",
      cta: "갤러리 바로가기",
    },
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
    preview: {
      title: "고객 지원",
      desc: "공지사항과 문의 접수로 빠르고 정확한 지원을 제공합니다.",
      cta: "고객센터 바로가기",
    },
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

export default function Header() {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <header className={`site-header ${openMenu ? "menu-open" : ""}`}>
      <div className="container nav-wrap">
        <Link className="logo" to="/" aria-label="더원산업 홈">
          <img src={logo} alt="T.ONE (주)더원산업" className="logo-img" />
        </Link>

        <nav className="nav-menu" onMouseLeave={() => setOpenMenu(null)}>
          {navItems.map((item) => (
            <div
              className="nav-item"
              key={item.label}
              onMouseEnter={() => setOpenMenu(item.label)}
              onFocus={() => setOpenMenu(item.label)}
            >
              <NavLink to={item.to} className={({ isActive }) => (isActive ? "active" : "")}>
                {item.label}
              </NavLink>
              <div className={`mega-menu ${openMenu === item.label ? "show" : ""}`}>
                <div className="mega-grid">
                  {item.groups.map((group) => (
                    <div key={group.title} className="mega-group">
                      <h4>{group.title}</h4>
                      <ul>
                        {group.links.map((link) => (
                          <li key={link.label}>
                            <Link to={link.href}>{link.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  <article className="mega-preview">
                    <strong>{item.preview.title}</strong>
                    <p>{item.preview.desc}</p>
                    <Link to={item.to}>{item.preview.cta} ›</Link>
                  </article>
                </div>
              </div>
            </div>
          ))}
        </nav>

        <Link className="btn btn-outline" to="/#contact">상담 신청</Link>
      </div>
      {openMenu && <div className="mega-backdrop" onMouseEnter={() => setOpenMenu(null)} />}
    </header>
  );
}
