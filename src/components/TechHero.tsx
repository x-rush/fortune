import React, { useEffect, useRef, useState, Suspense } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { Box, Typography, Button, Container, CircularProgress } from '@mui/material';
import { PlayArrow, ArrowDownward } from '@mui/icons-material';
import { Particle as IParticle, MousePosition } from '../types';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: Particle[] = [];
    const particleCount = 100;

    class Particle implements IParticle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = canvas ? Math.random() * canvas.width : 0;
        this.y = canvas ? Math.random() * canvas.height : 0;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (!canvas) return;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;

        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          this.opacity = Math.min(1, this.opacity + 0.02);
        } else {
          this.opacity = Math.max(0.1, this.opacity - 0.01);
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 191, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
      });

      // 绘制连接线
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(0, 191, 255, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}
    />
  );
};


const TechHero = () => {
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
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

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
      id="home"
    >
      <ParticleBackground />
      
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

      <motion.div
        style={{ y, opacity, scale }}
      >
        <Box sx={{
          position: 'relative',
          zIndex: 3,
          width: '100%',
        }}>
          <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center' }}>
            <Box sx={{ flex: 1, maxWidth: { md: '60%' } }}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants}>
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: '3rem', md: '4.5rem' },
                      fontWeight: 'bold',
                      background: 'linear-gradient(45deg, #00bfff, #1e90ff, #00bfff)',
                      backgroundSize: '200% 200%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      animation: 'gradient 3s ease infinite',
                      '@keyframes gradient': {
                        '0%': { backgroundPosition: '0% 50%' },
                        '50%': { backgroundPosition: '100% 50%' },
                        '100%': { backgroundPosition: '0% 50%' },
                      },
                    }}
                  >
                    数字化未来
                    <br />
                    从这里开始
                  </Typography>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: '#a0a0a0',
                      mt: 3,
                      mb: 4,
                      maxWidth: 600,
                      lineHeight: 1.6,
                    }}
                  >
                    我们专注于提供前沿的数字化解决方案，
                    用创新技术驱动企业转型，
                    让未来触手可及。
                  </Typography>
                </motion.div>

                <motion.div variants={itemVariants} style={{ display: 'flex', gap: 16 }}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<PlayArrow />}
                    sx={{
                      background: 'linear-gradient(45deg, #00bfff, #1e90ff)',
                      color: 'white',
                      px: 4,
                      py: 1.5,
                      borderRadius: 3,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      boxShadow: '0 8px 32px rgba(0,191,255,0.3)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 40px rgba(0,191,255,0.4)',
                      },
                    }}
                  >
                    探索服务
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: '#00bfff',
                      color: '#00bfff',
                      px: 4,
                      py: 1.5,
                      borderRadius: 3,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      '&:hover': {
                        backgroundColor: 'rgba(0,191,255,0.1)',
                        borderColor: '#00bfff',
                      },
                    }}
                  >
                    查看案例
                  </Button>
                </motion.div>
              </motion.div>
            </Box>

            <Box sx={{ flex: 1, maxWidth: { md: '40%' } }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{ position: 'relative' }}
              >
                {/* 3D旋转立方体 */}
                <Box
                  sx={{
                    width: 300,
                    height: 300,
                    position: 'relative',
                    margin: '0 auto',
                    transformStyle: 'preserve-3d',
                    animation: 'rotate 20s linear infinite',
                    '@keyframes rotate': {
                      '0%': { transform: 'rotateX(0deg) rotateY(0deg)' },
                      '100%': { transform: 'rotateX(360deg) rotateY(360deg)' },
                    },
                  }}
                >
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <Box
                      key={i}
                      sx={{
                        position: 'absolute',
                        width: 200,
                        height: 200,
                        border: '2px solid rgba(0,191,255,0.3)',
                        background: 'rgba(0,191,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        transform: `
                          ${i === 0 ? 'translateZ(100px)' : ''}
                          ${i === 1 ? 'translateZ(-100px) rotateY(180deg)' : ''}
                          ${i === 2 ? 'translateX(100px) rotateY(90deg)' : ''}
                          ${i === 3 ? 'translateX(-100px) rotateY(-90deg)' : ''}
                          ${i === 4 ? 'translateY(100px) rotateX(90deg)' : ''}
                          ${i === 5 ? 'translateY(-100px) rotateX(-90deg)' : ''}
                        `,
                      }}
                    />
                  ))}
                </Box>
              </motion.div>
            </Box>
          </Box>
        </Container>
        </Box>
      </motion.div>

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

export default TechHero;