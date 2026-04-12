import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ScrambleTextProps {
  text: string;
  className?: string;
  trigger?: boolean;
}

const ScrambleText: React.FC<ScrambleTextProps> = ({ 
  text, 
  className = '',
  trigger = true 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isScrambling, setIsScrambling] = useState(false);

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

  useEffect(() => {
    if (!trigger) return;

    setIsScrambling(true);
    let iteration = 0;
    
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        setIsScrambling(false);
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text, trigger]);

  return (
    <motion.div
      className={`font-mono ${className}`}
      whileHover={{
        scale: 1.02,
        textShadow: '0 0 10px rgba(255, 107, 53, 0.5)',
      }}
    >
      {displayText || text}
    </motion.div>
  );
};

export default ScrambleText;