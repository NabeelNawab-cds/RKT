import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadge = () => {
  return (
    <div className="fixed bottom-6 right-6 glass-dark p-4 rounded-lg border border-primary/20 animate-fade-in">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
          <Icon name="Shield" size={16} className="text-success" />
        </div>
        <div className="text-xs">
          <p className="text-foreground font-medium">Secure Connection</p>
          <p className="text-text-secondary">256-bit SSL Encryption</p>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadge;