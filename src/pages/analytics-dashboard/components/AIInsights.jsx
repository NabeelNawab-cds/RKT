import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIInsights = () => {
  const [activeTab, setActiveTab] = useState('insights');

  const insights = [
    {
      type: 'optimization',
      title: 'Productivity Peak Detected',
      description: 'Your academic performance peaks between 9-11 AM. Schedule complex tasks during this window.',
      impact: 'high',
      icon: 'TrendingUp',
      action: 'Optimize Schedule'
    },
    {
      type: 'warning',
      title: 'Creative Domain Declining',
      description: 'Creative activities have decreased 15% this week. Consider adding art or writing sessions.',
      impact: 'medium',
      icon: 'AlertTriangle',
      action: 'Add Creative Tasks'
    },
    {
      type: 'achievement',
      title: 'Fitness Streak Excellence',
      description: 'Your fitness consistency is 92% above average. You\'re building excellent habits!',
      impact: 'positive',
      icon: 'Award',
      action: 'Maintain Momentum'
    },
    {
      type: 'suggestion',
      title: 'Social Balance Opportunity',
      description: 'Increase social activities by 20 minutes daily to improve overall well-being scores.',
      impact: 'low',
      icon: 'Users',
      action: 'Schedule Social Time'
    }
  ];

  const recommendations = [
    {
      title: 'Morning Academic Block',
      description: 'Schedule 2-hour focused study sessions between 9-11 AM for maximum efficiency.',
      priority: 'high',
      estimatedImpact: '+15% productivity',
      timeframe: 'This week'
    },
    {
      title: 'Creative Recovery Plan',
      description: 'Add 30-minute creative sessions every other day to restore domain balance.',
      priority: 'medium',
      estimatedImpact: '+8% overall balance',
      timeframe: 'Next 2 weeks'
    },
    {
      title: 'Maintenance Optimization',
      description: 'Batch maintenance tasks on Sundays to free up weekday focus time.',
      priority: 'low',
      estimatedImpact: '+5% time efficiency',
      timeframe: 'Next month'
    }
  ];

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-primary';
      case 'positive': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const getImpactBg = (impact) => {
    switch (impact) {
      case 'high': return 'bg-error/10 border-error/20';
      case 'medium': return 'bg-warning/10 border-warning/20';
      case 'low': return 'bg-primary/10 border-primary/20';
      case 'positive': return 'bg-success/10 border-success/20';
      default: return 'bg-surface/20 border-primary/10';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-primary';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="glass-dark rounded-xl p-6 border border-primary/20 neon-glow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-accent to-warning rounded-lg flex items-center justify-center">
            <Icon name="Brain" size={20} className="text-background" />
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">ALFRED AI Insights</h2>
            <p className="font-body text-sm text-text-secondary">Intelligent performance analysis</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={activeTab === 'insights' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('insights')}
            className="font-caption"
          >
            Insights
          </Button>
          <Button
            variant={activeTab === 'recommendations' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('recommendations')}
            className="font-caption"
          >
            Recommendations
          </Button>
        </div>
      </div>
      {activeTab === 'insights' && (
        <div className="space-y-4">
          {insights?.map((insight, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg border transition-all duration-300 hover:scale-[1.02] ${getImpactBg(insight?.impact)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getImpactBg(insight?.impact)}`}>
                    <Icon name={insight?.icon} size={18} className={getImpactColor(insight?.impact)} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                      {insight?.title}
                    </h3>
                    <p className="font-body text-sm text-text-secondary mb-3">
                      {insight?.description}
                    </p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${insight?.impact === 'high' ? 'bg-error' : insight?.impact === 'medium' ? 'bg-warning' : insight?.impact === 'positive' ? 'bg-success' : 'bg-primary'}`} />
                        <span className={`font-caption text-xs ${getImpactColor(insight?.impact)} capitalize`}>
                          {insight?.impact} Impact
                        </span>
                      </div>
                      <span className="font-caption text-xs text-text-secondary">
                        2 hours ago
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="font-caption whitespace-nowrap"
                >
                  {insight?.action}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab === 'recommendations' && (
        <div className="space-y-4">
          {recommendations?.map((rec, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg bg-surface/20 border border-primary/10 hover:bg-surface/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                    {rec?.title}
                  </h3>
                  <p className="font-body text-sm text-text-secondary">
                    {rec?.description}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${rec?.priority === 'high' ? 'bg-error' : rec?.priority === 'medium' ? 'bg-warning' : 'bg-primary'}`} />
                  <span className={`font-caption text-xs ${getPriorityColor(rec?.priority)} capitalize`}>
                    {rec?.priority}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Icon name="Target" size={14} className="text-success" />
                    <span className="font-caption text-sm text-success">{rec?.estimatedImpact}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={14} className="text-text-secondary" />
                    <span className="font-caption text-sm text-text-secondary">{rec?.timeframe}</span>
                  </div>
                </div>
                <Button
                  variant="default"
                  size="sm"
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={14}
                  className="font-caption"
                >
                  Apply
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Sparkles" size={16} className="text-accent" />
            <span className="font-caption text-sm font-medium text-accent">AI Analysis Complete</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="RefreshCw"
            iconPosition="left"
            iconSize={14}
            className="font-caption text-text-secondary hover:text-foreground"
          >
            Refresh Analysis
          </Button>
        </div>
        <p className="font-body text-sm text-text-secondary mt-2">
          Last updated: September 14, 2024 at 7:18 PM • Next analysis in 6 hours
        </p>
      </div>
    </div>
  );
};

export default AIInsights;