import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Seo from "../components/Seo";
import "../styles/gallery.css";
import aiSafetyImage from "../assets/gallery/thumbs/aisafety키오스크.webp";
import smartIntersectionImage from "../assets/gallery/thumbs/스마트교차로함체.webp";
import dataCollectorImage from "../assets/gallery/thumbs/정보수집함체.webp";
import chillerCaseImage from "../assets/gallery/thumbs/칠러케이스.webp";
import telecomCaseImage from "../assets/gallery/thumbs/통신함체1.webp";
import bitBusImage from "../assets/gallery/thumbs/bit버스 안내표지판.webp";
import daewooLprImage from "../assets/gallery/thumbs/대우 푸르지오LPR.webp";

const galleryFullImageModules = import.meta.glob("../assets/gallery/*.webp", {
  eager: true,
  import: "default",
});

const extraImageMap = new Map([
  ["aisafety키오스크", aiSafetyImage],
  ["스마트교차로함체", smartIntersectionImage],
  ["정보수집함체", dataCollectorImage],
  ["칠러케이스", chillerCaseImage],
  ["통신함체1", telecomCaseImage],
  ["bit버스 안내표지판", bitBusImage],
  ["대우 푸르지오LPR", daewooLprImage],
]);

const categoryRules = [
  {
    category: "정산기·키오스크",
    keywords: ["정산기", "키오스크", "차단기"],
  },
  {
    category: "ITS·교통 시스템",
    keywords: ["ITS", "교통", "스마트교차로", "BIT", "bit", "LPR"],
  },
  {
    category: "함체·하우징",
    keywords: ["함체", "하우징", "케이스"],
  },
  {
    category: "프로젝트 사례",
    keywords: ["부천시", "현대건설", "미륵사지석탑", "수출용", "파이프라인"],
  },
];

const additionalGalleryEntries = [
  {
    fileName: "aisafety키오스크",
    title: "AI Safety 키오스크",
    category: "정산기·키오스크",
  },
  {
    fileName: "스마트교차로함체",
    title: "스마트 교차로 함체",
    category: "ITS·교통 시스템",
  },
  {
    fileName: "정보수집함체",
    title: "정보 수집 함체",
    category: "함체·하우징",
  },
  {
    fileName: "칠러케이스",
    title: "칠러 케이스",
    category: "함체·하우징",
  },
  {
    fileName: "통신함체1",
    title: "통신 함체",
    category: "함체·하우징",
  },
  {
    fileName: "bit버스 안내표지판",
    title: "BIT 버스 안내 표지판",
    category: "ITS·교통 시스템",
  },
  {
    fileName: "대우 푸르지오LPR",
    title: "대우 푸르지오 LPR",
    category: "ITS·교통 시스템",
  },
];

const titleOverrides = {
  "32인치 사전무인 정산기 BF 21.5인치 옥외용 정산기": "32인치 사전무인 정산기",
  "32인치 사전무인 정산기 BF 21.5인치 옥외용 정산기2": "BF 21.5인치 정산기",
};

const MIN_ZOOM = 1;
const MAX_ZOOM = 1.5;
const ZOOM_STEP = 0.2;

function extractFileName(path) {
  const segments = path.split("/");
  const fileName = segments[segments.length - 1];
  return fileName.replace(/\.[^.]+$/, "");
}

function normalizeTitle(fileName) {
  return fileName.replace(/\d+$/, "").trim();
}

function resolveCategory(fileName) {
  const matchedRule = categoryRules.find((rule) =>
    rule.keywords.some((keyword) => fileName.includes(keyword)),
  );

  return matchedRule?.category ?? "기타 프로젝트";
}

const galleryFullImageMap = new Map(
  Object.entries(galleryFullImageModules).map(([path, src]) => [extractFileName(path), src]),
);

const baseGalleryItems = Array.from(galleryFullImageMap.keys()).map((fileName, index) => {
  const title = titleOverrides[fileName] ?? normalizeTitle(fileName);
  const imageSrc = galleryFullImageMap.get(fileName);

  return {
    id: `base-${index + 1}`,
    title,
    desc: `${title} 시공 및 제작 사례`,
    category: resolveCategory(fileName),
    imageSrc,
    fileName,
  };
});

const existingFileNames = new Set(baseGalleryItems.map((item) => item.fileName));

