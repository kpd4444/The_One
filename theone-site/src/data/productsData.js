import itsImg from "../assets/product-its-enclosure.webp";
import kioskImg from "../assets/product-kiosk-body.webp";
import projectBeamAImg from "../assets/product-project-beam-case-a.webp";
import projectBeamBImg from "../assets/product-project-beam-case-b.webp";
import gateLprAImg from "../assets/product-gate-lpr-a.webp";
import gateLprBImg from "../assets/product-gate-lpr-b.webp";
import telecomImg from "../assets/product-telecom-enclosure.webp";
import housingImg from "../assets/product-housing.webp";

export const products = [
  {
    id: "knm",
    code: "KNM",
    name: "ITS 함체",
    material: "스테인레스",
    usage: "주제어기 및 장비의 보호 및 체결",
    images: [itsImg],
  },
  {
    id: "krm",
    code: "KRM",
    name: "정산기",
    material: "CR 및 EGI",
    usage: "주차 관제 시스템",
    images: [kioskImg],
  },
  {
    id: "ktm",
    code: "KTM",
    name: "프로젝트 빔케이스 및 프로젝트 빔",
    material: "SUS 및 SUS폴, EGI",
    usage: "야외 행사용 및 교육용",
    images: [projectBeamAImg, projectBeamBImg],
  },
  {
    id: "kgm",
    code: "KGM",
    name: "GATE LPR",
    material: "CR 및 EGI",
    usage: "실내 및 야외 행사용",
    images: [gateLprAImg, gateLprBImg],
  },
  {
    id: "knm-m",
    code: "KNM-M",
    name: "통신함체",
    material: "스테인레스(SUS, STS)",
    usage: "통신장비용",
    images: [telecomImg],
  },
  {
    id: "krm-m",
    code: "KRM-M",
    name: "하우징",
    material: "SUS 및 알루미늄(AL)",
    usage: "차량번호인식카메라 및 단속카메라 장비용",
    images: [housingImg],
  },
];

export const productFeatures = [
  "내·외부 구성장비의 최적화 상태 유지 및 보호",
  "맞춤형 설계를 통한 장비 수명과 동작 효율 향상",
  "태양열에 의한 내부 온도 상승을 줄이는 이중 구조 적용",
];

export const applicationAreas = [
  {
    title: "지능형 교통 시스템",
    tags: ["VDS", "RWIS", "AVI", "VMS", "ITS용 함체"],
    description:
      "도로 교통 정보를 수집·표출하는 제어 장비를 외부 환경으로부터 보호하는 함체를 제작합니다.",
  },
  {
    title: "주차 관제",
    tags: ["무인 정산기", "GATE LPR", "키오스크"],
    description:
      "차량번호 인식과 요금 정산 장비에 맞춘 케이스 및 현장 운용 구조를 제공합니다.",
  },
  {
    title: "통신·기반 시설",
    tags: ["통신 장비", "제어 함체", "옥외 설비"],
    description:
      "통신 및 제어 장비의 배선, 방열, 유지보수 동선을 고려한 맞춤 함체를 설계합니다.",
  },
  {
    title: "카메라·현장 장비",
    tags: ["단속 카메라", "차량번호 인식", "프로젝터 하우징"],
    description:
      "카메라와 광학 장비가 설치 환경에서 안정적으로 작동하도록 전용 하우징을 제작합니다.",
  },
];

export const pageTabs = [
  { id: "feature", label: "제품 특성" },
  { id: "apply", label: "적용 분야" },
];
