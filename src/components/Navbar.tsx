import React from 'react';
import { Link } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const { t } = useTranslation();
  const navLinks = [
    { to: 'home', label: t('navigation.home') },
    { to: 'products', label: t('navigation.products') },
    { to: 'about', label: t('navigation.about') },
    { to: 'contact', label: t('navigation.contact') },
  ];

  return (
    <AppBar
      position="fixed"
      sx={{
        backdropFilter: 'blur(20px)',
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: 'none',
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            color: '#f1f5f9',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          indexoob
        </Typography>
        {navLinks.map(link => (
          <Button
            key={link.to}
            color="inherit"
            sx={{
              color: '#f1f5f9',
              textTransform: 'none',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
              mx: 0.5,
              '&:hover': {
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                color: '#3b82f6',
              },
            }}
          >
            {link.to === 'products' ? (
              <span style={{ padding: '10px 15px' }}>
                <Link to={link.to} smooth={true} duration={500}>
                  {link.label}
                </Link>
              </span>
            ) : (
              <span style={{ padding: '10px 15px' }}>
                <Link to={link.to} smooth={true} duration={500}>
                  {link.label}
                </Link>
              </span>
            )}
          </Button>
        ))}
        {(window.location.pathname === '/admin-access' || window.location.pathname === '/admin') && (
          <Button
            color="inherit"
            component={RouterLink}
            to="/admin-login"
            sx={{
              color: '#3b82f6',
              textTransform: 'none',
              border: '1px solid #3b82f6',
              borderRadius: '8px',
              padding: '8px 16px',
              ml: 2,
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            管理员登录
          </Button>
        )}
        <LanguageSwitcher />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;