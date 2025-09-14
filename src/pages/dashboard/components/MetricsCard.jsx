import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, subtitle, icon, color = "primary", trend, className = "" }) => {
  const colorClasses = {
    primary: "from-primary/20 to-primary/5 border-primary/30",
    accent: "from-accent/20 to-accent/5 border-accent/30",
    success: "from-success/20 to-success/5 border-success/30",
    warning: "from-warning/20 to-warning/5 border-warning/30"
  };

  const iconColors = {
    primary: "text-primary",
    accent: "text-accent",
    success: "text-success",
    warning: "text-warning"
  };

  return (
    <div className={`glass-dark rounded-xl p-6 bg-gradient-to-br ${colorClasses?.[color]} border animate-fade-in ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClasses?.[color]} flex items-center justify-center`}>
          <Icon name={icon} size={24} className={iconColors?.[color]} />
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
            trend?.type === 'up' ? 'bg-success/20 text-success' : 'bg-error/20 text-error'
          }`}>
            <Icon name={trend?.type === 'up' ? 'TrendingUp' : 'TrendingDown'} size={12} />
            <span>{trend?.value}</span>
          </div>
        )}
      </div>
      <div className="space-y-2">
        <h3 className="font-heading text-2xl font-bold text-foreground">{value}</h3>
        <p className="font-caption text-sm text-text-secondary">{title}</p>
        {subtitle && (
          <p className="font-body text-xs text-text-secondary opacity-80">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default MetricsCard;