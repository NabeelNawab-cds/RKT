import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';

const PerformanceChart = ({ data, title, className = "" }) => {
  const chartData = [
    { name: 'Mon', value: 85, color: 'var(--color-primary)' },
    { name: 'Tue', value: 92, color: 'var(--color-accent)' },
    { name: 'Wed', value: 78, color: 'var(--color-success)' },
    { name: 'Thu', value: 95, color: 'var(--color-primary)' },
    { name: 'Fri', value: 88, color: 'var(--color-warning)' },
    { name: 'Sat', value: 76, color: 'var(--color-accent)' },
    { name: 'Sun', value: 82, color: 'var(--color-success)' }
  ];

  return (
    <div className={`glass-dark rounded-xl p-6 border border-primary/30 animate-fade-in ${className}`}>
      <h3 className="font-heading text-lg font-semibold text-foreground mb-6">{title}</h3>
      <div className="w-full h-64" aria-label="Weekly Performance Bar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-surface)" opacity={0.3} />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {chartData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry?.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-text-secondary">
        <span>Weekly EU Performance</span>
        <span className="text-primary font-medium">Avg: 85.1 EU</span>
      </div>
    </div>
  );
};

export default PerformanceChart;