import { supabase, isSupabaseConfigured } from './supabase';

const STORAGE_KEY = 'devlog_items_store';

// 기본 샘플 데이터 (초기 로딩 시 풍부한 데이터 제공)
const INITIAL_ITEMS = [
  {
    id: 'item-1',
    title: 'React 18 동시성 렌더링과 useTransition 탐구',
    category: 'Frontend',
    summary: '무거운 연산이나 리스트 필터링 시 UI 블로킹을 방지하는 동시성 기능 학습',
    content: 'React 18에서 도입된 동시성(Concurrency) 기능은 긴급한 업데이트(입력, 클릭)와 덜 긴급한 업데이트(필터링, 화면 전환)의 우선순위를 분리할 수 있게 해줍니다. useTransition 훅을 사용하면 무거운 렌더링 중에도 사용자의 타이핑 반응성을 부드럽게 유지할 수 있습니다.',
    priority: 'High',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: 'item-2',
    title: 'SPA 라우팅 원리와 History API 심층 분석',
    category: 'Frontend',
    summary: '페이지 전체 새로고침 없이 브라우저 URL과 컴포넌트 트리를 동기화하는 원리',
    content: '전통적인 웹사이트는 링크를 클릭할 때마다 서버로 새 HTML을 요청합니다. 반면 SPA(Single Page Application)는 window.history.pushState()와 popstate 이벤트를 가로채어, 서버 재요청 없이 화면의 일부분만 자바스크립트로 리렌더링하여 매끄러운 앱 경험을 제공합니다.',
    priority: 'Medium',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: 'item-3',
    title: 'PostgreSQL 인덱스 튜닝 및 RLS 보안 규칙 설계',
    category: 'Database',
    summary: 'Supabase의 기반이 되는 PostgreSQL의 B-Tree 인덱스와 Row Level Security 적용법',
    content: '대용량 쿼리 최적화를 위해 B-Tree 및 GIN 인덱스를 적절히 구성하고, Supabase의 Row Level Security(RLS) 정책을 통해 사용자가 본인이 작성한 데이터만 SELECT, UPDATE, DELETE 할 수 있도록 DB 엔진 차원의 보안 격리를 구현합니다.',
    priority: 'High',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
  },
  {
    id: 'item-4',
    title: 'Vite 번들러의 esbuild와 Rollup 하이브리드 파이프라인',
    category: 'DevOps',
    summary: 'Webpack 대비 10배 이상 빠른 개발 서버 시작 속도의 비결',
    content: 'Vite는 개발 환경에서는 브라우저의 네이티브 ES 모듈(ESM)과 Go 언어로 작성된 초고속 esbuild를 사용하여 사전 번들링을 수행하고, 프로덕션 빌드 시에는 풍부한 플러그인 생태계를 갖춘 Rollup을 활용하여 고도로 최적화된 번들을 생성합니다.',
    priority: 'Low',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: 'item-5',
    title: 'React 커스텀 훅으로 비동기 상태(Loading/Error) 캡슐화하기',
    category: 'Frontend',
    summary: '컴포넌트에서 데이터 요청 로직을 완전히 걷어내고 순수 UI 렌더링에만 집중시키는 패턴',
    content: '컴포넌트 내부에서 useState와 useEffect를 직접 조합하면 코드가 비대해지고 재사용이 어렵습니다. useItems() 커스텀 훅으로 데이터 페칭, 로딩 플래그, 에러 객체를 캡슐화하면 컴포넌트는 단 한 줄로 선언적 데이터 바인딩을 달성할 수 있습니다.',
    priority: 'High',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

// 로컬 스토리지 헬퍼
function getLocalItems() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ITEMS));
    return INITIAL_ITEMS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_ITEMS;
  }
}

function setLocalItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// 비동기 지연 시뮬레이션 (로딩 UI 확인용)
const delay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // 목록 조회
  async getItems() {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('dev_logs')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw new Error(error.message);
      return data || [];
    }

    // 로컬 스토리지 모드
    await delay(350);
    const items = getLocalItems();
    return items.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  },

  // 단일 상세 조회
  async getItemById(id) {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('dev_logs')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw new Error(error.message);
      return data;
    }

    // 로컬 스토리지 모드
    await delay(250);
    const items = getLocalItems();
    const found = items.find(item => String(item.id) === String(id));
    if (!found) {
      throw new Error('해당 노트를 찾을 수 없습니다.');
    }
    return found;
  },

  // 신규 등록
  async createItem(payload) {
    const newItem = {
      ...payload,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('dev_logs')
        .insert([newItem])
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    }

    // 로컬 스토리지 모드
    await delay(450);
    const items = getLocalItems();
    const created = {
      ...newItem,
      id: 'item-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6)
    };
    const updated = [created, ...items];
    setLocalItems(updated);
    return created;
  },

  // 수정
  async updateItem(id, payload) {
    const updateData = {
      ...payload,
      updated_at: new Date().toISOString()
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('dev_logs')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    }

    // 로컬 스토리지 모드
    await delay(400);
    const items = getLocalItems();
    const index = items.findIndex(item => String(item.id) === String(id));
    if (index === -1) {
      throw new Error('수정할 노트를 찾을 수 없습니다.');
    }
    const updatedItem = { ...items[index], ...updateData };
    items[index] = updatedItem;
    setLocalItems([...items]);
    return updatedItem;
  },

  // 삭제
  async deleteItem(id) {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('dev_logs')
        .delete()
        .eq('id', id);
      if (error) throw new Error(error.message);
      return true;
    }

    // 로컬 스토리지 모드
    await delay(350);
    const items = getLocalItems();
    const filtered = items.filter(item => String(item.id) !== String(id));
    setLocalItems(filtered);
    return true;
  }
};
