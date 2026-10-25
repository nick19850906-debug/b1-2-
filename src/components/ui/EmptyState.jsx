import React from 'react';
import { FileQuestion } from 'lucide-react';
import { Button } from './Button';

export function EmptyState({
  title = '표시할 데이터가 없습니다.',
  description = '새로운 항목을 추가하여 학습 기록을 채워보세요.',
  actionText,
  onAction,
  icon: Icon = FileQuestion
}) {
  return (
    <div className="empty-state-card">
      <div className="empty-state-icon-wrap">
        <Icon size={44} className="empty-state-icon" />
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-desc">{description}</p>
      {actionText && onAction && (
        <div className="empty-state-action">
          <Button variant="primary" onClick={onAction}>
            {actionText}
          </Button>
        </div>
      )}
    </div>
  );
}
