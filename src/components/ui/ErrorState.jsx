import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

export function ErrorState({
  title = '요청에 실패했습니다.',
  message = '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
  onRetry
}) {
  return (
    <div className="error-state-card">
      <div className="error-state-icon-wrap">
        <AlertTriangle size={44} className="error-state-icon" />
      </div>
      <h3 className="error-state-title">{title}</h3>
      <p className="error-state-msg">{message}</p>
      {onRetry && (
        <div className="error-state-action">
          <Button variant="secondary" icon={RefreshCw} onClick={onRetry}>
            다시 시도
          </Button>
        </div>
      )}
    </div>
  );
}
