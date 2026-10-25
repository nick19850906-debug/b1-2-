import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingSpinner({
  message = '데이터를 불러오는 중입니다...',
  size = 36,
  fullScreen = false
}) {
  const content = (
    <div className="spinner-wrapper">
      <Loader2 className="spinner-icon-pulse" size={size} />
      {message && <p className="spinner-message">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return <div className="spinner-fullscreen-overlay">{content}</div>;
  }

  return <div className="spinner-container">{content}</div>;
}
