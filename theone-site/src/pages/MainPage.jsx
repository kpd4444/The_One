import { Link } from "react-router-dom";
import {
  featuredProjects,
  metrics,
  processSteps,
  productGroups,
  strengths,
} from "../data/mainPageData";

export default function MainPage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="container">
          <div className="home-hero-shell">
            <div className="home-hero-copy">
              <p className="home-kicker">THE ONE INDUSTRY</p>
              <h1>
                <span className="home-hero-title-line">장비를 보호하는 케이스와</span>
                <span className="home-hero-title-line">함체를 더 정교하게</span>
                <span className="home-hero-title-line">만듭니다.</span>
              </h1>
              <p className="home-hero-lead">
                더원산업은 무인차량 번호 인식 카메라 케이스, 로비폰, 무인과속 카메라 케이스,
                프로젝트 빔 케이스, ITS 장비 함체 등 각종 장비 보조 케이스를 맞춤 설계 및
                제작하는 전문 업체입니다.
              </p>

              <div className="home-hero-cta">
                <Link className="btn btn-primary" to="/products">
                  제품 소개 보기
                </Link>
                <Link className="btn btn-outline" to="/support?tab=inquiry">
                  견적 문의하기
                </Link>
              </div>

              <div className="home-product-tags" aria-label="주요 제작 품목">
                {productGroups.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            <div className="home-hero-visual" aria-hidden="true">
              <div className="home-orbit home-orbit-a" />
              <div className="home-orbit home-orbit-b" />
              <div className="home-orbit home-orbit-c" />
              <div className="home-globe">
                <div className="home-globe-atmosphere" />
                <div className="home-globe-ocean" />
                <div className="home-globe-specular" />
                <div className="home-globe-map">
                  <svg viewBox="0 0 1000 1000" aria-hidden="true">
                    <defs>
                      <radialGradient id="globe-land-gradient" cx="42%" cy="36%" r="78%">
                        <stop offset="0%" stopColor="#8cc56b" />
                        <stop offset="45%" stopColor="#5c9b4f" />
                        <stop offset="100%" stopColor="#355f34" />
                      </radialGradient>
                      <linearGradient id="globe-land-shadow" x1="20%" y1="15%" x2="85%" y2="90%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.24)" />
                        <stop offset="100%" stopColor="rgba(8,24,18,0.46)" />
                      </linearGradient>
                      <radialGradient id="globe-cloud-gradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                      </radialGradient>
                    </defs>
                    <g className="home-globe-grid">
                      <ellipse cx="500" cy="500" rx="360" ry="360" />
                      <ellipse cx="500" cy="500" rx="300" ry="360" />
                      <ellipse cx="500" cy="500" rx="220" ry="360" />
                      <ellipse cx="500" cy="500" rx="120" ry="360" />
                      <ellipse cx="500" cy="500" rx="360" ry="320" />
                      <ellipse cx="500" cy="500" rx="360" ry="250" />
                      <ellipse cx="500" cy="500" rx="360" ry="170" />
                    </g>
                    <g className="home-globe-land">
                      <path d="M235 286 287 242 362 216 454 210 520 221 548 247 538 282 490 313 446 324 420 352 392 408 350 449 304 453 267 428 240 378 228 330Z" />
                      <path d="M338 458 389 462 429 500 433 571 400 651 346 729 298 762 263 732 257 662 275 573 307 506Z" />
                      <path d="M461 226 570 211 673 234 755 280 806 347 806 400 775 430 728 431 682 407 655 371 632 332 594 306 526 293 463 274Z" />
                      <path d="M646 424 709 430 770 458 803 516 794 575 748 611 688 607 643 571 625 512Z" />
                      <path d="M572 598 630 599 683 621 719 664 714 717 683 756 635 778 585 771 547 738 539 678Z" />
                      <path d="M717 326 746 334 765 361 759 394 730 409 704 395 696 364Z" />
                      <path d="M781 640 811 650 828 676 818 703 789 716 764 703 757 678Z" />
                      <path d="M455 735 491 744 520 770 520 807 494 834 456 846 424 832 411 803 420 773Z" />
                      <path d="M430 286 488 289 556 304 585 333 567 354 517 350 467 333 430 313Z" />
                    </g>
                    <g className="home-globe-land-shade">
                      <path d="M240 298 306 252 406 228 502 229 542 245 516 275 455 303 413 346 379 411 337 446 286 442 248 378Z" />
                      <path d="M469 233 571 219 663 238 739 275 789 338 783 392 739 401 695 377 667 338 621 304 553 286 488 280Z" />
                      <path d="M653 433 716 444 768 473 788 522 778 564 735 594 686 592 650 565 633 518Z" />
                      <path d="M577 606 639 613 690 639 711 676 701 720 666 751 618 766 573 758 549 723 545 679Z" />
                    </g>
                    <g className="home-globe-coast">
                      <path d="M235 286 287 242 362 216 454 210 520 221 548 247 538 282 490 313 446 324 420 352 392 408 350 449 304 453 267 428 240 378 228 330Z" />
                      <path d="M338 458 389 462 429 500 433 571 400 651 346 729 298 762 263 732 257 662 275 573 307 506Z" />
                      <path d="M461 226 570 211 673 234 755 280 806 347 806 400 775 430 728 431 682 407 655 371 632 332 594 306 526 293 463 274Z" />
                      <path d="M646 424 709 430 770 458 803 516 794 575 748 611 688 607 643 571 625 512Z" />
                      <path d="M572 598 630 599 683 621 719 664 714 717 683 756 635 778 585 771 547 738 539 678Z" />
                      <path d="M717 326 746 334 765 361 759 394 730 409 704 395 696 364Z" />
                      <path d="M781 640 811 650 828 676 818 703 789 716 764 703 757 678Z" />
                      <path d="M455 735 491 744 520 770 520 807 494 834 456 846 424 832 411 803 420 773Z" />
                      <path d="M430 286 488 289 556 304 585 333 567 354 517 350 467 333 430 313Z" />
                    </g>
                    <g className="home-globe-cloud-band">
                      <ellipse cx="338" cy="340" rx="88" ry="28" />
                      <ellipse cx="682" cy="380" rx="112" ry="34" />
                      <ellipse cx="612" cy="680" rx="126" ry="30" />
                      <ellipse cx="384" cy="604" rx="92" ry="24" />
                    </g>
                    <g className="home-globe-city-lights">
                      <circle className="pulse-a" cx="646" cy="442" r="5" />
                      <circle className="pulse-b" cx="636" cy="434" r="3.5" />
                      <circle className="pulse-c" cx="661" cy="452" r="3.5" />
                      <circle className="pulse-b" cx="678" cy="418" r="4" />
                      <circle className="pulse-c" cx="690" cy="444" r="3" />
                      <circle className="pulse-a" cx="617" cy="424" r="3" />
                      <circle className="pulse-b" cx="598" cy="455" r="2.6" />
                      <circle className="pulse-c" cx="624" cy="478" r="2.8" />
                      <circle className="pulse-a" cx="708" cy="402" r="2.4" />
                      <circle className="pulse-b" cx="724" cy="434" r="2.3" />
                    </g>
                    <g className="home-globe-marker">
                      <circle cx="645" cy="445" r="18" />
                      <circle cx="645" cy="445" r="34" />
                    </g>
                  </svg>
                </div>
                <div className="home-globe-cloud home-globe-cloud-a" />
                <div className="home-globe-cloud home-globe-cloud-b" />
                <div className="home-globe-cloud home-globe-cloud-c" />
                <div className="home-globe-shadow" />
              </div>

              <aside className="home-hero-panel" aria-label="핵심 지표">
                <h2>핵심 지표</h2>
                <div className="home-metric-list">
                  {metrics.map((item) => (
                    <div key={item.label} className="home-metric-item">
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </div>
                  ))}
                </div>
                <p className="home-panel-note">최근 12개월 운영 기준</p>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section className="home-trust">
        <div className="container">
          <div className="home-trust-strip">
            <span>맞춤 케이스·함체 설계</span>
            <span>장비 보호와 안정성 중심 제작</span>
            <span>실내·야외 설치 환경 대응</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="home-section-head">
            <p className="home-kicker">Why The One</p>
            <h2>구성 장비가 오래, 안정적으로 작동할 수 있도록 설계합니다.</h2>
          </div>

          <div className="home-capability-grid">
            {strengths.map((item) => (
              <article key={item.title} className="home-capability-card">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <div className="home-process-layout">
            <div className="home-section-head">
              <p className="home-kicker">Process</p>
              <h2>상담부터 설계, 제작, 출하까지 흐름이 명확한 제작 프로세스</h2>
            </div>

            <div className="home-process-grid">
              {processSteps.map((item) => (
                <article key={item.step} className="home-process-card">
                  <span>{item.step}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="home-section-head">
            <p className="home-kicker">Featured Work</p>
            <h2>현재 제작 품목과 가까운 대표 분야</h2>
          </div>

          <div className="home-project-grid">
            {featuredProjects.map((project) => (
              <article key={project.title} className="home-project-card">
                <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
                <div className="home-project-overlay">
                  <span>{project.category}</span>
                  <h3>{project.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-bottom-cta section">
        <div className="container home-bottom-cta-wrap">
          <div>
            <p className="home-kicker">Start Your Project</p>
            <h2>장비 사양과 설치 환경만 정리되어 있어도 맞춤형 케이스 방향부터 함께 잡아드립니다.</h2>
          </div>
          <Link className="btn btn-primary" to="/support?tab=inquiry">
            상담 시작하기
          </Link>
        </div>
      </section>
    </main>
  );
}
