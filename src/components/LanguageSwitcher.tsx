import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Menu, MenuItem, Box } from '@mui/material';
import { Language } from '@mui/icons-material';

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
    handleClose();
  };

  const currentLanguage = i18n.language;

  return (
    <Box sx={{ ml: 2 }}>
      <Button
        color="inherit"
        onClick={handleMenu}
        startIcon={<Language />}
        sx={{
          borderRadius: '20px',
          px: 2,
          py: 1,
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          }
        }}
      >
        {currentLanguage === 'zh' ? '中文' : 'English'}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            mt: 1,
          }
        }}
      >
        <MenuItem
          onClick={() => changeLanguage('zh')}
          selected={currentLanguage === 'zh'}
          sx={{
            color: currentLanguage === 'zh' ? '#3b82f6' : '#ffffff',
            '&:hover': { backgroundColor: 'rgba(59, 130, 246, 0.1)' }
          }}
        >
          中文
        </MenuItem>
        <MenuItem
          onClick={() => changeLanguage('en')}
          selected={currentLanguage === 'en'}
          sx={{
            color: currentLanguage === 'en' ? '#3b82f6' : '#ffffff',
            '&:hover': { backgroundColor: 'rgba(59, 130, 246, 0.1)' }
          }}
        >
          English
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default LanguageSwitcher;