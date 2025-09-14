import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const PerformanceMetrics = ({ timeframe, setTimeframe }) => {
  const weeklyData = [
    { name: 'Mon', academic: 85, fitness: 92, creative: 78, social: 65, maintenance: 45, total: 365 },
    { name: 'Tue', academic: 78, fitness: 88, creative: 82, social: 70, maintenance: 52, total: 370 },
    { name: 'Wed', academic: 92, fitness: 85, creative: 75, social: 68, maintenance: 48, total: 368 },
    { name: 'Thu', academic: 88, fitness: 90, creative: 85, social: 72, maintenance: 55, total: 390 },
    { name: 'Fri', academic: 82, fitness: 87, creative: 88, social: 75, maintenance: 50, total: 382 },
    { name: 'Sat', academic: 65, fitness: 95, creative: 92, social: 85, maintenance: 60, total: 397 },
    { name: 'Sun', academic: 70, fitness: 80, creative: 90, social: 88, maintenance: 65, total: 393 }
  ];

  const monthlyData = [
    { name: 'Week 1', academic: 420, fitness: 380, creative: 350, social: 280, maintenance: 220, total: 1650 },
    { name: 'Week 2', academic: 450, fitness: 400, creative: 380, social: 320, maintenance: 250, total: 1800 },
    { name: 'Week 3', academic: 480, fitness: 420, creative: 400, social: 340, maintenance: 280, total: 1920 },
    { name: 'Week 4', academic: 520, fitness: 450, creative: 420, social: 380, maintenance: 300, total: 2070 }
  ];

  const yearlyData = [
    { name: 'Jan', academic: 1800, fitness: 1600, creative: 1400, social: 1200, maintenance: 1000, total: 7000 },
    { name: 'Feb', academic: 1900, fitness: 1700, creative: 1500, social: 1300, maintenance: 1100, total: 7500 },
    { name: 'Mar', academic: 2100, fitness: 1800, creative: 1600, social: 1400, maintenance: 1200, total: 8100 },
    { name: 'Apr', academic: 2000, fitness: 1750, creative: 1550, social: 1350, maintenance: 1150, total: 7800 },
    { name: 'May', academic: 2200, fitness: 1900, creative: 1700, social: 1500, maintenance: 1300, total: 8600 },
    { name: 'Jun', academic: 2300, fitness: 2000, creative: 1800, social: 1600, maintenance: 1400, total: 9100 }
  ];

  const getData = () => {
    switch (timeframe) {
      case 'weekly': return weeklyData;
      case 'monthly': return monthlyData;
      case 'yearly': return yearlyData;
      default: return weeklyData;
    }
  };

  const domainColors = {
    academic: '#00D4FF',
    fitness: '#00FF88',
    creative: '#FFD700',
    social: '#FF4757',
    maintenance: '#B0B3B8'
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="glass-dark p-4 rounded-lg border border-primary/20 shadow-xl">
          <p className="font-heading text-foreground font-semibold mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-4 mb-1">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry?.color }}
                />
                <span className="font-body text-sm text-text-secondary capitalize">
                  {entry?.dataKey}
                </span>
              </div>
              <span className="font-data text-sm text-foreground font-semibold">
                {entry?.value} EU
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-dark rounded-xl p-6 border border-primary/20 neon-glow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <Icon name="BarChart3" size={20} className="text-background" />
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">Performance Metrics</h2>
            <p className="font-body text-sm text-text-secondary">Cross-domain EU tracking</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {['weekly', 'monthly', 'yearly']?.map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-4 py-2 rounded-lg font-caption text-sm font-medium transition-all duration-300 ${
                timeframe === period
                  ? 'bg-primary text-primary-foreground shadow-glow'
                  : 'text-text-secondary hover:text-foreground hover:bg-surface/50'
              }`}
            >
              {period?.charAt(0)?.toUpperCase() + period?.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={getData()}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 212, 255, 0.1)" />
            <XAxis 
              dataKey="name" 
              stroke="#B0B3B8"
              fontSize={12}
              fontFamily="Space Grotesk"
            />
            <YAxis 
              stroke="#B0B3B8"
              fontSize={12}
              fontFamily="JetBrains Mono"
            />
            <Tooltip content={<CustomTooltip />} />
            
            {Object.entries(domainColors)?.map(([domain, color], index) => (
              <Bar
                key={domain}
                dataKey={domain}
                fill={color}
                radius={[2, 2, 0, 0]}
                animationDelay={index * 100}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-5 gap-4 mt-6">
        {Object.entries(domainColors)?.map(([domain, color]) => (
          <div key={domain} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: color }}
            />
            <span className="font-caption text-xs text-text-secondary capitalize">
              {domain}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceMetrics;