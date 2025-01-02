import React from 'react';
import { Box } from '@mui/material';
import Header from '../components/home/header/Header';
import WelcomeCard from '../components/home/card/WelcomeCard';
import FeaturesCard from '../components/home/card/FeaturesCard';

function HomePage() {
  return (
    <div>
      <Header />
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, padding: '20px' }}>
        <Box sx={{ flex: 1 }}>
          <WelcomeCard />
        </Box>
        <Box sx={{ flex: 1 }}>
          <FeaturesCard />
        </Box>
      </Box>
    </div>
  );
}

export default HomePage;
