import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const BlurText: React.FC<BlurTextProps> = ({ text, className = '', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <motion.div
      className={className}
      initial={{ filter: 'blur(20px)', opacity: 0 }}
      animate={isVisible ? { 
        filter: 'blur(0px)', 
        opacity: 1,
        transition: {
          duration: 1.2,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      } : {}}
      whileHover={{
        filter: 'blur(2px)',
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      {text}
    </motion.div>
  );
};

export default BlurText;