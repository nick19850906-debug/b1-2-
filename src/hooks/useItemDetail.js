import { useState, useEffect, useCallback } from 'react';
import { api } from '../lib/api';

export function useItemDetail(id) {
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDetail = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getItemById(id);
      setItem(data);
    } catch (err) {
      console.error('상세 조회 실패:', err);
      setError(err.message || '노트를 불러올 수 없습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return { item, isLoading, error, refetch: fetchDetail };
}
