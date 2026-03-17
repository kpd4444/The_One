import itsImg from "../assets/product-its-enclosure.jpg";
import kioskImg from "../assets/product-kiosk-body.jpg";
import projectBeamAImg from "../assets/product-project-beam-case-a.jpg";
import projectBeamBImg from "../assets/product-project-beam-case-b.jpg";
import gateLprAImg from "../assets/product-gate-lpr-a.jpg";
import gateLprBImg from "../assets/product-gate-lpr-b.jpg";
import telecomImg from "../assets/product-telecom-enclosure.jpg";
import housingImg from "../assets/product-housing.jpg";

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

export const applicationFields = [
  "VDS",
  "RWIS",
  "AVI",
  "VMS",
  "ITS용 함체",
  "주차 관제",
  "통신 장비",
];

export const pageTabs = [
  { id: "feature", label: "제품 특성" },
  { id: "apply", label: "적용 분야" },
];
