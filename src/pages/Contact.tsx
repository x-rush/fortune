import React from 'react';
import { Container, Typography } from '@mui/material';

const Contact = () => {
  return (
    <div id="contact" style={{ paddingTop: '80px', paddingBottom: '80px', background: '#0d1117', color: '#e2e8f0' }}>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: 'bold' }}>
          联系我们
        </Typography>
        <Typography variant="h6" align="center" style={{ color: '#a0aec0', marginTop: '20px' }}>
          准备好开启您的项目了吗？
        </Typography>
        <Typography variant="h5" align="center" style={{ color: '#00bfff', marginTop: '20px', fontWeight: 'bold' }}>
          contact@indexoob.com
        </Typography>
        <Typography variant="body2" align="center" style={{ color: '#a0aec0', marginTop: '60px' }}>
          © 2025 indexoob. All Rights Reserved.
        </Typography>
      </Container>
    </div>
  );
};

export default Contact;