const additionalGalleryItems = additionalGalleryEntries
  .filter((item) => !existingFileNames.has(item.fileName) && extraImageMap.has(item.fileName))
  .map((item, index) => {
    const imageSrc = extraImageMap.get(item.fileName);

    return {
      id: `extra-${index + 1}`,
      title: item.title,
      desc: `${item.title} 시공 및 제작 사례`,
      category: item.category,
      imageSrc,
      fileName: item.fileName,
    };
  });

const galleryItems = [...baseGalleryItems, ...additionalGalleryItems].sort((a, b) => {
  if (a.category !== b.category) {
    return a.category.localeCompare(b.category, "ko");
  }

  return a.fileName.localeCompare(b.fileName, "ko", { numeric: true });
});

const categories = ["전체", ...new Set(galleryItems.map((item) => item.category))];

function clampZoom(value) {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number(value.toFixed(2))));
}

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedItem, setSelectedItem] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(MIN_ZOOM);
  const closeButtonRef = useRef(null);
  const thumbRailRef = useRef(null);
  const modalRef = useRef(null);
  const triggerRef = useRef(null);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "전체") return galleryItems;
    return galleryItems.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const selectedIndex = useMemo(() => {
    if (!selectedItem) return -1;
    return filteredItems.findIndex((item) => item.id === selectedItem.id);
  }, [filteredItems, selectedItem]);

  const selectGalleryItem = useCallback((item) => {
    setZoomLevel(MIN_ZOOM);
    setSelectedItem(item);
  }, []);

  const closeGalleryModal = useCallback(() => {
    setSelectedItem(null);
    setZoomLevel(MIN_ZOOM);
  }, []);

  const moveSelection = useCallback(
    (direction) => {
      if (selectedIndex < 0) return;

      const nextItem = filteredItems[selectedIndex + direction];
      if (nextItem) {
        selectGalleryItem(nextItem);
      }
    },
    [filteredItems, selectGalleryItem, selectedIndex],
  );

  const changeZoom = useCallback((delta) => {
    setZoomLevel((prev) => clampZoom(prev + delta));
  }, []);

  const resetZoom = useCallback(() => {
    setZoomLevel(MIN_ZOOM);
  }, []);

  useEffect(() => {
    if (!selectedItem) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeGalleryModal();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveSelection(-1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        moveSelection(1);
      }

      if (event.key === "+" || event.key === "=") {
        event.preventDefault();
        changeZoom(ZOOM_STEP);
      }

      if (event.key === "-") {
        event.preventDefault();
        changeZoom(-ZOOM_STEP);
      }

      if (event.key === "0") {
        event.preventDefault();
        resetZoom();
      }

      if (event.key === "Tab" && modalRef.current) {
        const focusable = [...modalRef.current.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [changeZoom, closeGalleryModal, moveSelection, resetZoom, selectedItem]);

  useEffect(() => {
    if (!thumbRailRef.current || selectedIndex < 0) return undefined;

    const activeThumb = thumbRailRef.current.querySelector('[data-active="true"]');
    activeThumb?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    return undefined;
  }, [selectedIndex]);

  const hasPrevItem = selectedIndex > 0;
  const hasNextItem = selectedIndex >= 0 && selectedIndex < filteredItems.length - 1;

  return (
    <main className="gallery-page">
      <Seo
        title="갤러리"
        description="더원산업의 주요 제작물과 시공 사례를 사진으로 확인할 수 있는 갤러리 페이지입니다."
        path="/gallery"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          name: "더원산업 제작 사례",
          image: galleryItems.map((item) => ({
            "@type": "ImageObject",
            name: item.title,
            contentUrl: item.imageSrc,
          })),
        }}
      />

      <section className="section">
        <div className="container">
          <div className="about-breadcrumb">
            <span>HOME</span>
            <span className="about-crumb-sep">&gt;</span>
            <strong>갤러리</strong>
          </div>

          <header className="gallery-hero">
            <p className="gallery-kicker">GALLERY</p>
            <h1>갤러리</h1>
            <p>더원산업의 주요 제작물과 시공 사례를 사진으로 확인하실 수 있습니다.</p>
          </header>

          <div className="gallery-toolbar">
            <div className="gallery-filter-row" role="tablist" aria-label="갤러리 분류">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === category}
                  className={`gallery-filter-chip ${
                    selectedCategory === category ? "active" : ""
                  }`.trim()}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <p className="gallery-count">
              <strong>{filteredItems.length}</strong>개의 프로젝트를 보고 있습니다.
            </p>
          </div>

          <section className="gallery-grid" aria-label="갤러리 목록">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className="gallery-card"
                onClick={(event) => {
                  triggerRef.current = event.currentTarget;
                  selectGalleryItem(item);
                }}
                aria-label={`${item.title} 상세 이미지 보기`}
              >
                <figure className="gallery-thumb">
                  <span className="gallery-card-hint">클릭해 크게 보기</span>
                  <img src={item.imageSrc} alt={item.title} loading="lazy" decoding="async" />
                </figure>
                <div className="gallery-meta">
                  <span>{item.category}</span>
                  <span className="gallery-card-title">{item.title}</span>
                  <p>{item.desc}</p>
                  <strong className="gallery-card-link">상세 이미지 보기</strong>
                </div>
              </button>
            ))}
          </section>
        </div>
      </section>

      {selectedItem &&
        createPortal(
          <div
            className="gallery-modal-overlay"
            onClick={closeGalleryModal}
            role="presentation"
          >
            <div
              className="gallery-modal"
              ref={modalRef}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedItem.title} 상세 이미지`}
            >
              <button
                type="button"
                className="gallery-modal-close"
                ref={closeButtonRef}
                onClick={closeGalleryModal}
                aria-label="갤러리 닫기"
              >
                ×
              </button>

              <div className="gallery-modal-topbar">
                <span className="gallery-modal-counter">
                  {selectedIndex + 1} / {filteredItems.length}
                </span>
                <p>방향키 이동, +/- 확대, 0 초기화를 사용할 수 있습니다.</p>
              </div>

              <div className="gallery-modal-meta">
                <span>{selectedItem.category}</span>
                <h3>{selectedItem.title}</h3>
                <p>{selectedItem.desc}</p>
              </div>

              <div className="gallery-modal-controls">
                <div className="gallery-modal-zoom" role="group" aria-label="이미지 확대 및 축소">
                  <button type="button" onClick={() => changeZoom(-ZOOM_STEP)} disabled={zoomLevel <= MIN_ZOOM}>
                    -
                  </button>
                  <strong>{Math.round(zoomLevel * 100)}%</strong>
                  <button type="button" onClick={() => changeZoom(ZOOM_STEP)} disabled={zoomLevel >= MAX_ZOOM}>
                    +
                  </button>
                  <button type="button" className="ghost" onClick={resetZoom} disabled={zoomLevel === MIN_ZOOM}>
                    초기화
                  </button>
                </div>
              </div>

              <figure className="gallery-modal-image">
                {hasPrevItem && (
                  <button
                    type="button"
                    className="gallery-modal-nav prev"
                    onClick={() => moveSelection(-1)}
                    aria-label="이전 이미지 보기"
                  >
                    ‹
                  </button>
                )}

                <div className={`gallery-modal-image-stage ${zoomLevel > MIN_ZOOM ? "is-zoomed" : ""}`}>
                  <img
                    src={selectedItem.imageSrc}
                    alt={selectedItem.title}
                    decoding="async"
                    fetchPriority="high"
                    style={{ transform: `scale(${zoomLevel})` }}
                  />
                </div>

                {hasNextItem && (
                  <button
                    type="button"
                    className="gallery-modal-nav next"
                    onClick={() => moveSelection(1)}
                    aria-label="다음 이미지 보기"
                  >
                    ›
                  </button>
                )}
              </figure>

              <div className="gallery-modal-strip-wrap">
                <div className="gallery-modal-strip" ref={thumbRailRef} aria-label="갤러리 썸네일 탐색">
                  {filteredItems.map((item) => {
                    const isActive = item.id === selectedItem.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`gallery-modal-thumb ${isActive ? "active" : ""}`.trim()}
                        data-active={isActive ? "true" : "false"}
                        onClick={() => selectGalleryItem(item)}
                        aria-label={`${item.title} 보기`}
                        aria-pressed={isActive}
                      >
                        <img src={item.imageSrc} alt="" loading="lazy" decoding="async" />
                        <span>{item.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </main>
  );
}
