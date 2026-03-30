# SEO Launch Checklist

## 1. Google Search Console

- [ ] `https://theone412.com/` 속성 추가
- [ ] 권장 방식: DNS TXT 레코드로 도메인 소유권 인증
- [ ] DNS 인증이 어렵다면 HTML 파일 업로드 또는 HTML 태그 방식 사용
- [ ] 인증 후 `https://theone412.com/sitemap.xml` 제출
- [ ] 색인 생성 > 페이지 메뉴에서 주요 페이지가 수집되는지 확인
- [ ] URL 검사로 `/`, `/about`, `/products`, `/gallery`, `/support` 테스트
- [ ] 모바일 사용성/코어 웹 바이탈 경고가 있는지 확인

## 2. robots / sitemap 확인

- [ ] `https://theone412.com/robots.txt` 접속 확인
- [ ] `https://theone412.com/sitemap.xml` 접속 확인
- [ ] sitemap 내 URL이 모두 실제 운영 주소와 일치하는지 확인
- [ ] 불필요한 테스트 URL 또는 개발 URL이 없는지 확인

## 3. 메타 / OG 확인 포인트

### 홈
- [ ] 브라우저 탭 제목이 브랜드명과 핵심 키워드를 포함하는지 확인
- [ ] 페이지 소스에서 `canonical`이 `https://theone412.com/`로 나오는지 확인
- [ ] `og:title`, `og:description`, `og:image`가 존재하는지 확인

### 서브 페이지
- [ ] `/about`
- [ ] `/products`
- [ ] `/gallery`
- [ ] `/support`
- [ ] 각 페이지 제목과 설명이 동일하지 않고 페이지 성격에 맞게 달라지는지 확인

## 4. 공유 미리보기 확인

아래 서비스에서 공유 카드가 정상인지 확인:

- Facebook Sharing Debugger
- LinkedIn Post Inspector
- KakaoTalk 내부 브라우저 미리보기
- Slack/Discord 링크 미리보기

확인 항목:

- [ ] 제목이 자연스럽게 보이는지
- [ ] 설명이 너무 길거나 잘리지 않는지
- [ ] OG 이미지가 깨지지 않는지
- [ ] 캐시가 남아 있으면 디버거에서 다시 스크랩 실행

## 5. 실제 브라우저 점검

- [ ] 강력 새로고침 후에도 favicon이 정상 노출되는지 확인
- [ ] 페이지 이동 시 탭 제목이 즉시 바뀌는지 확인
- [ ] 갤러리 페이지에서 모달 열기/이동/확대/축소가 모바일에서도 무리 없는지 확인
- [ ] 확대 상태에서 이미지가 레이아웃을 깨지 않는지 확인
- [ ] 썸네일 스트립 선택 시 현재 이미지와 일치하는지 확인

## 6. 배포 후 권장 순서

1. 배포 완료 확인
2. `robots.txt`, `sitemap.xml` 실주소 확인
3. 메인 페이지 소스에서 meta/OG 확인
4. Search Console 속성 인증
5. sitemap 제출
6. 주요 URL 검사
7. 공유 미리보기 강제 갱신

## 7. 참고

현재 프로젝트는 아래 기준으로 설정되어 있습니다.

- Site URL: `https://theone412.com`
- Sitemap: `https://theone412.com/sitemap.xml`
- Robots: `https://theone412.com/robots.txt`
- 기본 OG 이미지: `/og-cover.svg`
