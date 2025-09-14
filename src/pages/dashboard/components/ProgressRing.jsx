import React, { useEffect, useState } from 'react';

const ProgressRing = ({ 
  progress = 0, 
  size = 120, 
  strokeWidth = 8, 
  color = "var(--color-primary)",
  backgroundColor = "var(--color-surface)",
  showPercentage = true,
  label = "",
  className = ""
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 100);
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className={`flex flex-col items-center space-y-2 ${className}`}>
      <div className="relative">
        <svg
          width={size}
          height={size}
          className="progress-ring"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            className="opacity-20"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="progress-ring-circle"
            style={{
              filter: `drop-shadow(0 0 8px ${color}40)`
            }}
          />
        </svg>
        
        {showPercentage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-heading text-xl font-bold text-foreground">
              {Math.round(animatedProgress)}%
            </span>
          </div>
        )}
      </div>
      
      {label && (
        <p className="font-caption text-sm text-text-secondary text-center">{label}</p>
      )}
    </div>
  );
};

export default ProgressRing;