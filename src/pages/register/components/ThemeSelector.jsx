import React from 'react';
import Icon from '../../../components/AppIcon';

const ThemeSelector = ({ selectedTheme, onThemeChange }) => {
  const themes = [
    {
      id: 'dark-knight',
      name: 'Dark Knight',
      description: 'Classic Batman-inspired dark theme',
      icon: 'Shield',
      colors: ['#0F0F23', '#00D4FF', '#FFD700']
    },
    {
      id: 'neon-grid',
      name: 'Neon Grid',
      description: 'Cyberpunk-inspired neon aesthetics',
      icon: 'Grid3X3',
      colors: ['#000000', '#00FF88', '#FF4757']
    },
    {
      id: 'stealth-ops',
      name: 'Stealth Ops',
      description: 'Military-grade tactical interface',
      icon: 'Eye',
      colors: ['#1A1A1A', '#4CAF50', '#FFC107']
    },
    {
      id: 'aurora',
      name: 'Aurora',
      description: 'Northern lights inspired theme',
      icon: 'Sparkles',
      colors: ['#0D1B2A', '#7209B7', '#F72585']
    },
    {
      id: 'minimal-white',
      name: 'Minimal White',
      description: 'Clean and minimalist light theme',
      icon: 'Sun',
      colors: ['#FFFFFF', '#2563EB', '#059669']
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Icon name="Palette" size={20} className="text-primary" />
        <h3 className="font-heading font-semibold text-foreground">Choose Your Theme</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {themes?.map((theme) => (
          <div
            key={theme?.id}
            onClick={() => onThemeChange(theme?.id)}
            className={`
              relative p-4 rounded-lg cursor-pointer transition-all duration-300 group
              ${selectedTheme === theme?.id
                ? 'glass-dark neon-border shadow-glow'
                : 'glass border border-primary/20 hover:border-primary/40'
              }
            `}
          >
            {/* Selection Indicator */}
            <div className={`
              absolute top-2 right-2 w-4 h-4 rounded-full border transition-all duration-300
              ${selectedTheme === theme?.id
                ? 'bg-primary border-primary' :'border-primary/40 group-hover:border-primary/60'
              }
            `}>
              {selectedTheme === theme?.id && (
                <Icon 
                  name="Check" 
                  size={12} 
                  className="text-primary-foreground absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
                />
              )}
            </div>

            {/* Theme Icon */}
            <div className={`
              w-8 h-8 rounded-md flex items-center justify-center mb-3 transition-all duration-300
              ${selectedTheme === theme?.id
                ? 'bg-gradient-to-br from-primary to-accent' :'bg-surface group-hover:bg-primary/20'
              }
            `}>
              <Icon 
                name={theme?.icon} 
                size={16} 
                className={selectedTheme === theme?.id ? 'text-primary-foreground' : 'text-primary'} 
              />
            </div>

            {/* Theme Info */}
            <div className="space-y-2">
              <h4 className={`
                font-caption font-medium text-sm transition-colors duration-300
                ${selectedTheme === theme?.id ? 'text-primary' : 'text-foreground group-hover:text-primary'}
              `}>
                {theme?.name}
              </h4>
              
              <p className="text-text-secondary text-xs leading-relaxed">
                {theme?.description}
              </p>

              {/* Color Preview */}
              <div className="flex space-x-1 mt-3">
                {theme?.colors?.map((color, index) => (
                  <div
                    key={index}
                    className="w-4 h-4 rounded-full border border-primary/20"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Hover Effect */}
            <div className={`
              absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300
              ${selectedTheme !== theme?.id && 'group-hover:opacity-5 bg-gradient-to-br from-primary to-accent'}
            `} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;