import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Home = () => {
  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  return (
    <div id="home" style={{ position: 'relative', paddingTop: '100px', paddingBottom: '100px', textAlign: 'center' }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "#1a202c",
            },
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
      <Container style={{ position: 'relative', zIndex: 1 }}>
        <Typography variant="h2" gutterBottom style={{ color: '#e2e8f0' }}>
          indexoob
        </Typography>
        <Typography variant="h5" gutterBottom style={{ color: '#e2e8f0' }}>
          突破桎梏 超越极限
        </Typography>
        <Button variant="contained" style={{ marginTop: '20px', backgroundColor: '#00bfff', color: 'white' }}>
          了解更多
        </Button>
      </Container>
    </div>
  );
};

export default Home;