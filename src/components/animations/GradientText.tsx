import React from 'react';

interface GradientTextProps {
  text: string;
  className?: string;
  gradient?: string;
}

const GradientText: React.FC<GradientTextProps> = ({
  text,
  className = '',
  gradient = 'from-ski-accent to-ski-black',
}) => {
  return (
    <span
      className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`}
    >
      {text}
    </span>
  );
};

export default GradientText;
