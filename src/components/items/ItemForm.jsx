import React, { useState, useEffect } from 'react';
import { Save, Eye, Sparkles } from 'lucide-react';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

const CATEGORY_OPTIONS = [
  { value: 'Frontend', label: 'Frontend (React, Vue, JS, CSS)' },
  { value: 'Backend', label: 'Backend (Node, Python, Go, Java)' },
  { value: 'Database', label: 'Database (SQL, Supabase, NoSQL)' },
  { value: 'DevOps', label: 'DevOps (Docker, CI/CD, Cloud)' },
  { value: 'CS', label: 'CS (알고리즘, 자료구조, 네트워크)' }
];

const PRIORITY_OPTIONS = [
  { value: 'High', label: 'High (매우 중요 / 복습 필수)' },
  { value: 'Medium', label: 'Medium (보통)' },
  { value: 'Low', label: 'Low (참고용)' }
];

export function ItemForm({
  initialData,
  onSubmit,
  isSubmitting = false,
  submitLabel = '저장하기'
}) {
  // controlled form state
  const [formData, setFormData] = useState({
    title: '',
    category: 'Frontend',
    summary: '',
    content: '',
    priority: 'Medium'
  });

  // validation errors state
  const [errors, setErrors] = useState({});
  // 사용자가 폼 필드를 건드렸는지 여부 (dirty tracking)
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        category: initialData.category || 'Frontend',
        summary: initialData.summary || '',
        content: initialData.content || '',
        priority: initialData.priority || 'Medium'
      });
    }
  }, [initialData]);

  // 유효성 검증 함수
  const validateField = (name, value) => {
    switch (name) {
      case 'title':
        if (!value.trim()) return '노트 제목을 반드시 입력해주세요.';
        if (value.trim().length < 2) return '제목은 최소 2글자 이상이어야 합니다.';
        return '';
      case 'summary':
        if (value.length > 100) return '요약은 100자 이내로 작성해주세요.';
        return '';
      case 'content':
        if (!value.trim()) return '학습 내용을 반드시 입력해주세요.';
        if (value.trim().length < 10) return '내용은 최소 10글자 이상 작성해주세요.';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // 필드 에러 실시간 갱신
    if (touched[name]) {
      const errorMsg = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 전체 유효성 검사
    const newErrors = {
      title: validateField('title', formData.title),
      summary: validateField('summary', formData.summary),
      content: validateField('content', formData.content)
    };

    setErrors(newErrors);
    setTouched({ title: true, summary: true, content: true });

    const hasError = Object.values(newErrors).some((err) => Boolean(err));
    if (hasError) return;

    onSubmit(formData);
  };

  const priorityVariant = 
    formData.priority === 'High' ? 'priority-high' :
    formData.priority === 'Medium' ? 'priority-medium' : 'priority-low';

  return (
    <div className="form-preview-layout">
      {/* 1. 입력 폼 영역 */}
      <form onSubmit={handleSubmit} className="item-form-card" noValidate>
        <div className="form-card-header">
          <h2 className="form-title">
            {initialData ? '학습 노트 수정' : '새 학습 노트 작성'}
          </h2>
          <p className="form-subtitle">
            작성한 내용은 실시간으로 오른쪽 미리보기에 반영됩니다.
          </p>
        </div>

        <div className="form-grid-2col">
          <Select
            label="카테고리"
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={CATEGORY_OPTIONS}
            required
          />
          <Select
            label="중요도"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            options={PRIORITY_OPTIONS}
            required
          />
        </div>

        <Input
          label="노트 제목"
          name="title"
          value={formData.title}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="예: React 18 상태 흐름과 렌더링 생명주기"
          error={touched.title ? errors.title : ''}
          helperText="학습한 핵심 개념이나 주제를 적어주세요."
          required
        />

        <Input
          label="한 줄 요약 (선택)"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="예: 컴포넌트 렌더링 최적화와 의존성 배열 관리 팁"
          error={touched.summary ? errors.summary : ''}
          helperText={`${formData.summary.length}/100자 (목록 카드에 표시됩니다)`}
        />

        <Textarea
          label="상세 학습 내용"
          name="content"
          value={formData.content}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={7}
          maxLength={1500}
          showCount
          placeholder="이곳에 학습한 기술 내용, 코드 아이디어, 겪은 문제와 해결책을 자세히 적어보세요."
          error={touched.content ? errors.content : ''}
          helperText="최소 10자 이상 작성해야 합니다."
          required
        />

        <div className="form-actions-row">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            icon={Save}
            isLoading={isSubmitting}
          >
            {submitLabel}
          </Button>
        </div>
      </form>

      {/* 2. 상태 변경 -> 실시간 렌더링 변화 지점 (Live Preview) */}
      <div className="preview-panel-wrap">
        <div className="preview-panel-header">
          <div className="preview-badge-row">
            <Eye size={16} />
            <span>실시간 렌더링 미리보기</span>
          </div>
          <span className="preview-hint">입력 상태 변화가 즉시 렌더링됩니다</span>
        </div>

        <div className="live-preview-card">
          <div className="card-top-row">
            <div className="badge-group">
              <Badge text={formData.category} variant="category" size="sm" />
              <Badge text={formData.priority} variant={priorityVariant} size="sm" />
            </div>
            <span className="preview-live-indicator">
              <Sparkles size={13} />
              LIVE
            </span>
          </div>

          <h3 className="preview-title">
            {formData.title || '(제목을 입력하면 이곳에 렌더링됩니다)'}
          </h3>

          <p className="preview-summary">
            {formData.summary || '(요약이 비어있으면 본문 앞부분이 표시됩니다)'}
          </p>

          <hr className="preview-divider" />

          <div className="preview-content-box">
            {formData.content ? (
              <p className="preview-body-text">{formData.content}</p>
            ) : (
              <p className="preview-placeholder-text">
                본문을 작성하면 실시간으로 서식이 적용되어 이곳에 표시됩니다.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
