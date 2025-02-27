import React from 'react';
import { motion } from 'framer-motion';
import { Typography, Paper, Grid, Box, Chip } from '@mui/material';
import { FiCpu, FiZap, FiCode, FiLink, FiHash, FiMail, FiSmile } from 'react-icons/fi';
import { styled } from '@mui/material/styles';

// Styled components
const GlassCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(26, 31, 43, 0.7)',
  backdropFilter: 'blur(16px)',
  borderRadius: '16px',
  border: '1px solid rgba(236, 72, 153, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    border: '1px solid rgba(236, 72, 153, 0.3)',
    transform: 'translateY(-4px)',
  }
}));

const GradientText = styled(Typography)({
  background: 'linear-gradient(to right, #8B5CF6, #EC4899, #3B82F6)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
});

const AboutUs = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const features = [
    {
      icon: <FiCpu className="w-6 h-6" />,
      title: "Finite Automata Engine",
      description: "Implements Non-deterministic finite automaton (NFA) for precise token processing"
    },
    {
      icon: <FiCode className="w-6 h-6" />,
      title: "Pattern Recognition",
      description: "Processes words, phrases, sentences using state-based transitions"
    },
    {
      icon: <FiLink className="w-6 h-6" />,
      title: "URL Detection",
      description: "Identifies and validates web URLs and domain patterns"
    },
    {
      icon: <FiHash className="w-6 h-6" />,
      title: "Social Media Content",
      description: "Recognizes hashtags, mentions, and modern web content"
    },
    {
      icon: <FiMail className="w-6 h-6" />,
      title: "Email Validation",
      description: "Validates email addresses through multi-state transitions"
    },
    {
      icon: <FiSmile className="w-6 h-6" />,
      title: "Unicode & Emoticons",
      description: "Processes emoji codes and ASCII emoticons accurately"
    }
  ];

  return (
    <section id="about" className="relative min-h-screen py-20 overflow-hidden">
      {/* Background with infinite loop animation */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 opacity-30"
          animate={{ 
            backgroundPosition: ['0px 0px', '40px 40px']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
          style={{
            backgroundImage: `
              radial-gradient(circle, #EC4899 1px, transparent 1px),
              radial-gradient(circle, #8B5CF6 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        <Box className="absolute inset-0 bg-gradient-to-b from-[#0D1117] via-transparent to-[#0D1117] backdrop-blur-[1px]" />
      </div>

      {/* Content */}
      <Box className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <GradientText variant="h2" align="center" sx={{ mb: 6, fontWeight: 'bold' }}>
              About TokenMate
            </GradientText>
          </motion.div>

          {/* Features Grid */}
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <GlassCard elevation={0} sx={{ p: 3 }}>
                    <Box className="w-12 h-12 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] rounded-xl 
                                  flex items-center justify-center mb-4">
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(209, 213, 219, 0.8)' }}>
                      {feature.description}
                    </Typography>
                  </GlassCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Technical Capabilities */}
          <motion.div variants={itemVariants}>
            <GlassCard elevation={0} sx={{ p: 4, mt: 8 }}>
              <GradientText variant="h4" sx={{ mb: 3 }}>
                Technical Capabilities
              </GradientText>
              <Typography variant="body1" sx={{ color: 'rgba(209, 213, 219, 0.9)', mb: 4 }}>
                TokenMate leverages deterministic finite automata to provide precise token recognition
                with explicit state transitions, making it ideal for processing modern web content
                and structured text analysis.
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                    Core Features
                  </Typography>
                  <Box className="space-y-2">
                    <Box className="flex items-center gap-2">
                      <FiCpu className="text-[#EC4899]" />
                      State-based Token Processing
                    </Box>
                    <Box className="flex items-center gap-2">
                      <FiZap className="text-[#EC4899]" />
                      Real-time State Transitions
                    </Box>
                    <Box className="flex items-center gap-2">
                      <FiCode className="text-[#EC4899]" />
                      Pattern Recognition & Validation
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                    Token Types
                  </Typography>
                  <Box className="space-y-2">
                    <Box className="flex items-center gap-2">
                      <FiHash className="text-[#EC4899]" />
                      Words, Phrases & Sentences
                    </Box>
                    <Box className="flex items-center gap-2">
                      <FiLink className="text-[#EC4899]" />
                      URLs, Emails & Web Content
                    </Box>
                    <Box className="flex items-center gap-2">
                      <FiSmile className="text-[#EC4899]" />
                      Emojis & Special Characters
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </GlassCard>
          </motion.div>
        </motion.div>
      </Box>
    </section>
  );
};

export default AboutUs;