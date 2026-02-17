import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo.png";

const navItems = [
  {
    label: "교육",
    to: "/about",
    groups: [
      {
        title: "교육 홈",
        links: [
          { label: "교육 홈", href: "/about" },
          { label: "공지사항", href: "/support#notice" },
        ],
      },
      {
        title: "MY 스쿨",
        links: [
          { label: "수강 중인 코스", href: "/support#inquiry" },
          { label: "관리 중인 코스", href: "/support" },
        ],
      },
      {
        title: "강사 신청",
        links: [
          { label: "강사/멘토풀 등록", href: "/support#inquiry" },
          { label: "캠퍼스", href: "/about#location" },
        ],
      },
    ],
    promo: {
      title: "실무형 교육 콘텐츠",
      desc: "산업 현장 기반의 커리큘럼으로 빠르게 업무 역량을 키워보세요.",
      cta: "교육 자세히 보기",
      href: "/about",
    },
  },
  {
    label: "데브코스",
    accent: "부트캠프",
    to: "/products",
    groups: [
      {
        title: "데브코스",
        links: [
          { label: "데브코스 홈", href: "/products" },
          { label: "백엔드 과정", href: "/products" },
          { label: "프론트엔드 과정", href: "/products" },
          { label: "풀스택 과정", href: "/products" },
        ],
      },
      {
        title: "취업지원 서비스",
        links: [
          { label: "취업지원 서비스 안내", href: "/support" },
          { label: "공지사항 및 자료실", href: "/support#notice" },
          { label: "추천 채용 공고", href: "/gallery" },
        ],
      },
    ],
    promo: {
      title: "실무에 가장 가까운 IT 부트캠프",
      desc: "프로젝트 중심 수업, 멘토 피드백, 취업지원까지 한 번에 제공합니다.",
      cta: "데브코스 자세히 보기",
      href: "/products",
    },
  },
  { label: "코딩테스트", to: "/gallery", groups: [], promo: null },
  { label: "인증시험↗", to: "/support", groups: [], promo: null },
  { label: "리눅스 자격증↗", to: "/support", groups: [], promo: null },
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
          {navItems.map((item) => (
            <div key={item.label} className="nav-item" onMouseEnter={() => setOpenMenu(item.label)}>
              <NavLink to={item.to} className={({ isActive }) => `nav-main-link ${isActive ? "active" : ""}`}>
                {item.label}
                {item.accent ? <span className="nav-accent">{item.accent}</span> : null}
              </NavLink>
            </div>
          ))}
        </nav>

        <div className="nav-utils">
          <Link to="/gallery">블로그</Link>
          <Link to="/support">기업 서비스</Link>
          <Link className="login-btn" to="/support#inquiry">로그인</Link>
        </div>
      </div>

      <div className={`mega-panel ${openMenu ? "show" : ""}`}>
        <div className="container mega-panel-inner">
          {navItems
            .filter((item) => item.label === openMenu && item.groups.length > 0)
            .map((item) => (
              <div key={item.label} className="mega-layout">
                <div className="mega-links cols-3">
                  {item.groups.map((group) => (
                    <section key={group.title} className="mega-col">
                      <h4>{group.title}</h4>
                      <ul>
                        {group.links.map((link) => (
                          <li key={link.label}>
                            <Link to={link.href} className="mega-link">{link.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>

                {item.promo ? (
                  <article className="mega-promo">
                    <div className="mega-promo-thumb" aria-hidden="true" />
                    <strong>{item.promo.title}</strong>
                    <p>{item.promo.desc}</p>
                    <Link to={item.promo.href}>{item.promo.cta} ❯</Link>
                  </article>
                ) : null}
              </div>
            ))}
        </div>
      </div>
    </header>
  );
}
