import React from 'react';

export function Card({
  children,
  onClick,
  hoverable = true,
  className = '',
  ...props
}) {
  const isClickable = Boolean(onClick);

  return (
    <div
      onClick={onClick}
      className={`card ${hoverable ? 'card-hoverable' : ''} ${isClickable ? 'card-clickable' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
