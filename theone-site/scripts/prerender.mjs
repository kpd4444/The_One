import fs from "node:fs/promises";
import path from "node:path";

const SITE_URL = "https://theone412.com";
const outputRoot = path.resolve(process.env.PRERENDER_OUT_DIR || "dist");
const pages = [
  {
    route: "/",
    title: "더원산업 | 장비 보호 케이스 및 함체 설계·제작",
    description: "더원산업은 장비 보호 케이스, 함체, 키오스크, ITS 장비 하우징을 설계·제작하는 산업 장비 전문 기업입니다.",
    body: `<main><section class="section"><div class="container"><h1>산업 장비 보호 케이스 및 함체 맞춤 설계·제작</h1><p>무인차량 번호 인식 카메라 케이스, 로비폰, 무인과속 카메라 케이스, 프로젝트 빔 케이스, ITS 장비 함체를 설계하고 제작합니다.</p><h2>설계부터 가공·조립·출하 검수까지</h2><p>설치 환경과 구성 장비에 맞춰 장비 보호성과 유지보수 편의성을 함께 고려합니다.</p></div></section></main>`,
  },
  {
    route: "/about",
    title: "회사소개 | 더원산업",
    description: "산업 장비용 케이스와 함체를 설계부터 제작까지 통합 대응하는 더원산업을 소개합니다.",
    body: `<main><section class="section"><div class="container"><h1>더원산업 회사소개</h1><h2>대표 인사말</h2><p>더원산업은 각종 장비 보호 케이스와 ITS 장비 함체 등을 맞춤 설계·제작합니다.</p><h2>회사 연혁과 조직</h2><p>2018년 설립 이후 생산 설비와 연구개발, 품질경영 역량을 확충해 왔습니다.</p><h2>찾아오시는 길</h2><address>경기도 김포시 대곶면 오니산로 100 · 031-997-4020</address></div></section></main>`,
  },
  {
    route: "/products",
    title: "제품소개 | 더원산업",
    description: "ITS 함체, 정산기, 프로젝트 빔 케이스, GATE LPR, 통신함체와 하우징 제품을 소개합니다.",
    body: `<main><section class="section"><div class="container"><h1>제품소개</h1><h2>주요 제작 제품</h2><ul><li>ITS 함체</li><li>정산기</li><li>프로젝트 빔 케이스</li><li>GATE LPR</li><li>통신함체</li><li>카메라 장비용 하우징</li></ul><p>내·외부 구성 장비와 설치 환경에 맞춘 구조로 제작합니다.</p></div></section></main>`,
  },
  {
    route: "/gallery",
    title: "갤러리 | 더원산업",
    description: "더원산업의 함체, 키오스크, ITS 및 하우징 제작 사례를 확인하세요.",
    body: `<main><section class="section"><div class="container"><h1>제작 사례 갤러리</h1><p>정산기·키오스크, ITS·교통 시스템, 함체·하우징과 프로젝트 제작 사례를 소개합니다.</p></div></section></main>`,
  },
  {
    route: "/support",
    title: "고객센터 | 더원산업",
    description: "더원산업 공지사항과 제품·견적 문의 안내를 확인하세요.",
    body: `<main><section class="section"><div class="container"><h1>고객센터</h1><h2>제품 및 견적 문의</h2><p>장비 사양과 설치 환경을 알려주시면 확인 후 안내해 드립니다.</p><p><a href="tel:0319974020">대표전화 031-997-4020</a></p></div></section></main>`,
  },
  {
    route: "/privacy",
    title: "개인정보처리방침 | 더원산업",
    description: "더원산업 고객문의 개인정보 수집 및 이용 안내입니다.",
    body: `<main><section class="section"><div class="container"><h1>개인정보처리방침</h1><p>고객문의 처리를 위해 이름, 연락처, 이메일과 문의내용을 수집하며 처리 완료 후 1년간 보관합니다.</p></div></section></main>`,
  },
  {
    route: "/404",
    title: "페이지를 찾을 수 없습니다 | 더원산업",
    description: "요청하신 페이지를 찾을 수 없습니다.",
    body: `<main><section class="section"><div class="container"><h1>페이지를 찾을 수 없습니다.</h1><p>주소가 변경되었거나 삭제된 페이지입니다.</p><p><a href="/">더원산업 홈으로 돌아가기</a></p></div></section></main>`,
  },
];

function escapeAttribute(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

function createSchema(page, canonical) {
  if (page.route === "/") {
    return [
      { "@context": "https://schema.org", "@type": ["Organization", "LocalBusiness"], name: "더원산업", url: canonical, telephone: "+82-31-997-4020", address: { "@type": "PostalAddress", addressCountry: "KR", addressRegion: "경기도", addressLocality: "김포시", streetAddress: "대곶면 오니산로 100" }, geo: { "@type": "GeoCoordinates", latitude: 37.647563, longitude: 126.549588 }, openingHours: "Mo-Fr 08:30-17:30" },
      { "@context": "https://schema.org", "@type": "WebSite", name: "더원산업", url: canonical },
    ];
  }
  if (page.route === "/products") {
    return { "@context": "https://schema.org", "@type": "ItemList", name: "더원산업 제품", itemListElement: ["ITS 함체", "정산기", "프로젝트 빔 케이스", "GATE LPR", "통신함체", "하우징"].map((name, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "Product", name, brand: { "@type": "Brand", name: "더원산업" } } })) };
  }
  const types = { "/about": "AboutPage", "/gallery": "ImageGallery", "/support": "ContactPage", "/privacy": "WebPage" };
  return { "@context": "https://schema.org", "@type": types[page.route] || "WebPage", name: page.title, url: canonical };
}

const template = await fs.readFile(path.join(outputRoot, "index.html"), "utf8");
for (const page of pages) {
  const canonical = `${SITE_URL}${page.route === "/" ? "" : page.route}`;
  const structuredData = JSON.stringify(createSchema(page, canonical)).replaceAll("<", "\\u003c");
  let html = template
    .replace(/<title>.*?<\/title>/s, `<title>${page.title}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/s, `<meta name="description" content="${escapeAttribute(page.description)}" />`)
    .replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/s, `<meta property="og:title" content="${escapeAttribute(page.title)}" />`)
    .replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/s, `<meta property="og:description" content="${escapeAttribute(page.description)}" />`)
    .replace("</head>", `    <link rel="canonical" href="${canonical}" />\n    <meta property="og:url" content="${canonical}" />\n    <script type="application/ld+json" data-seo-structured="true">${structuredData}</script>\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root" data-prerendered="true">${page.body}</div>`);

  if (page.route === "/404") {
    html = html.replace('name="robots" content="index,follow"', 'name="robots" content="noindex,nofollow"');
  }

  const output = page.route === "/"
    ? path.join(outputRoot, "index.html")
    : page.route === "/404"
      ? path.join(outputRoot, "404.html")
      : path.join(outputRoot, page.route.slice(1), "index.html");
  await fs.mkdir(path.dirname(output), { recursive: true });
  await fs.writeFile(output, html, "utf8");
}

console.log(`[prerender] Generated ${pages.length} static route documents.`);
