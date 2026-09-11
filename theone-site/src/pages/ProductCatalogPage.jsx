import { useCallback, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import Seo from "../components/Seo";
import useAccessibleModal from "../hooks/useAccessibleModal";
import "../styles/products.css";
import {
  applicationAreas,
  pageTabs,
  productFeatures,
  products,
} from "../data/productsData";

const PRODUCT_SCHEMA = products.map((product) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  description: `${product.usage} 용도의 ${product.material} 제품`,
  category: "산업용 케이스 및 함체",
  brand: { "@type": "Brand", name: "더원산업" },
}));

export default function ProductCatalogPage() {
  const { pathname, search } = useLocation();
  const currentTab = useMemo(
    () =>
      new URLSearchParams(search).get("tab") === "apply" ? "apply" : "feature",
    [search],
  );
  const [modalProduct, setModalProduct] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const closeModal = useCallback(() => setModalProduct(null), []);
  const dialogRef = useAccessibleModal(Boolean(modalProduct), closeModal);

  const openModal = (product) => {
    setImageIndex(0);
    setModalProduct(product);
  };

  return (
    <main className="about-page section">
      <Seo
        title={
          currentTab === "feature"
            ? "제품소개 - 제품 특성"
            : "제품소개 - 적용 분야"
        }
        description={
          currentTab === "feature"
            ? "더원산업의 제품 특성과 맞춤 제작 역량을 소개합니다."
            : "더원산업 제품이 적용되는 산업 현장과 분야를 안내합니다."
        }
        path="/products"
        structuredData={PRODUCT_SCHEMA}
      />
      <div className="container">
        <div className="about-breadcrumb">
          <span>HOME</span>
          <span className="about-crumb-sep">&gt;</span>
          <span>제품소개</span>
          <span className="about-crumb-sep">&gt;</span>
          <strong>
            {currentTab === "feature" ? "제품 특성" : "적용 분야"}
          </strong>
        </div>
        <div className="about-layout">
          <aside className="about-sidebar" aria-label="제품소개 메뉴">
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
            <section
              className="product-feature-duo"
              aria-label={currentTab === "feature" ? "제품 특성" : "적용 분야"}
            >
              {currentTab === "feature" ? (
                <article className="product-feature-card">
                  <ul>
                    {productFeatures.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ) : (
                <div className="product-application-grid">
                  {applicationAreas.map((area) => (
                    <article
                      key={area.title}
                      className="product-application-card"
                    >
                      <h2>{area.title}</h2>
                      <p>{area.description}</p>
                      <div className="product-application-chips">
                        {area.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
            {currentTab === "feature" && (
              <section
                className="product-mini-grid"
                aria-label="제품 카드 목록"
              >
                {products.map((product) => (
                  <article key={product.id} className="product-mini-card">
                    <button
                      type="button"
                      className="product-mini-link"
                      onClick={() => openModal(product)}
                      aria-label={`${product.name} 상세 보기`}
                    >
                      <div className="product-mini-top">{product.name}</div>
                      <div className="product-mini-image-row">
                        <figure>
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            loading="lazy"
                            decoding="async"
                          />
                        </figure>
                      </div>
                    </button>
                  </article>
                ))}
              </section>
            )}
          </section>
        </div>
      </div>
      {modalProduct &&
        createPortal(
          <div
            className="product-modal-overlay"
            onMouseDown={(event) =>
              event.target === event.currentTarget && closeModal()
            }
            role="presentation"
          >
            <div
              ref={dialogRef}
              className="product-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="product-modal-title"
            >
              <button
                type="button"
                className="product-modal-close"
                onClick={closeModal}
                aria-label="제품 상세 닫기"
              >
                ×
              </button>
              <div className="product-modal-spec">
                <div>
                  <span>제품명</span>
                  <strong id="product-modal-title">{modalProduct.name}</strong>
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
                <img
                  src={modalProduct.images[imageIndex]}
                  alt={`${modalProduct.name} ${imageIndex + 1}`}
                  decoding="async"
                  fetchPriority="high"
                />
              </figure>
              {modalProduct.images.length > 1 && (
                <div
                  className="product-modal-gallery"
                  role="group"
                  aria-label="제품 이미지 선택"
                >
                  {modalProduct.images.map((src, index) => (
                    <button
                      key={src}
                      type="button"
                      className={index === imageIndex ? "active" : ""}
                      onClick={() => setImageIndex(index)}
                      aria-label={`${index + 1}번 이미지 보기`}
                      aria-pressed={index === imageIndex}
                    >
                      <img src={src} alt="" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>,
          document.body,
        )}
    </main>
  );
}
