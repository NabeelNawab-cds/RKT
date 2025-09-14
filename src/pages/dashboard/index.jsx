import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';

import Button from '../../components/ui/Button';
import MetricsCard from './components/MetricsCard';
import ProgressRing from './components/ProgressRing';
import TaskCreationCard from './components/TaskCreationCard';
import PerformanceChart from './components/PerformanceChart';
import RadarChart from './components/RadarChart';
import QuickActionCard from './components/QuickActionCard';
import StreakCounter from './components/StreakCounter';
import TimeDistributionChart from './components/TimeDistributionChart';

const Dashboard = () => {
  const [, setLocation] = useLocation();
  const [tasks, setTasks] = useState([]);
  const [userStats, setUserStats] = useState({
    totalXP: 2847,
    currentLevel: 12,
    weeklyEU: 156.8,
    currentStreak: 18,
    bestStreak: 42,
    completedTasks: 89,
    totalTasks: 112
  });

  // Mock user data
  const mockUserData = {
    name: "Alex Chen",
    progressionType: "Mountain", // or "Sapling"
    currentTheme: "Dark Knight",
    joinDate: "2024-01-15"
  };

  useEffect(() => {
    // Simulate loading user data and stats
    const loadDashboardData = () => {
      // This would typically fetch from an API
      console.log('Dashboard loaded for user:', mockUserData?.name);
    };
    
    loadDashboardData();
  }, []);

  const handleTaskCreate = (newTask) => {
    setTasks(prev => [newTask, ...prev]);
    // Update stats based on task creation
    setUserStats(prev => ({
      ...prev,
      totalTasks: prev?.totalTasks + 1
    }));
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'calendar': setLocation('/calendar');
        break;
      case 'analytics': setLocation('/analytics-dashboard');
        break;
      case 'alfred':
        // Would open ALFRED AI assistant modal
        console.log('Opening ALFRED AI Assistant...');
        break;
      default:
        break;
    }
  };

  const calculateXPProgress = () => {
    const currentLevelXP = userStats?.currentLevel * 200;
    const nextLevelXP = (userStats?.currentLevel + 1) * 200;
    const progressXP = userStats?.totalXP - currentLevelXP;
    const requiredXP = nextLevelXP - currentLevelXP;
    return (progressXP / requiredXP) * 100;
  };

  const calculateTaskCompletion = () => {
    return (userStats?.completedTasks / userStats?.totalTasks) * 100;
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
                Welcome back, {mockUserData?.name}
              </h1>
              <p className="font-body text-text-secondary">
                Ready to conquer your goals? Your {mockUserData?.progressionType} journey continues.
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="outline"
                iconName="Settings"
                iconPosition="left"
                className="text-text-secondary hover:text-foreground"
              >
                Settings
              </Button>
              <Button
                variant="default"
                iconName="Zap"
                iconPosition="left"
              >
                Power Mode
              </Button>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Main Metrics */}
          <div className="lg:col-span-8 space-y-6">
            {/* Top Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <MetricsCard
                title="Total XP"
                value={userStats?.totalXP?.toLocaleString()}
                subtitle={`Level ${userStats?.currentLevel}`}
                icon="Zap"
                color="primary"
                trend={{ type: 'up', value: '+12%' }}
                className="stagger-1"
              />
              <MetricsCard
                title="Weekly EU"
                value={userStats?.weeklyEU}
                subtitle="Effort Units"
                icon="Target"
                color="accent"
                trend={{ type: 'up', value: '+8%' }}
                className="stagger-2"
              />
              <MetricsCard
                title="Current Streak"
                value={`${userStats?.currentStreak} days`}
                subtitle="Keep it going!"
                icon="Flame"
                color="success"
                trend={{ type: 'neutral', value: '' }}
                className="stagger-3"
              />
              <MetricsCard
                title="Completion Rate"
                value={`${Math.round(calculateTaskCompletion())}%`}
                subtitle={`${userStats?.completedTasks}/${userStats?.totalTasks} tasks`}
                icon="CheckCircle"
                color="warning"
                trend={{ type: 'up', value: '+5%' }}
                className="stagger-4"
              />
            </div>

            {/* Progress Rings Section */}
            <div className="glass-dark rounded-xl p-6 border border-primary/30 animate-fade-in">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-6">Progress Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ProgressRing
                  progress={calculateXPProgress()}
                  label="XP to Next Level"
                  color="var(--color-primary)"
                  className="stagger-1"
                />
                <ProgressRing
                  progress={calculateTaskCompletion()}
                  label="Task Completion"
                  color="var(--color-success)"
                  className="stagger-2"
                />
                <ProgressRing
                  progress={78}
                  label="Weekly Goal"
                  color="var(--color-accent)"
                  className="stagger-3"
                />
              </div>
            </div>

            {/* Task Creation */}
            <TaskCreationCard
              onTaskCreate={handleTaskCreate}
              className="animate-fade-in"
            />

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PerformanceChart
                title="Weekly Performance"
                data={[
                  { name: 'Mon', value: 85 },
                  { name: 'Tue', value: 92 },
                  { name: 'Wed', value: 78 },
                  { name: 'Thu', value: 96 },
                  { name: 'Fri', value: 88 },
                  { name: 'Sat', value: 73 },
                  { name: 'Sun', value: 91 }
                ]}
                className="stagger-1"
              />
              <RadarChart
                title="Domain Balance"
                className="stagger-2"
              />
            </div>
          </div>

          {/* Right Column - Secondary Metrics & Actions */}
          <div className="lg:col-span-4 space-y-6">
            {/* Streak Counter */}
            <StreakCounter
              currentStreak={userStats?.currentStreak}
              bestStreak={userStats?.bestStreak}
              className="animate-fade-in"
            />

            {/* Time Distribution */}
            <TimeDistributionChart
              title="Time Allocation"
              className="animate-fade-in"
            />

            {/* Quick Actions */}
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-semibold text-foreground">Quick Actions</h3>
              
              <QuickActionCard
                title="Calendar View"
                description="Manage your schedule and upcoming deadlines"
                icon="Calendar"
                color="primary"
                action={() => handleQuickAction('calendar')}
                className="stagger-1"
              />
              
              <QuickActionCard
                title="Analytics Dashboard"
                description="Deep dive into your performance metrics"
                icon="BarChart3"
                color="accent"
                action={() => handleQuickAction('analytics')}
                className="stagger-2"
              />
              
              <QuickActionCard
                title="ALFRED Assistant"
                description="Get AI-powered planning suggestions"
                icon="Bot"
                color="success"
                action={() => handleQuickAction('alfred')}
                className="stagger-3"
              />
            </div>

            {/* Recent Activity */}
            <div className="glass-dark rounded-xl p-6 border border-primary/30 animate-fade-in">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { action: 'Completed', task: 'Data Structures Assignment', time: '2 hours ago', xp: '+45 XP' },
                  { action: 'Started', task: 'Morning Workout', time: '4 hours ago', xp: '+25 XP' },
                  { action: 'Completed', task: 'React Component Design', time: '6 hours ago', xp: '+35 XP' }
                ]?.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-surface/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity?.action === 'Completed' ? 'bg-success' : 'bg-warning'
                      }`} />
                      <div>
                        <p className="font-medium text-sm text-foreground">{activity?.action} {activity?.task}</p>
                        <p className="text-xs text-text-secondary">{activity?.time}</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-primary">{activity?.xp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Quick Actions */}
        <div className="md:hidden mt-8 grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            fullWidth
            iconName="Settings"
            iconPosition="left"
            className="text-text-secondary hover:text-foreground"
          >
            Settings
          </Button>
          <Button
            variant="default"
            fullWidth
            iconName="Zap"
            iconPosition="left"
          >
            Power Mode
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;