import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  IconButton,
  Alert
} from '@mui/material';
import { Edit, Delete, Add, Logout } from '@mui/icons-material';
import { productAPI } from '../services/api';
import { Product } from '../types';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    image: '',
    category: '',
    features: [] as string[],
    link: ''
  });
  const [featureInput, setFeatureInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productAPI.getAll();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError('获取产品列表失败');
      setLoading(false);
    }
  };

  const handleOpen = (product: Product | null = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price || 0,
        image: product.image || '',
        category: product.category,
        features: product.features,
        link: product.link || ''
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: 0,
        image: '',
        category: '',
        features: [] as string[],
        link: ''
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProduct(null);
    setFeatureInput('');
    setFormData({
      name: '',
      description: '',
      price: 0,
      image: '',
      category: '',
      features: [] as string[],
      link: ''
    });
  };

  const handleSubmit = async () => {
    try {
      if (editingProduct) {
        await productAPI.update(editingProduct.id, formData);
      } else {
        await productAPI.create({
          ...formData        });
      }
      fetchProducts();
      handleClose();
    } catch (err) {
      setError('保存产品失败');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('确定要删除这个产品吗？')) {
      try {
        await productAPI.delete(id);
        fetchProducts();
      } catch (err) {
        setError('删除产品失败');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin-login');
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, featureInput.trim()]
      });
      setFeatureInput('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    });
  };

  if (loading) return <Box sx={{ p: 3 }}>加载中...</Box>;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          产品管理后台
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Logout />}
          onClick={handleLogout}
          sx={{
            color: '#ef4444',
            borderColor: '#ef4444',
            '&:hover': {
              borderColor: '#dc2626',
              backgroundColor: 'rgba(239, 68, 68, 0.1)'
            }
          }}
        >
          退出登录
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpen()}
        sx={{ mb: 2 }}
      >
        添加新产品
      </Button>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)'
          },
          gap: 3
        }}
      >
        {products.map((product) => (
          <Card key={product.id}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {product.description}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                分类: {product.category}
              </Typography>
              <Box sx={{ mt: 1 }}>
                {product.features.map((feature: string, index: number) => (
                  <Chip key={index} label={feature} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                ))}
              </Box>
              <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                <IconButton onClick={() => handleOpen(product)} size="small">
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(product.id)} size="small" color="error">
                  <Delete />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingProduct ? '编辑产品' : '添加新产品'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="产品名称"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            label="产品描述"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="产品图片URL"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="number"
            label="价格"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="产品分类"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="产品链接"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            sx={{ mb: 2 }}
          />
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="产品特性"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
              placeholder="输入特性后按回车添加"
            />
            <Box sx={{ mt: 1 }}>
              {formData.features.map((feature: string, index: number) => (
                <Chip
                  key={index}
                  label={feature}
                  onDelete={() => removeFeature(index)}
                  sx={{ mr: 0.5, mb: 0.5 }}
                />
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingProduct ? '更新' : '创建'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Admin;