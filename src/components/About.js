import React from 'react';
import { Container, Typography } from '@mui/material';

const About = () => {
  return (
    <div id="about" style={{ paddingTop: '100px', paddingBottom: '100px', background: '#1a202c' }}>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom style={{ color: '#e2e8f0', fontWeight: 'bold' }}>
          关于我们
        </Typography>
        <Typography variant="h6" align="center" style={{ color: '#a0aec0', marginTop: '20px', lineHeight: '1.8' }}>
          indexoob 致力于提供高质量的Web、App、小程序和快应用开发服务。我们的使命是帮助客户突破技术桎梏，实现业务的超越与极限。我们相信，代码是创造未来的语言，而我们，是您最值得信赖的翻译官。
        </Typography>
      </Container>
    </div>
  );
};

export default About;