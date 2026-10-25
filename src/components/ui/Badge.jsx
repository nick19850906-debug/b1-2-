import React from 'react';

export function Badge({
  text,
  variant = 'category', // category | priority-high | priority-medium | priority-low | status
  size = 'md',
  className = '',
  onClick
}) {
  const isClickable = Boolean(onClick);

  return (
    <span
      onClick={onClick}
      className={`badge badge-${variant} badge-size-${size} ${isClickable ? 'clickable' : ''} ${className}`}
    >
      {text}
    </span>
  );
}
