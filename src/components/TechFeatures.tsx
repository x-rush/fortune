import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';
import { Box, Typography, Container } from '@mui/material';
import { Code, Speed, Security, Analytics } from '@mui/icons-material';
import gsap from 'gsap';

const TechFeatures = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  const features = [
    {
      icon: <Code sx={{ fontSize: 60, color: '#00bfff' }} />,
      title: '前沿技术',
      description: '采用最新技术栈，确保系统性能和可扩展性',
      color: '#00bfff'
    },
    {
      icon: <Speed sx={{ fontSize: 60, color: '#00ff88' }} />,
      title: '极速响应',
      description: '毫秒级响应速度，提供流畅的用户体验',
      color: '#00ff88'
    },
    {
      icon: <Security sx={{ fontSize: 60, color: '#ff6b6b' }} />,
      title: '企业级安全',
      description: '多层安全防护，保障数据安全和隐私',
      color: '#ff6b6b'
    },
    {
      icon: <Analytics sx={{ fontSize: 60, color: '#ffd93d' }} />,
      title: '智能分析',
      description: 'AI驱动的数据分析，助力精准决策',
      color: '#ffd93d'
    }
  ];

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
      
      // GSAP动画
      gsap.fromTo('.feature-card', 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' }
      );
    }
  }, [isInView, controls]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <Box
      sx={{
        py: 10,
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
      id="features"
    >
      <Container maxWidth="lg" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.8 }}
        >
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
            核心优势
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
            用技术驱动创新，用创新引领未来
          </Typography>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)'
            },
            gap: { xs: 3, sm: 4, md: 6 },
            justifyContent: 'center',
            justifyItems: 'center',
            maxWidth: { lg: '1200px', xl: '1400px' },
            margin: '0 auto'
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: `0 20px 40px ${feature.color}20`
              }}
              style={{
                height: '100%',
                padding: '40px 30px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${feature.color}20`,
                borderRadius: '20px',
                textAlign: 'center',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                maxWidth: '340px',
                minHeight: '320px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(45deg, ${feature.color}05, transparent)`,
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  ':hover': {
                    opacity: 1
                  }
                }}
              />
              
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {feature.icon}
              </motion.div>
              
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  color: 'white',
                  mt: 3,
                  mb: 2
                }}
              >
                {feature.title}
              </Typography>
              
              <Typography
                sx={{
                  color: '#a0a0a0',
                  lineHeight: 1.6
                }}
              >
                {feature.description}
              </Typography>

              <motion.div
                style={{
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  width: 60,
                  height: 60,
                  border: `1px solid ${feature.color}`,
                  borderRadius: '50%',
                  background: 'transparent'
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          ))}
        </Box>
        </motion.div>

        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            height: 600,
            border: '1px solid rgba(0,191,255,0.1)',
            borderRadius: '50%',
            animation: 'pulse 4s ease-in-out infinite',
            '@keyframes pulse': {
              '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.3 },
              '50%': { transform: 'translate(-50%, -50%) scale(1.1)', opacity: 0.1 }
            }
          }}
        />
      </Container>
    </Box>
  );
};

export default TechFeatures;