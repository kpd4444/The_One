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
                <div className="home-globe-map">
                  <svg viewBox="0 0 1000 1000" aria-hidden="true">
                    <defs>
                      <linearGradient id="globe-land-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#b7d98a" />
                        <stop offset="100%" stopColor="#4f8d5d" />
                      </linearGradient>
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
                      <path d="M293 244 343 194 415 171 526 172 629 188 704 224 749 280 730 338 691 366 641 366 604 347 566 353 530 384 505 440 461 460 434 506 403 560 341 552 291 521 255 463 233 398 245 320Z" />
                      <path d="M404 502 446 530 463 596 448 659 405 718 353 749 317 730 309 668 322 580 354 544Z" />
                      <path d="M598 333 646 322 696 335 740 364 768 409 756 456 718 483 676 485 641 476 611 449 587 404 584 360Z" />
                      <path d="M577 493 611 475 646 472 681 487 699 519 693 555 664 577 630 575 598 556 577 528Z" />
                      <path d="M532 598 575 598 610 607 640 636 632 680 592 703 550 699 517 678 511 639Z" />
                      <path d="M706 350 723 333 735 346 727 369 748 390 726 417 745 445 720 474 733 515 704 530 692 490 692 453 710 418 687 379Z" />
                      <path d="M493 689 533 704 565 734 561 774 525 808 481 829 442 820 422 793 429 757 454 722Z" />
                      <path d="M654 632 682 621 708 633 718 661 702 687 672 695 648 677 644 650Z" />
                      <path d="M742 612 773 622 791 646 785 675 754 691 726 680 715 651Z" />
                      <path d="M430 231 496 223 585 228 651 247 642 282 589 300 526 297 476 287 435 261Z" />
                      <path d="M722 725 748 718 769 731 772 752 755 770 730 772 712 758 708 740Z" />
                    </g>
                    <g className="home-globe-coast">
                      <path d="M293 244 343 194 415 171 526 172 629 188 704 224 749 280 730 338 691 366 641 366 604 347 566 353 530 384 505 440 461 460 434 506 403 560 341 552 291 521 255 463 233 398 245 320Z" />
                      <path d="M404 502 446 530 463 596 448 659 405 718 353 749 317 730 309 668 322 580 354 544Z" />
                      <path d="M598 333 646 322 696 335 740 364 768 409 756 456 718 483 676 485 641 476 611 449 587 404 584 360Z" />
                      <path d="M577 493 611 475 646 472 681 487 699 519 693 555 664 577 630 575 598 556 577 528Z" />
                      <path d="M532 598 575 598 610 607 640 636 632 680 592 703 550 699 517 678 511 639Z" />
                      <path d="M706 350 723 333 735 346 727 369 748 390 726 417 745 445 720 474 733 515 704 530 692 490 692 453 710 418 687 379Z" />
                      <path d="M493 689 533 704 565 734 561 774 525 808 481 829 442 820 422 793 429 757 454 722Z" />
                      <path d="M654 632 682 621 708 633 718 661 702 687 672 695 648 677 644 650Z" />
                      <path d="M742 612 773 622 791 646 785 675 754 691 726 680 715 651Z" />
                      <path d="M430 231 496 223 585 228 651 247 642 282 589 300 526 297 476 287 435 261Z" />
                      <path d="M722 725 748 718 769 731 772 752 755 770 730 772 712 758 708 740Z" />
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
