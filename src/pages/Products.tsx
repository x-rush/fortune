import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  Container,
  useTheme,
  useMediaQuery,
  Skeleton
} from '@mui/material';
import { ArrowForward, OpenInNew } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { productAPI } from '../services/api';
import { Product } from '../types';
import { useTranslation } from 'react-i18next';
import GlassCard from '../components/GlassCard';
import GlassButton from '../components/GlassButton';

const Products = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productAPI.getAll();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('获取产品失败:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ py: { xs: 8, md: 12 }, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ color: '#94a3b8', mb: 4 }}>
          {t('products.loading')}
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4, maxWidth: 1200, mx: 'auto' }}>
          {[1, 2, 3].map((item) => (
            <Box key={item}>
              <Skeleton variant="rectangular" height={240} sx={{ borderRadius: 2, mb: 2 }} />
              <Skeleton variant="text" height={32} width="80%" sx={{ mb: 1 }} />
              <Skeleton variant="text" height={20} width="100%" sx={{ mb: 1 }} />
              <Skeleton variant="text" height={20} width="60%" />
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, transparent 0%, rgba(139, 92, 246, 0.05) 50%, transparent 100%)',
      }}
      id="products"
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 800,
                background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 3,
                textShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
              }}
            >
              {t('products.title')}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                color: '#94a3b8',
                maxWidth: 700,
                mx: 'auto',
                lineHeight: 1.6,
                opacity: 0.9,
              }}
            >
              {t('products.subtitle')}
            </Typography>
          </Box>
        </motion.div>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)'
            },
            gap: { xs: 4, md: 6 },
            maxWidth: 1200,
            mx: 'auto',
          }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <GlassCard
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    borderColor: 'rgba(139, 92, 246, 0.3)',
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(139, 92, 246, 0.15)',
                  },
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    height: 200,
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
                  }}
                >
                  <Box
                    component="img"
                    src={product.image}
                    alt={product.name}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease, filter 0.3s ease',
                      filter: 'brightness(0.8) saturate(1.2)',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        filter: 'brightness(1) saturate(1.4)',
                      }
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(to bottom, transparent 60%, rgba(0, 0, 0, 0.7))',
                    }}
                  />
                </Box>

                <Box sx={{ p: { xs: 3, md: 4 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      fontWeight: 700,
                      color: '#f1f5f9',
                      mb: 2,
                      fontSize: { xs: '1.3rem', md: '1.5rem' },
                    }}
                  >
                    {product.name}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: '#94a3b8',
                      mb: 3,
                      lineHeight: 1.6,
                      flexGrow: 1,
                      fontSize: { xs: '0.95rem', md: '1rem' },
                    }}
                  >
                    {product.description}
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                    <Chip
                      label={product.category}
                      size="small"
                      sx={{
                        bgcolor: 'rgba(139, 92, 246, 0.2)',
                        color: '#a78bfa',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                        fontWeight: 500,
                        fontSize: '0.85rem',
                      }}
                    />
                  </Box>

                  {product.features && product.features.length > 0 && (
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {product.features.slice(0, 3).map((feature, idx) => (
                          <Chip
                            key={idx}
                            label={feature}
                            size="small"
                            sx={{
                              bgcolor: 'rgba(59, 130, 246, 0.1)',
                              color: '#93c5fd',
                              border: '1px solid rgba(59, 130, 246, 0.2)',
                              fontSize: '0.8rem',
                              fontWeight: 500,
                            }}
                          />
                        ))}
                        {product.features.length > 3 && (
                          <Chip
                            label={`+${product.features.length - 3}`}
                            size="small"
                            sx={{
                              bgcolor: 'rgba(107, 114, 128, 0.1)',
                              color: '#9ca3af',
                              border: '1px solid rgba(107, 114, 128, 0.2)',
                              fontSize: '0.8rem',
                            }}
                          />
                        )}
                      </Box>
                    </Box>
                  )}

                  <Box sx={{ mt: 'auto' }}>
                    <GlassButton
                      variant="contained"
                      endIcon={<OpenInNew />}
                      fullWidth
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        py: 1.5,
                        fontWeight: 600,
                      }}
                    >
                      {t('products.viewDetails')}
                    </GlassButton>
                  </Box>
                </Box>
              </GlassCard>
            </motion.div>
          ))}
        </Box>

        {products.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard sx={{ textAlign: 'center', py: { xs: 6, md: 8 }, px: 4, maxWidth: 600, mx: 'auto' }}>
              <Typography
                variant="h6"
                sx={{
                  color: '#94a3b8',
                  mb: 3,
                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                }}
              >
                {t('products.empty')}
              </Typography>
              <GlassButton
                variant="contained"
                component="a"
                href="/admin"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                }}
              >
                {t('products.goToAdmin')}
              </GlassButton>
            </GlassCard>
          </motion.div>
        )}
      </Container>
    </Box>
  );
};

export default Products;