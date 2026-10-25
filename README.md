# 🚀 DevLog - 버튼 누르면 화면이 스르륵 바뀌는 요즘 웹사이트 만들기

> **Codyssey 미션 B1-2**  
> React 18, React Router v6, Supabase, CSS Variables 디자인 시스템을 활용한 현대적인 Single Page Application (SPA)

---

## 📌 목차
1. [프로젝트 소개](#-프로젝트-소개)
2. [핵심 기능 및 화면 구성](#-핵심-기능-및-화면-구성)
3. [기술 스택](#-기술-스택)
4. [빠른 시작 가이드 (Windows CMD 기준)](#-빠른-시작-가이드-windows-cmd-기준)
5. [Supabase 데이터베이스 연동 안내](#-supabase-데이터베이스-연동-안내)
6. [폴더 및 컴포넌트 아키텍처](#-폴더-및-컴포넌트-아키텍처)
7. [🎓 퍼실리테이터 1:1 구술 평가 완벽 대비 Q&A (핵심 5문항)](#-퍼실리테이터-11-구술-평가-완벽-대비-qa)

---

## 🌟 프로젝트 소개
본 프로젝트는 **"사용자 이벤트 → 상태(State) 변화 → 선언적 렌더링 변화"**로 이어지는 React의 핵심 메커니즘을 체계적으로 구현한 개발자 지식 아카이브 웹 애플리케이션입니다.

- **페이지 깜빡임 없는 SPA 라우팅**: React Router v6 기반으로 5개 이상의 정교한 라우트를 제공합니다.
- **실시간 데이터 CRUD**: 원격 Supabase DB 및 로컬 스토리지 Fallback 지원으로 즉시 테스트 가능합니다.
- **체계적인 상태 UI**: 비동기 데이터 처리 과정에서 일관된 로딩(Loading), 에러(Error), 빈 데이터(Empty) 상태를 전용 재사용 컴포넌트로 처리합니다.
- **풍부한 인터랙션**: 글 작성 시 실시간 미리보기(Live Preview), 검색/필터 즉각 반응, 전역 토스트(Toast) 알림 및 다크/라이트 테마를 지원합니다.

---

## 🖥️ 핵심 기능 및 화면 구성

| 라우트 주소 | 페이지 명칭 | 주요 기능 및 상태 변화 |
| :--- | :--- | :--- |
| `/` | **홈 (대시보드)** | 전체 통계 카드 그리드, 최근 등록된 학습 노트 3선, 신규 등록 빠른 버튼 |
| `/items` | **노트 목록** | 카테고리 탭 필터링, 실시간 텍스트 검색, 최신순/오래된순 정렬, 카드 그리드 |
| `/items/:id` | **노트 상세** | 특정 노트 본문 조회, 등록/수정 일시 확인, 수정 링크, 삭제 확인 모달 팝업 |
| `/items/new` | **새 노트 작성** | Controlled Input 기반 폼, 유효성 검사, **실시간 미리보기(Live Preview)**, 등록 완료 시 토스트 알림 |
| `/items/:id/edit` | **노트 수정** | 기존 데이터 자동 바인딩, 실시간 에러 검증, 수정 완료 시 상세 화면 이동 |
| `*` (404) | **Not Found** | 잘못된 URL 접근 시 친절한 안내 문구 및 홈 복귀 네비게이션 제공 |

---

## 🛠️ 기술 스택
- **Core Library**: React 18 (`react`, `react-dom`)
- **Build Tool**: Vite 6 (초고속 HMR 및 Rollup 최적화 번들링)
- **Routing**: React Router DOM v6 (`BrowserRouter`, `Routes`, `Route`, `Outlet`, `useNavigate`, `useParams`)
- **Backend / Database**: Supabase (`@supabase/supabase-js`) + LocalStorage Fallback
- **State Management**: React Hooks (`useState`, `useEffect`, `useCallback`, `useMemo`) + Context API (`ThemeContext`, `ToastContext`)
- **Icons**: Lucide React (`lucide-react`)
- **Styling**: Vanilla CSS Variables 기반 테마 시스템 (다크모드/라이트모드, 글래스모피즘)

---

## 💻 빠른 시작 가이드 (Windows CMD 기준)

초보자분들도 명령 프롬프트(`cmd.exe`)에서 바로 실행하실 수 있도록 기본 위치 `C:\Users\domod>` 기준 1단계 이동 명령어부터 안내합니다.

### 1단계: 프로젝트 폴더로 이동 (필수)
```cmd
cd C:\Users\domod\b1-2-
```

### 2단계: 패키지 의존성 설치
```cmd
npm install
```

### 3단계: 로컬 개발 서버 구동
```cmd
npm run dev
```

터미널에 출력되는 로컬 주소(기본: `http://localhost:5173/`)를 웹 브라우저 주소창에 입력하여 접속합니다.

> 💡 **안내**: Supabase 키가 없어도 브라우저 내장 LocalStorage를 통해 **모든 CRUD와 필터링 기능이 100% 즉시 정상 작동**합니다. 상단 네비게이션 바에 `로컬 모드` 뱃지가 표시됩니다.

---

## ☁️ Supabase 데이터베이스 연동 안내

실제 클라우드 PostgreSQL 데이터베이스와 연동하려면 다음 단계를 진행합니다.

1. [Supabase 공식 홈페이지](https://supabase.com/)에서 무료 프로젝트를 생성합니다.
2. 대시보드 좌측 **SQL Editor** 메뉴로 이동하여 본 프로젝트 루트의 `supabase_schema.sql` 파일 내용을 복사 후 **[Run]**을 실행합니다. (테이블 생성 및 샘플 데이터가 1초 만에 자동 세팅됩니다)
3. 대시보드 **Project Settings -> API**에서 `Project URL`과 `anon public key`를 확인합니다.
4. 프로젝트 루트에 `.env` 파일을 생성하고 아래와 같이 입력합니다:
   ```env
   VITE_SUPABASE_URL=https://내프로젝트ID.supabase.co
   VITE_SUPABASE_ANON_KEY=내_ANON_키_문자열
   ```
5. `npm run dev`를 재시작하면 상단 배지가 `Supabase 연동`으로 자동 전환되며 클라우드 DB와 실시간 동기화됩니다.

---

## 📂 폴더 및 컴포넌트 아키텍처

```text
b1-2-/
├── public/                 # 정적 리소스
├── src/
│   ├── components/
│   │   ├── common/         # 공통 레이아웃 (Navbar, Footer, Layout)
│   │   ├── items/          # 비즈니스 컴포넌트 (ItemCard, ItemList, ItemFilter, ItemForm)
│   │   └── ui/             # 재사용 기본 UI 컴포넌트 (10종 이상)
│   │       ├── Button.jsx         # 버튼 (variant, size, loading, icon)
│   │       ├── Input.jsx          # 인풋 필드 (label, error, icon)
│   │       ├── Textarea.jsx       # 텍스트영역 (글자수 카운터, rows)
│   │       ├── Select.jsx         # 드롭다운 셀렉트
│   │       ├── Card.jsx           # 카드 컨테이너 (hover 효과)
│   │       ├── Badge.jsx          # 뱃지 (카테고리/중요도)
│   │       ├── LoadingSpinner.jsx # 로딩 스피너
│   │       ├── EmptyState.jsx     # 빈 데이터 안내
│   │       ├── ErrorState.jsx     # 오류 안내 및 재시도
│   │       ├── Modal.jsx          # 삭제 확인 모달
│   │       └── ToastContainer.jsx # 전역 토스트 팝업 렌더러
│   ├── context/
│   │   ├── ThemeContext.jsx# 전역 테마 상태 (다크/라이트)
│   │   └── ToastContext.jsx# 전역 토스트 알림 상태
│   ├── hooks/
│   │   ├── useItems.js     # 목록 조회, 검색/필터, CRUD 비즈니스 로직 캡슐화
│   │   └── useItemDetail.js# 단일 상세 데이터 조회 훅
│   ├── lib/
│   │   ├── api.js          # Supabase & LocalStorage 하이브리드 데이터 계층
│   │   └── supabase.js     # Supabase 클라이언트 초기화
│   ├── pages/
│   │   ├── HomePage.jsx    # 메인 대시보드
│   │   ├── ItemListPage.jsx# 목록 및 필터링 페이지
│   │   ├── ItemDetailPage.jsx # 상세 보기 페이지
│   │   ├── ItemFormPage.jsx# 신규 등록 / 수정 페이지
│   │   └── NotFoundPage.jsx# 404 안내 페이지
│   ├── App.jsx             # SPA 라우팅 설정
│   ├── index.css           # 모던 디자인 시스템 스타일시트
│   └── main.jsx            # React 엔트리포인트
├── .env.example            # 환경변수 예시 파일
├── supabase_schema.sql     # Supabase 테이블 및 RLS 설정 SQL
└── README.md
```

---

## 🎓 퍼실리테이터 1:1 구술 평가 완벽 대비 Q&A

### Q1. React에서 컴포넌트가 왜 필요하며, 본인은 어떤 기준으로 컴포넌트를 쪼갰나요?
- **실생활 비유**: **"레고 블록"** 또는 **"자동차 부품 공장"**  
  하나의 거대한 통짜 플라스틱으로 장난감을 만들면 바퀴 하나가 깨졌을 때 장난감 전체를 버려야 합니다. 하지만 바퀴, 창문, 문짝을 개별 부품(컴포넌트)으로 분리해두면 바퀴만 손쉽게 교체하거나 다른 자동차를 조립할 때 그대로 재사용할 수 있습니다.
- **분리 기준**:
  1. **역할(관심사)의 명확한 분리**: 전체 화면을 구성하는 **페이지 단위 컴포넌트(`pages/`)**와 시각적 요소만을 담당하는 **재사용 UI 컴포넌트(`components/ui/`)**, 그리고 특정 도메인 로직을 품은 **비즈니스 컴포넌트(`components/items/`)**로 명확히 계층을 나누었습니다.
  2. **재사용성 극대화**: `Button`, `Input`, `LoadingSpinner`, `EmptyState`, `ErrorState` 등 1개 이상의 prop(`variant`, `size`, `onClick` 등)을 전달받아 유연하게 모양과 동작이 달라지는 공통 UI 컴포넌트를 8개 이상 도출하여 중복 코드를 제거했습니다.

---

### Q2. props와 state의 차이는 무엇이며, 상태를 어디에 두었나요(상향/하향 흐름)?
- **실생활 비유**: **"출생신고서(props)"** vs **"현재 기분이나 주머니 속 용돈(state)"**  
  부모가 지어준 이름이나 생년월일(props)은 내가 마음대로 바꿀 수 없고 오직 받아들이기만(Read-Only) 해야 합니다. 반면 내 주머니 속 현금(state)은 내가 빵을 사 먹으면 줄어들고 알바비를 받으면 늘어나는 '내부에서 변하는 데이터'입니다.
- **상태의 위치 및 흐름 (State Lifting)**:
  - **폼 입력 상태(`formData`)**: 사용자가 한 글자 칠 때마다 실시간으로 변해야 하므로 `ItemForm` 컴포넌트 내부에 controlled state로 두었습니다.
  - **검색어/필터 상태(`searchQuery`, `selectedCategory`)**: 여러 컴포넌트(`ItemFilter`, `ItemList`)가 검색 결과를 함께 공유해야 하므로, 두 컴포넌트의 공통 부모인 `ItemListPage`와 이를 캡슐화한 `useItems` 커스텀 훅 상단으로 상태를 끌어올렸습니다(**상향 흐름/상태 끌어올리기**).
  - 부모는 자식에게 데이터와 변경 함수를 `props`를 통해 단방향으로 내려줍니다(**하향 흐름**).

---

### Q3. useEffect는 언제 실행되고 어떤 의존성으로 동작하며, 데이터 요청과 어떤 관계가 있나요?
- **실생활 비유**: **"매장 오픈 직후 물품 채워넣기"**  
  손님이 들어오기 전에 텅 빈 진열장을 먼저 매장에 세워두고(초기 렌더링), 매장이 오픈되자마자 창고에서 신선한 과일을 가져와 진열대에 채워 넣는 작업(useEffect 비동기 데이터 패칭)과 같습니다.
- **실행 원리**:
  1. 컴포넌트가 브라우저 DOM에 처음 마운트(렌더링)된 직후 브라우저 화면 그리기를 방해하지 않고 안전하게 실행됩니다.
  2. **의존성 배열(`[]`)**: 빈 배열 `[]`을 전달하면 컴포넌트가 처음 나타날 때 단 1번만 실행되어 원격 서버나 DB에 데이터를 요청(`fetchItems`)합니다. 만약 `[id]`처럼 특정 값이 지정되면 해당 id가 바뀔 때마다 다시 실행되어 새 데이터를 불러옵니다.

---

### Q4. 비동기 흐름에서 로딩/성공/실패/빈 상태를 React UI로 어떻게 표현했나요?
- **실생활 비유**: **"식당 주문 프로세스"**  
  주문 접수 후 요리 중(Loading 스피너) -> 음식이 나옴(Success 리스트 카드) -> 재료 소진/품절(Empty 안내 화면) -> 주방 정전/화재(Error 재시도 안내)
- **일관된 UI 처리 패턴**:
  - `isLoading === true`: 부드럽게 회전하는 `LoadingSpinner` 컴포넌트를 렌더링하여 사용자에게 시스템이 멈추지 않고 작업 중임을 인지시킵니다.
  - `error !== null`: `ErrorState` 컴포넌트를 띄우고 "다시 시도" 버튼을 제공하여 네트워크 오류 시 새로고침 없이 즉시 재요청할 수 있게 했습니다.
  - `items.length === 0`: `EmptyState` 컴포넌트로 "표시할 데이터가 없습니다" 문구와 함께 "새 노트 작성하기" 또는 "필터 초기화" 액션 버튼을 유도합니다.

---

### Q5. "하나의 기능"을 만들기 위해 라우팅 → 컴포넌트 → 상태 → 이벤트 → 렌더링이 어떻게 연결되나요?
- **구체적 시나리오 (새 글 작성 및 실시간 반영 흐름)**:
  1. **라우팅(Routing)**: 사용자가 상단 네비게이션의 "새 노트 작성" 버튼을 클릭하면 브라우저 주소가 `/items/new`로 변경되고 `ItemFormPage` 컴포넌트가 마운트됩니다.
  2. **컴포넌트(Component)**: 페이지 안에 `ItemForm` 컴포넌트가 렌더링되며 제목, 카테고리, 본문 입력창이 화면에 표시됩니다.
  3. **이벤트(Event)**: 사용자가 키보드로 제목을 입력하면 `onChange` 이벤트 핸들러가 트리거됩니다.
  4. **상태(State)**: 이벤트 핸들러가 `setFormData`를 호출하여 컴포넌트의 내부 상태(`formData.title`)를 새 입력값으로 업데이트합니다.
  5. **렌더링(Rendering)**: React가 상태 변경을 감지하고 컴포넌트를 즉각 리렌더링하여, 오른쪽 **실시간 미리보기(Live Preview)** 카드에 사용자가 방금 친 텍스트가 스르륵 렌더링됩니다!
  6. **제출 및 이동**: 사용자가 "저장하기"를 누르면 `onSubmit` -> `createItem` API 호출 -> 완료 시 `showToast` 전역 알림 발송 -> `navigate('/items/:id')`로 라우팅이 전환되어 방금 쓴 상세 화면이 스르륵 나타납니다.
