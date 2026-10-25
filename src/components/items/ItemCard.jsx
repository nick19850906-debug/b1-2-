import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ChevronRight, Bookmark } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export function ItemCard({ item }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/items/${item.id}`);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const priorityVariant = 
    item.priority === 'High' ? 'priority-high' :
    item.priority === 'Medium' ? 'priority-medium' : 'priority-low';

  return (
    <Card onClick={handleCardClick} className="item-card-wrapper">
      <div className="card-top-row">
        <div className="badge-group">
          <Badge text={item.category || '기타'} variant="category" size="sm" />
          <Badge text={item.priority || 'Medium'} variant={priorityVariant} size="sm" />
        </div>
        <div className="card-date-wrap">
          <Calendar size={13} />
          <span>{formatDate(item.created_at)}</span>
        </div>
      </div>

      <h3 className="card-item-title">{item.title}</h3>
      <p className="card-item-summary">{item.summary || item.content?.slice(0, 80) + '...'}</p>

      <div className="card-bottom-row">
        <span className="card-read-more">
          상세 읽기
          <ChevronRight size={14} />
        </span>
      </div>
    </Card>
  );
}
