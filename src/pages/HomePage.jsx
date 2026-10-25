import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, PlusCircle, ArrowRight, Layers, FileCode, CheckCircle, Database } from 'lucide-react';
import { useItems } from '../hooks/useItems';
import { ItemCard } from '../components/items/ItemCard';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Button } from '../components/ui/Button';

export function HomePage() {
  const navigate = useNavigate();
  const { allItems, stats, isLoading, error } = useItems();

  // 최근 3개 항목만 추출
  const recentItems = allItems.slice(0, 3);

  return (
    <div className="home-page-container">
      {/* 1. 히어로 배너 섹션 */}
      <section className="hero-banner">
        <div className="hero-badge">
          <BookOpen size={16} />
          <span>React SPA & Supabase 데이터 흐름 실습</span>
        </div>
        <h1 className="hero-title">
          버튼 누르면 화면이 <span className="gradient-text">스르륵 바뀌는</span>
          <br />
          요즘 웹사이트 개발 공간
        </h1>
        <p className="hero-description">
          단순한 화면 그리기를 넘어, React의 상태(State)와 컴포넌트 라이프사이클,
          라우팅과 비동기 원격 데이터 CRUD를 직접 경험하는 개발자 아카이브입니다.
        </p>
        <div className="hero-action-buttons">
          <Button
            variant="primary"
            size="lg"
            icon={PlusCircle}
            onClick={() => navigate('/items/new')}
          >
            새 학습 노트 작성
          </Button>
          <Button
            variant="secondary"
            size="lg"
            icon={ArrowRight}
            onClick={() => navigate('/items')}
          >
            노트 전체 보기
          </Button>
        </div>
      </section>

      {/* 2. 대시보드 통계 카드 그리드 */}
      <section className="dashboard-stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrap bg-blue">
            <Layers size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-label">전체 아카이브 노트</span>
            <span className="stat-value">{stats.total}개</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap bg-purple">
            <FileCode size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Frontend 항목</span>
            <span className="stat-value">{stats.categoryCounts['Frontend'] || 0}개</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap bg-green">
            <Database size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Database 항목</span>
            <span className="stat-value">{stats.categoryCounts['Database'] || 0}개</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap bg-amber">
            <CheckCircle size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-label">기타 분야 (Backend/DevOps/CS)</span>
            <span className="stat-value">
              {(stats.categoryCounts['Backend'] || 0) +
                (stats.categoryCounts['DevOps'] || 0) +
                (stats.categoryCounts['CS'] || 0)}개
            </span>
          </div>
        </div>
      </section>

      {/* 3. 최근 등록된 노트 섹션 */}
      <section className="recent-items-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">최근 등록된 학습 노트</h2>
            <p className="section-subtitle">가장 최근에 기록된 핵심 기술 노트 3선입니다.</p>
          </div>
          <Link to="/items" className="section-more-link">
            전체 보기 <ArrowRight size={16} />
          </Link>
        </div>

        {isLoading ? (
          <LoadingSpinner message="최근 노트를 불러오는 중..." />
        ) : error ? (
          <p className="text-error">{error}</p>
        ) : recentItems.length === 0 ? (
          <div className="empty-mini-card">
            <p>아직 등록된 노트가 없습니다. 첫 노트를 기록해보세요!</p>
            <Button size="sm" onClick={() => navigate('/items/new')}>첫 노트 작성</Button>
          </div>
        ) : (
          <div className="item-grid-container">
            {recentItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
