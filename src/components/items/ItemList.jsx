import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ItemCard } from './ItemCard';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { EmptyState } from '../ui/EmptyState';
import { ErrorState } from '../ui/ErrorState';

export function ItemList({
  items,
  isLoading,
  error,
  onRetry,
  emptyTitle,
  emptyDescription,
  onResetFilters
}) {
  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingSpinner message="노트 목록을 불러오고 있습니다..." />;
  }

  if (error) {
    return (
      <ErrorState
        title="노트 목록을 불러오지 못했습니다"
        message={error}
        onRetry={onRetry}
      />
    );
  }

  if (!items || items.length === 0) {
    return (
      <EmptyState
        title={emptyTitle || '등록된 학습 노트가 없습니다.'}
        description={emptyDescription || '새 노트를 작성하여 학습한 내용을 기록해 보세요!'}
        actionText={onResetFilters ? '필터 초기화' : '새 노트 작성하기'}
        onAction={onResetFilters || (() => navigate('/items/new'))}
      />
    );
  }

  return (
    <div className="item-grid-container">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
