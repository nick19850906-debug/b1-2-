import React from 'react';
import { useItems } from '../hooks/useItems';
import { ItemFilter } from '../components/items/ItemFilter';
import { ItemList } from '../components/items/ItemList';

export function ItemListPage() {
  const {
    items,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    fetchItems
  } = useItems();

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  const isFiltered = Boolean(searchQuery.trim() || selectedCategory !== 'All');

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">학습 노트 아카이브</h1>
        <p className="page-description">
          프론트엔드, 백엔드, 데이터베이스 등 학습한 기술 노트를 조회하고 검색합니다.
        </p>
      </div>

      {/* 상태 변경 -> 렌더링 변화 지점 1: 검색 & 필터 패널 */}
      <ItemFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        totalCount={items.length}
      />

      {/* 목록 렌더링 */}
      <ItemList
        items={items}
        isLoading={isLoading}
        error={error}
        onRetry={fetchItems}
        emptyTitle={isFiltered ? '검색 조건에 맞는 노트가 없습니다.' : '등록된 노트가 없습니다.'}
        emptyDescription={
          isFiltered
            ? '검색어를 바꾸거나 필터를 재설정해 보세요.'
            : '첫 번째 학습 노트를 등록하여 지식을 공유해 보세요.'
        }
        onResetFilters={isFiltered ? handleResetFilters : undefined}
      />
    </div>
  );
}
