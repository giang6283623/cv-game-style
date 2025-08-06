import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = true }) => {
  return (
    <div className={`card ${hover ? 'card-hover' : ''} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
