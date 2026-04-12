import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '' }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="relative z-10"
        animate={isGlitching ? {
          x: [0, -2, 2, -1, 1, 0],
          y: [0, 1, -1, 0],
          skewX: [0, -2, 2, 0],
        } : {}}
        transition={{ duration: 0.2 }}
      >
        {text}
      </motion.div>
      
      {/* Glitch layers */}
      <motion.div
        className="absolute inset-0 text-red-500 opacity-0"
        animate={isGlitching ? {
          opacity: [0, 0.7, 0],
          x: [-2, 2, -1],
          clipPath: ['inset(0 0 0 0)', 'inset(20% 0 30% 0)', 'inset(0 0 0 0)']
        } : {}}
        transition={{ duration: 0.2 }}
      >
        {text}
      </motion.div>
      
      <motion.div
        className="absolute inset-0 text-blue-500 opacity-0"
        animate={isGlitching ? {
          opacity: [0, 0.7, 0],
          x: [2, -2, 1],
          clipPath: ['inset(0 0 0 0)', 'inset(40% 0 10% 0)', 'inset(0 0 0 0)']
        } : {}}
        transition={{ duration: 0.2, delay: 0.05 }}
      >
        {text}
      </motion.div>
    </div>
  );
};

export default GlitchText;