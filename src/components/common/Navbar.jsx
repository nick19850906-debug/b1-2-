import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BookOpen, PlusCircle, Sun, Moon, Database, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { isSupabaseConfigured } from '../../lib/supabase';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="navbar-root">
      <div className="navbar-container">
        {/* 브랜드 로고 */}
        <Link to="/" className="navbar-brand">
          <div className="brand-icon-box">
            <BookOpen size={22} className="brand-icon" />
          </div>
          <div className="brand-text-wrap">
            <span className="brand-title">DevLog</span>
            <span className="brand-badge">SPA</span>
          </div>
        </Link>

        {/* 백엔드 상태 표시기 */}
        <div className="backend-indicator" title={isSupabaseConfigured ? 'Supabase 클라우드 DB 연동 중' : '로컬 스토리지 모드 동작 중 (.env 미설정 시 자동 대체)'}>
          <Database size={14} className={isSupabaseConfigured ? 'indicator-supabase' : 'indicator-local'} />
          <span className="indicator-text">
            {isSupabaseConfigured ? 'Supabase 연동' : '로컬 모드'}
          </span>
        </div>

        {/* 네비게이션 링크 */}
        <nav className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            홈
          </NavLink>
          <NavLink
            to="/items"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            노트 목록
          </NavLink>
          <NavLink
            to="/items/new"
            className={({ isActive }) => `nav-link nav-link-highlight ${isActive ? 'active' : ''}`}
          >
            <PlusCircle size={16} />
            <span>새 노트 작성</span>
          </NavLink>
        </nav>

        {/* 다크/라이트 테마 토글 버튼 */}
        <div className="navbar-actions">
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label="테마 변경"
            title={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
          >
            {theme === 'dark' ? <Sun size={19} className="theme-icon sun" /> : <Moon size={19} className="theme-icon moon" />}
          </button>
        </div>
      </div>
    </header>
  );
}
