import React, { Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';

interface LazyComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const LazyComponent: React.FC<LazyComponentProps> = ({
  children,
  fallback = (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px',
      }}
    >
      <CircularProgress />
    </Box>
  ),
}) => {
  return <Suspense fallback={fallback}>{children}</Suspense>;
};

// 图片懒加载组件
export const LazyImage: React.FC<{
  src: string;
  alt: string;
  style?: React.CSSProperties;
  className?: string;
}> = ({ src, alt, style, className }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);

  return (
    <img
      src={isLoaded ? src : ''}
      alt={alt}
      style={{
        ...style,
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
      }}
      className={className}
      onLoad={() => setIsLoaded(true)}
      onError={() => setError(true)}
      loading="lazy"
    />
  );
};

// 组件预加载工具
export const preloadComponent = (importFn: () => Promise<any>) => {
  return importFn();
};