import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Seo from "../components/Seo";

const galleryFullImageModules = import.meta.glob("../assets/gallery/*.{jpg,jpeg,webp}", {
  import: "default",
});

const galleryThumbImageModules = import.meta.glob("../assets/gallery/thumbs/*.{jpg,jpeg,webp}", {
  eager: true,
  import: "default",
});

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

const loadedFullImageCache = new Map();
const MIN_ZOOM = 1;
const MAX_ZOOM = 2.4;
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

const galleryThumbMap = new Map(
  Object.entries(galleryThumbImageModules).map(([path, src]) => [extractFileName(path), src]),
);

const galleryFullLoaderMap = new Map(
  Object.entries(galleryFullImageModules).map(([path, loader]) => [extractFileName(path), loader]),
);

const baseGalleryItems = Array.from(galleryFullLoaderMap.keys()).map((fileName, index) => {
  const title = normalizeTitle(fileName);
  const thumbSrc = galleryThumbMap.get(fileName);

  return {
    id: `base-${index + 1}`,
    title,
    desc: `${title} 시공 및 제작 사례`,
    category: resolveCategory(fileName),
    thumbSrc,
    fullLoader: galleryFullLoaderMap.get(fileName),
    fileName,
  };
});

const existingFileNames = new Set(baseGalleryItems.map((item) => item.fileName));

