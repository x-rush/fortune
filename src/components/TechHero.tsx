import React, { useEffect, useRef, useState, Suspense } from 'react';
import { motion, useScroll, useTransform, Variants, AnimatePresence } from 'framer-motion';
import { Box, Typography, Button, Container, CircularProgress, Tab, Tabs, Paper } from '@mui/material';
import { PlayArrow, ArrowDownward, Code, DeveloperMode, Speed } from '@mui/icons-material';
import { Particle as IParticle, MousePosition } from '../types';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useTranslation } from 'react-i18next';
import Enhanced3DScene from './hero/Enhanced3DScene';
import TechStackMatrix from './hero/TechStackMatrix';
import LiveCodeDemo from './hero/LiveCodeDemo';



const TechHero = () => {
  const { t } = useTranslation();
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState(0);
  const [showMore, setShowMore] = useState(false);

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  const tabs = [
    { label: '技术栈', icon: <DeveloperMode />, component: <TechStackMatrix /> },
    { label: '代码演示', icon: <Code />, component: <LiveCodeDemo /> },
    { label: '性能指标', icon: <Speed />, component: <PerformanceMetrics /> },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
      id="home"
    >
      <Enhanced3DScene mousePosition={mousePosition} />

      {/* 网格背景 */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            linear-gradient(rgba(0,191,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,191,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          zIndex: 2,
        }}
      />

      {/* 主要Hero内容 */}
      <motion.div
        style={{ y, opacity, scale }}
      >
        <Box sx={{
          position: 'relative',
          zIndex: 3,
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
        }}>
          <Container maxWidth="lg">
            <Box sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 3, sm: 4, md: 6, lg: 8 },
              alignItems: 'center',
              py: { xs: 2, sm: 3, md: 4, lg: 6 },
              minHeight: { xs: 'auto', md: '70vh' },
            }}>
              {/* 左侧内容 */}
              <Box sx={{ flex: 1, maxWidth: { md: '55%' } }}>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={itemVariants}>
                    <Typography
                      variant="h1"
                      sx={{
                        fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.5rem', lg: '4rem' },
                        fontWeight: 'bold',
                        background: 'linear-gradient(45deg, #00bfff, #1e90ff, #00bfff, #4facfe)',
                        backgroundSize: '300% 300%',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: 'gradient 4s ease infinite',
                        '@keyframes gradient': {
                          '0%': { backgroundPosition: '0% 50%' },
                          '50%': { backgroundPosition: '100% 50%' },
                          '100%': { backgroundPosition: '0% 50%' },
                        },
                        textShadow: '0 0 30px rgba(0,191,255,0.5)',
                        lineHeight: 1.2,
                      }}
                    >
                      {t('hero.title')}
                    </Typography>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Typography
                      variant="h5"
                      sx={{
                        color: '#a0a0a0',
                        mt: { xs: 2, sm: 3, md: 4 },
                        mb: { xs: 3, sm: 4, md: 5 },
                        maxWidth: { xs: '100%', sm: '500px', md: '600px' },
                        lineHeight: 1.6,
                        fontSize: { xs: '1rem', sm: '1.1rem', md: '1.3rem' },
                      }}
                    >
                      {t('hero.subtitle')}
                    </Typography>
                  </motion.div>

                  {/* 统计数据 */}
                  <motion.div variants={itemVariants}>
                    <Box sx={{
                      display: 'grid',
                      gridTemplateColumns: {
                        xs: 'repeat(2, 1fr)',
                        sm: 'repeat(4, 1fr)',
                        md: 'repeat(2, 1fr)',
                        lg: 'repeat(4, 1fr)'
                      },
                      gap: { xs: 2, sm: 3, md: 4 },
                      mb: { xs: 3, sm: 4, md: 5 },
                      width: '100%',
                    }}>
                      {[
                        { label: '项目完成', value: '50+', suffix: '' },
                        { label: '代码行数', value: '1M+', suffix: '' },
                        { label: '团队规模', value: '15', suffix: '+' },
                        { label: '客户满意度', value: '98', suffix: '%' },
                      ].map((stat, index) => (
                        <Box key={index} sx={{ textAlign: 'center' }}>
                          <Typography
                            variant="h3"
                            sx={{
                              color: '#00bfff',
                              fontWeight: 'bold',
                              mb: 0.5,
                              fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' },
                            }}
                          >
                            {stat.value}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: '#888',
                              fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                            }}
                          >
                            {stat.label}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </motion.div>

                  <motion.div variants={itemVariants} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    <Button
                      variant="contained"
                      size="large"
                      endIcon={<PlayArrow />}
                      onClick={() => setShowMore(!showMore)}
                      sx={{
                        background: 'linear-gradient(45deg, #00bfff, #1e90ff)',
                        color: 'white',
                        px: { xs: 2, sm: 3, md: 4 },
                        py: { xs: 0.8, sm: 1, md: 1.5 },
                        borderRadius: 3,
                        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                        fontWeight: 'bold',
                        boxShadow: '0 8px 32px rgba(0,191,255,0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 12px 40px rgba(0,191,255,0.4)',
                        },
                      }}
                    >
                      {showMore ? '收起展示' : t('hero.cta1')}
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{
                        borderColor: '#00bfff',
                        color: '#00bfff',
                        px: { xs: 2, sm: 3, md: 4 },
                        py: { xs: 0.8, sm: 1, md: 1.5 },
                        borderRadius: 3,
                        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                        fontWeight: 'bold',
                        '&:hover': {
                          backgroundColor: 'rgba(0,191,255,0.1)',
                          borderColor: '#00bfff',
                        },
                      }}
                    >
                      {t('hero.cta2')}
                    </Button>
                  </motion.div>
                </motion.div>
              </Box>

              {/* 右侧动态内容 */}
              <Box sx={{
                flex: 1,
                maxWidth: { xs: '100%', sm: '80%', md: '45%' },
                mt: { xs: 4, md: 0 },
              }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <FloatingTechIcons />
                </motion.div>
              </Box>
            </Box>
          </Container>
        </Box>
      </motion.div>

      {/* 可展开的技术展示区域 */}
      <AnimatePresence>
        {showMore && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            style={{ position: 'relative', zIndex: 4 }}
          >
            <Box sx={{
              background: 'rgba(0,0,0,0.3)',
              backdropFilter: 'blur(10px)',
              py: 6,
            }}>
              <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                  <Typography variant="h3" sx={{
                    color: '#fff',
                    mb: 2,
                    background: 'linear-gradient(45deg, #00bfff, #1e90ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                    探索我们的技术实力
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#aaa' }}>
                    深入了解我们使用的技术栈和开发能力
                  </Typography>
                </Box>

                {/* 标签页 */}
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mb: 4
                }}>
                  <Tabs
                    value={activeTab}
                    onChange={(e, newValue) => setActiveTab(newValue)}
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      borderRadius: 2,
                      backdropFilter: 'blur(10px)',
                      '& .MuiTab-root': {
                        color: '#aaa',
                        '&.Mui-selected': {
                          color: '#00bfff',
                        },
                      },
                      '& .MuiTabs-indicator': {
                        backgroundColor: '#00bfff',
                      },
                    }}
                  >
                    {tabs.map((tab, index) => (
                      <Tab
                        key={index}
                        icon={tab.icon}
                        label={tab.label}
                        sx={{
                          minHeight: 60,
                          fontSize: '1rem',
                          fontWeight: 'bold',
                        }}
                      />
                    ))}
                  </Tabs>
                </Box>

                {/* 标签页内容 */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {tabs[activeTab].component}
                  </motion.div>
                </AnimatePresence>
              </Container>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 滚动指示器 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
        }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDownward sx={{ color: '#00bfff', fontSize: 40 }} />
        </motion.div>
      </motion.div>
    </Box>
  );
};

