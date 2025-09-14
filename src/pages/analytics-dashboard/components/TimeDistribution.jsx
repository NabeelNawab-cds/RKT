import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const TimeDistribution = () => {
  const distributionData = [
    { name: 'Academic', value: 35, hours: 8.4, color: '#00D4FF' },
    { name: 'Fitness', value: 20, hours: 4.8, color: '#00FF88' },
    { name: 'Creative', value: 18, hours: 4.3, color: '#FFD700' },
    { name: 'Social', value: 15, hours: 3.6, color: '#FF4757' },
    { name: 'Maintenance', value: 12, hours: 2.9, color: '#B0B3B8' }
  ];

  const totalHours = distributionData?.reduce((sum, item) => sum + item?.hours, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="glass-dark p-4 rounded-lg border border-primary/20 shadow-xl">
          <div className="flex items-center space-x-2 mb-2">
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: data?.color }}
            />
            <span className="font-heading text-foreground font-semibold">{data?.name}</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between space-x-4">
              <span className="font-body text-sm text-text-secondary">Percentage:</span>
              <span className="font-data text-sm text-foreground font-semibold">{data?.value}%</span>
            </div>
            <div className="flex justify-between space-x-4">
              <span className="font-body text-sm text-text-secondary">Hours:</span>
              <span className="font-data text-sm text-foreground font-semibold">{data?.hours}h</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null;

    return (
      <text 
        x={x} 
        y={y} 
        fill="#FFFFFF" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="font-data text-xs font-semibold"
      >
        {`${(percent * 100)?.toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="glass-dark rounded-xl p-6 border border-primary/20 neon-glow">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-success to-primary rounded-lg flex items-center justify-center">
          <Icon name="Clock" size={20} className="text-background" />
        </div>
        <div>
          <h2 className="font-heading text-xl font-bold text-foreground">Time Distribution</h2>
          <p className="font-body text-sm text-text-secondary">Daily activity allocation</p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-6">
        <div className="w-full lg:w-1/2 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={distributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={80}
                innerRadius={40}
                fill="#8884d8"
                dataKey="value"
                animationBegin={0}
                animationDuration={800}
              >
                {distributionData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full lg:w-1/2 space-y-4">
          <div className="text-center lg:text-left mb-4">
            <div className="font-data text-3xl font-bold text-foreground">
              {totalHours?.toFixed(1)}h
            </div>
            <div className="font-caption text-sm text-text-secondary">Total Active Time</div>
          </div>

          <div className="space-y-3">
            {distributionData?.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-surface/30 hover:bg-surface/50 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: item?.color }}
                  />
                  <span className="font-body text-sm text-foreground">{item?.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-data text-sm font-semibold text-foreground">
                    {item?.hours}h
                  </div>
                  <div className="font-caption text-xs text-text-secondary">
                    {item?.value}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 p-4 rounded-lg bg-surface/20 border border-primary/10">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="TrendingUp" size={16} className="text-success" />
          <span className="font-caption text-sm font-medium text-success">Optimization Insight</span>
        </div>
        <p className="font-body text-sm text-text-secondary">
          Your academic focus is strong at 35%. Consider increasing fitness time by 5% for better balance.
        </p>
      </div>
    </div>
  );
};

export default TimeDistribution;