import { useState, useEffect, useCallback, useMemo } from 'react';
import { api } from '../lib/api';
import { useToast } from '../context/ToastContext';

export function useItems() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 검색 및 필터 상태
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest'); // newest | oldest | title

  const { showToast } = useToast();

  // 목록 불러오기 함수
  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getItems();
      setItems(data);
    } catch (err) {
      console.error('목록 조회 실패:', err);
      setError(err.message || '데이터를 불러오는 중 문제가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 마운트 시 데이터 요청
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // 검색 & 필터링 & 정렬 연산 최적화 (useMemo 적용: 보너스 과제)
  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        // 카테고리 필터
        if (selectedCategory !== 'All' && item.category !== selectedCategory) {
          return false;
        }
        // 검색어 필터 (제목 또는 내용 또는 요약)
        if (!searchQuery.trim()) return true;
        const query = searchQuery.toLowerCase();
        return (
          item.title?.toLowerCase().includes(query) ||
          item.summary?.toLowerCase().includes(query) ||
          item.content?.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.created_at) - new Date(a.created_at);
        }
        if (sortBy === 'oldest') {
          return new Date(a.created_at) - new Date(b.created_at);
        }
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title, 'ko');
        }
        return 0;
      });
  }, [items, searchQuery, selectedCategory, sortBy]);

  // 카테고리별 통계 연산 (useMemo 적용)
  const stats = useMemo(() => {
    const total = items.length;
    const categoryCounts = items.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + 1;
      return acc;
    }, {});
    return { total, categoryCounts };
  }, [items]);

  // 항목 생성
  const createItem = useCallback(async (payload) => {
    try {
      const created = await api.createItem(payload);
      setItems(prev => [created, ...prev]);
      showToast('새 학습 노트가 성공적으로 등록되었습니다!', 'success');
      return created;
    } catch (err) {
      showToast(err.message || '등록 중 오류가 발생했습니다.', 'error');
      throw err;
    }
  }, [showToast]);

  // 항목 수정
  const updateItem = useCallback(async (id, payload) => {
    try {
      const updated = await api.updateItem(id, payload);
      setItems(prev => prev.map(item => (item.id === id ? updated : item)));
      showToast('노트 내용이 성공적으로 수정되었습니다.', 'success');
      return updated;
    } catch (err) {
      showToast(err.message || '수정 중 오류가 발생했습니다.', 'error');
      throw err;
    }
  }, [showToast]);

  // 항목 삭제
  const deleteItem = useCallback(async (id) => {
    try {
      await api.deleteItem(id);
      setItems(prev => prev.filter(item => item.id !== id));
      showToast('노트가 안전하게 삭제되었습니다.', 'success');
      return true;
    } catch (err) {
      showToast(err.message || '삭제 중 오류가 발생했습니다.', 'error');
      throw err;
    }
  }, [showToast]);

  return {
    items: filteredItems,
    allItems: items,
    stats,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    fetchItems,
    createItem,
    updateItem,
    deleteItem
  };
}
