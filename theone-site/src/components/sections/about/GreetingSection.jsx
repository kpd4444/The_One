import heroImage from "../../../assets/about-intro-visual.webp";

export default function GreetingSection() {
  return (
    <section id="greeting" className="section">
      <div className="container">
        <div className="greeting-box greeting-modern">
          <div className="greeting-layout">
            <figure className="greeting-media">
              <img src={heroImage} alt="더원산업 제조 및 제품 현장" loading="lazy" decoding="async" />
            </figure>

            <div className="greeting-content">
              <p className="greeting-lead">
                더원산업은 산업 장비용 케이스와 함체를 설계부터 제작까지 통합 대응하는 제조 파트너입니다.
              </p>

              <div className="greeting-chips" aria-label="핵심 가치">
                <span>품질 중심</span>
                <span>납기 준수</span>
                <span>맞춤 설계</span>
                <span>현장 대응</span>
              </div>

              <ul className="greeting-points">
                <li>주요 제품: ITS 함체, 정산기, 통신 함체, 하우징</li>
                <li>강점: 설계, 가공, 조립까지 이어지는 일괄 제작 공정</li>
                <li>대응 분야: 주차 관제, 통신 장비, 카메라 장비 및 현장 프로젝트</li>
              </ul>
            </div>
          </div>
        </div>

        <section className="greeting-message" aria-label="대표 인사말">
          <h3>대표 인사말</h3>
          <p>
            더원산업은 각종 장비 보호 케이스 제작 업체로, 무인차량 번호 인식 카메라 케이스,
            로비폰, 무인과속 카메라 케이스, 프로젝트 빔 케이스, ITS 장비 함체 등을 제작하고
            있습니다.
          </p>
          <p>
            케이스는 구성 장비가 최적의 상태로 유지되고 보존될 수 있도록 맞춤형으로 설계하며,
            장비의 수명과 동작 효율을 안정적으로 유지할 수 있도록 제작하고 있습니다.
          </p>
          <p>
            앞으로도 끊임없는 개선과 성실한 품질 관리로 고객 만족을 위해 최선을 다하겠습니다.
          </p>

          <div className="greeting-sign">
            <strong>대표이사 조성로</strong>
          </div>
        </section>
      </div>
    </section>
  );
}
