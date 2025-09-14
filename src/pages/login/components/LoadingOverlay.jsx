import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingOverlay = ({ isVisible, message = 'Authenticating...' }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="glass-dark p-8 rounded-xl border border-primary/20 text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto animate-pulse">
          <Icon name="Loader2" size={32} className="text-background animate-spin" />
        </div>
        <div className="space-y-2">
          <h3 className="font-heading text-xl font-bold text-foreground">
            {message}
          </h3>
          <p className="text-text-secondary font-caption">
            Verifying credentials and establishing secure connection...
          </p>
        </div>
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;