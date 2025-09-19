import axios from 'axios';
import { Product } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productAPI = {
  // 获取所有产品（公开访问）
  getAll: async (): Promise<Product[]> => {
    const response = await api.get('/api/products');
    return response.data;
  },

  // 获取单个产品（公开访问）
  getById: async (id: string): Promise<Product> => {
    const response = await api.get(`/api/products/${id}`);
    return response.data;
  },

  // 创建产品（需要认证）
  create: async (product: Omit<Product, 'id'>): Promise<Product> => {
    const token = localStorage.getItem('adminToken');
    const response = await api.post('/admin/products', product, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  },

  // 更新产品（需要认证）
  update: async (id: string, product: Partial<Product>): Promise<Product> => {
    const token = localStorage.getItem('adminToken');
    const response = await api.put(`/admin/products/${id}`, product, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  },

  // 删除产品（需要认证）
  delete: async (id: string): Promise<void> => {
    const token = localStorage.getItem('adminToken');
    await api.delete(`/admin/products/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },
};

// 认证相关API
export const authAPI = {
  // 登录
  login: async (username: string, password: string) => {
    const response = await api.post('/api/login', { username, password });
    return response.data;
  },

  // 验证token
  verifyToken: async (token: string) => {
    try {
      const response = await api.post('/api/verify-auth', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Token verification failed:', error);
      // If the response is 403, it means the token is invalid or user is not admin
      if (error.response && error.response.status === 403) {
        return { valid: false };
      }
      throw error;
    }
  },

  // 检查是否已登录
  isLoggedIn: () => {
    const token = localStorage.getItem('adminToken');
    return !!token;
  },

  // 登出
  logout: () => {
    localStorage.removeItem('adminToken');
  },
};

export default api;