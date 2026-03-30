import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

const galleryFullImageModules = import.meta.glob("../assets/gallery/*.{jpg,jpeg,webp}", {
  eager: true,
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

const galleryFullMap = new Map(
  Object.entries(galleryFullImageModules).map(([path, src]) => [extractFileName(path), src]),
);

const galleryThumbMap = new Map(
  Object.entries(galleryThumbImageModules).map(([path, src]) => [extractFileName(path), src]),
);

const baseGalleryItems = Array.from(galleryFullMap.entries()).map(([fileName, src], index) => {
  const title = normalizeTitle(fileName);

  return {
    id: `base-${index + 1}`,
    title,
    desc: `${title} 시공 및 제작 사례`,
    category: resolveCategory(fileName),
    src,
    thumbSrc: galleryThumbMap.get(fileName) ?? src,
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
      src: imageSrc,
      thumbSrc: imageSrc,
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

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "전체") return galleryItems;
    return galleryItems.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    if (!selectedItem) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedItem(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedItem]);

  return (
    <main className="gallery-page-v2">
      <section className="section">
        <div className="container">
          <header className="gallery-hero-v2">
            <p className="gallery-kicker-v2">GALLERY</p>
            <h1>갤러리</h1>
            <p>더원산업의 주요 제작물과 시공 사례를 사진으로 확인하실 수 있습니다.</p>
          </header>

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

          <section className="gallery-grid-v2" aria-label="갤러리 목록">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className="gallery-card-v2"
                onClick={() => setSelectedItem(item)}
              >
                <figure className="gallery-thumb-v2">
                  <img
                    src={item.thumbSrc}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
                <div className="gallery-meta-v2">
                  <span>{item.category}</span>
                  <h2>{item.title}</h2>
                  <p>{item.desc}</p>
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
            >
              <button
                type="button"
                className="gallery-modal-close-v2"
                onClick={() => setSelectedItem(null)}
                aria-label="갤러리 닫기"
              >
                ×
              </button>
              <div className="gallery-modal-meta-v2">
                <span>{selectedItem.category}</span>
                <h3>{selectedItem.title}</h3>
                <p>{selectedItem.desc}</p>
              </div>
              <figure className="gallery-modal-image-v2">
                <img src={selectedItem.src} alt={selectedItem.title} decoding="async" />
              </figure>
            </div>
          </div>,
          document.body,
        )}
    </main>
  );
}
