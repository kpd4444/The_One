# 더원산업 웹사이트

React 19, Vite 7, React Router 7로 만든 더원산업 공식 웹사이트입니다. Vercel 배포를 기준으로 하며 빌드 시 주요 경로별 정적 HTML과 사이트맵을 생성합니다.

## 로컬 실행

```bash
npm install
npm run dev
npm run lint
npm run build
```

## 환경변수

- `VITE_SITE_URL`: 운영 canonical URL (`https://theone412.com`)
- `VITE_KAKAO_APP_KEY`: 카카오맵 JavaScript 키

## 이미지와 배포

최적화 이미지 파일은 `src/assets`에, 저장소에서 제외한 변환 전 원본은 `assets-source`에 보관합니다. `npm run optimize:images`로 WebP 파일을 다시 만들 수 있습니다. `main` 브랜치를 Vercel에 연결하고 운영 환경변수를 설정한 뒤 배포합니다.

자세한 검색 등록 절차는 `docs/seo-launch-checklist.md`를 확인하세요.
