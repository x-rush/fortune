import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, ThemeProvider, CssBaseline, CircularProgress } from '@mui/material';
import Navbar from './components/Navbar';
import TechHero from './components/TechHero';
import TechFeatures from './components/TechFeatures';
import Services from './components/Services';

// Lazy load pages
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Products = React.lazy(() => import('./pages/Products'));
const Admin = React.lazy(() => import('./pages/Admin'));

// Loading component
const LoadingComponent = () => (
  <Box sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px'
  }}>
    <CircularProgress />
  </Box>
);

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
              <Suspense fallback={<LoadingComponent />}>
                <Products />
                <About />
                <Contact />
              </Suspense>
            </Box>
          } />
          <Route path="/admin" element={
            <Box sx={{
              background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
              minHeight: '100vh'
            }}>
              <Navbar />
              <Suspense fallback={<LoadingComponent />}>
                <Admin />
              </Suspense>
            </Box>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;