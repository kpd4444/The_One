import { useMemo, useState } from "react";
import itsImg from "../assets/product-its-enclosure.png";
import kioskImg from "../assets/product-kiosk-body.png";
import projectBeamAImg from "../assets/product-project-beam-case-a.png";
import projectBeamBImg from "../assets/product-project-beam-case-b.png";
import gateLprAImg from "../assets/product-gate-lpr-a.png";
import gateLprBImg from "../assets/product-gate-lpr-b.png";
import telecomImg from "../assets/product-telecom-enclosure.png";
import housingImg from "../assets/product-housing.png";

const galleryItems = [
  { id: 1, title: "ITS 함체 제작", desc: "스테인레스 함체 제작 및 조립", category: "제작", src: itsImg },
  { id: 2, title: "정산기 라인", desc: "주차 관제 장비 양산 대응", category: "양산", src: kioskImg },
  {
    id: 3,
    title: "프로젝트 빔 설치",
    desc: "현장 설치형 빔 장비 제작 사례",
    category: "현장",
    src: projectBeamAImg,
  },
  {
    id: 4,
    title: "프로젝트 빔케이스",
    desc: "케이스 및 구조물 제작",
    category: "제작",
    src: projectBeamBImg,
  },
  {
    id: 5,
    title: "GATE LPR 장비",
    desc: "차량번호 인식 장비 조립",
    category: "양산",
    src: gateLprAImg,
  },
  {
    id: 6,
    title: "LPR 라인 검수",
    desc: "출하 전 품질 점검",
    category: "검수",
    src: gateLprBImg,
  },
  {
    id: 7,
    title: "통신함체 생산",
    desc: "통신 장비용 함체 생산 라인",
    category: "양산",
    src: telecomImg,
  },
  {
    id: 8,
    title: "하우징 조립",
    desc: "카메라 장비용 하우징 조립",
    category: "검수",
    src: housingImg,
  },
];

const categories = ["전체", "제작", "양산", "현장", "검수"];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "전체") return galleryItems;
    return galleryItems.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <main className="gallery-page-v2">
      <section className="section">
        <div className="container">
          <header className="gallery-hero-v2">
            <p className="gallery-kicker-v2">PROJECT ARCHIVE</p>
            <h1>갤러리</h1>
            <p>더원산업의 제작, 양산, 설치 현장을 사진으로 확인하세요.</p>
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
                  <img src={item.src} alt={item.title} loading="lazy" />
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

      {selectedItem && (
        <div className="gallery-modal-overlay-v2" onClick={() => setSelectedItem(null)} role="presentation">
          <div className="gallery-modal-v2" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <button type="button" className="gallery-modal-close-v2" onClick={() => setSelectedItem(null)}>
              ×
            </button>
            <div className="gallery-modal-meta-v2">
              <span>{selectedItem.category}</span>
              <h3>{selectedItem.title}</h3>
              <p>{selectedItem.desc}</p>
            </div>
            <figure className="gallery-modal-image-v2">
              <img src={selectedItem.src} alt={selectedItem.title} />
            </figure>
          </div>
        </div>
      )}
    </main>
  );
}
