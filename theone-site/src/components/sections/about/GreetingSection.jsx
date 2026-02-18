import heroImage from "../../../assets/about-intro-visual.png";

export default function GreetingSection() {
  return (
    <section id="greeting" className="section">
      <div className="container">
        <div className="greeting-box greeting-modern">
          <div className="greeting-layout">
            <figure className="greeting-media">
              <img src={heroImage} alt="더원산업 제조 및 제품 현장" loading="lazy" />
            </figure>

            <div className="greeting-content">
              <p className="greeting-lead">
                더원산업은 산업 장비용 케이스·함체를 설계부터 제작까지 통합 대응하는 제조 파트너입니다.
              </p>

              <div className="greeting-chips" aria-label="핵심 가치">
                <span>품질 중심</span>
                <span>납기 준수</span>
                <span>맞춤 설계</span>
                <span>현장 대응</span>
              </div>

              <ul className="greeting-points">
                <li>주요 제품: ITS 함체, 정산기, 통신함체, 하우징</li>
                <li>강점: 설계-가공-조립 일괄 공정으로 안정적인 품질 관리</li>
                <li>대응 분야: 주차관제, 통신장비, 카메라 장비 및 현장 프로젝트</li>
              </ul>
            </div>
          </div>
        </div>

        <section className="greeting-message" aria-label="대표 인사말">
          <h3>대표 인사말</h3>
          <p>
            저희 업체는 각종 장비보조 케이스 제작업체이며, 현재 생산 중인 제품은 무인차량 번호 인식
            카메라 및 케이스, 아파트 입구 로비폰, 무인과속 카메라 케이스, 내부함체 및 이에 연계된
            프로젝트 케이스, ITS 장비 함체 등을 제작하고 있습니다. 케이스들은 구성장비를 최적의 상태로
            유지하고 보존하기 위해 맞춤형으로 설계되어 구성장비의 수명과 동작이 효율적으로 이루어질 수
            있도록 설계 및 제작하고 있습니다.
          </p>
          <p>
            당사는 혁신과 지속적인 개선을 통해 고객의 요구에 완벽한 품질과 서비스로 고객만족을
            최우선의 가치로 여기고 있으며, 앞으로도 저희 임직원은 더 좋은 품질과 신뢰를 바탕으로 최선의
            노력을 기울일 것을 약속드립니다.
          </p>
          <p>
            고객 여러분들의 지속적인 성원과 관심 부탁드립니다. 감사합니다.
          </p>

          <div className="greeting-sign">
            <strong>대표이사 조성록</strong>
          </div>
        </section>
      </div>
    </section>
  );
}
