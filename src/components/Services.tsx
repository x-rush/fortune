import React from 'react';
import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import WebIcon from '@mui/icons-material/Web';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import SmartScreenIcon from '@mui/icons-material/SmartScreen';
import AppsIcon from '@mui/icons-material/Apps';

const services = [
  { title: 'Web开发', description: '响应式网站、电商平台、企业官网', icon: <WebIcon fontSize="large" /> },
  { title: 'App开发', description: 'iOS、Android原生及混合应用开发', icon: <PhoneIphoneIcon fontSize="large" /> },
  { title: '小程序开发', description: '微信、支付宝、百度小程序开发', icon: <SmartScreenIcon fontSize="large" /> },
  { title: '快应用开发', description: '无需安装，即点即用的全新应用形态', icon: <AppsIcon fontSize="large" /> },
];

const Services = () => {
  return (
    <Box
      id="services"
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          align="center"
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #00bfff, #1e90ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2
          }}
        >
          我们的服务
        </Typography>
        
        <Typography
          variant="h6"
          align="center"
          sx={{
            color: '#a0a0a0',
            mb: 8,
            maxWidth: 600,
            mx: 'auto'
          }}
        >
          专业的数字化解决方案，助力企业转型升级
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)'
            },
            gap: { xs: 3, sm: 4, md: 6 },
            justifyContent: 'center',
            justifyItems: 'center'
          }}
        >
          {services.map((service, index) => (
            <Card
              key={index}
              sx={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(0, 191, 255, 0.2)',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                width: '100%',
                maxWidth: '320px',
                minHeight: '280px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
                color: '#e2e8f0',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  borderColor: 'rgba(0, 191, 255, 0.5)',
                  boxShadow: '0 20px 40px rgba(0, 191, 255, 0.2)'
                }
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    color: '#00bfff',
                    mb: 2,
                    fontSize: '3rem'
                  }}
                >
                  {service.icon}
                </Box>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 'bold', 
                    mb: 2,
                    color: 'white'
                  }}
                >
                  {service.title}
                </Typography>
                <Typography sx={{ color: '#a0a0a0', lineHeight: 1.6 }}>
                  {service.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Services;