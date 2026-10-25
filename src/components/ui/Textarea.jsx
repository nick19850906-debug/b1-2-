import React from 'react';

export function Textarea({
  label,
  id,
  value,
  onChange,
  placeholder,
  error,
  helperText,
  rows = 5,
  maxLength,
  showCount = false,
  required = false,
  disabled = false,
  className = '',
  ...props
}) {
  const textareaId = id || (label ? `textarea-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const currentLength = value ? value.length : 0;

  return (
    <div className={`input-field-group ${className}`}>
      <div className="input-header-row">
        {label && (
          <label htmlFor={textareaId} className="input-label">
            {label}
            {required && <span className="required-star">*</span>}
          </label>
        )}
        {showCount && maxLength && (
          <span className={`char-counter ${currentLength > maxLength ? 'over-limit' : ''}`}>
            {currentLength} / {maxLength}자
          </span>
        )}
      </div>
      <textarea
        id={textareaId}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        className={`textarea-control ${error ? 'has-error' : ''}`}
        {...props}
      />
      {error && <p className="input-error-msg">{error}</p>}
      {!error && helperText && <p className="input-helper-msg">{helperText}</p>}
    </div>
  );
}
