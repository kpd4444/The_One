import itsImg from "../assets/product-its-enclosure.jpg";
import kioskImg from "../assets/product-kiosk-body.jpg";
import projectBeamImg from "../assets/product-project-beam-case-a.jpg";

export const metrics = [
  { label: "진행 프로젝트", value: "210+" },
  { label: "납기 준수율", value: "98.2%" },
  { label: "재의뢰 비율", value: "84%" },
];

export const productGroups = [
  "각종 하우징 및 케이스",
  "무인 정산기 및 로비폰",
  "통신 함체(컨트롤 함체)",
  "프로젝트 빔 케이스",
  "ITS 장비 함체",
];

export const strengths = [
  {
    title: "맞춤 설계 최적화",
    desc: "구성 장비의 배치, 방수, 방열, 유지보수 동선까지 고려해 현장 환경에 맞는 케이스와 함체를 설계합니다.",
  },
  {
    title: "가공부터 조립까지 일괄 대응",
    desc: "절단, 용접, 표면 처리, 조립까지 이어지는 제작 과정을 내부 기준으로 관리해 안정적인 품질을 유지합니다.",
  },
  {
    title: "장비 수명과 안정성 중심",
    desc: "장비가 최적의 상태로 유지되고 보존될 수 있도록 구조와 사용 환경을 함께 고려해 제작합니다.",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "요구사항 분석",
    desc: "설치 환경, 장비 구성, 유지보수 조건을 검토해 핵심 요구사항을 정리합니다.",
  },
  {
    step: "02",
    title: "맞춤 구조 설계",
    desc: "현장 사용성과 장비 보호 목적을 반영해 케이스와 함체 구조를 구체화합니다.",
  },
  {
    step: "03",
    title: "제작 및 출하 검수",
    desc: "가공과 조립 이후 최종 상태를 점검하고, 안정적인 출하 기준으로 마무리합니다.",
  },
];

export const featuredProjects = [
  {
    title: "ITS 장비 함체",
    category: "ITS / INFRA",
    image: itsImg,
  },
  {
    title: "무인 정산기 및 키오스크",
    category: "PARKING / KIOSK",
    image: kioskImg,
  },
  {
    title: "프로젝트 빔 케이스",
    category: "EVENT / CUSTOM CASE",
    image: projectBeamImg,
  },
];
