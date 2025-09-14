import React from 'react';
import Icon from '../../../components/AppIcon';

const StreakAnalysis = () => {
  const streakData = [
    {
      domain: 'Academic',
      current: 12,
      best: 28,
      color: '#00D4FF',
      icon: 'BookOpen',
      trend: 'up',
      lastActivity: '2 hours ago'
    },
    {
      domain: 'Fitness',
      current: 8,
      best: 15,
      color: '#00FF88',
      icon: 'Dumbbell',
      trend: 'up',
      lastActivity: '6 hours ago'
    },
    {
      domain: 'Creative',
      current: 5,
      best: 22,
      color: '#FFD700',
      icon: 'Palette',
      trend: 'down',
      lastActivity: '1 day ago'
    },
    {
      domain: 'Social',
      current: 3,
      best: 10,
      color: '#FF4757',
      icon: 'Users',
      trend: 'stable',
      lastActivity: '3 hours ago'
    },
    {
      domain: 'Maintenance',
      current: 2,
      best: 7,
      color: '#B0B3B8',
      icon: 'Settings',
      trend: 'up',
      lastActivity: '5 hours ago'
    }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      case 'stable': return 'Minus';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-error';
      case 'stable': return 'text-text-secondary';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="glass-dark rounded-xl p-6 border border-primary/20 neon-glow">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-warning to-accent rounded-lg flex items-center justify-center">
          <Icon name="Flame" size={20} className="text-background" />
        </div>
        <div>
          <h2 className="font-heading text-xl font-bold text-foreground">Streak Analysis</h2>
          <p className="font-body text-sm text-text-secondary">Consistency tracking</p>
        </div>
      </div>
      <div className="space-y-4">
        {streakData?.map((streak, index) => (
          <div 
            key={index} 
            className="p-4 rounded-lg bg-surface/20 border border-primary/10 hover:bg-surface/30 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${streak?.color}20`, border: `1px solid ${streak?.color}40` }}
                >
                  <Icon name={streak?.icon} size={20} style={{ color: streak?.color }} />
                </div>
                
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {streak?.domain}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="font-caption text-sm text-text-secondary">
                      Last: {streak?.lastActivity}
                    </span>
                    <Icon 
                      name={getTrendIcon(streak?.trend)} 
                      size={14} 
                      className={getTrendColor(streak?.trend)}
                    />
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="Flame" size={16} className="text-warning" />
                  <span className="font-data text-2xl font-bold text-foreground">
                    {streak?.current}
                  </span>
                </div>
                <div className="font-caption text-xs text-text-secondary">
                  Best: {streak?.best} days
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-caption text-xs text-text-secondary">Progress to Best</span>
                <span className="font-data text-xs text-foreground">
                  {Math.round((streak?.current / streak?.best) * 100)}%
                </span>
              </div>
              <div className="w-full bg-surface rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ 
                    width: `${Math.min((streak?.current / streak?.best) * 100, 100)}%`,
                    backgroundColor: streak?.color
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Target" size={16} className="text-primary" />
          <span className="font-caption text-sm font-medium text-primary">Streak Goals</span>
        </div>
        <p className="font-body text-sm text-text-secondary mb-3">
          You're on track to beat your academic record! Keep the momentum going.
        </p>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-success" />
            <span className="font-caption text-xs text-text-secondary">On Track: 3</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-warning" />
            <span className="font-caption text-xs text-text-secondary">At Risk: 1</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-error" />
            <span className="font-caption text-xs text-text-secondary">Broken: 1</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreakAnalysis;