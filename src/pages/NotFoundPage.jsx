import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="notfound-page-container">
      <div className="notfound-card">
        <div className="notfound-icon-wrap">
          <Compass size={64} className="notfound-icon" />
        </div>
        <span className="notfound-badge">404 Error</span>
        <h1 className="notfound-title">페이지를 찾을 수 없습니다</h1>
        <p className="notfound-desc">
          요청하신 페이지가 삭제되었거나, 잘못된 주소로 접근하셨습니다.
          아래 버튼을 눌러 안전하게 홈으로 이동하실 수 있습니다.
        </p>
        <div className="notfound-actions">
          <Button
            variant="primary"
            icon={Home}
            size="lg"
            onClick={() => navigate('/')}
          >
            홈으로 이동
          </Button>
          <Button
            variant="ghost"
            icon={ArrowLeft}
            size="lg"
            onClick={() => navigate(-1)}
          >
            이전 페이지
          </Button>
        </div>
      </div>
    </div>
  );
}
