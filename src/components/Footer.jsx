import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiMail, FiHeart } from 'react-icons/fi';

const Footer = () => {
  // Add smooth scroll handler
  const handleSmoothScroll = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 0;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Enhanced gradient line separator with animation */}
      <div className="absolute top-0 left-0 right-0">
        {/* Main gradient line */}
        <motion.div 
          className="h-[10x] bg-gradient-to-r from-transparent via-[#EC4899] to-transparent"
          initial={{ opacity: 0.3 }}
          animate={{ 
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.02, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Secondary glow effect */}
        <motion.div 
          className="h-[1px] bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent blur-sm"
          initial={{ opacity: 0.1 }}
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2
          }}
        />
        
        {/* Top shadow for depth */}
        <div className="h-8 bg-gradient-to-b from-[#0D1117] to-transparent opacity-90" />
      </div>

      {/* Enhanced background with animated gradient */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 opacity-30"
          animate={{ 
            background: [
              'linear-gradient(to right, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2), rgba(59, 130, 246, 0.2))',
              'linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2))',
              'linear-gradient(to right, rgba(236, 72, 153, 0.2), rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))'
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        {/* Base background */}
        <div className="absolute inset-0 bg-[#0D1117]/95" />
      </div>

      {/* Content container - added top padding for separation */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12"
        >
          {/* Brand Section */}
          <div className="space-y-4">
            <motion.h3 
              className="text-3xl font-bold"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#3B82F6]"
                animate={{ 
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ backgroundSize: '200% auto' }}
              >
                TokenMate
              </motion.span>
            </motion.h3>
            <p className="text-gray-400 leading-relaxed">
              Advanced text tokenization powered by Finite Automata Theory.
              Experience precise token recognition with state-based transitions.
            </p>
          </div>

          {/* Quick Links & Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-white">Quick Links</h4>
              <ul className="space-y-3">
                {['Home', 'Tokenizer', 'About', 'Contact'].map((link, index) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <a
                      href={`#${link.toLowerCase()}`}
                      onClick={(e) => handleSmoothScroll(e, link.toLowerCase())}
                      className="text-gray-400 hover:text-[#EC4899] transition-colors flex items-center gap-2 group"
                    >
                      <span className="h-px w-4 bg-[#EC4899]/50 group-hover:w-6 transition-all" />
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-white">Connect With Us</h4>
              <div className="space-y-3">
                {[
                  { icon: <FiGithub />, text: 'GitHub', href: 'https://github.com/Auguzcht' },
                  { icon: <FiMail />, text: 'Email Us', href: 'alfredndado@gmail.com' }
                ].map((item, index) => (
                  <motion.a
                    key={item.text}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-400 hover:text-[#EC4899] transition-colors group"
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                  >
                    <span className="transform group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <span>{item.text}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Copyright Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-gray-800"
        >
          <p className="text-center text-gray-400 flex items-center justify-center gap-2">
            © {new Date().getFullYear()} TokenMate. Built with
            <motion.span
              whileHover={{ scale: 1.2 }}
              className="text-[#EC4899]"
            >
              <FiHeart className="hover:fill-current" />
            </motion.span>
            by Auguzcht.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;