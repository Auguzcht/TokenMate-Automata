import { motion, useScroll, useTransform } from 'framer-motion';
import React from 'react';

const AnimatedBackground = () => {
  const { scrollY } = useScroll();
  
  const circle1Y = useTransform(scrollY, [0, 1000], [0, 200]);
  const circle2Y = useTransform(scrollY, [0, 1000], [0, -200]);
  const circle3Y = useTransform(scrollY, [0, 1000], [0, 300]);

  return (
    <div className="fixed inset-0 overflow-hidden">
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl"
        style={{
          top: '-100px',
          left: '-100px',
          y: circle1Y
        }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-pink-600/20 to-rose-600/20 blur-3xl"
        style={{
          top: '40%',
          right: '-100px',
          y: circle2Y
        }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-indigo-600/20 to-blue-600/20 blur-3xl"
        style={{
          bottom: '-100px',
          left: '30%',
          y: circle3Y
        }}
      />
    </div>
  );
};

export default AnimatedBackground;