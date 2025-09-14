import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionCard = ({ title, description, icon, action, color = "primary", className = "" }) => {
  const colorClasses = {
    primary: "from-primary/20 to-primary/5 border-primary/30 hover:border-primary/50",
    accent: "from-accent/20 to-accent/5 border-accent/30 hover:border-accent/50",
    success: "from-success/20 to-success/5 border-success/30 hover:border-success/50",
    warning: "from-warning/20 to-warning/5 border-warning/30 hover:border-warning/50"
  };

  const iconColors = {
    primary: "text-primary",
    accent: "text-accent",
    success: "text-success",
    warning: "text-warning"
  };

  return (
    <div className={`glass-dark rounded-xl p-6 bg-gradient-to-br ${colorClasses?.[color]} border transition-all duration-300 hover:scale-105 cursor-pointer animate-fade-in ${className}`}>
      <div className="flex items-start space-x-4">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClasses?.[color]} flex items-center justify-center flex-shrink-0`}>
          <Icon name={icon} size={24} className={iconColors?.[color]} />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{title}</h3>
          <p className="font-body text-sm text-text-secondary mb-4 line-clamp-2">{description}</p>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={action}
            iconName="ArrowRight"
            iconPosition="right"
            className={`${iconColors?.[color]} hover:bg-surface/50 p-0 h-auto font-medium`}
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionCard;