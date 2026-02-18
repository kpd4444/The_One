import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import itsImg from "../assets/product-its-enclosure.png";
import kioskImg from "../assets/product-kiosk-body.png";
import projectBeamAImg from "../assets/product-project-beam-case-a.png";
import projectBeamBImg from "../assets/product-project-beam-case-b.png";
import gateLprAImg from "../assets/product-gate-lpr-a.png";
import gateLprBImg from "../assets/product-gate-lpr-b.png";
import telecomImg from "../assets/product-telecom-enclosure.png";
import housingImg from "../assets/product-housing.png";

const products = [
  {
    id: "knm",
    code: "KNM",
    name: "ITS 함체",
    material: "스테인레스",
    usage: "주제어기 및 장비의 보호 및 체결",
    images: [itsImg],
  },
  {
    id: "krm",
    code: "KRM",
    name: "정산기",
    material: "CR 및 EGI",
    usage: "주차 관제 시스템",
    images: [kioskImg],
  },
  {
    id: "ktm",
    code: "KTM",
    name: "프로젝트 빔케이스 및 프로젝트 빔",
    material: "SUS 및 SUS폴, EGI",
    usage: "야외 행사용 및 교육용",
    images: [projectBeamAImg, projectBeamBImg],
  },
  {
    id: "kgm",
    code: "KGM",
    name: "GATE LPR",
    material: "CR 및 EGI",
    usage: "실내 및 야외 행사용",
    images: [gateLprAImg, gateLprBImg],
  },
  {
    id: "knm-m",
    code: "KNM-M",
    name: "통신함체",
    material: "스테인레스(SUS, STS)",
    usage: "통신장비용",
    images: [telecomImg],
  },
  {
    id: "krm-m",
    code: "KRM-M",
    name: "하우징",
    material: "SUS 및 알루미늄(AL)",
    usage: "차량번호인식카메라 및 단속카메라 장비용",
    images: [housingImg],
  }
  
];

const productFeatures = [
  "내·외부 구성장비 최적화 상태 유지 보존",
  "맞춤형 설계를 통해 수명과 동작이 효율적으로 작동",
  "태양열로부터 함체 내부 온도 상승을 막아주는 이중 구조",
];

const applicationFields = ["VDS", "RWIS", "AVI", "VMS", "ITS용 함체", "주차 관제", "통신 장비"];

const pageTabs = [
  { id: "feature", label: "제품 특성" },
  { id: "apply", label: "적용 분야" },
];

export default function ProductsPage() {
  const { pathname, search } = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);
  const currentTab = searchParams.get("tab") === "apply" ? "apply" : "feature";
  const [activeProductId, setActiveProductId] = useState(products[0].id);
  const [modalProduct, setModalProduct] = useState(null);

  useEffect(() => {
    const onEscape = (event) => {
      if (event.key === "Escape") setModalProduct(null);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  return (
    <main className="about-page section">
      <div className="container">
        <div className="about-breadcrumb">
          <span>HOME</span>
          <span className="about-crumb-sep">&gt;</span>
          <span>제품소개</span>
          <span className="about-crumb-sep">&gt;</span>
          <strong>{currentTab === "feature" ? "제품 특성" : "적용 분야"}</strong>
        </div>

        <div className="about-layout">
          <aside className="about-sidebar" aria-label="제품 소개 메뉴">
            <h2>제품소개</h2>
            <ul>
              {pageTabs.map((tab) => (
                <li key={tab.id}>
                  <Link
                    to={`${pathname}?tab=${tab.id}`}
                    className={currentTab === tab.id ? "active" : ""}
                  >
                    {tab.label}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          <section className="about-content">
            <header className="product-detail-head">
              <h1>{currentTab === "feature" ? "제품 특성" : "적용 분야"}</h1>
            </header>

            {currentTab === "feature" ? (
              <section className="product-feature-duo" aria-label="제품 특성">
                <article className="product-feature-card">
                  <h2>제품 특성</h2>
                  <ul>
                    {productFeatures.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </section>
            ) : (
              <section className="product-feature-duo" aria-label="적용 분야">
                <article className="product-feature-card">
                  <h2>적용 분야</h2>
                  <div className="product-application-chips">
                    {applicationFields.map((field) => (
                      <span key={field}>{field}</span>
                    ))}
                  </div>
                </article>
              </section>
            )}

            <section className="product-mini-grid" aria-label="제품 카드 목록">
              {products.map((product) => (
                <article key={product.id} className="product-mini-card">
                  <button
                    type="button"
                    className={`product-mini-link ${
                      activeProductId === product.id ? "active" : ""
                    }`.trim()}
                    onClick={() => {
                      setActiveProductId(product.id);
                      setModalProduct(product);
                    }}
                  >
                    <div className="product-mini-top">{product.name}</div>
                    <div className="product-mini-image-row">
                      {product.images.slice(0, 1).map((imgSrc, idx) => (
                        <figure key={`${product.id}-${idx}`}>
                          <img src={imgSrc} alt={product.name} loading="lazy" />
                        </figure>
                      ))}
                    </div>
                  </button>
                </article>
              ))}
            </section>
          </section>
        </div>
      </div>

      {modalProduct && (
        <div className="product-modal-overlay" onClick={() => setModalProduct(null)} role="presentation">
          <div className="product-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <button type="button" className="product-modal-close" onClick={() => setModalProduct(null)}>
              ×
            </button>

            <div className="product-modal-spec">
              <div>
                <span>제품명</span>
                <strong>{modalProduct.name}</strong>
              </div>
              <div>
                <span>재질</span>
                <strong>{modalProduct.material}</strong>
              </div>
              <div>
                <span>용도</span>
                <strong>{modalProduct.usage}</strong>
              </div>
            </div>

            <figure className="product-modal-image">
              <img src={modalProduct.images[0]} alt={modalProduct.name} loading="lazy" />
            </figure>
          </div>
        </div>
      )}
    </main>
  );
}
