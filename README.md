# OZ Externship Admin System

OZ 엑스턴십 관리자용 웹 애플리케이션입니다.
회원 관리, 쪽지 시험 배포 및 관리, 대시보드 등 관리 기능을 제공합니다.

---

## 목차

- [기능](#기능)
- [기술 스택](#기술-스택)
- [시작하기](#시작하기)
- [프로젝트 구조](#프로젝트-구조)
- [주요 라우트](#주요-라우트)
- [개발 가이드](#개발-가이드)
- [배포](#배포)

---

## 기능

### 공통

- **로그인**: JWT(JSON Web Token) 기반 인증
- **글로벌 알림/토스트**: 전역 알림 모달 및 토스트 메시지
- **에러 처리**: 전역 에러 캐처 및 401 토큰 갱신
- **조회 UI**: 검색 Input과 조회 버튼을 공통 컴포넌트로 구현

### 회원 (Member)

- **유저 관리**: 회원 목록 조회, 상세 정보, 권한 변경, 정보 수정, 회원 삭제
- **수강생 관리**: 학생 목록 조회
- **수강생 등록 신청**: 수강생 등록 신청 목록 조회, 승인 및 반려
- **회원 탈퇴 관리**: 회원 탈퇴 관리 목록 조회, 탈퇴내역 상세 조회, 유저 복구
- **대시보드**: 월/연간 가입자 현황 그래프, 월/연간 탈퇴자 현황 그래프, 탈퇴 사유 그래프, 월/연간 수강생 전환 추이 그래프

### 쪽지시험 (Exam)

- **쪽지시험 관리**: 쪽지시험 조회, 쪽지시험 상세 조회, 배포, 생성
- **배포 내역 관리**: 쪽지시험 배포 내역 조회, 배포 내역 상세 조회, 배포 활성화, 배포 내역 삭제, 과정별 필터링
- **응시 내역 관리**: 쪽지시험 목록 조회, 과정별 필터링, 풀이 보기, 삭제
- **대시보드**: 수강생 과목 별 점수 및 쪽지시험 기수 별 평균 그래프

---

## 기술 스택

| 분류           | 기술                                     |
| -------------- | ---------------------------------------- |
| **프레임워크** | React 19, Vite 6                         |
| **언어**       | TypeScript                               |
| **스타일링**   | Tailwind CSS 4                           |
| **라우팅**     | React Router 7                           |
| **상태 관리**  | Zustand                                  |
| **서버 상태**  | TanStack React Query                     |
| **HTTP**       | Axios                                    |
| **차트**       | Recharts                                 |
| **문서/파일**  | jsPDF, html2canvas, ExcelJS, file-saver  |
| **개발 도구**  | ESLint, Prettier, Husky, Commitlint, MSW |

---

## 시작하기

### 사전 요구사항

- Node.js 18.x 이상
- npm

### 설치 및 실행

```bash
# 의존성 설치
npm install
# 개발 서버 실행 (http://localhost:5173)
npm run dev
# 빌드
npm run build
# 빌드 결과물 미리보기
npm run preview
```

### 환경 변수

필요 시 `.env` 파일 생성 후 API 베이스 URL 등을 설정합니다.

## 프로젝트 구조

```
src/
├── api/              # API 클라이언트 및 엔드포인트
├── assets/           # 이미지, 폰트, 아이콘
├── components/       # 재사용 컴포넌트
│   ├── common/       # 공통 UI (버튼, 모달, 토스트 등)
│   ├── detail-exam/  # 시험 상세 (문제 목록, 문제 모달)
│   ├── exam-attempt/ # 시험 응시 관련 (솔루션 뷰 등)
│   ├── exam-deployment/  # 시험 배포 관련
│   ├── graph/        # 차트 컴포넌트
│   ├── layout/       # 레이아웃 (헤더, 사이드바 등)
│   ├── member-management/  # 회원 관리 모달
│   └── table/        # 테이블 컴포넌트
├── constants/        # 상수, API 경로, 설정
├── hooks/            # 커스텀 훅
├── lib/              # 유틸리티 (cn, export 등)
├── mocks/            # MSW 핸들러 및 목 데이터
├── pages/            # 페이지 컴포넌트
│   ├── exam-page/    # 시험 관련 페이지
│   ├── login/        # 로그인
│   ├── member-management/  # 회원 관련 페이지
│   └── not-found/    # 404
├── store/            # Zustand 스토어
├── types/            # 타입 정의
└── utils/            # 유틸 함수
```

---

## 주요 라우트

| 경로                            | 설명                    |
| ------------------------------- | ----------------------- |
| `/login`                        | 로그인                  |
| `/members/management`           | 유저 관리 (기본 진입)   |
| `/members/student-management`   | 수강생 관리             |
| `/members/student-registration` | 수강생 등록 신청        |
| `/members/withdrawal`           | 회원 탈퇴 관리          |
| `/members/dashboard`            | 회원 대시보드           |
| `/exam/list`                    | 시험 목록               |
| `/exam/list/:id`                | 시험 상세               |
| `/exam/deployments`             | 시험 배포               |
| `/exam/history`                 | 시험 응시 내역          |
| `/exam/history/filtered`        | 필터링된 시험 응시 내역 |
| `/exam/dashboard`               | 시험 대시보드           |
| `/404`                          | 404 페이지              |

---

## 개발 가이드

### 커밋 컨벤션

Conventional Commits를 사용합니다.

```bash
# 예시
feat: 로그인 기능 구현
fix: 토큰 갱신 오류 수정
chore: 의존성 업데이트
refactor: API 모듈 구조 개선
style: 버튼 스타일 수정
add: 새로운 아이콘 추가
```

허용 타입: `feat`, `fix`, `chore`, `refactor`, `style`, `add`

### 코드 스타일

- **ESLint**: `npm run lint` / `npm run lint:fix`
- **Prettier**: 저장 시 자동 포맷 (Tailwind 클래스 정렬 포함)
- **Husky**: pre-commit 시 lint-staged 실행

### PR 체크리스트

- [ ] 커밋 컨벤션 준수
- [ ] 불필요한 console.log 제거
- [ ] 로컬에서 실행 확인 완료

---

## 배포

- **플랫폼**: Vercel
- **설정**: `vercel.json` (SPA 리라이트 설정)
