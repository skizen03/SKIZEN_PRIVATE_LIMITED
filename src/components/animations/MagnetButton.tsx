import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagnetButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
}

const MagnetButton: React.FC<MagnetButtonProps> = ({ 
  children, 
  className = '',
  strength = 20,
  onClick 
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) / rect.width;
    const deltaY = (e.clientY - centerY) / rect.height;

    setPosition({
      x: deltaX * strength,
      y: deltaY * strength
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{
        x: position.x,
        y: position.y
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="relative z-10"
        animate={{
          x: position.x * 0.5,
          y: position.y * 0.5
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 40
        }}
      >
        {children}
      </motion.div>
    </motion.button>
  );
};

export default MagnetButton;