import React, { useState } from 'react';
import { useLocation } from 'wouter';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import ProgressionSystemCard from './components/ProgressionSystemCard';
import PasswordStrengthIndicator from './components/PasswordStrengthIndicator';
import ThemeSelector from './components/ThemeSelector';
import ParticleBackground from './components/ParticleBackground';

const Register = () => {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    progressionSystem: 'sapling',
    theme: 'dark-knight'
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const progressionSystems = [
    {
      type: 'sapling',
      title: 'Sapling Growth',
      description: 'Steady, organic progression focused on consistent daily habits and sustainable growth patterns.',
      features: [
        'Gentle learning curves',
        'Focus on habit formation',
        'Sustainable progress tracking',
        'Mindful achievement system'
      ],
      icon: 'Sprout'
    },
    {
      type: 'mountain',
      title: 'Mountain Conquest',
      description: 'Challenge-driven advancement with ambitious goals and competitive achievement milestones.',
      features: [
        'Aggressive goal setting',
        'Competitive leaderboards',
        'Achievement-based rewards',
        'Performance optimization'
      ],
      icon: 'Mountain'
    }
  ];

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData?.username?.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData?.username?.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/?.test(formData?.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    // Email validation
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Confirm password validation
    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear specific error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate registration API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      console.log('Registration successful:', formData);
      
      // Redirect to dashboard
      setLocation('/dashboard');
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <ParticleBackground />
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-surface/20" />
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center neon-glow">
                <Icon name="Shield" size={32} className="text-primary-foreground" />
              </div>
            </div>
            
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4 tracking-wider">
              JOIN THE MISSION
            </h1>
            
            <p className="font-caption text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
              Begin your transformation into a productivity legend. Create your account and unlock the power of gamified achievement tracking.
            </p>
          </div>

          {/* Registration Form */}
          <div className="glass-dark rounded-2xl p-8 md:p-12 neon-border animate-slide-up">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Username"
                  type="text"
                  placeholder="Enter your username"
                  value={formData?.username}
                  onChange={(e) => handleInputChange('username', e?.target?.value)}
                  error={errors?.username}
                  required
                  className="animate-fade-in stagger-1"
                />

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  value={formData?.email}
                  onChange={(e) => handleInputChange('email', e?.target?.value)}
                  error={errors?.email}
                  required
                  className="animate-fade-in stagger-2"
                />
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 animate-fade-in stagger-3">
                  <div className="relative">
                    <Input
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData?.password}
                      onChange={(e) => handleInputChange('password', e?.target?.value)}
                      error={errors?.password}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-9 text-text-secondary hover:text-foreground"
                    >
                      <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
                    </Button>
                  </div>
                  <PasswordStrengthIndicator password={formData?.password} />
                </div>

                <div className="animate-fade-in stagger-4">
                  <div className="relative">
                    <Input
                      label="Confirm Password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData?.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
                      error={errors?.confirmPassword}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-9 text-text-secondary hover:text-foreground"
                    >
                      <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={18} />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Progression System Selection */}
              <div className="space-y-6 animate-fade-in stagger-5">
                <div className="flex items-center space-x-2">
                  <Icon name="Target" size={20} className="text-primary" />
                  <h3 className="font-heading font-semibold text-foreground">Choose Your Path</h3>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {progressionSystems?.map((system) => (
                    <ProgressionSystemCard
                      key={system?.type}
                      {...system}
                      isSelected={formData?.progressionSystem === system?.type}
                      onSelect={() => handleInputChange('progressionSystem', system?.type)}
                    />
                  ))}
                </div>
              </div>

              {/* Theme Selection */}
              <div className="animate-fade-in stagger-6">
                <ThemeSelector
                  selectedTheme={formData?.theme}
                  onThemeChange={(theme) => handleInputChange('theme', theme)}
                />
              </div>

              {/* Submit Button */}
              <div className="space-y-4 animate-fade-in stagger-7">
                {errors?.submit && (
                  <div className="p-4 rounded-lg bg-error/10 border border-error/20 text-error text-sm">
                    {errors?.submit}
                  </div>
                )}

                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  loading={isLoading}
                  disabled={isLoading}
                  fullWidth
                  iconName="Shield"
                  iconPosition="left"
                  className="font-heading font-bold text-lg py-4 shadow-glow"
                >
                  {isLoading ? 'Initializing Mission...' : 'Join the Mission'}
                </Button>
              </div>

              {/* Login Link */}
              <div className="text-center pt-6 border-t border-primary/20 animate-fade-in stagger-8">
                <p className="text-text-secondary">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setLocation('/login')}
                    className="text-primary hover:text-accent transition-colors duration-300 font-medium"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 animate-fade-in stagger-9">
            <p className="text-text-secondary text-sm">
              By joining, you agree to our Terms of Service and Privacy Policy
            </p>
            <p className="text-text-secondary text-xs mt-2">
              © {new Date()?.getFullYear()} BATCAVE. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;