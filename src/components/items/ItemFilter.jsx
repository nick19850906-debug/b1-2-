import React from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { Input } from '../ui/Input';

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Database', 'DevOps', 'CS'];

export function ItemFilter({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  totalCount
}) {
  return (
    <div className="filter-panel-root">
      {/* 상단 검색바 및 정렬 */}
      <div className="filter-top-bar">
        <div className="search-bar-wrap">
          <Input
            icon={Search}
            placeholder="제목, 요약 또는 본문 내용 검색..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="sort-select-wrap">
          <ArrowUpDown size={16} className="sort-icon" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="sort-dropdown"
          >
            <option value="newest">최신 등록순</option>
            <option value="oldest">오래된순</option>
            <option value="title">가나다순</option>
          </select>
        </div>
      </div>

      {/* 카테고리 탭 리스트 */}
      <div className="category-tabs-container">
        <div className="category-tabs-scroll">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={`cat-tab-btn ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat === 'All' ? '전체 보기' : cat}
            </button>
          ))}
        </div>
        <span className="filter-count-badge">
          검색 결과: <strong>{totalCount}</strong>건
        </span>
      </div>
    </div>
  );
}
