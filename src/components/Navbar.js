import React from 'react';
import { Link } from 'react-scroll';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
  const navLinks = [
    { to: 'home', label: '首页' },
    { to: 'services', label: '服务' },
    { to: 'about', label: '关于我们' },
    { to: 'contact', label: '联系方式' },
  ];

  return (
    <AppBar position="fixed" style={{ background: '#1a202c', boxShadow: 'none' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, color: '#e2e8f0', fontWeight: 'bold' }}>
          indexoob
        </Typography>
        {navLinks.map(link => (
          <Button 
            key={link.to}
            color="inherit" 
            style={{ 
              color: '#e2e8f0', 
              textTransform: 'none',
              transition: 'color 0.3s',
            }}
            onMouseOver={(e) => e.currentTarget.style.color = '#00bfff'}
            onMouseOut={(e) => e.currentTarget.style.color = '#e2e8f0'}
          >
            <Link to={link.to} smooth={true} duration={500} style={{ padding: '10px 15px' }}>
              {link.label}
            </Link>
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;