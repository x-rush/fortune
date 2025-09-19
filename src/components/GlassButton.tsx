import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface GlassButtonProps extends Omit<ButtonProps, 'variant'> {
  children: React.ReactNode;
  variant?: 'contained' | 'outlined' | 'glass';
  to?: string;
  smooth?: boolean;
  duration?: number;
  target?: string;
  rel?: string;
}

const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  variant = 'contained',
  className = '',
  ...props
}) => {
  // Pass only valid Button props to the Button component
  const buttonProps = {
    ...props,
    variant: variant === 'glass' ? 'outlined' : variant,
  };
  const getVariantStyles = () => {
    switch (variant) {
      case 'contained':
        return {
          background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
          boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 30px rgba(59, 130, 246, 0.4)',
          },
        };
      case 'outlined':
        return {
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderColor: '#3b82f6',
          },
        };
      case 'glass':
        return {
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderColor: 'rgba(59, 130, 246, 0.5)',
          },
        };
      default:
        return {};
    }
  };

  return (
    <Button
      className={className}
      sx={{
        textTransform: 'none',
        borderRadius: 8,
        fontWeight: 500,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        backdropFilter: 'blur(10px)',
        ...getVariantStyles(),
        ...props.sx,
      }}
      {...buttonProps}
    >
      {children}
    </Button>
  );
};

export default GlassButton;