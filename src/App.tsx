import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, ThemeProvider, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import TechHero from './components/TechHero';
import TechFeatures from './components/TechFeatures';
import Services from './components/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Products from './pages/Products';
import Admin from './pages/Admin';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={
            <Box sx={{ 
              background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
              minHeight: '100vh',
              overflowX: 'hidden'
            }}>
              <Navbar />
              <TechHero />
              <TechFeatures />
              <Services />
              <Products />
              <About />
              <Contact />
            </Box>
          } />
          <Route path="/admin" element={
            <Box sx={{ 
              background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
              minHeight: '100vh'
            }}>
              <Navbar />
              <Admin />
            </Box>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;