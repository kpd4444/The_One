import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  applicationFields,
  pageTabs,
  productFeatures,
  products,
} from "../data/productsData";

export default function ProductsPage() {
  const { pathname, search } = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);
  const currentTab = searchParams.get("tab") === "apply" ? "apply" : "feature";
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
                    className="product-mini-link"
                    onClick={() => setModalProduct(product)}
                  >
                    <div className="product-mini-top">{product.name}</div>
                    <div className="product-mini-image-row">
                      {product.images.slice(0, 1).map((imgSrc, idx) => (
                        <figure key={`${product.id}-${idx}`}>
                          <img src={imgSrc} alt={product.name} loading="lazy" decoding="async" />
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
          <div className="product-modal" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
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
              <img src={modalProduct.images[0]} alt={modalProduct.name} loading="lazy" decoding="async" />
            </figure>
          </div>
        </div>
      )}
    </main>
  );
}
