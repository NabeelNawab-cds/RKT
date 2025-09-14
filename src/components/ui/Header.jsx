import React, { useState } from 'react';
import { useLocation } from 'wouter';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [location, setLocation] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { path: '/calendar', label: 'Calendar', icon: 'Calendar' },
    { path: '/analytics-dashboard', label: 'Analytics', icon: 'BarChart3' },
  ];

  const handleNavigation = (path) => {
    setLocation(path);
    setIsMenuOpen(false);
  };

  const isActive = (path) => location === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-100 glass-dark border-b border-primary/20">
      <div className="flex items-center justify-between h-20 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center neon-glow">
              <Icon name="Zap" size={24} className="text-background" />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="font-heading font-bold text-xl text-foreground tracking-wider">
              BATCAVE
            </h1>
            <span className="font-caption text-xs text-text-secondary uppercase tracking-widest">
              Command Center
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Button
              key={item?.path}
              variant={isActive(item?.path) ? "default" : "ghost"}
              size="default"
              onClick={() => handleNavigation(item?.path)}
              iconName={item?.icon}
              iconPosition="left"
              iconSize={18}
              className={`
                relative px-6 py-3 font-caption font-medium transition-all duration-300
                ${isActive(item?.path) 
                  ? 'text-primary-foreground shadow-glow' 
                  : 'text-text-secondary hover:text-foreground hover:bg-surface/50'
                }
              `}
            >
              {item?.label}
              {isActive(item?.path) && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
              )}
            </Button>
          ))}
        </nav>

        {/* User Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-text-secondary hover:text-foreground hover:bg-surface/50"
          >
            <Icon name="Search" size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-text-secondary hover:text-foreground hover:bg-surface/50"
          >
            <Icon name="Bell" size={20} />
          </Button>
          <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center cursor-pointer hover:shadow-glow transition-all duration-300">
            <Icon name="User" size={16} className="text-background" />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-text-secondary hover:text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
        </Button>
      </div>
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-dark border-t border-primary/20 animate-slide-up">
          <nav className="px-6 py-4 space-y-2">
            {navigationItems?.map((item) => (
              <Button
                key={item?.path}
                variant={isActive(item?.path) ? "default" : "ghost"}
                size="default"
                onClick={() => handleNavigation(item?.path)}
                iconName={item?.icon}
                iconPosition="left"
                iconSize={18}
                fullWidth
                className={`
                  justify-start font-caption font-medium
                  ${isActive(item?.path) 
                    ? 'text-primary-foreground shadow-glow' 
                    : 'text-text-secondary hover:text-foreground'
                  }
                `}
              >
                {item?.label}
              </Button>
            ))}
            
            {/* Mobile User Actions */}
            <div className="pt-4 border-t border-primary/20 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="icon">
                  <Icon name="Search" size={20} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Icon name="Bell" size={20} />
                </Button>
              </div>
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-background" />
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;