import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
}

const SplitText: React.FC<SplitTextProps> = ({ 
  text, 
  className = '', 
  delay = 0, 
  duration = 0.8,
  stagger = 0.05 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  const words = text.split(' ');

  return (
    <div className={`overflow-hidden ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-2">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              initial={{ y: 100, opacity: 0, rotateX: -90 }}
              animate={isVisible ? { 
                y: 0, 
                opacity: 1, 
                rotateX: 0,
                transition: {
                  duration,
                  delay: (wordIndex * word.length + charIndex) * stagger,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }
              } : {}}
              whileHover={{
                y: -10,
                color: '#FF6B35',
                textShadow: '0 0 20px rgba(255, 107, 53, 0.8)',
                transition: { duration: 0.2 }
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </div>
  );
};

export default SplitText;