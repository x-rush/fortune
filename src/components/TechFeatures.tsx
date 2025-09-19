import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';
import { Box, Typography, Container } from '@mui/material';
import { Code, Speed, Security, Analytics } from '@mui/icons-material';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';
import GlassCard from './GlassCard';

const TechFeatures = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  const features = [
    {
      icon: <Code sx={{ fontSize: 60, color: '#3b82f6' }} />,
      title: t('features.items.0.title'),
      description: t('features.items.0.description'),
      color: '#3b82f6'
    },
    {
      icon: <Speed sx={{ fontSize: 60, color: '#06b6d4' }} />,
      title: t('features.items.1.title'),
      description: t('features.items.1.description'),
      color: '#06b6d4'
    },
    {
      icon: <Security sx={{ fontSize: 60, color: '#8b5cf6' }} />,
      title: t('features.items.2.title'),
      description: t('features.items.2.description'),
      color: '#8b5cf6'
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
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, transparent 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)',
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
            variant="h2"
            align="center"
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
            {t('features.title')}
          </Typography>

          <Typography
            variant="h6"
            align="center"
            sx={{
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              color: '#94a3b8',
              mb: 8,
              maxWidth: 700,
              mx: 'auto',
              lineHeight: 1.6,
              opacity: 0.9,
            }}
          >
            {t('features.subtitle')}
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
              md: 'repeat(3, 1fr)',
            },
            gap: { xs: 4, md: 6 },
            justifyContent: 'center',
            maxWidth: '1200px',
            mx: 'auto',
          }}
        >
          {features.map((feature, index) => (
            <GlassCard
              key={index}
              className="feature-card"
              sx={{
                p: { xs: 4, md: 6 },
                textAlign: 'center',
                minHeight: '350px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  borderColor: `${feature.color}40`,
                  transform: 'translateY(-8px)',
                  boxShadow: `0 20px 40px ${feature.color}20`,
                },
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `radial-gradient(circle at center, ${feature.color}08 0%, transparent 70%)`,
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                }}
                className="feature-glow"
              />

              <Box
                component={motion.div}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                }}
                transition={{ duration: 0.3 }}
                sx={{
                  mb: 4,
                  p: 3,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}05)`,
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${feature.color}30`,
                  display: 'inline-flex',
                }}
              >
                {feature.icon}
              </Box>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: '#f1f5f9',
                  mb: 3,
                  fontSize: { xs: '1.5rem', md: '1.8rem' },
                }}
              >
                {feature.title}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: '#94a3b8',
                  lineHeight: 1.7,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  maxWidth: '280px',
                  mx: 'auto',
                }}
              >
                {feature.description}
              </Typography>

              <motion.div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '20px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${feature.color}, ${feature.color}80)`,
                  opacity: 0.1,
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </GlassCard>
          ))}
        </Box>
        </motion.div>

        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '400px', md: '600px' },
            height: { xs: '400px', md: '600px' },
            border: '1px solid rgba(59, 130, 246, 0.08)',
            borderRadius: '50%',
            animation: 'pulse 6s ease-in-out infinite',
            pointerEvents: 'none',
            '@keyframes pulse': {
              '0%, 100%': {
                transform: 'translate(-50%, -50%) scale(1)',
                opacity: 0.1
              },
              '50%': {
                transform: 'translate(-50%, -50%) scale(1.15)',
                opacity: 0.05
              }
            }
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '300px', md: '450px' },
            height: { xs: '300px', md: '450px' },
            border: '1px solid rgba(6, 182, 212, 0.06)',
            borderRadius: '50%',
            animation: 'pulse-reverse 8s ease-in-out infinite',
            pointerEvents: 'none',
            '@keyframes pulse-reverse': {
              '0%, 100%': {
                transform: 'translate(-50%, -50%) scale(1)',
                opacity: 0.08
              },
              '50%': {
                transform: 'translate(-50%, -50%) scale(1.2)',
                opacity: 0.03
              }
            }
          }}
        />
      </Container>
    </Box>
  );
};

export default TechFeatures;