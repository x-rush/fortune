import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container, Typography, Box, Grid, TextField, Button, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';
import GlassCard from '../components/GlassCard';
import GlassButton from '../components/GlassButton';
import { Email, Phone, LocationOn, Send } from '@mui/icons-material';
import { contactAPI } from '../services/api';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await contactAPI.submit(formData);

      if (response.success) {
        setSubmitStatus('success');
        setSubmitMessage(t('contact.form.success'));
        // Reset form
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(response.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitStatus('error');
      setSubmitMessage('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Email sx={{ fontSize: 40, color: '#3b82f6' }} />,
      title: t('contact.info.email'),
      value: 'contact@indexoob.com'
    },
    {
      icon: <Phone sx={{ fontSize: 40, color: '#06b6d4' }} />,
      title: t('contact.info.phone'),
      value: '+86 400-123-4567'
    },
    {
      icon: <LocationOn sx={{ fontSize: 40, color: '#8b5cf6' }} />,
      title: t('contact.info.address'),
      value: 'Shanghai, China'
    }
  ];

  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, transparent 0%, rgba(139, 92, 246, 0.05) 50%, transparent 100%)',
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
              {t('contact.title')}
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
              {t('contact.subtitle')}
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 5 }}>
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
                    mb: 4,
                    fontWeight: 700,
                    fontSize: { xs: '1.5rem', md: '1.8rem' },
                  }}
                >
                  Get In Touch
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            flexShrink: 0,
                          }}
                        >
                          {info.icon}
                        </Box>
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              color: '#94a3b8',
                              mb: 0.5,
                              fontWeight: 600,
                              fontSize: '0.9rem',
                            }}
                          >
                            {info.title}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              color: '#f1f5f9',
                              fontWeight: 500,
                            }}
                          >
                            {info.value}
                          </Typography>
                        </Box>
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </GlassCard>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <GlassCard sx={{ p: { xs: 4, md: 6 } }}>
                <Typography
                  variant="h4"
                  sx={{
                    color: '#f1f5f9',
                    mb: 4,
                    fontWeight: 700,
                    fontSize: { xs: '1.5rem', md: '1.8rem' },
                  }}
                >
                  {t('contact.form.submit')}
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <TextField
                    fullWidth
                    label={t('contact.form.name')}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#f1f5f9',
                        '&:hover': {
                          borderColor: 'rgba(59, 130, 246, 0.3)',
                        },
                        '&.Mui-focused': {
                          borderColor: '#3b82f6',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#94a3b8',
                      },
                      '& .MuiInputBase-input': {
                        color: '#f1f5f9',
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label={t('contact.form.email')}
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#f1f5f9',
                        '&:hover': {
                          borderColor: 'rgba(59, 130, 246, 0.3)',
                        },
                        '&.Mui-focused': {
                          borderColor: '#3b82f6',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#94a3b8',
                      },
                      '& .MuiInputBase-input': {
                        color: '#f1f5f9',
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label={t('contact.form.message')}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    multiline
                    rows={4}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#f1f5f9',
                        '&:hover': {
                          borderColor: 'rgba(59, 130, 246, 0.3)',
                        },
                        '&.Mui-focused': {
                          borderColor: '#3b82f6',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#94a3b8',
                      },
                      '& .MuiInputBase-input': {
                        color: '#f1f5f9',
                      },
                    }}
                  />

                  {/* Status Message */}
                  {submitStatus === 'success' && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                      {submitMessage}
                    </Alert>
                  )}
                  {submitStatus === 'error' && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {submitMessage}
                    </Alert>
                  )}

                  <GlassButton
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    endIcon={<Send />}
                    sx={{
                      py: 1.5,
                      fontWeight: 600,
                      mt: submitStatus !== 'idle' ? 2 : 2,
                    }}
                  >
                    {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
                  </GlassButton>
                </Box>
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
          <Box sx={{ mt: 8, textAlign: 'center', pt: 4, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <Typography
              variant="body2"
              sx={{
                color: '#64748b',
                fontSize: '0.9rem',
              }}
            >
              © 2025 indexoob. All Rights Reserved.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Contact;