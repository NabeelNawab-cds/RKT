import React, { useState } from 'react';
import { useLocation } from 'wouter';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for authentication
  const mockCredentials = {
    username: 'batman',
    password: 'gotham2024'
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.username?.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData?.password?.trim()) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      if (formData?.username === mockCredentials?.username && 
          formData?.password === mockCredentials?.password) {
        // Store authentication state
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', formData?.username);
        setLocation('/dashboard');
      } else {
        setErrors({
          general: `Invalid credentials. Use username: ${mockCredentials?.username}, password: ${mockCredentials?.password}`
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto neon-glow">
            <Icon name="Shield" size={32} className="text-background" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-foreground">
            BATCAVE ACCESS
          </h1>
          <p className="font-caption text-text-secondary">
            Enter your credentials to access the command center
          </p>
        </div>

        {/* General Error */}
        {errors?.general && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-lg animate-fade-in">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <p className="text-sm text-error">{errors?.general}</p>
            </div>
          </div>
        )}

        {/* Username Input */}
        <Input
          label="Username"
          type="text"
          name="username"
          placeholder="Enter your username"
          value={formData?.username}
          onChange={handleInputChange}
          error={errors?.username}
          required
          className="animate-slide-up stagger-1"
        />

        {/* Password Input */}
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          required
          className="animate-slide-up stagger-2"
        />

        {/* Login Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          iconName="ArrowRight"
          iconPosition="right"
          className="animate-slide-up stagger-3 neon-glow"
        >
          {isLoading ? 'Accessing...' : 'Enter the Command Center'}
        </Button>

        {/* Register Link */}
        <div className="text-center animate-slide-up stagger-4">
          <p className="text-text-secondary text-sm">
            New to the mission?{' '}
            <button
              type="button"
              onClick={() => setLocation('/register')}
              className="text-primary hover:text-accent transition-colors duration-300 font-medium"
            >
              Join the League
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;