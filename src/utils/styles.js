import { keyframes } from '@emotion/react';

// Animated glow effect
const glowPulse = keyframes`
  0% {
    box-shadow: 0 0 20px 0 rgba(236, 72, 153, 0.1),
                0 0 40px 0 rgba(139, 92, 246, 0.1);
  }
  50% {
    box-shadow: 0 0 25px 5px rgba(236, 72, 153, 0.15),
                0 0 50px 5px rgba(139, 92, 246, 0.15);
  }
  100% {
    box-shadow: 0 0 20px 0 rgba(236, 72, 153, 0.1),
                0 0 40px 0 rgba(139, 92, 246, 0.1);
  }
`;

const gradientMove = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const glowStyles = {
  animation: `${glowPulse} 3s ease-in-out infinite`
};

export const gradientAnimation = {
  animation: `${gradientMove} 3s ease infinite`,
  backgroundSize: '200% 200%'
};

// Shared animations
export const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.5
    }
  }
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};

// Token color mapping
export const tokenColors = {
  identifier: 'text-[#8B5CF6]',
  number: 'text-[#3B82F6]',
  string: 'text-[#EC4899]',
  operator: 'text-[#F59E0B]',
  delimiter: 'text-gray-400',
  whitespace: 'text-gray-600',
  emoji: 'text-[#10B981]',
  unknown: 'text-gray-500'
};