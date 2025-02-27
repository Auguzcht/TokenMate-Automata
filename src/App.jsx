import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Header from './components/Header';
import TokenizerSection from './components/TokenizerSection';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';
import Contact from './components/Contact';
import { TokenizerProvider } from './context/TokenizerContext';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3B82F6',
      light: '#60A5FA',
      dark: '#2563EB',
    },
    secondary: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
    },
    background: {
      default: '#0F172A',
      paper: '#1E293B',
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#CBD5E1',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
  },
});

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="min-h-screen flex flex-col relative bg-[#0F172A]">
        <AnimatedBackground />
        <div className="fixed inset-0 bg-gradient-to-b from-black/10 to-black/30 pointer-events-none z-0" />
        
        <Navbar />
        
        <motion.main 
          className="flex-grow relative z-10"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageTransition}
          transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <Header />
          <TokenizerSection />
          <AboutUs />
          <Contact />
        </motion.main>

        <Footer />
        
        {/* Gradient Overlay for depth */}
        <div className="fixed inset-0 bg-gradient-radial from-transparent to-[#0F172A] opacity-60 pointer-events-none z-[1]" />
        
        {/* Noise texture overlay */}
        <div className="fixed inset-0 bg-noise opacity-[0.015] pointer-events-none z-[2]" />
      </div>
    </ThemeProvider>
  );
}

export default App;
