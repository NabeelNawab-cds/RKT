import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import LoginForm from './components/LoginForm';
import BackgroundEffects from './components/BackgroundEffects';
import SecurityBadge from './components/SecurityBadge';
import LoadingOverlay from './components/LoadingOverlay';

const LoginPage = () => {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      setLocation('/dashboard');
    }

    // Add cinematic entrance animation
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <BackgroundEffects />
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="glass-dark p-8 rounded-2xl border border-primary/20 neon-border animate-scale-in">
            <LoginForm />
          </div>
          
          {/* Additional Info */}
          <div className="mt-6 text-center animate-fade-in" style={{ animationDelay: '500ms' }}>
            <p className="text-text-secondary text-xs font-caption">
              © {new Date()?.getFullYear()} BATCAVE Command Center. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      {/* Security Badge */}
      <SecurityBadge />
      {/* Loading Overlay */}
      <LoadingOverlay isVisible={isLoading} />
      {/* Cinematic Vignette */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/30" />
      </div>
    </div>
  );
};

export default LoginPage;