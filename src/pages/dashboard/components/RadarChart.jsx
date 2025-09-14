import React from 'react';
import { RadarChart as RechartsRadar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

const RadarChart = ({ title, className = "" }) => {
  const radarData = [
    { domain: 'Academic', value: 85, fullMark: 100 },
    { domain: 'Fitness', value: 72, fullMark: 100 },
    { domain: 'Creative', value: 90, fullMark: 100 },
    { domain: 'Social', value: 68, fullMark: 100 },
    { domain: 'Maintenance', value: 78, fullMark: 100 }
  ];

  return (
    <div className={`glass-dark rounded-xl p-6 border border-primary/30 animate-fade-in ${className}`}>
      <h3 className="font-heading text-lg font-semibold text-foreground mb-6">{title}</h3>
      
      <div className="w-full h-64" aria-label="Domain Balance Radar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsRadar data={radarData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
            <PolarGrid 
              stroke="var(--color-surface)" 
              opacity={0.3}
            />
            <PolarAngleAxis 
              dataKey="domain" 
              tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]} 
              tick={{ fill: 'var(--color-text-secondary)', fontSize: 10 }}
              tickCount={5}
            />
            <Radar
              name="Performance"
              dataKey="value"
              stroke="var(--color-primary)"
              fill="var(--color-primary)"
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </RechartsRadar>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-text-secondary">
        <span>Cross-Domain Balance</span>
        <span className="text-primary font-medium">Balance Score: 78.6</span>
      </div>
    </div>
  );
};

export default RadarChart;