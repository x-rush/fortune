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
  Alert,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Badge
} from '@mui/material';
import { Edit, Delete, Add, Logout, Mail, MarkEmailRead, ClearAll } from '@mui/icons-material';
import { productAPI, contactAdminAPI } from '../services/api';
import { Product } from '../types';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState<string | null>(null);
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
    fetchContactMessages();
  }, []);

  useEffect(() => {
    if (activeTab === 1) {
      fetchContactMessages();
    }
  }, [activeTab]);

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

  const fetchContactMessages = async () => {
    setMessagesLoading(true);
    setMessagesError(null);
    try {
      const data = await contactAdminAPI.getAll();
      setContactMessages(data);
      setMessagesLoading(false);
    } catch (err) {
      setMessagesError('获取联系消息失败');
      setMessagesLoading(false);
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
        features: [],
        link: ''
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProduct(null);
    setFeatureInput('');
  };

  const handleSubmit = async () => {
    try {
      if (editingProduct) {
        await productAPI.update(editingProduct.id, formData);
      } else {
        await productAPI.create(formData);
      }
      fetchProducts();
      handleClose();
    } catch (err) {
      setError('保存产品失败');
    }
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

  const handleMarkAsRead = async (id: number) => {
    try {
      await contactAdminAPI.markAsRead(id);
      setContactMessages(contactMessages.map(msg =>
        msg.id === id ? { ...msg, read: true } : msg
      ));
    } catch (err) {
      setError('标记已读失败');
    }
  };

  const handleDeleteMessage = async (id: number) => {
    if (window.confirm('确定要删除这条消息吗？')) {
      try {
        await contactAdminAPI.delete(id);
        setContactMessages(contactMessages.filter(msg => msg.id !== id));
      } catch (err) {
        setError('删除消息失败');
      }
    }
  };

  const handleClearAllMessages = async () => {
    if (window.confirm('确定要清空所有消息吗？此操作不可恢复！')) {
      try {
        await contactAdminAPI.clearAll();
        setContactMessages([]);
      } catch (err) {
        setError('清空消息失败');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin-login');
  };

  if (loading) return <Box sx={{ p: 3 }}>加载中...</Box>;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          管理后台
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

      {/* 标签页 */}
      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
        <Tab
          label="产品管理"
        />
        <Tab
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Badge badgeContent={contactMessages.filter(m => !m.read).length} color="error">
                <Mail />
              </Badge>
              联系消息
            </Box>
          }
        />
      </Tabs>

      {/* 产品管理标签页 */}
      {activeTab === 0 && (
        <Box>
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
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ¥{product.price}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Chip label={product.category} size="small" />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
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
        </Box>
      )}

      {/* 联系消息标签页 */}
      {activeTab === 1 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5">联系消息管理</Typography>
            <Button
              variant="outlined"
              color="error"
              startIcon={<ClearAll />}
              onClick={handleClearAllMessages}
              disabled={contactMessages.length === 0}
            >
              清空所有消息
            </Button>
          </Box>

          {messagesLoading && <Box sx={{ p: 3 }}>加载中...</Box>}
          {messagesError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {messagesError}
            </Alert>
          )}

          {contactMessages.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8, color: '#64748b' }}>
              <Mail sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
              <Typography variant="h6">暂无联系消息</Typography>
              <Typography variant="body2">当用户提交联系表单后，消息将显示在这里</Typography>
            </Box>
          ) : (
            <TableContainer component={Paper} sx={{ background: 'rgba(255, 255, 255, 0.05)' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>状态</TableCell>
                    <TableCell>姓名</TableCell>
                    <TableCell>邮箱</TableCell>
                    <TableCell>消息</TableCell>
                    <TableCell>时间</TableCell>
                    <TableCell>操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contactMessages.map((message) => (
                    <TableRow key={message.id} sx={{
                      backgroundColor: message.read ? 'transparent' : 'rgba(59, 130, 246, 0.1)'
                    }}>
                      <TableCell>
                        <Chip
                          label={message.read ? '已读' : '未读'}
                          color={message.read ? 'default' : 'primary'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{message.name}</TableCell>
                      <TableCell>{message.email}</TableCell>
                      <TableCell sx={{ maxWidth: 300 }}>
                        <Typography variant="body2" sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {message.message}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {new Date(message.createdAt).toLocaleString('zh-CN')}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          {!message.read && (
                            <IconButton
                              size="small"
                              onClick={() => handleMarkAsRead(message.id)}
                              title="标记为已读"
                            >
                              <MarkEmailRead />
                            </IconButton>
                          )}
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteMessage(message.id)}
                            color="error"
                            title="删除消息"
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      )}

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
            label="产品描述"
            multiline
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
            label="产品图片"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
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