// 浮动技术图标组件
const FloatingTechIcons = () => {
  const icons = [
    { icon: '⚛️', name: 'React', delay: 0 },
    { icon: '🟦', name: 'TypeScript', delay: 0.5 },
    { icon: '🚀', name: 'Next.js', delay: 1 },
    { icon: '🎨', name: 'Material-UI', delay: 1.5 },
    { icon: '🔧', name: 'Node.js', delay: 2 },
    { icon: '🗄️', name: 'MongoDB', delay: 2.5 },
    { icon: '☁️', name: 'AWS', delay: 3 },
    { icon: '🤖', name: 'AI/ML', delay: 3.5 },
  ];

  return (
    <Box sx={{
      position: 'relative',
      width: '100%',
      height: { xs: '300px', sm: '350px', md: '400px' },
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {icons.map((tech, index) => (
        <motion.div
          key={tech.name}
          style={{
            position: 'absolute',
            fontSize: '2.5rem',
            left: `${20 + (index % 3) * 30}%`,
            top: `${20 + Math.floor(index / 3) * 30}%`,
          }}
          animate={{
            y: [0, -18, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 3,
            delay: tech.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          whileHover={{ scale: 1.2 }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <Typography sx={{
              fontSize: '2.5rem',
              mb: 0.5
            }}>
              {tech.icon}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: '#00bfff',
                fontWeight: 'bold',
                fontSize: '0.75rem',
                textShadow: '0 0 10px rgba(0,191,255,0.5)',
                textAlign: 'center',
              }}
            >
              {tech.name}
            </Typography>
          </Box>
        </motion.div>
      ))}
    </Box>
  );
};

// 性能指标组件
const PerformanceMetrics = () => {
  const metrics = [
    { name: '页面加载速度', value: 95, unit: '%', color: '#00ff00' },
    { name: '代码覆盖率', value: 88, unit: '%', color: '#00bfff' },
    { name: '构建时间', value: 45, unit: 's', color: '#ffaa00' },
    { name: '错误率', value: 0.1, unit: '%', color: '#ff4444' },
    { name: '用户体验', value: 92, unit: '%', color: '#00ff88' },
    { name: 'SEO优化', value: 94, unit: '%', color: '#ff6b6b' },
  ];

  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: {
        xs: 'repeat(auto-fit, minmax(200px, 1fr))',
        md: 'repeat(auto-fit, minmax(250px, 1fr))',
      },
      gap: 3,
    }}>
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.name}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          <Paper
            sx={{
              p: 3,
              textAlign: 'center',
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0,191,255,0.3)',
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
              {metric.name}
            </Typography>
            <Typography
              variant="h3"
              sx={{
                color: metric.color,
                fontWeight: 'bold',
                mb: 1,
              }}
            >
              {metric.value}{metric.unit}
            </Typography>
            <Box sx={{
              width: '100%',
              height: 8,
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: 4,
              overflow: 'hidden',
            }}>
              <Box
                sx={{
                  width: `${metric.value}%`,
                  height: '100%',
                  backgroundColor: metric.color,
                  borderRadius: 4,
                  transition: 'width 1s ease',
                }}
              />
            </Box>
          </Paper>
        </motion.div>
      ))}
    </Box>
  );
};

export default TechHero;