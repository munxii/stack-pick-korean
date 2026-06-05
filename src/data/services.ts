export interface Plan {
  name: string;
  price: number | null; // null = 무료
  priceLabel: string;
  features: string[];
}

export interface Service {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  description: string;
  logo: string; // emoji for now
  tags: string[];
  hasFreePlan: boolean;
  teamSupport: boolean;
  openSource: boolean;
  koreanSupport: boolean;
  plans: Plan[];
  pros: string[];
  cons: string[];
  recommendedFor: string[];
  alternatives: string[];
}

export const categories = [
  { id: "ai", label: "AI", icon: "🤖", description: "AI 어시스턴트 및 생성형 AI 도구" },
  { id: "hosting", label: "호스팅", icon: "🌐", description: "웹 호스팅 및 배포 플랫폼" },
  { id: "backend", label: "백엔드/DB", icon: "🗄️", description: "백엔드 서비스 및 데이터베이스" },
  { id: "devtool", label: "개발툴", icon: "🛠️", description: "개발 생산성 도구" },
  { id: "design", label: "디자인", icon: "🎨", description: "디자인 및 프로토타이핑 도구" },
  { id: "collaboration", label: "협업툴", icon: "🤝", description: "팀 협업 및 프로젝트 관리" },
];

export const services: Service[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    category: "ai",
    categoryLabel: "AI",
    description: "OpenAI의 대화형 AI 어시스턴트. 코드 생성, 글쓰기, 분석 등 다양한 작업을 수행합니다.",
    logo: "🤖",
    tags: ["AI", "챗봇", "코드생성"],
    hasFreePlan: true,
    teamSupport: true,
    openSource: false,
    koreanSupport: true,
    plans: [
      { name: "무료", price: null, priceLabel: "무료", features: ["GPT-3.5 무제한", "기본 기능"] },
      { name: "Plus", price: 20, priceLabel: "$20/월", features: ["GPT-4 접근", "빠른 응답", "플러그인", "DALL·E 이미지 생성"] },
      { name: "Team", price: 25, priceLabel: "$25/월/인", features: ["Plus 모든 기능", "팀 관리", "높은 사용량 제한"] },
    ],
    pros: ["다양한 작업 수행 가능", "한국어 지원 우수", "플러그인 생태계"],
    cons: ["무료 플랜 제한적", "최신 정보 부족할 수 있음"],
    recommendedFor: ["학생", "개인 개발자", "스타트업"],
    alternatives: ["claude", "gemini"],
  },
  {
    id: "claude",
    name: "Claude",
    category: "ai",
    categoryLabel: "AI",
    description: "Anthropic의 AI 어시스턴트. 긴 문서 분석과 코딩에 강점이 있습니다.",
    logo: "🧠",
    tags: ["AI", "챗봇", "문서분석"],
    hasFreePlan: true,
    teamSupport: true,
    openSource: false,
    koreanSupport: true,
    plans: [
      { name: "무료", price: null, priceLabel: "무료", features: ["Claude 3.5 Sonnet", "제한된 사용량"] },
      { name: "Pro", price: 20, priceLabel: "$20/월", features: ["Claude 3.5 Opus", "5배 사용량", "우선 접근"] },
      { name: "Team", price: 25, priceLabel: "$25/월/인", features: ["Pro 모든 기능", "팀 관리", "관리자 대시보드"] },
    ],
    pros: ["긴 컨텍스트 처리", "안전한 응답", "코딩 능력 우수"],
    cons: ["플러그인 없음", "이미지 생성 불가"],
    recommendedFor: ["개인 개발자", "스타트업"],
    alternatives: ["chatgpt"],
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "hosting",
    categoryLabel: "호스팅",
    description: "프론트엔드 프레임워크를 위한 최적화된 배포 플랫폼. Next.js 공식 지원.",
    logo: "▲",
    tags: ["호스팅", "배포", "CDN"],
    hasFreePlan: true,
    teamSupport: true,
    openSource: false,
    koreanSupport: false,
    plans: [
      { name: "Hobby", price: null, priceLabel: "무료", features: ["개인 프로젝트", "SSL 포함", "100GB 대역폭"] },
      { name: "Pro", price: 20, priceLabel: "$20/월", features: ["팀 협업", "고급 분석", "비밀번호 보호", "1TB 대역폭"] },
      { name: "Enterprise", price: null, priceLabel: "문의", features: ["SLA 보장", "전담 지원", "맞춤 설정"] },
    ],
    pros: ["빠른 배포", "Next.js 최적화", "뛰어난 DX"],
    cons: ["서버리스 제한", "가격 예측 어려움"],
    recommendedFor: ["개인 개발자", "스타트업"],
    alternatives: ["netlify"],
  },
  {
    id: "supabase",
    name: "Supabase",
    category: "backend",
    categoryLabel: "백엔드/DB",
    description: "오픈소스 Firebase 대안. PostgreSQL 기반 백엔드 서비스.",
    logo: "⚡",
    tags: ["백엔드", "DB", "인증", "오픈소스"],
    hasFreePlan: true,
    teamSupport: true,
    openSource: true,
    koreanSupport: false,
    plans: [
      { name: "무료", price: null, priceLabel: "무료", features: ["500MB DB", "1GB 스토리지", "50K 월간 활성 사용자"] },
      { name: "Pro", price: 25, priceLabel: "$25/월", features: ["8GB DB", "100GB 스토리지", "무제한 사용자", "일일 백업"] },
      { name: "Team", price: 599, priceLabel: "$599/월", features: ["SOC2 준수", "우선 지원", "SLA 보장"] },
    ],
    pros: ["오픈소스", "PostgreSQL 기반", "실시간 기능"],
    cons: ["학습 곡선", "일부 기능 제한적"],
    recommendedFor: ["개인 개발자", "스타트업"],
    alternatives: ["firebase"],
  },
  {
    id: "notion",
    name: "Notion",
    category: "collaboration",
    categoryLabel: "협업툴",
    description: "올인원 워크스페이스. 문서, 위키, 프로젝트 관리를 하나의 도구로.",
    logo: "📝",
    tags: ["협업", "문서", "프로젝트관리"],
    hasFreePlan: true,
    teamSupport: true,
    openSource: false,
    koreanSupport: true,
    plans: [
      { name: "무료", price: null, priceLabel: "무료", features: ["개인 사용", "기본 블록", "7일 히스토리"] },
      { name: "Plus", price: 10, priceLabel: "$10/월", features: ["무제한 블록", "무제한 파일 업로드", "30일 히스토리"] },
      { name: "Business", price: 18, priceLabel: "$18/월/인", features: ["SAML SSO", "고급 분석", "250명 게스트"] },
    ],
    pros: ["유연한 구조", "한국어 완벽 지원", "다양한 템플릿"],
    cons: ["오프라인 제한적", "대용량 데이터 느림"],
    recommendedFor: ["학생", "개인 개발자", "스타트업"],
    alternatives: ["confluence"],
  },
  {
    id: "github",
    name: "GitHub",
    category: "devtool",
    categoryLabel: "개발툴",
    description: "세계 최대 코드 호스팅 플랫폼. Git 리포지토리, CI/CD, 프로젝트 관리.",
    logo: "🐙",
    tags: ["개발", "Git", "CI/CD"],
    hasFreePlan: true,
    teamSupport: true,
    openSource: false,
    koreanSupport: false,
    plans: [
      { name: "Free", price: null, priceLabel: "무료", features: ["무제한 공개 리포", "500MB 패키지", "2,000 Actions 분"] },
      { name: "Team", price: 4, priceLabel: "$4/월/인", features: ["보호 브랜치", "3,000 Actions 분", "2GB 패키지"] },
      { name: "Enterprise", price: 21, priceLabel: "$21/월/인", features: ["SAML SSO", "감사 로그", "50,000 Actions 분"] },
    ],
    pros: ["업계 표준", "풍부한 생태계", "무료 플랜 충분"],
    cons: ["UI 복잡할 수 있음", "비공개 리포 제한"],
    recommendedFor: ["학생", "개인 개발자", "스타트업"],
    alternatives: ["gitlab"],
  },
  {
    id: "figma",
    name: "Figma",
    category: "design",
    categoryLabel: "디자인",
    description: "브라우저 기반 디자인 툴. 실시간 협업과 프로토타이핑에 최적화.",
    logo: "🎨",
    tags: ["디자인", "프로토타입", "협업"],
    hasFreePlan: true,
    teamSupport: true,
    openSource: false,
    koreanSupport: true,
    plans: [
      { name: "Starter", price: null, priceLabel: "무료", features: ["3개 파일", "무제한 뷰어", "30일 히스토리"] },
      { name: "Professional", price: 12, priceLabel: "$12/월/인", features: ["무제한 파일", "팀 라이브러리", "브랜치"] },
      { name: "Organization", price: 45, priceLabel: "$45/월/인", features: ["조직 관리", "디자인 시스템", "SSO"] },
    ],
    pros: ["실시간 협업", "무료 플랜 넉넉", "풍부한 플러그인"],
    cons: ["오프라인 불가", "대용량 파일 느림"],
    recommendedFor: ["학생", "개인 개발자", "스타트업"],
    alternatives: ["sketch"],
  },
  {
    id: "netlify",
    name: "Netlify",
    category: "hosting",
    categoryLabel: "호스팅",
    description: "정적 사이트 및 서버리스 함수를 위한 올인원 배포 플랫폼.",
    logo: "🌊",
    tags: ["호스팅", "배포", "서버리스"],
    hasFreePlan: true,
    teamSupport: true,
    openSource: false,
    koreanSupport: false,
    plans: [
      { name: "Starter", price: null, priceLabel: "무료", features: ["100GB 대역폭", "300분 빌드", "1 멤버"] },
      { name: "Pro", price: 19, priceLabel: "$19/월", features: ["1TB 대역폭", "25,000분 빌드", "비밀번호 보호"] },
      { name: "Enterprise", price: null, priceLabel: "문의", features: ["SLA 보장", "전담 지원", "고급 보안"] },
    ],
    pros: ["간편한 배포", "무료 SSL", "폼 처리 내장"],
    cons: ["서버리스 제한", "빌드 시간 제한"],
    recommendedFor: ["개인 개발자", "스타트업"],
    alternatives: ["vercel"],
  },
];

export const popularCombos = [
  {
    title: "프리랜서 개발자 스택",
    services: ["github", "vercel", "supabase"],
    totalFree: true,
    totalPaid: "$49/월",
  },
  {
    title: "스타트업 MVP 스택",
    services: ["chatgpt", "github", "vercel", "supabase", "figma"],
    totalFree: false,
    totalPaid: "$81/월",
  },
  {
    title: "1인 크리에이터 스택",
    services: ["notion", "figma", "chatgpt"],
    totalFree: true,
    totalPaid: "$42/월",
  },
];

export function getServiceById(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}

export function getServicesByCategory(categoryId: string): Service[] {
  return services.filter((s) => s.category === categoryId);
}
