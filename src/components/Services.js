import React from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
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
    <div id="services" style={{ paddingTop: '50px', paddingBottom: '50px', background: '#2d3748' }}>
      <Container>
        <Typography variant="h4" align="center" gutterBottom style={{ color: '#e2e8f0' }}>
          我们的服务
        </Typography>
        <Grid container spacing={4} style={{ marginTop: '20px' }}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card style={{ backgroundColor: '#4a5568', color: '#e2e8f0', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                <CardContent align="center">
                  {service.icon}
                  <Typography variant="h6" style={{ marginTop: '10px' }}>{service.title}</Typography>
                  <Typography>{service.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Services;