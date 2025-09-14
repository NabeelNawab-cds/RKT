import React, { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';

const StreakCounter = ({ currentStreak = 0, bestStreak = 0, className = "" }) => {
  const [animatedCurrent, setAnimatedCurrent] = useState(0);
  const [animatedBest, setAnimatedBest] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedCurrent(currentStreak);
      setAnimatedBest(bestStreak);
    }, 100);
    return () => clearTimeout(timer);
  }, [currentStreak, bestStreak]);

  const getStreakColor = (streak) => {
    if (streak >= 30) return 'text-accent';
    if (streak >= 14) return 'text-success';
    if (streak >= 7) return 'text-warning';
    return 'text-primary';
  };

  const getStreakIcon = (streak) => {
    if (streak >= 30) return 'Crown';
    if (streak >= 14) return 'Flame';
    if (streak >= 7) return 'Zap';
    return 'Target';
  };

  return (
    <div className={`glass-dark rounded-xl p-6 border border-primary/30 animate-fade-in ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading text-lg font-semibold text-foreground">Streak Status</h3>
        <div className="flex items-center space-x-2">
          <Icon name={getStreakIcon(currentStreak)} size={20} className={getStreakColor(currentStreak)} />
          <span className={`text-sm font-medium ${getStreakColor(currentStreak)}`}>
            {currentStreak >= 30 ? 'Legendary' : currentStreak >= 14 ? 'On Fire' : currentStreak >= 7 ? 'Hot' : 'Building'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="text-center">
          <div className="relative mb-3">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center border border-primary/30">
              <span className="font-heading text-2xl font-bold text-primary">{animatedCurrent}</span>
            </div>
            {currentStreak > 0 && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                <Icon name="Check" size={12} className="text-background" />
              </div>
            )}
          </div>
          <p className="font-caption text-sm text-text-secondary">Current Streak</p>
          <p className="font-body text-xs text-text-secondary opacity-80">Days</p>
        </div>

        <div className="text-center">
          <div className="relative mb-3">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-accent/20 to-accent/5 rounded-full flex items-center justify-center border border-accent/30">
              <span className="font-heading text-2xl font-bold text-accent">{animatedBest}</span>
            </div>
            {bestStreak >= 30 && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                <Icon name="Crown" size={12} className="text-background" />
              </div>
            )}
          </div>
          <p className="font-caption text-sm text-text-secondary">Best Streak</p>
          <p className="font-body text-xs text-text-secondary opacity-80">Personal Record</p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-surface">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Next Milestone</span>
          <span className="text-primary font-medium">
            {currentStreak < 7 ? `${7 - currentStreak} days to Hot` :
             currentStreak < 14 ? `${14 - currentStreak} days to On Fire` :
             currentStreak < 30 ? `${30 - currentStreak} days to Legendary` :
             'Legendary Achieved!'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StreakCounter;