-- ========================================================
-- DevLog (미션 B1-2) Supabase 데이터베이스 테이블 및 초기 데이터
-- Supabase 웹 대시보드 -> SQL Editor에 붙여넣고 [RUN]을 실행하세요.
-- ========================================================

-- 1. dev_logs 테이블 생성
CREATE TABLE IF NOT EXISTS public.dev_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL DEFAULT 'Frontend',
    summary VARCHAR(255),
    content TEXT NOT NULL,
    priority VARCHAR(20) NOT NULL DEFAULT 'Medium',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Row Level Security (RLS) 활성화 및 누구나 읽고 쓸 수 있는 공개 정책 생성 (미션 스코프)
ALTER TABLE public.dev_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read dev_logs"
    ON public.dev_logs FOR SELECT
    USING (true);

CREATE POLICY "Allow public insert dev_logs"
    ON public.dev_logs FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow public update dev_logs"
    ON public.dev_logs FOR UPDATE
    USING (true);

CREATE POLICY "Allow public delete dev_logs"
    ON public.dev_logs FOR DELETE
    USING (true);

-- 3. 초기 풍부한 샘플 데이터 추가
INSERT INTO public.dev_logs (title, category, summary, content, priority, created_at, updated_at)
VALUES
(
    'React 18 동시성 렌더링과 useTransition 탐구',
    'Frontend',
    '무거운 연산이나 리스트 필터링 시 UI 블로킹을 방지하는 동시성 기능 학습',
    'React 18에서 도입된 동시성(Concurrency) 기능은 긴급한 업데이트(입력, 클릭)와 덜 긴급한 업데이트(필터링, 화면 전환)의 우선순위를 분리할 수 있게 해줍니다. useTransition 훅을 사용하면 무거운 렌더링 중에도 사용자의 타이핑 반응성을 부드럽게 유지할 수 있습니다.',
    'High',
    NOW() - INTERVAL '3 days',
    NOW() - INTERVAL '3 days'
),
(
    'SPA 라우팅 원리와 History API 심층 분석',
    'Frontend',
    '페이지 전체 새로고침 없이 브라우저 URL과 컴포넌트 트리를 동기화하는 원리',
    '전통적인 웹사이트는 링크를 클릭할 때마다 서버로 새 HTML을 요청합니다. 반면 SPA(Single Page Application)는 window.history.pushState()와 popstate 이벤트를 가로채어, 서버 재요청 없이 화면의 일부분만 자바스크립트로 리렌더링하여 매끄러운 앱 경험을 제공합니다.',
    'Medium',
    NOW() - INTERVAL '2 days',
    NOW() - INTERVAL '2 days'
),
(
    'PostgreSQL 인덱스 튜닝 및 RLS 보안 규칙 설계',
    'Database',
    'Supabase의 기반이 되는 PostgreSQL의 B-Tree 인덱스와 Row Level Security 적용법',
    '대용량 쿼리 최적화를 위해 B-Tree 및 GIN 인덱스를 적절히 구성하고, Supabase의 Row Level Security(RLS) 정책을 통해 사용자가 본인이 작성한 데이터만 SELECT, UPDATE, DELETE 할 수 있도록 DB 엔진 차원의 보안 격리를 구현합니다.',
    'High',
    NOW() - INTERVAL '1 day',
    NOW() - INTERVAL '1 day'
),
(
    'Vite 번들러의 esbuild와 Rollup 하이브리드 파이프라인',
    'DevOps',
    'Webpack 대비 10배 이상 빠른 개발 서버 시작 속도의 비결',
    'Vite는 개발 환경에서는 브라우저의 네이티브 ES 모듈(ESM)과 Go 언어로 작성된 초고속 esbuild를 사용하여 사전 번들링을 수행하고, 프로덕션 빌드 시에는 풍부한 플러그인 생태계를 갖춘 Rollup을 활용하여 고도로 최적화된 번들을 생성합니다.',
    'Low',
    NOW() - INTERVAL '12 hours',
    NOW() - INTERVAL '12 hours'
),
(
    'React 커스텀 훅으로 비동기 상태(Loading/Error) 캡슐화하기',
    'Frontend',
    '컴포넌트에서 데이터 요청 로직을 완전히 걷어내고 순수 UI 렌더링에만 집중시키는 패턴',
    '컴포넌트 내부에서 useState와 useEffect를 직접 조합하면 코드가 비대해지고 재사용이 어렵습니다. useItems() 커스텀 훅으로 데이터 페칭, 로딩 플래그, 에러 객체를 캡슐화하면 컴포넌트는 단 한 줄로 선언적 데이터 바인딩을 달성할 수 있습니다.',
    'High',
    NOW(),
    NOW()
);
