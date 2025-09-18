import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'build',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // React 相关库
          react: ['react', 'react-dom'],
          // Material-UI 相关
          mui: ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
          // 路由相关
          router: ['react-router-dom'],
          // Three.js 相关
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          // 动画库
          animation: ['framer-motion', 'gsap'],
          // 工具库
          utils: ['axios', 'react-scroll', 'react-tsparticles', 'tsparticles']
        },
        // 优化 chunk 文件名
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/').pop()
            : 'chunk';
          return `assets/${facadeModuleId}-[hash].js`;
        },
        assetFileNames: (assetInfo) => {
          // 使用正确的 API 获取文件名
          const fileName = assetInfo.names?.[0] || 'unknown';
          const info = fileName.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/css/i.test(ext)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        }
      }
    },
    // 启用 CSS 代码分割
    cssCodeSplit: true,
    // 压缩配置
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  define: {
    global: 'globalThis',
  },
  // 优化依赖预构建
  optimizeDeps: {
    include: ['react', 'react-dom', '@mui/material', '@emotion/react']
  }
})