import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import logoImage from '@assets/TokenMate-logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const updateNavbar = () => {
      setIsScrolled(scrollY?.current > 20);
    };

    scrollY?.onChange(updateNavbar);
    return () => scrollY?.clearListeners();
  }, [scrollY]);

  // Updated logo variants for subtle animation
  const logoVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  // Navigation link variants with scroll-based animations
  const navLinkVariants = {
    hover: {
      color: '#FFFFFF',
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.97,
      transition: { duration: 0.1 }
    }
  };

  const handleNavClick = (e, id) => {
    e.preventDefault();
    console.log('Navigating to:', id); // Debug log
    
    const element = document.getElementById(id);
    
    if (!element) {
      console.error(`Element with id "${id}" not found`); // Debug log
      return;
    }

    try {
      const navbarHeight = 96;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = window.pageYOffset + elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0D1117]/95 backdrop-blur-sm border-b border-[#30363D]' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-24">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <a 
              href="#home" 
              onClick={(e) => handleNavClick(e, 'home')}
              className="flex items-center space-x-2 cursor-pointer"
            >
              {/* Enhanced Logo Container */}
              <motion.div 
                className="relative w-12 h-12 rounded-xl overflow-hidden group"
                variants={logoVariants}
                whileHover="hover"
              >
                {/* Animated gradient border */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(45deg, #8B5CF6, #EC4899, #3B82F6)',
                    backgroundSize: '200% auto'
                  }}
                  animate={{
                    backgroundPosition: ['0%', '100%', '0%']
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
                <div className="absolute inset-[2px] bg-[#0D1117] rounded-xl flex items-center justify-center">
                  <img 
                    src={logoImage} 
                    alt="TokenMate Logo" 
                    className="w-8 h-8 object-contain"
                  />
                </div>
              </motion.div>
              
              {/* Enhanced Text with gradient underline */}
              <div className="relative group">
                <span className="text-2xl font-bold text-[#F0F6FC]">okenMate</span>
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#3B82F6]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isScrolled ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </a>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {['Home', 'Tokenizer', 'About', 'Contact'].map((item) => (
              <div key={item} className="relative group">
                <motion.button
                  onClick={(e) => handleNavClick(e, item.toLowerCase())}
                  className="relative text-lg font-medium text-[#F0F6FC]/80 transition-colors duration-200 bg-transparent border-none cursor-pointer outline-none"
                  variants={navLinkVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {item}
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#3B82F6]"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;