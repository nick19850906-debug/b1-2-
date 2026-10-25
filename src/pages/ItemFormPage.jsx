import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ItemForm } from '../components/items/ItemForm';
import { useItems } from '../hooks/useItems';
import { api } from '../lib/api';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorState } from '../components/ui/ErrorState';

export function ItemFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const { createItem, updateItem } = useItems();

  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [fetchError, setFetchError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 수정 모드일 경우 기존 데이터 조회
  useEffect(() => {
    if (!isEditMode) return;

    let isMounted = true;
    async function loadItem() {
      setIsLoading(true);
      setFetchError(null);
      try {
        const data = await api.getItemById(id);
        if (isMounted) setInitialData(data);
      } catch (err) {
        if (isMounted) setFetchError(err.message || '노트를 불러올 수 없습니다.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadItem();
    return () => {
      isMounted = false;
    };
  }, [id, isEditMode]);

  // 폼 제출 핸들러
  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (isEditMode) {
        const updated = await updateItem(id, formData);
        navigate(`/items/${id}`, { replace: true });
      } else {
        const created = await createItem(formData);
        navigate(`/items/${created.id}`, { replace: true });
      }
    } catch (err) {
      console.error('폼 제출 실패:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="수정할 노트 데이터를 불러오는 중..." />;
  }

  if (fetchError) {
    return (
      <div className="page-container">
        <ErrorState
          title="노트 정보를 가져올 수 없습니다"
          message={fetchError}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="page-container form-page-container">
      <div className="form-page-top-nav">
        <Link to={isEditMode ? `/items/${id}` : '/items'} className="back-link-btn">
          <ArrowLeft size={16} />
          <span>{isEditMode ? '상세 화면으로' : '목록으로'}</span>
        </Link>
      </div>

      <ItemForm
        initialData={initialData}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitLabel={isEditMode ? '수정 내용 저장' : '학습 노트 등록'}
      />
    </div>
  );
}
