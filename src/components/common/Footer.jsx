import React from 'react';
import { Sparkles, Code2, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="footer-root">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand-info">
            <span className="footer-title">DevLog SPA Mission</span>
            <p className="footer-desc">
              버튼 누르면 화면이 스르륵 바뀌는 요즘 웹사이트 만들기 (미션 B1-2)
            </p>
          </div>
          <div className="footer-tech-stack">
            <span className="stack-pill">React 18</span>
            <span className="stack-pill">React Router v6</span>
            <span className="stack-pill">Supabase</span>
            <span className="stack-pill">CSS Variables</span>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">
            © 2026 Codyssey B1-2 Mission. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
