import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const TimeDistributionChart = ({ title, className = "" }) => {
  const distributionData = [
    { name: 'Academic', value: 35, color: 'var(--color-primary)' },
    { name: 'Fitness', value: 20, color: 'var(--color-success)' },
    { name: 'Creative', value: 25, color: 'var(--color-accent)' },
    { name: 'Social', value: 12, color: 'var(--color-warning)' },
    { name: 'Maintenance', value: 8, color: 'var(--color-error)' }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0];
      return (
        <div className="glass-dark p-3 rounded-lg border border-primary/30">
          <p className="font-medium text-foreground">{data?.name}</p>
          <p className="text-sm text-text-secondary">{data?.value}% of time</p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload?.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry?.color }}
            />
            <span className="text-xs text-text-secondary">{entry?.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`glass-dark rounded-xl p-6 border border-primary/30 animate-fade-in ${className}`}>
      <h3 className="font-heading text-lg font-semibold text-foreground mb-6">{title}</h3>
      <div className="w-full h-64" aria-label="Time Distribution Pie Chart">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={distributionData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {distributionData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry?.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-text-secondary">
        <span>Weekly Distribution</span>
        <span className="text-primary font-medium">Total: 42.5 hours</span>
      </div>
    </div>
  );
};

export default TimeDistributionChart;