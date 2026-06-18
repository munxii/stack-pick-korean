<div align="center">

# 🪜 PlanPick

### 흩어진 SaaS 요금제를 한눈에 비교하고, 최적의 구독 조합을 추천하는 SaaS 구독 최적화 플랫폼

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Stripe](https://img.shields.io/badge/Stripe-635BFF?logo=stripe&logoColor=white)](https://stripe.com/)

**구독료 매달 $48 → $31, 17달러 절감을 자동으로**

[🌐 라이브 데모](https://stack-savvy-saver.lovable.app) · [📊 발표 자료](docs/PlanPick_최종발표.pdf) · [📐 아키텍처](#-시스템-아키텍처)

</div>

---

## 🎯 PlanPick은 어떤 문제를 푸나요?

ChatGPT 결제하고, 호스팅 결제하고, 노션 결제하고…
**매달 빠져나가는 구독료, 진짜 다 필요한 거 맞나요?**

저희가 정의한 문제는 6가지입니다.

| # | 문제 |
|---|---|
| 1️⃣ | **정보가 흩어져 있다** — 서비스마다 가격 페이지 구조가 제각각 |
| 2️⃣ | **무료 한도가 불명확하다** — "무료 제공"의 실제 한계가 모호 |
| 3️⃣ | **묶었을 때 총비용 계산이 번거롭다** — 매번 직접 계산해야 함 |
| 4️⃣ | **유사 서비스 비교가 어렵다** — ChatGPT vs Claude, Vercel vs Netlify |
| 5️⃣ | **사용자마다 우선순위가 다르다** — 가격? 기능? 학생 할인? |
| 6️⃣ | **요금제가 수시로 바뀐다** — 노션은 무료 축소, Heroku는 무료 폐지 |

---

## ✨ 핵심 기능

<table>
<tr>
<td width="50%">

### 🔍 통합 비교 카탈로그
6개 카테고리(AI · 호스팅 · 백엔드 · 개발 도구 · 디자인 · 생산성)에 걸쳐
**30+개 SaaS 서비스의 무료/유료 요금제를 한곳에서 비교**합니다.

</td>
<td width="50%">

### 💰 조합 비용 계산 (Pro)
여러 서비스를 묶었을 때의 월간 총비용을 자동 계산하고,
**더 저렴한 대체 조합을 추천**해 매달 평균 17~30달러 절감.

</td>
</tr>
<tr>
<td width="50%">

### 🔔 가격 변동 알림 (Plus+)
구독 중인 서비스의 **요금제 변경을 실시간 감지**하고,
무료 한도 축소·유료 전환 등 중요한 변화를 즉시 알려줍니다.

</td>
<td width="50%">

### 📊 데이터 최신성 보장
관리자 검증 + 사용자 제보 + 크롤러 자동 감지 **3단계 전략**으로
**신호등 표시**(최신·확인 권장·확인 필요)와 함께 투명한 정보 제공.

</td>
</tr>
</table>

---

## 💎 요금제

| 플랜 | 가격 | 주요 기능 | 추천 대상 |
|------|-----|----------|---------|
| **Free** | $0 | 기본 비교 (2개), 카테고리 탐색 | 처음 방문자 |
| **Plus** | $5/월 | 5개 비교, 가격 변동 알림, 북마크 | 학생·개인 개발자 |
| **Pro** ⭐ | $12/월 | 무제한 비교, 조합 총비용 계산, 절약 리포트, 스마트 대체 추천 | 사이드 프로젝트·스타트업 |
| **Team** | $25/월 | 팀 워크스페이스, 공유 대시보드, 시트 시뮬레이션 | 팀·동아리 |

---

## 🏗️ 기술 스택

<table>
<tr>
<td><b>Frontend</b></td>
<td>React 18 · TypeScript · Vite · Tailwind CSS · React Query · shadcn/ui</td>
</tr>
<tr>
<td><b>Backend</b></td>
<td>Supabase Edge Functions (Deno) · JWT 인증 · 플랜별 권한 제어</td>
</tr>
<tr>
<td><b>Database</b></td>
<td>Supabase PostgreSQL · Row-Level Security · Realtime</td>
</tr>
<tr>
<td><b>Auth</b></td>
<td>Supabase Auth (이메일/비밀번호, Google OAuth)</td>
</tr>
<tr>
<td><b>Payment</b></td>
<td>Stripe Checkout · Webhook 기반 구독 관리</td>
</tr>
<tr>
<td><b>Deployment</b></td>
<td>Lovable (Frontend) · Supabase Cloud (DB + Functions) · GitHub Actions (CI/CD)</td>
</tr>
</table>

---

## 📐 시스템 아키텍처

```
┌──────────────────────────────────────────────────────────┐
│                    👤 CLIENT (Browser)                    │
│        React 18 + TypeScript + Tailwind + Vite           │
└─────────────────────────┬────────────────────────────────┘
                          │ HTTPS / REST · JSON
┌─────────────────────────┴────────────────────────────────┐
│                  ⚙️  SERVER (Edge Functions)              │
│   Auth Middleware · Plan Guard · Stripe Webhook Handler  │
└─────────────────────────┬────────────────────────────────┘
                          │ Supabase SDK · SQL
┌─────────────────────────┴────────────────────────────────┐
│                  🗄️  DATABASE (PostgreSQL)                │
│         RLS · Realtime · Storage · 7 Tables              │
└─────────────────────────┬────────────────────────────────┘
                          │
┌─────────────────────────┴────────────────────────────────┐
│              🔌 EXTERNAL SERVICES                         │
│    Supabase Auth · Google OAuth · Stripe · 가격 크롤러    │
└──────────────────────────────────────────────────────────┘
```

**보안 계층**: JWT 인증 (1h + 7d) · CORS 도메인 제한 · Rate Limiting · HTTPS (TLS) · RLS

---

## 🗃️ 데이터베이스 ERD

총 **7개 테이블**, 모두 1:N 관계로 설계.

```
users ──┬── bookmarks ──── services ──── plans ──── price_history
        └── combinations ─── combination_items ──── services
```

- **users**: 사용자 계정 + 멤버십 tier (free/plus/pro/team)
- **services**: SaaS 서비스 메타데이터
- **plans**: 각 서비스의 무료/유료 요금제
- **bookmarks**: 즐겨찾기
- **combinations**: 사용자가 묶은 서비스 조합
- **combination_items**: 조합에 포함된 개별 서비스
- **price_history**: 가격 변동 이력 (최신성 검증용)

자세한 스키마는 [`docs/ERD.pdf`](docs/ERD.pdf) 참고.

---

## 🚀 시작하기

### 사전 요구사항

- Node.js 20+
- Bun 또는 npm
- Supabase 프로젝트
- Stripe 계정 (테스트 모드)

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/[USERNAME]/planpick.git
cd planpick

# 의존성 설치
bun install
# 또는 npm install

# 환경변수 설정
cp .env.example .env
# .env 파일에 Supabase, Stripe 키 입력

# 개발 서버 실행
bun run dev
# 또는 npm run dev
```

### 환경변수

```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxx...

# Stripe (Client)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxx...

# Supabase Edge Function Secrets (서버 측)
STRIPE_SECRET_KEY=sk_test_xxx...
STRIPE_WEBHOOK_SECRET=whsec_xxx...
```

---

## 📁 프로젝트 구조

```
planpick/
├── src/
│   ├── components/      # 재사용 컴포넌트 (Header, Footer, PricingCard 등)
│   ├── pages/           # 라우트 페이지 (Home, Pricing, Compare, Dashboard 등)
│   ├── hooks/           # 커스텀 훅 (useAuth 등)
│   ├── lib/             # 클라이언트 라이브러리 (stripe.ts, supabase.ts)
│   ├── data/            # 정적 데이터 (services.ts, categories 등)
│   └── integrations/
│       └── supabase/    # Supabase 클라이언트 설정
├── supabase/
│   ├── functions/
│   │   └── stripe-webhook/  # 결제 이벤트 처리 엣지 함수
│   └── migrations/      # DB 스키마 마이그레이션
├── docs/                # 프로젝트 문서 (SDS, ERD, API 명세 등)
└── README.md
```

---

## 🗺️ 로드맵

PlanPick은 **비교 도구**에서 멈추지 않습니다.

```
1단계 (현재)        →  2단계               →  3단계               →  4단계
요금제 비교           내 구독 관리           가격 알림              팀 플랜 추천
                                                                   제휴 할인 연동
```

| 단계 | 핵심 기능 | 상태 |
|------|---------|------|
| **1. 요금제 비교** | 카탈로그, 비교, 요금제 페이지 | ✅ 완료 |
| **2. 내 구독 관리** | 대시보드, 조합 저장, 총비용 시각화 | 🚧 개발 중 |
| **3. 가격 알림** | 변동 감지, 이메일·푸시 알림 | 📅 계획 |
| **4. 팀·제휴** | 팀 시뮬레이션, 학생/스타트업 할인 큐레이션 | 📅 계획 |

---

## 🧪 데이터 최신성 전략

요금제가 수시로 바뀌는 게 가장 큰 도전입니다. 3단계 전략:

1. **MVP**: 관리자 직접 입력 + 사용자 제보 (커뮤니티 기여)
2. **성장기**: Python 크롤러로 공개된 가격 페이지 모니터링, 변경 자동 감지
3. **장기**: 공식 API 연동 + 커뮤니티 검증 워크플로우

사용자에게는 **신호등 표시**로 신뢰도 노출:

- 🟢 **최신** — 30일 이내 검증
- 🟡 **확인 권장** — 30~90일
- 🔴 **확인 필요** — 90일+ 미검증

---

## 🆚 기존 서비스와의 차별점

| 서비스 | 대안 추천 | 리뷰 | 디렉토리 | 가격 비교 | **조합 비용 계산** | **절약 추천** | **변경 감지** |
|--------|----------|------|---------|----------|--------------------|---------------|----------------|
| AlternativeTo | ✅ | △ | ✅ | ❌ | ❌ | ❌ | ❌ |
| G2 | △ | ✅ | ✅ | △ | ❌ | ❌ | ❌ |
| Slant | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **PlanPick** | ✅ | — | ✅ | ✅ | **✅** | **✅** | **✅** |

기존 서비스는 "어떤 서비스가 있나"에서 멈추지만, **PlanPick은 비용 최적화 자체를 핵심으로** 합니다.

---

## 📄 라이선스

이 프로젝트는 학술 목적으로 개발되었습니다.

---

<div align="center">

**흩어진 구독을, 똑똑하게 정리해 드립니다.**

[🌐 사이트 방문](https://stack-savvy-saver.lovable.app) · [📊 발표 자료 보기](docs/PlanPick_최종발표.pdf)

</div>
