import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Container,
  Fade,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { productAPI } from '../services/api';
import { Product } from '../types';

const Products = () => {
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
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography>加载中...</Typography>
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        py: { xs: 8, md: 12 }, 
        background: 'linear-gradient(135deg, #16213e 0%, #0f3460 100%)',
        position: 'relative',
        overflow: 'hidden'
      }} 
      id="products"
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #00bfff, #1e90ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            我们的产品
          </Typography>
          <Typography 
            variant="h6" 
            color="#a0a0a0"
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            专业的产品解决方案，助力企业数字化转型
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)'
            },
            gap: { xs: 3, sm: 4, md: 6 },
            justifyContent: 'center',
            justifyItems: 'center'
          }}
        >
          {products.map((product, index) => (
            <Box key={product.id}>
              <Fade 
                in={true} 
                timeout={1000} 
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(0, 191, 255, 0.2)',
                  borderRadius: '20px',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      borderColor: 'rgba(0, 191, 255, 0.5)',
                      boxShadow: '0 20px 40px rgba(0, 191, 255, 0.2)'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="240"
                    image={product.image}
                    alt={product.name}
                    sx={{ 
                      objectFit: 'cover',
                      filter: 'brightness(0.9)',
                      transition: 'filter 0.3s ease-in-out',
                      '&:hover': {
                        filter: 'brightness(1)'
                      }
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography 
                      gutterBottom 
                      variant="h5" 
                      component="h3"
                      sx={{ fontWeight: 'bold' }}
                    >
                      {product.name}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      color="#a0a0a0" 
                      sx={{ mb: 2, lineHeight: 1.6, color: '#a0a0a0' }}
                    >
                      {product.description}
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                      <Chip 
                        label={product.category} 
                        size="small" 
                        color="primary"
                        variant="outlined"
                      />
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      {product.features.map((feature, idx) => (
                        <Chip
                          key={idx}
                          label={feature}
                          size="small"
                          sx={{ 
                            mr: 0.5, 
                            mb: 0.5,
                            bgcolor: 'primary.light',
                            color: 'white'
                          }}
                        />
                      ))}
                    </Box>

                    <Button
                      variant="contained"
                      endIcon={<ArrowForward />}
                      fullWidth={isMobile}
                      sx={{ 
                        mt: 'auto',
                        bgcolor: 'primary.main',
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'primary.dark'
                        }
                      }}
                      href={product.link}
                    >
                      了解更多
                    </Button>
                  </CardContent>
                </Card>
              </Fade>
            </Box>
          ))}
        </Box>

        {products.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              暂无产品，请在管理后台添加
            </Typography>
            <Button 
              variant="contained" 
              sx={{ mt: 2 }}
              href="/admin"
            >
              进入管理后台
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Products;