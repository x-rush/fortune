import React from 'react';
import { motion } from 'framer-motion';
import { Container, Typography, Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import GlassCard from '../components/GlassCard';
import { Lightbulb, TrackChanges, Group, TrendingUp } from '@mui/icons-material';

const About = () => {
  const { t } = useTranslation();

  const values = [
    {
      icon: <Lightbulb sx={{ fontSize: 40, color: '#fbbf24' }} />,
      title: t('about.valuesList.0'),
      description: 'Innovation-driven pursuit of excellence'
    },
    {
      icon: <Group sx={{ fontSize: 40, color: '#34d399' }} />,
      title: t('about.valuesList.1'),
      description: 'Integrity-based win-win cooperation'
    },
    {
      icon: <TrackChanges sx={{ fontSize: 40, color: '#60a5fa' }} />,
      title: t('about.valuesList.2'),
      description: 'Professional focus continuous improvement'
    }
  ];

  return (
    <Box
      id="about"
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, transparent 0%, rgba(6, 182, 212, 0.05) 50%, transparent 100%)',
      }}
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
              {t('about.title')}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: '1.3rem', md: '1.5rem' },
                color: '#94a3b8',
                mb: 2,
                fontWeight: 600,
              }}
            >
              {t('about.subtitle')}
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={6} sx={{ mb: 8 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <GlassCard sx={{ p: { xs: 4, md: 6 }, height: '100%' }}>
                <Typography
                  variant="h4"
                  sx={{
                    color: '#f1f5f9',
                    mb: 3,
                    fontWeight: 700,
                    fontSize: { xs: '1.5rem', md: '1.8rem' },
                  }}
                >
                  {t('about.mission')}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#94a3b8',
                    lineHeight: 1.7,
                    fontSize: { xs: '1rem', md: '1.1rem' },
                  }}
                >
                  {t('about.missionText')}
                </Typography>
              </GlassCard>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <GlassCard sx={{ p: { xs: 4, md: 6 }, height: '100%' }}>
                <Typography
                  variant="h4"
                  sx={{
                    color: '#f1f5f9',
                    mb: 3,
                    fontWeight: 700,
                    fontSize: { xs: '1.5rem', md: '1.8rem' },
                  }}
                >
                  {t('about.vision')}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#94a3b8',
                    lineHeight: 1.7,
                    fontSize: { xs: '1rem', md: '1.1rem' },
                  }}
                >
                  {t('about.visionText')}
                </Typography>
              </GlassCard>
            </motion.div>
          </Grid>
        </Grid>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <GlassCard sx={{ p: { xs: 4, md: 6 }, textAlign: 'center' }}>
            <Typography
              variant="h3"
              sx={{
                color: '#f1f5f9',
                mb: 4,
                fontWeight: 700,
                fontSize: { xs: '1.8rem', md: '2.2rem' },
              }}
            >
              {t('about.values')}
            </Typography>

            <Grid container spacing={4}>
              {values.map((value, index) => (
                <Grid size={{ xs: 12, md: 4 }} key={index}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box sx={{ textAlign: 'center' }}>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 80,
                          height: 80,
                          borderRadius: '50%',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          mb: 3,
                        }}
                      >
                        {value.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#f1f5f9',
                          mb: 2,
                          fontWeight: 600,
                          fontSize: { xs: '1.1rem', md: '1.2rem' },
                        }}
                      >
                        {value.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#64748b',
                          fontSize: '0.9rem',
                          fontStyle: 'italic',
                        }}
                      >
                        {value.description}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Box sx={{ mt: 8, textAlign: 'center' }}>
            <Typography
              variant="body1"
              sx={{
                color: '#64748b',
                lineHeight: 1.8,
                fontSize: { xs: '1rem', md: '1.1rem' },
                maxWidth: 800,
                mx: 'auto',
              }}
            >
              {t('about.description')}
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default About;