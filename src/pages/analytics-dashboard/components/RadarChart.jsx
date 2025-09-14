import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const RadarPerformanceChart = () => {
  const radarData = [
    {
      domain: 'Academic',
      current: 85,
      target: 90,
      average: 78,
      fullMark: 100
    },
    {
      domain: 'Fitness',
      current: 92,
      target: 85,
      average: 82,
      fullMark: 100
    },
    {
      domain: 'Creative',
      current: 78,
      target: 80,
      average: 75,
      fullMark: 100
    },
    {
      domain: 'Social',
      current: 65,
      target: 75,
      average: 70,
      fullMark: 100
    },
    {
      domain: 'Maintenance',
      current: 45,
      target: 60,
      average: 55,
      fullMark: 100
    }
  ];

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
                <span className="font-body text-sm text-text-secondary">
                  {entry?.dataKey === 'current' ? 'Current' : 
                   entry?.dataKey === 'target' ? 'Target' : 'Average'}
                </span>
              </div>
              <span className="font-data text-sm text-foreground font-semibold">
                {entry?.value}%
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
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
          <Icon name="Target" size={20} className="text-background" />
        </div>
        <div>
          <h2 className="font-heading text-xl font-bold text-foreground">Domain Balance</h2>
          <p className="font-body text-sm text-text-secondary">Performance radar analysis</p>
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart 
            data={radarData} 
            margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
            title="Domain Balance Performance Radar Chart"
          >
            <PolarGrid 
              stroke="rgba(0, 212, 255, 0.2)" 
              strokeWidth={1}
            />
            <PolarAngleAxis 
              dataKey="domain" 
              tick={{ 
                fill: '#B0B3B8', 
                fontSize: 12, 
                fontFamily: 'Space Grotesk' 
              }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]} 
              tick={{ 
                fill: '#B0B3B8', 
                fontSize: 10, 
                fontFamily: 'JetBrains Mono' 
              }}
              tickCount={6}
            />
            <Tooltip content={<CustomTooltip />} />
            
            <Radar
              name="Current"
              dataKey="current"
              stroke="#00D4FF"
              fill="#00D4FF"
              fillOpacity={0.3}
              strokeWidth={2}
              dot={{ fill: '#00D4FF', strokeWidth: 2, r: 4 }}
            />
            <Radar
              name="Target"
              dataKey="target"
              stroke="#FFD700"
              fill="transparent"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#FFD700', strokeWidth: 2, r: 3 }}
            />
            <Radar
              name="Average"
              dataKey="average"
              stroke="#B0B3B8"
              fill="transparent"
              strokeWidth={1}
              strokeDasharray="2 2"
              dot={{ fill: '#B0B3B8', strokeWidth: 1, r: 2 }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="font-caption text-xs text-text-secondary">Current Performance</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-accent" />
          <span className="font-caption text-xs text-text-secondary">Target Goals</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-text-secondary" />
          <span className="font-caption text-xs text-text-secondary">Historical Average</span>
        </div>
      </div>
    </div>
  );
};

export default RadarPerformanceChart;