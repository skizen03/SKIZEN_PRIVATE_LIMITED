import React from 'react';

interface WaveDividerProps {
  fromColor?: string;
  toColor?: string;
  variant?: 'wave' | 'curve' | 'angle';
  flip?: boolean;
  className?: string;
}

/** Decorative SVG wave transition between sections */
const WaveDivider: React.FC<WaveDividerProps> = ({
  fromColor = '#FFFFFF',
  toColor = '#F3F1EE',
  variant = 'wave',
  flip = false,
  className = '',
}) => {
  const paths: Record<string, string> = {
    wave:  'M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z',
    curve: 'M0,0 C720,60 1440,0 1440,0 L1440,60 L0,60 Z',
    angle: 'M0,0 L1440,40 L1440,60 L0,60 Z',
  };

  return (
    <div
      className={`pointer-events-none ${className}`}
      aria-hidden
      style={{ background: fromColor, lineHeight: 0 }}
    >
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        style={{
          display: 'block',
          width: '100%',
          height: 60,
          transform: flip ? 'scaleX(-1)' : 'none',
        }}
      >
        <path d={paths[variant]} fill={toColor} />
      </svg>
    </div>
  );
};

export default WaveDivider;
