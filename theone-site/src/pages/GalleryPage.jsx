import { useState } from "react";

const images = [
  { id: 1, title: "현장 시공 사례 01", desc: "설치/시공 완료", src: "https://picsum.photos/seed/theone1/1200/900" },
  { id: 2, title: "현장 시공 사례 02", desc: "가공/조립 라인", src: "https://picsum.photos/seed/theone2/1200/900" },
  { id: 3, title: "현장 시공 사례 03", desc: "품질 검사", src: "https://picsum.photos/seed/theone3/1200/900" },
  { id: 4, title: "현장 시공 사례 04", desc: "출하 준비", src: "https://picsum.photos/seed/theone4/1200/900" },
  { id: 5, title: "현장 시공 사례 05", desc: "작업 현장", src: "https://picsum.photos/seed/theone5/1200/900" },
  { id: 6, title: "현장 시공 사례 06", desc: "완성 제품", src: "https://picsum.photos/seed/theone6/1200/900" },
];

export default function GalleryPage() {
  const [selected, setSelected] = useState(null);

  return (
    <main>
      <section className="section">
        <div className="container">
          <h1>갤러리</h1>
          <p style={{ color: "var(--muted)", marginTop: 8 }}>
            현장/시공/제품 사진을 모아 보여드립니다.
          </p>

          <div className="gallery-grid" style={{ marginTop: 20 }}>
            {images.map((img) => (
              <button
                key={img.id}
                type="button"
                className="gallery-card"
                onClick={() => setSelected(img)}
                style={{ textAlign: "left", cursor: "pointer" }}
              >
                <div className="thumb">
                  <img src={img.src} alt={img.title} loading="lazy" />
                </div>

                <div className="meta">
                  <div style={{ fontWeight: 800 }}>{img.title}</div>
                  <div style={{ color: "var(--muted)", fontSize: 14 }}>{img.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)} role="presentation">
          <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="modal-head">
              <div>
                <div style={{ fontWeight: 800 }}>{selected.title}</div>
                <div style={{ color: "var(--muted)", fontSize: 14 }}>{selected.desc}</div>
              </div>

              <button className="modal-close" onClick={() => setSelected(null)} aria-label="닫기">
                ✕
              </button>
            </div>

            <div className="modal-body">
              <img src={selected.src} alt={selected.title} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
