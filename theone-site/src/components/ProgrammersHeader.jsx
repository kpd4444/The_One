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
          { label: "조직도", href: "/about" },
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
    promo: {
      title: "더원산업 기업 소개",
      desc: "회사 비전, 연혁, 조직, 위치 정보를 한눈에 확인해보세요.",
      cta: "회사소개 자세히 보기",
      href: "/about",
    },
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
    promo: {
      title: "현장 맞춤형 제품 솔루션",
      desc: "설계부터 제작·설치·유지보수까지 원스톱으로 제공합니다.",
      cta: "제품소개 자세히 보기",
      href: "/products",
    },
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
    promo: {
      title: "프로젝트 아카이브",
      desc: "더원산업이 수행한 다양한 현장 사례를 이미지로 확인해보세요.",
      cta: "갤러리 이동",
      href: "/gallery",
    },
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
    promo: {
      title: "빠른 고객 지원",
      desc: "문의 접수 후 담당자가 순차적으로 빠르게 회신드립니다.",
      cta: "고객센터 바로가기",
      href: "/support",
    },
  },
];

export default function ProgrammersHeader() {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <header className="pg-header" onMouseLeave={() => setOpenMenu(null)}>
      <div className="container pg-nav-wrap">
        <Link className="pg-logo" to="/" aria-label="더원산업 홈">
          <img src={logo} alt="T.ONE (주)더원산업" className="pg-logo-img" />
        </Link>

        <nav className="pg-nav-menu" aria-label="메인 메뉴">
          {navItems.map((item) => (
            <div key={item.label} className="pg-nav-item" onMouseEnter={() => setOpenMenu(item.label)}>
              <NavLink to={item.to} className={({ isActive }) => `pg-nav-main-link ${isActive ? "active" : ""}`}>
                {item.label}
                {item.accent ? <span className="pg-nav-accent">{item.accent}</span> : null}
              </NavLink>
            </div>
          ))}
        </nav>

        <div className="pg-nav-utils">
          <Link to="/gallery">블로그</Link>
          <Link to="/support">기업 서비스</Link>
          <Link className="pg-login-btn" to="/support#inquiry">로그인</Link>
        </div>
      </div>

      <div className={`pg-mega-panel ${openMenu ? "show" : ""}`}>
        <div className="container pg-mega-panel-inner">
          {navItems
            .filter((item) => item.label === openMenu)
            .map((item) => (
              <div key={item.label} className="pg-mega-layout">
                <div className={`pg-mega-links ${item.groups.length > 2 ? "cols-3" : "cols-2"}`}>
                  {item.groups.map((group) => (
                    <section key={group.title} className="pg-mega-col">
                      <h4>{group.title}</h4>
                      <ul>
                        {group.links.map((link) => (
                          <li key={link.label}>
                            <Link to={link.href} className="pg-mega-link">{link.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>

                <article className="pg-mega-promo">
                  <div className="pg-mega-promo-thumb" aria-hidden="true" />
                  <strong>{item.promo.title}</strong>
                  <p>{item.promo.desc}</p>
                  <Link to={item.promo.href}>{item.promo.cta} ❯</Link>
                </article>
              </div>
            ))}
        </div>
      </div>
    </header>
  );
}