const additionalGalleryItems = additionalGalleryEntries
  .filter((item) => !existingFileNames.has(item.fileName) && galleryThumbMap.has(item.fileName))
  .map((item, index) => {
    const imageSrc = galleryThumbMap.get(item.fileName);

    return {
      id: `extra-${index + 1}`,
      title: item.title,
      desc: `${item.title} 시공 및 제작 사례`,
      category: item.category,
      thumbSrc: imageSrc,
      fullLoader: null,
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

function loadFullImage(item) {
  if (!item?.fullLoader) {
    return Promise.resolve(item?.thumbSrc ?? null);
  }

  const cached = loadedFullImageCache.get(item.fileName);
  if (cached) {
    return Promise.resolve(cached);
  }

  return item.fullLoader().then((src) => {
    loadedFullImageCache.set(item.fileName, src);
    return src;
  });
}

function clampZoom(value) {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number(value.toFixed(2))));
}

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedImageSrc, setSelectedImageSrc] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(MIN_ZOOM);
  const closeButtonRef = useRef(null);
  const thumbRailRef = useRef(null);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "전체") return galleryItems;
    return galleryItems.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const selectedIndex = useMemo(() => {
    if (!selectedItem) return -1;
    return filteredItems.findIndex((item) => item.id === selectedItem.id);
  }, [filteredItems, selectedItem]);

  const moveSelection = useCallback(
    (direction) => {
      if (selectedIndex < 0) return;

      const nextItem = filteredItems[selectedIndex + direction];
      if (nextItem) {
        setSelectedItem(nextItem);
      }
    },
    [filteredItems, selectedIndex],
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
        setSelectedItem(null);
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
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [changeZoom, moveSelection, resetZoom, selectedItem]);

  useEffect(() => {
    if (!selectedItem) {
      setSelectedImageSrc(null);
      setIsImageLoading(false);
      setZoomLevel(MIN_ZOOM);
      return undefined;
    }

    let cancelled = false;
    setSelectedImageSrc(selectedItem.thumbSrc);
    setIsImageLoading(Boolean(selectedItem.fullLoader));
    setZoomLevel(MIN_ZOOM);

    loadFullImage(selectedItem)
      .then((src) => {
        if (!cancelled) {
          setSelectedImageSrc(src);
          setIsImageLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setIsImageLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [selectedItem]);

  useEffect(() => {
    if (!selectedItem || selectedIndex < 0) return undefined;

    const previousItem = filteredItems[selectedIndex - 1];
    const nextItem = filteredItems[selectedIndex + 1];

    if (previousItem) {
      loadFullImage(previousItem);
    }

    if (nextItem) {
      loadFullImage(nextItem);
    }

    return undefined;
  }, [filteredItems, selectedIndex, selectedItem]);

  useEffect(() => {
    if (!thumbRailRef.current || selectedIndex < 0) return undefined;

    const activeThumb = thumbRailRef.current.querySelector('[data-active="true"]');
    activeThumb?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    return undefined;
  }, [selectedIndex]);

  const hasPrevItem = selectedIndex > 0;
  const hasNextItem = selectedIndex >= 0 && selectedIndex < filteredItems.length - 1;

  return (
    <main className="gallery-page-v2">
      <Seo
        title="갤러리"
        description="더원산업의 주요 제작물과 시공 사례를 사진으로 확인할 수 있는 갤러리 페이지입니다."
        path="/gallery"
        keywords={[
          "더원산업 갤러리",
          "함체 제작 사례",
          "키오스크 제작 사례",
          "ITS 시공 사례",
          "하우징 제작 사진",
        ]}
      />

      <section className="section">
        <div className="container">
          <div className="about-breadcrumb">
            <span>HOME</span>
            <span className="about-crumb-sep">&gt;</span>
            <strong>갤러리</strong>
          </div>

          <header className="gallery-hero-v2">
            <p className="gallery-kicker-v2">GALLERY</p>
            <h1>갤러리</h1>
            <p>더원산업의 주요 제작물과 시공 사례를 사진으로 확인하실 수 있습니다.</p>
          </header>

          <div className="gallery-toolbar-v2">
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
            <p className="gallery-count-v2">
              <strong>{filteredItems.length}</strong>개의 프로젝트를 보고 있습니다.
            </p>
          </div>

          <section className="gallery-grid-v2" aria-label="갤러리 목록">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className="gallery-card-v2"
                onClick={() => setSelectedItem(item)}
              >
                <figure className="gallery-thumb-v2">
                  <span className="gallery-card-hint-v2">클릭해 크게 보기</span>
                  <img src={item.thumbSrc} alt={item.title} loading="lazy" decoding="async" />
                </figure>
                <div className="gallery-meta-v2">
                  <span>{item.category}</span>
                  <h2>{item.title}</h2>
                  <p>{item.desc}</p>
                  <strong className="gallery-card-link-v2">상세 이미지 보기</strong>
                </div>
              </button>
            ))}
          </section>
        </div>
      </section>

      {selectedItem &&
        createPortal(
          <div
            className="gallery-modal-overlay-v2"
            onClick={() => setSelectedItem(null)}
            role="presentation"
          >
            <div
              className="gallery-modal-v2"
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedItem.title} 상세 이미지`}
            >
              <button
                type="button"
                className="gallery-modal-close-v2"
                ref={closeButtonRef}
                onClick={() => setSelectedItem(null)}
                aria-label="갤러리 닫기"
              >
                ×
              </button>

              <div className="gallery-modal-topbar-v2">
                <span className="gallery-modal-counter-v2">
                  {selectedIndex + 1} / {filteredItems.length}
                </span>
                <p>방향키 이동, +/- 확대, 0 초기화를 사용할 수 있습니다.</p>
              </div>

              <div className="gallery-modal-meta-v2">
                <span>{selectedItem.category}</span>
                <h3>{selectedItem.title}</h3>
                <p>{selectedItem.desc}</p>
              </div>

              <div className="gallery-modal-controls-v2">
                <div className="gallery-modal-zoom-v2" role="group" aria-label="이미지 확대 및 축소">
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

              <figure className="gallery-modal-image-v2">
                {hasPrevItem && (
                  <button
                    type="button"
                    className="gallery-modal-nav-v2 prev"
                    onClick={() => moveSelection(-1)}
                    aria-label="이전 이미지 보기"
                  >
                    ‹
                  </button>
                )}

                {isImageLoading && (
                  <div className="gallery-modal-loading-v2" aria-live="polite">
                    <span className="gallery-modal-loading-spinner-v2" />
                    <strong>원본 이미지를 불러오는 중입니다.</strong>
                  </div>
                )}

                <div className={`gallery-modal-image-stage-v2 ${zoomLevel > MIN_ZOOM ? "is-zoomed" : ""}`}>
                  <img
                    src={selectedImageSrc ?? selectedItem.thumbSrc}
                    alt={selectedItem.title}
                    decoding="async"
                    style={{ transform: `scale(${zoomLevel})` }}
                  />
                </div>

                {hasNextItem && (
                  <button
                    type="button"
                    className="gallery-modal-nav-v2 next"
                    onClick={() => moveSelection(1)}
                    aria-label="다음 이미지 보기"
                  >
                    ›
                  </button>
                )}
              </figure>

              <div className="gallery-modal-strip-wrap-v2">
                <div className="gallery-modal-strip-v2" ref={thumbRailRef} aria-label="갤러리 썸네일 탐색">
                  {filteredItems.map((item) => {
                    const isActive = item.id === selectedItem.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`gallery-modal-thumb-v2 ${isActive ? "active" : ""}`.trim()}
                        data-active={isActive ? "true" : "false"}
                        onClick={() => setSelectedItem(item)}
                        aria-label={`${item.title} 보기`}
                        aria-pressed={isActive}
                      >
                        <img src={item.thumbSrc} alt="" loading="lazy" decoding="async" />
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
