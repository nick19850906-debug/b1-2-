import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Edit3,
  Trash2,
  Tag,
  AlertTriangle
} from 'lucide-react';
import { useItemDetail } from '../hooks/useItemDetail';
import { api } from '../lib/api';
import { useToast } from '../context/ToastContext';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorState } from '../components/ui/ErrorState';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';

export function ItemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { item, isLoading, error, refetch } = useItemDetail(id);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await api.deleteItem(id);
      showToast('노트가 안전하게 삭제되었습니다.', 'success');
      navigate('/items', { replace: true });
    } catch (err) {
      showToast(err.message || '삭제 중 문제가 발생했습니다.', 'error');
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return <LoadingSpinner message="노트 상세 내용을 불러오고 있습니다..." />;
  }

  if (error || !item) {
    return (
      <div className="page-container">
        <ErrorState
          title="노트를 찾을 수 없습니다"
          message={error || '요청하신 노트가 존재하지 않거나 삭제되었습니다.'}
          onRetry={refetch}
        />
        <div className="center-action-btn">
          <Button variant="ghost" icon={ArrowLeft} onClick={() => navigate('/items')}>
            목록으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  const priorityVariant = 
    item.priority === 'High' ? 'priority-high' :
    item.priority === 'Medium' ? 'priority-medium' : 'priority-low';

  return (
    <div className="page-container detail-page-container">
      {/* 상단 네비게이션 액션 바 */}
      <div className="detail-top-nav">
        <Link to="/items" className="back-link-btn">
          <ArrowLeft size={16} />
          <span>목록으로</span>
        </Link>
        <div className="detail-action-group">
          <Button
            variant="outline"
            icon={Edit3}
            size="sm"
            onClick={() => navigate(`/items/${id}/edit`)}
          >
            수정
          </Button>
          <Button
            variant="danger"
            icon={Trash2}
            size="sm"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            삭제
          </Button>
        </div>
      </div>

      {/* 본문 아티클 카드 */}
      <article className="detail-article-card">
        <header className="article-header">
          <div className="badge-group mb-3">
            <Badge text={item.category || '기타'} variant="category" size="md" />
            <Badge text={`중요도: ${item.priority || 'Medium'}`} variant={priorityVariant} size="md" />
          </div>

          <h1 className="article-title">{item.title}</h1>

          {item.summary && (
            <p className="article-summary-lead">{item.summary}</p>
          )}

          <div className="article-meta-row">
            <div className="meta-item">
              <Calendar size={14} />
              <span>등록일: {formatDate(item.created_at)}</span>
            </div>
            {item.updated_at && item.updated_at !== item.created_at && (
              <div className="meta-item">
                <Clock size={14} />
                <span>최종 수정: {formatDate(item.updated_at)}</span>
              </div>
            )}
          </div>
        </header>

        <hr className="detail-divider" />

        <div className="article-body">
          <div className="article-content-text">
            {item.content.split('\n').map((paragraph, idx) => (
              <p key={idx} className="body-paragraph">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>

      {/* 삭제 확인 모달 */}
      <Modal
        isOpen={isDeleteModalOpen}
        title="학습 노트를 삭제하시겠습니까?"
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        confirmText="삭제하기"
        cancelText="취소"
        isDanger={true}
        isLoading={isDeleting}
      >
        <p>
          <strong>"{item.title}"</strong> 노트를 삭제하면 복구할 수 없습니다. 정말로 삭제하시겠습니까?
        </p>
      </Modal>
    </div>
  );
}
