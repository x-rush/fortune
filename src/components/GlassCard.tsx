import React from 'react';
import { Card, CardProps } from '@mui/material';

interface GlassCardProps extends CardProps {
  children: React.ReactNode;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', ...props }) => {
  return (
    <Card
      className={className}
      sx={{
        backdropFilter: 'blur(20px)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 16px 48px rgba(0, 0, 0, 0.2)',
          borderColor: 'rgba(59, 130, 246, 0.3)',
        },
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Card>
  );
};

export default GlassCard;