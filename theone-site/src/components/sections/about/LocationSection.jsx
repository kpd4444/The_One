import { useEffect, useRef, useState } from "react";

const KAKAO_APP_KEY = "cfce6ff2ff19f408cd151d9a41cfd20a";
const COMPANY_NAME = "더원산업";
const COMPANY_ADDRESS = "경기도 김포시 대곶면 오니산로 100";
const COMPANY_PHONE = "031-997-4020";

export default function LocationSection() {
  const mapRef = useRef(null);
  const [mapError, setMapError] = useState("");

  useEffect(() => {
    const initializeMap = () => {
      if (!window.kakao || !mapRef.current) return;

      const kakao = window.kakao;
      const defaultCenter = new kakao.maps.LatLng(37.647563, 126.549588);
      const map = new kakao.maps.Map(mapRef.current, {
        center: defaultCenter,
        level: 4,
      });

      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(COMPANY_ADDRESS, (result, status) => {
        if (status !== kakao.maps.services.Status.OK || !result[0]) {
          setMapError("지도를 불러오는 중 위치 정보를 찾지 못했습니다.");
          return;
        }

        const latlng = new kakao.maps.LatLng(result[0].y, result[0].x);
        map.setCenter(latlng);

        const marker = new kakao.maps.Marker({
          map,
          position: latlng,
        });

        const info = new kakao.maps.InfoWindow({
          content: `<div style="padding:8px 10px;font-size:12px;font-weight:700;">${COMPANY_NAME}</div>`,
        });
        info.open(map, marker);
      });
    };

    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(initializeMap);
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false&libraries=services`;
    script.onload = () => window.kakao.maps.load(initializeMap);
    script.onerror = () =>
      setMapError("카카오맵 스크립트를 불러오지 못했습니다. 네트워크 상태를 확인해 주세요.");
    document.head.appendChild(script);
  }, []);

  return (
    <section id="location" className="section section-muted">
      <div className="container">
        <div className="location-panel">
          <header className="location-panel-head">
            <h2>찾아오시는 길</h2>
            <p>방문 전 고객센터를 통해 일정을 먼저 조율해 주세요.</p>
          </header>

          <div className="location-panel-body">
            <div className="location-map-wrap">
              <div ref={mapRef} className="location-map" aria-label="카카오맵 위치 지도" />
              {mapError && <p className="location-map-error">{mapError}</p>}
            </div>

            <aside className="location-info-stack" aria-label="방문 안내">
              <article className="location-info-card is-primary">
                <span className="location-label">주소</span>
                <h3>{COMPANY_ADDRESS}</h3>
                <p>네비게이션에 "더원산업" 검색 시 더 빠르게 찾을 수 있습니다.</p>
              </article>

              <article className="location-info-card">
                <span className="location-label">대표 연락처</span>
                <h3>{COMPANY_PHONE}</h3>
                <p>평일 09:00 ~ 18:00 (주말/공휴일 휴무)</p>
              </article>

              <article className="location-info-card">
                <span className="location-label">방문 안내</span>
                <h3>사전 예약 방문</h3>
                <p>현장 대응 일정이 있어 방문 전 문의를 권장드립니다.</p>
              </article>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
