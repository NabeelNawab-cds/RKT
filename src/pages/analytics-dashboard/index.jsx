import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PerformanceMetrics from './components/PerformanceMetrics';
import RadarPerformanceChart from './components/RadarChart';
import TimeDistribution from './components/TimeDistribution';
import StreakAnalysis from './components/StreakAnalysis';
import EUProgression from './components/EUProgression';
import AIInsights from './components/AIInsights';
import ExportControls from './components/ExportControls';

const AnalyticsDashboard = () => {
  const [location, setLocation] = useLocation();
  const [timeframe, setTimeframe] = useState('weekly');
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState('overview');

  useEffect(() => {
    // Simulate loading analytics data
    const loadAnalytics = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false);
    };
    
    loadAnalytics();
  }, []);

  const navigationItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { path: '/calendar', label: 'Calendar', icon: 'Calendar' },
    { path: '/analytics-dashboard', label: 'Analytics', icon: 'BarChart3' }
  ];

  const viewOptions = [
    { key: 'overview', label: 'Overview', icon: 'Grid3X3' },
    { key: 'performance', label: 'Performance', icon: 'TrendingUp' },
    { key: 'insights', label: 'AI Insights', icon: 'Brain' },
    { key: 'export', label: 'Export', icon: 'Download' }
  ];

  const handleNavigation = (path) => {
    setLocation(path);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="font-heading text-xl font-bold text-foreground mb-2">Loading Analytics</h2>
            <p className="font-body text-text-secondary">Analyzing your performance data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-6 lg:mb-0">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center neon-glow">
                  <Icon name="BarChart3" size={24} className="text-background" />
                </div>
                <div>
                  <h1 className="font-heading text-3xl font-bold text-foreground">Analytics Dashboard</h1>
                  <p className="font-body text-text-secondary">Comprehensive performance insights and AI-powered recommendations</p>
                </div>
              </div>
            </div>

            {/* Navigation Pills */}
            <div className="flex items-center space-x-2">
              {navigationItems?.map((item) => (
                <Button
                  key={item?.path}
                  variant={location === item?.path ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleNavigation(item?.path)}
                  iconName={item?.icon}
                  iconPosition="left"
                  iconSize={16}
                  className="font-caption"
                >
                  {item?.label}
                </Button>
              ))}
            </div>
          </div>

          {/* View Selector */}
          <div className="flex items-center space-x-2 mb-8 overflow-x-auto pb-2">
            {viewOptions?.map((view) => (
              <Button
                key={view?.key}
                variant={activeView === view?.key ? "default" : "ghost"}
                size="default"
                onClick={() => setActiveView(view?.key)}
                iconName={view?.icon}
                iconPosition="left"
                iconSize={18}
                className="font-caption whitespace-nowrap"
              >
                {view?.label}
              </Button>
            ))}
          </div>

          {/* Overview View */}
          {activeView === 'overview' && (
            <div className="space-y-8">
              {/* Top Row - Performance Metrics */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                  <PerformanceMetrics timeframe={timeframe} setTimeframe={setTimeframe} />
                </div>
                <div>
                  <TimeDistribution />
                </div>
              </div>

              {/* Middle Row - Radar and Streaks */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RadarPerformanceChart />
                <StreakAnalysis />
              </div>

              {/* Bottom Row - EU Progression */}
              <div>
                <EUProgression />
              </div>
            </div>
          )}

          {/* Performance View */}
          {activeView === 'performance' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <PerformanceMetrics timeframe={timeframe} setTimeframe={setTimeframe} />
                <RadarPerformanceChart />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <EUProgression />
                <StreakAnalysis />
              </div>
            </div>
          )}

          {/* AI Insights View */}
          {activeView === 'insights' && (
            <div className="space-y-8">
              <AIInsights />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RadarPerformanceChart />
                <TimeDistribution />
              </div>
            </div>
          )}

          {/* Export View */}
          {activeView === 'export' && (
            <div className="space-y-8">
              <ExportControls />
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <PerformanceMetrics timeframe={timeframe} setTimeframe={setTimeframe} />
                <TimeDistribution />
                <div className="space-y-6">
                  <StreakAnalysis />
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions Footer */}
          <div className="mt-12 p-6 glass-dark rounded-xl border border-primary/20">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                  Ready to optimize your performance?
                </h3>
                <p className="font-body text-sm text-text-secondary">
                  Use these insights to enhance your productivity planning
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => handleNavigation('/calendar')}
                  iconName="Calendar"
                  iconPosition="left"
                  iconSize={16}
                  className="font-caption"
                >
                  Schedule Tasks
                </Button>
                <Button
                  variant="default"
                  onClick={() => handleNavigation('/dashboard')}
                  iconName="Zap"
                  iconPosition="left"
                  iconSize={16}
                  className="font-caption"
                >
                  Take Action
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalyticsDashboard;