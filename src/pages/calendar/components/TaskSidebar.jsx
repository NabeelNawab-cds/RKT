import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TaskSidebar = ({ 
  selectedDate, 
  tasks, 
  streakData, 
  dailyMetrics, 
  onTaskCreate, 
  onTaskEdit 
}) => {
  const formatDate = (date) => {
    if (!date) return 'Select a date';
    return date?.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTasksForSelectedDate = () => {
    if (!selectedDate) return [];
    const dateStr = selectedDate?.toDateString();
    return tasks?.filter(task => 
      new Date(task.dueDate)?.toDateString() === dateStr
    );
  };

  const getDomainIcon = (domain) => {
    const icons = {
      academic: 'BookOpen',
      fitness: 'Dumbbell',
      creative: 'Palette',
      social: 'Users',
      maintenance: 'Wrench'
    };
    return icons?.[domain] || 'Circle';
  };

  const getDomainColor = (domain) => {
    const colors = {
      academic: 'text-primary',
      fitness: 'text-success',
      creative: 'text-accent',
      social: 'text-warning',
      maintenance: 'text-error'
    };
    return colors?.[domain] || 'text-foreground';
  };

  const selectedTasks = getTasksForSelectedDate();
  const completedTasks = selectedTasks?.filter(task => task?.completed);
  const totalEU = selectedTasks?.reduce((sum, task) => sum + task?.effortUnits, 0);
  const completedEU = completedTasks?.reduce((sum, task) => sum + task?.effortUnits, 0);

  return (
    <div className="w-80 glass-dark rounded-xl border border-primary/20 p-6 space-y-6">
      {/* Date Header */}
      <div className="text-center">
        <h3 className="font-heading text-lg font-bold text-foreground mb-2">
          {formatDate(selectedDate)}
        </h3>
        {selectedDate && (
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Icon name="Target" size={14} className="text-primary" />
              <span className="text-text-secondary">
                {totalEU} EU Target
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="CheckCircle2" size={14} className="text-success" />
              <span className="text-text-secondary">
                {completedEU} EU Done
              </span>
            </div>
          </div>
        )}
      </div>
      {/* Progress Ring */}
      {selectedDate && (
        <div className="flex justify-center">
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 progress-ring" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="var(--color-surface)"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="8"
                strokeLinecap="round"
                className="progress-ring-circle"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - (totalEU > 0 ? completedEU / totalEU : 0))}`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-heading text-lg font-bold text-primary">
                {totalEU > 0 ? Math.round((completedEU / totalEU) * 100) : 0}%
              </span>
            </div>
          </div>
        </div>
      )}
      {/* Streak Counter */}
      <div className="glass rounded-lg p-4 text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Icon name="Flame" size={20} className="text-accent" />
          <span className="font-heading text-xl font-bold text-foreground">
            {streakData?.current}
          </span>
        </div>
        <p className="text-sm text-text-secondary">Day Streak</p>
        <div className="flex items-center justify-between mt-3 text-xs">
          <span className="text-text-secondary">
            Best: {streakData?.best}
          </span>
          <span className="text-text-secondary">
            This Week: {streakData?.thisWeek}
          </span>
        </div>
      </div>
      {/* Tasks List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-heading font-semibold text-foreground">
            Tasks ({selectedTasks?.length})
          </h4>
          {selectedDate && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onTaskCreate(selectedDate)}
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
              className="text-primary hover:text-primary-foreground hover:bg-primary/20"
            >
              Add
            </Button>
          )}
        </div>

        {selectedTasks?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Calendar" size={48} className="text-text-secondary mx-auto mb-3" />
            <p className="text-text-secondary">
              {selectedDate ? 'No tasks for this date' : 'Select a date to view tasks'}
            </p>
          </div>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {selectedTasks?.map((task) => (
              <div
                key={task?.id}
                onClick={() => onTaskEdit(task)}
                className={`
                  p-3 rounded-lg border cursor-pointer transition-all duration-200
                  hover:scale-105 hover:shadow-md
                  ${task?.completed 
                    ? 'bg-success/10 border-success/30' :'bg-surface/30 border-surface/50 hover:border-primary/50'
                  }
                `}
              >
                <div className="flex items-start space-x-3">
                  <Icon 
                    name={task?.completed ? "CheckCircle2" : "Circle"} 
                    size={16} 
                    className={task?.completed ? "text-success" : "text-text-secondary"}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon 
                        name={getDomainIcon(task?.domain)} 
                        size={14} 
                        className={getDomainColor(task?.domain)}
                      />
                      <span className={`
                        text-sm font-medium truncate
                        ${task?.completed ? 'line-through text-text-secondary' : 'text-foreground'}
                      `}>
                        {task?.title}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-text-secondary">
                        {task?.effortUnits} EU
                      </span>
                      <span className={`
                        px-2 py-1 rounded text-xs font-medium
                        ${task?.priority === 'high' ? 'bg-error/20 text-error' :
                          task?.priority === 'medium'? 'bg-warning/20 text-warning' : 'bg-surface/20 text-text-secondary'
                        }
                      `}>
                        {task?.priority}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Daily Metrics */}
      {selectedDate && dailyMetrics && (
        <div className="glass rounded-lg p-4">
          <h4 className="font-heading font-semibold text-foreground mb-3">
            Daily Metrics
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center">
              <div className="text-lg font-bold text-primary">
                {dailyMetrics?.xpGained}
              </div>
              <div className="text-xs text-text-secondary">XP Gained</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-accent">
                {dailyMetrics?.tasksCompleted}
              </div>
              <div className="text-xs text-text-secondary">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-success">
                {dailyMetrics?.efficiency}%
              </div>
              <div className="text-xs text-text-secondary">Efficiency</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-warning">
                {dailyMetrics?.focusTime}h
              </div>
              <div className="text-xs text-text-secondary">Focus Time</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskSidebar;