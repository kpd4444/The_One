import { useEffect } from "react";
import { resolveSiteUrl } from "../config/site";

const SITE_NAME = "더원산업";
const DEFAULT_TITLE = "더원산업 | 정밀 케이스·함체 설계 및 제작";
const DEFAULT_DESCRIPTION =
  "더원산업은 정밀 케이스, 함체, 키오스크, ITS 장비 하우징을 설계·제작하는 산업 설비 전문 기업입니다.";
const DEFAULT_IMAGE = "/og-cover.png";
const EMPTY_STRUCTURED_DATA = [];

function upsertMeta(selector, create) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = create();
    document.head.appendChild(element);
  }

  return element;
}

function setMetaByName(name, content) {
  const element = upsertMeta(`meta[name="${name}"]`, () => {
    const meta = document.createElement("meta");
    meta.setAttribute("name", name);
    return meta;
  });
  element.setAttribute("content", content);
}

function setMetaByProperty(property, content) {
  const element = upsertMeta(`meta[property="${property}"]`, () => {
    const meta = document.createElement("meta");
    meta.setAttribute("property", property);
    return meta;
  });
  element.setAttribute("content", content);
}

function setLink(rel, href) {
  const element = upsertMeta(`link[rel="${rel}"]`, () => {
    const link = document.createElement("link");
    link.setAttribute("rel", rel);
    return link;
  });
  element.setAttribute("href", href);
}

function setStructuredData(items) {
  document
    .querySelectorAll('script[data-seo-structured="true"]')
    .forEach((element) => element.remove());

  items.forEach((item, index) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.seoStructured = "true";
    script.dataset.seoIndex = String(index);
    script.textContent = JSON.stringify(item);
    document.head.appendChild(script);
  });
}

export default function Seo({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = "",
  image = DEFAULT_IMAGE,
  type = "website",
  structuredData = EMPTY_STRUCTURED_DATA,
  robots,
}) {
  const structuredDataText = JSON.stringify(structuredData);

  useEffect(() => {
    const currentPath = path || `${window.location.pathname}${window.location.search}`;
    const siteUrl = resolveSiteUrl();
    const url = new URL(currentPath, `${siteUrl}/`).toString();
    const imageUrl = new URL(image, `${siteUrl}/`).toString();
    const titleText = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    const parsedStructuredData = JSON.parse(structuredDataText);
    const jsonLdItems = (Array.isArray(parsedStructuredData)
      ? parsedStructuredData
      : [parsedStructuredData]).filter(Boolean);

    document.title = titleText;
    document.documentElement.lang = "ko";

    setMetaByName("description", description);
    const isProduction = ["theone412.com", "www.theone412.com"].includes(window.location.hostname);
    setMetaByName("robots", robots || (isProduction ? "index,follow" : "noindex,nofollow"));
    setMetaByName("theme-color", "#102645");

    setMetaByProperty("og:type", type);
    setMetaByProperty("og:locale", "ko_KR");
    setMetaByProperty("og:site_name", SITE_NAME);
    setMetaByProperty("og:title", titleText);
    setMetaByProperty("og:description", description);
    setMetaByProperty("og:url", url);
    setMetaByProperty("og:image", imageUrl);
    setMetaByProperty("og:image:width", "1200");
    setMetaByProperty("og:image:height", "630");

    setMetaByName("twitter:card", "summary_large_image");
    setMetaByName("twitter:title", titleText);
    setMetaByName("twitter:description", description);
    setMetaByName("twitter:image", imageUrl);

    setLink("canonical", url);

    if (jsonLdItems.length > 0) {
      setStructuredData(jsonLdItems);
    }

    return () => {
      if (jsonLdItems.length > 0) {
        document
          .querySelectorAll('script[data-seo-structured="true"]')
          .forEach((element) => element.remove());
      }
    };
  }, [description, image, path, robots, structuredDataText, title, type]);

  return null;
}
