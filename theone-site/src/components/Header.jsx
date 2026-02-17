import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const navItems = [
  {
    label: "교육",
    to: "/about",
    groups: [
      {
        title: "회사 교육",
        links: [
          { label: "인사말", to: "/about#greeting" },
          { label: "회사연혁", to: "/about#history" },
          { label: "조직도", to: "/about" },
        ],
      },
      {
        title: "고객 안내",
        links: [
          { label: "공지사항", to: "/support#notice" },
          { label: "문의하기", to: "/support#inquiry" },
        ],
      },
    ],
    promo: {
      title: "더원산업 교육 안내",
      desc: "회사/현장 맞춤형 안내 자료와 상담 채널을 확인해보세요.",
      to: "/about",
      cta: "자세히 보기",
    },
  },
  {
    label: "데브코스",
    accent: "부트캠프",
    to: "/products",
    groups: [
      {
        title: "제품 라인업",
        links: [
          { label: "제품특성", to: "/products" },
          { label: "적용분야", to: "/products" },
          { label: "상담/견적 문의", to: "/support#inquiry" },
          { label: "현장 시공 사례", to: "/gallery" },
        ],
      },
      {
        title: "고객지원 서비스",
        links: [
          { label: "공지사항 및 자료실", to: "/support#notice" },
          { label: "고객 문의 접수", to: "/support#inquiry" },
        ],
      },
    ],
    promo: {
      title: "실무에 가까운 제작/시공 프로세스",
      desc: "설계부터 제작·설치·유지보수까지 한 번에 관리하는 원스톱 서비스를 제공합니다.",
      to: "/products",
      cta: "제품소개 자세히보기",
    },
  },
  {
    label: "코딩테스트",
    to: "/gallery",
    groups: [
      {
        title: "포트폴리오",
        links: [
          { label: "전체 갤러리", to: "/gallery" },
          { label: "최근 프로젝트", to: "/gallery" },
        ],
      },
    ],
    promo: {
      title: "프로젝트 아카이브",
      desc: "진행한 프로젝트 이미지를 통해 품질과 결과물을 직접 확인해보세요.",
      to: "/gallery",
      cta: "갤러리 이동",
    },
  },
  {
    label: "인증시험",
    to: "/support",
    groups: [
      {
        title: "지원",
        links: [
          { label: "공지사항", to: "/support#notice" },
          { label: "1:1 문의", to: "/support#inquiry" },
        ],
      },
    ],
    promo: {
      title: "빠른 고객 지원",
      desc: "문의 접수 후 담당자가 순차적으로 빠르게 회신드립니다.",
      to: "/support",
      cta: "고객센터 이동",
    },
  },
];

function MenuLink({ item, className }) {
  if (item.to) {
    return (
      <Link to={item.to} className={className}>
        {item.label}
      </Link>
    );
  }

  return (
    <a href={item.href} className={className}>
      {item.label}
    </a>
  );
}

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
            .filter((item) => item.label === openMenu)
            .map((item) => (
              <div key={item.label} className="mega-layout">
                <div className="mega-links">
                  {item.groups.map((group) => (
                    <section key={group.title} className="mega-col">
                      <h4>{group.title}</h4>
                      <ul>
                        {group.links.map((linkItem) => (
                          <li key={linkItem.label}>
                            <MenuLink item={linkItem} className="mega-link" />
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>

                <article className="mega-promo">
                  <div className="mega-promo-thumb" aria-hidden="true" />
                  <strong>{item.promo.title}</strong>
                  <p>{item.promo.desc}</p>
                  <Link to={item.promo.to}>{item.promo.cta} ❯</Link>
                </article>
              </div>
            ))}
        </div>
      </div>
    </header>
  );
}
