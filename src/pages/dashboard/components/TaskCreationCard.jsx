import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TaskCreationCard = ({ onTaskCreate, className = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [taskData, setTaskData] = useState({
    title: '',
    domain: 'academic',
    priority: 'medium',
    estimatedTime: ''
  });

  const domains = [
    { value: 'academic', label: 'Academic', icon: 'BookOpen', multiplier: 1.0 },
    { value: 'fitness', label: 'Fitness', icon: 'Dumbbell', multiplier: 2.5 },
    { value: 'creative', label: 'Creative', icon: 'Palette', multiplier: 0.8 },
    { value: 'social', label: 'Social', icon: 'Users', multiplier: 1.2 },
    { value: 'maintenance', label: 'Maintenance', icon: 'Settings', multiplier: 0.6 }
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: 'text-success' },
    { value: 'medium', label: 'Medium', color: 'text-warning' },
    { value: 'high', label: 'High', color: 'text-error' }
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (taskData?.title?.trim()) {
      const selectedDomain = domains?.find(d => d?.value === taskData?.domain);
      const newTask = {
        id: Date.now(),
        ...taskData,
        createdAt: new Date(),
        status: 'pending',
        domainMultiplier: selectedDomain?.multiplier
      };
      onTaskCreate(newTask);
      setTaskData({ title: '', domain: 'academic', priority: 'medium', estimatedTime: '' });
      setIsExpanded(false);
    }
  };

  return (
    <div className={`glass-dark rounded-xl border border-primary/30 overflow-hidden animate-fade-in ${className}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
              <Icon name="Plus" size={20} className="text-primary" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-foreground">Quick Task</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-text-secondary hover:text-foreground"
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="What needs to be done?"
            value={taskData?.title}
            onChange={(e) => setTaskData({ ...taskData, title: e?.target?.value })}
            className="bg-surface/50 border-primary/20 focus:border-primary"
          />

          {isExpanded && (
            <div className="space-y-4 animate-slide-up">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Domain</label>
                  <div className="grid grid-cols-2 gap-2">
                    {domains?.map((domain) => (
                      <button
                        key={domain?.value}
                        type="button"
                        onClick={() => setTaskData({ ...taskData, domain: domain?.value })}
                        className={`p-3 rounded-lg border transition-all duration-200 flex items-center space-x-2 ${
                          taskData?.domain === domain?.value
                            ? 'border-primary bg-primary/10 text-primary' :'border-surface bg-surface/30 text-text-secondary hover:border-primary/50'
                        }`}
                      >
                        <Icon name={domain?.icon} size={16} />
                        <span className="text-xs font-medium">{domain?.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Priority</label>
                  <div className="space-y-2">
                    {priorities?.map((priority) => (
                      <button
                        key={priority?.value}
                        type="button"
                        onClick={() => setTaskData({ ...taskData, priority: priority?.value })}
                        className={`w-full p-2 rounded-lg border transition-all duration-200 flex items-center justify-between ${
                          taskData?.priority === priority?.value
                            ? 'border-primary bg-primary/10 text-primary' :'border-surface bg-surface/30 text-text-secondary hover:border-primary/50'
                        }`}
                      >
                        <span className="text-sm font-medium">{priority?.label}</span>
                        <div className={`w-2 h-2 rounded-full ${priority?.color?.replace('text-', 'bg-')}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <Input
                type="number"
                placeholder="Estimated time (minutes)"
                value={taskData?.estimatedTime}
                onChange={(e) => setTaskData({ ...taskData, estimatedTime: e?.target?.value })}
                className="bg-surface/50 border-primary/20 focus:border-primary"
              />
            </div>
          )}

          <Button
            type="submit"
            variant="default"
            fullWidth
            iconName="Plus"
            iconPosition="left"
            className="mt-4"
            disabled={!taskData?.title?.trim()}
          >
            Create Task
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TaskCreationCard;