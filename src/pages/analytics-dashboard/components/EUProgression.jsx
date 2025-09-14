import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';

const EUProgression = () => {
  const progressionData = [
    { date: '2024-09-08', total: 320, academic: 120, fitness: 80, creative: 60, social: 40, maintenance: 20 },
    { date: '2024-09-09', total: 350, academic: 130, fitness: 85, creative: 65, social: 45, maintenance: 25 },
    { date: '2024-09-10', total: 380, academic: 140, fitness: 90, creative: 70, social: 50, maintenance: 30 },
    { date: '2024-09-11', total: 365, academic: 135, fitness: 88, creative: 68, social: 48, maintenance: 26 },
    { date: '2024-09-12', total: 420, academic: 150, fitness: 95, creative: 80, social: 60, maintenance: 35 },
    { date: '2024-09-13', total: 445, academic: 160, fitness: 100, creative: 85, social: 65, maintenance: 35 },
    { date: '2024-09-14', total: 480, academic: 170, fitness: 105, creative: 90, social: 70, maintenance: 45 }
  ];

  const multipliers = [
    { domain: 'Academic', multiplier: 1.0, color: '#00D4FF', icon: 'BookOpen' },
    { domain: 'Fitness', multiplier: 2.5, color: '#00FF88', icon: 'Dumbbell' },
    { domain: 'Creative', multiplier: 0.8, color: '#FFD700', icon: 'Palette' },
    { domain: 'Social', multiplier: 1.2, color: '#FF4757', icon: 'Users' },
    { domain: 'Maintenance', multiplier: 0.6, color: '#B0B3B8', icon: 'Settings' }
  ];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="glass-dark p-4 rounded-lg border border-primary/20 shadow-xl">
          <p className="font-heading text-foreground font-semibold mb-2">
            {formatDate(label)}
          </p>
          <div className="space-y-1">
            {payload?.map((entry, index) => (
              <div key={index} className="flex items-center justify-between space-x-4">
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
        </div>
      );
    }
    return null;
  };

  const totalEU = progressionData?.[progressionData?.length - 1]?.total || 0;
  const previousTotal = progressionData?.[progressionData?.length - 2]?.total || 0;
  const dailyGrowth = totalEU - previousTotal;
  const growthPercentage = previousTotal > 0 ? ((dailyGrowth / previousTotal) * 100)?.toFixed(1) : 0;

  return (
    <div className="glass-dark rounded-xl p-6 border border-primary/20 neon-glow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-success rounded-lg flex items-center justify-center">
            <Icon name="TrendingUp" size={20} className="text-background" />
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">EU Progression</h2>
            <p className="font-body text-sm text-text-secondary">Effort unit tracking</p>
          </div>
        </div>

        <div className="text-right">
          <div className="font-data text-2xl font-bold text-foreground">{totalEU}</div>
          <div className="flex items-center space-x-1">
            <Icon 
              name={dailyGrowth >= 0 ? "TrendingUp" : "TrendingDown"} 
              size={14} 
              className={dailyGrowth >= 0 ? "text-success" : "text-error"}
            />
            <span className={`font-caption text-sm ${dailyGrowth >= 0 ? "text-success" : "text-error"}`}>
              {dailyGrowth >= 0 ? '+' : ''}{dailyGrowth} ({growthPercentage}%)
            </span>
          </div>
        </div>
      </div>
      <div className="h-64 w-full mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={progressionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#00D4FF" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 212, 255, 0.1)" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
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
            <Area
              type="monotone"
              dataKey="total"
              stroke="#00D4FF"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#totalGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {multipliers?.map((item, index) => (
          <div 
            key={index}
            className="p-3 rounded-lg bg-surface/20 border border-primary/10 hover:bg-surface/30 transition-colors duration-200"
          >
            <div className="flex items-center space-x-2 mb-2">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${item?.color}20`, border: `1px solid ${item?.color}40` }}
              >
                <Icon name={item?.icon} size={16} style={{ color: item?.color }} />
              </div>
              <span className="font-caption text-sm text-foreground">{item?.domain}</span>
            </div>
            
            <div className="text-center">
              <div className="font-data text-lg font-bold text-foreground">
                {item?.multiplier}x
              </div>
              <div className="font-caption text-xs text-text-secondary">Multiplier</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-success/10 to-primary/10 border border-success/20">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Zap" size={16} className="text-success" />
          <span className="font-caption text-sm font-medium text-success">Performance Insight</span>
        </div>
        <p className="font-body text-sm text-text-secondary">
          Your EU progression shows consistent growth. Fitness activities provide the highest multiplier impact.
        </p>
      </div>
    </div>
  );
};

export default EUProgression;