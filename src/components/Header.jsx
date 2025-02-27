import React from 'react';
import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion';

const useMousePosition = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  return {
    mouseX,
    mouseY,
    handleMouseMove: (event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      mouseX.set(event.clientX - rect.left);
      mouseY.set(event.clientY - rect.top);
    },
  };
};

const scrollToSection = (e, id) => {
  e.preventDefault();
  const element = document.getElementById(id);
  
  if (!element) return;

  const navbarHeight = 96; // Adjust this value based on your navbar height
  const elementPosition = element.getBoundingClientRect().top;
  const startPosition = window.pageYOffset;
  const targetPosition = startPosition + elementPosition - navbarHeight;

  animate(startPosition, targetPosition, {
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1], // Custom easing
    onUpdate: (value) => window.scrollTo(0, value)
  });
};

const buttonVariants = {
  hover: {
    y: -2,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  tap: {
    y: 1,
    transition: {
      duration: 0.1
    }
  }
};

const Header = () => {
  return (
    <header id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"> {/* Added pt-24 for padding-top */}
      {/* Enhanced Background with Parallax */}
      <div className="absolute inset-0 bg-[#0D1117]">
        <motion.div 
          className="absolute inset-0 opacity-30"
          animate={{
            backgroundPosition: ['0px 0px', '100px 100px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            backgroundImage: 'radial-gradient(circle, #EC4899 1px, transparent 1px), radial-gradient(circle, #8B5CF6 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1117] via-transparent to-[#0D1117]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div 
          className="space-y-12 pt-8 pb-12" // Added pt-12 for extra spacing
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Enhanced Main Title */}
          <motion.h1 
            className="text-5xl md:text-7xl font-bold tracking-tight"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span 
              className="block text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#3B82F6]"
              animate={{ 
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{
                backgroundSize: '200% auto',
              }}
            >
              TokenMate
            </motion.span>
            <span className="block text-3xl md:text-4xl mt-4 text-gray-300 opacity-90">
              Finite Automata Tokenizer
            </span>
          </motion.h1>

          {/* Enhanced Description */}
          <motion.p 
            className="max-w-2xl mx-auto text-xl text-gray-300/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Advanced text processing powered by Finite Automata Theory. 
            Process web content, emojis, and special characters with precision.
          </motion.p>

          {/* Enhanced CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.a
              href="#tokenizer"
              onClick={(e) => scrollToSection(e, 'tokenizer')}
              className="group relative inline-flex items-center px-8 py-3 rounded-lg overflow-hidden"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <div 
                className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#8B5CF6] bg-[length:200%_100%]"
                style={{
                  backgroundSize: '200% 100%',
                }}
              >
                <motion.div
                  className="w-full h-full"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </div>
              <div 
                className="absolute inset-0 bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#EC4899] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out"
                style={{
                  backgroundSize: '200% 100%',
                }}
              >
                <motion.div
                  className="w-full h-full"
                  animate={{
                    backgroundPosition: ['100% 0%', '0% 0%', '100% 0%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </div>
              <span className="relative z-10 flex items-center text-white font-medium">
                Try Tokenizer
                <motion.svg 
                  className="ml-2 w-5 h-5 text-white"
                  initial={{ x: 0 }}
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </motion.svg>
              </span>
            </motion.a>

            <motion.a
              href="#about"
              onClick={(e) => scrollToSection(e, 'about')}
              className="group relative inline-flex items-center px-8 py-3 rounded-lg border border-[#8B5CF6]/30 hover:border-[#EC4899]/50 text-white font-medium overflow-hidden"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <span className="relative z-10 flex items-center">
                Learn More
                <motion.svg 
                  className="ml-2 w-5 h-5"
                  initial={{ x: 0 }}
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </motion.svg>
              </span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] opacity-0 group-hover:opacity-10 transition-all duration-500 ease-out"
              />
            </motion.a>
          </motion.div>

          {/* Enhanced Features List */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {features.map((feature, index) => {
              const { mouseX, mouseY, handleMouseMove } = useMousePosition();
              const spotlightSize = 200;
              
              return (
                <motion.div
                  key={feature.title}
                  className="group relative rounded-xl border border-white/10 p-6 overflow-hidden"
                  onMouseMove={handleMouseMove}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: useMotionTemplate`
                        radial-gradient(
                          ${spotlightSize}px circle at ${mouseX}px ${mouseY}px,
                          rgba(139, 92, 246, 0.15),
                          transparent 80%
                        )
                      `,
                    }}
                  />
                  <div className="relative z-10 bg-gradient-to-b from-white/5 to-transparent p-6 rounded-lg border border-white/10">
                    <motion.div 
                      className="text-[#EC4899] mb-4"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-lg font-semibold text-white/90 mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
};

// Features data
const features = [
  {
    title: 'Real-time Processing',
    description: 'Instant tokenization with visual feedback',
    icon: <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  },
  {
    title: 'Smart Recognition',
    description: 'Advanced pattern matching for web content',
    icon: <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  },
  {
    title: 'Finite Automata',
    description: 'State-of-the-art tokenization automaton engine',
    icon: <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
    </svg>
  }
];

export default Header;