import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressionSystemCard = ({ 
  type, 
  title, 
  description, 
  features, 
  icon, 
  isSelected, 
  onSelect 
}) => {
  return (
    <div
      onClick={onSelect}
      className={`
        relative p-6 rounded-xl cursor-pointer transition-all duration-300 group
        ${isSelected 
          ? 'glass-dark neon-border shadow-glow' 
          : 'glass border border-primary/20 hover:border-primary/40 hover:shadow-md'
        }
      `}
    >
      {/* Selection Indicator */}
      <div className={`
        absolute top-4 right-4 w-6 h-6 rounded-full border-2 transition-all duration-300
        ${isSelected 
          ? 'bg-primary border-primary shadow-glow' 
          : 'border-primary/40 group-hover:border-primary/60'
        }
      `}>
        {isSelected && (
          <Icon 
            name="Check" 
            size={16} 
            className="text-primary-foreground absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
          />
        )}
      </div>
      {/* Icon */}
      <div className={`
        w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300
        ${isSelected 
          ? 'bg-gradient-to-br from-primary to-accent shadow-glow' 
          : 'bg-surface group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-accent/20'
        }
      `}>
        <Icon 
          name={icon} 
          size={24} 
          className={isSelected ? 'text-primary-foreground' : 'text-primary'} 
        />
      </div>
      {/* Content */}
      <div className="space-y-3">
        <h3 className={`
          font-heading font-bold text-lg transition-colors duration-300
          ${isSelected ? 'text-primary' : 'text-foreground group-hover:text-primary'}
        `}>
          {title}
        </h3>
        
        <p className="text-text-secondary text-sm leading-relaxed">
          {description}
        </p>

        {/* Features */}
        <ul className="space-y-2 mt-4">
          {features?.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2 text-sm">
              <Icon 
                name="ArrowRight" 
                size={14} 
                className={`
                  transition-colors duration-300
                  ${isSelected ? 'text-primary' : 'text-text-secondary'}
                `} 
              />
              <span className="text-text-secondary">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Hover Effect */}
      <div className={`
        absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300
        ${!isSelected && 'group-hover:opacity-10 bg-gradient-to-br from-primary to-accent'}
      `} />
    </div>
  );
};

export default ProgressionSystemCard;