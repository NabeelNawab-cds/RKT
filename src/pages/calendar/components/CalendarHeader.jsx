import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarHeader = ({ 
  currentDate, 
  onPrevMonth, 
  onNextMonth, 
  onToday, 
  viewMode, 
  onViewModeChange 
}) => {
  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const viewModes = [
    { value: 'month', label: 'Month', icon: 'Calendar' },
    { value: 'week', label: 'Week', icon: 'CalendarDays' },
    { value: 'day', label: 'Day', icon: 'CalendarCheck' }
  ];

  return (
    <div className="flex items-center justify-between mb-8 p-6 glass-dark rounded-xl border border-primary/20">
      {/* Left Section - Navigation */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrevMonth}
            className="text-text-secondary hover:text-foreground hover:bg-surface/50 transition-all duration-200 hover:scale-110"
          >
            <Icon name="ChevronLeft" size={22} />
          </Button>
          
          <h2 className="font-heading text-3xl font-bold text-foreground min-w-64 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {formatDate(currentDate)}
          </h2>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onNextMonth}
            className="text-text-secondary hover:text-foreground hover:bg-surface/50 transition-all duration-200 hover:scale-110"
          >
            <Icon name="ChevronRight" size={22} />
          </Button>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onToday}
          className="font-caption font-medium bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 hover:border-primary/50 transition-all duration-200"
        >
          <Icon name="Calendar" size={16} className="mr-2" />
          Today
        </Button>
      </div>

      {/* Right Section - View Controls */}
      <div className="flex items-center space-x-4">
        {/* View Mode Selector */}
        <div className="flex items-center bg-surface/30 rounded-lg p-1 border border-primary/20">
          {viewModes?.map((mode) => (
            <Button
              key={mode?.value}
              variant={viewMode === mode?.value ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange(mode?.value)}
              className={`
                font-caption font-medium transition-all duration-200
                ${viewMode === mode?.value 
                  ? 'bg-primary text-primary-foreground shadow-glow scale-105' 
                  : 'text-text-secondary hover:text-foreground hover:bg-surface/50'
                }
              `}
            >
              <Icon name={mode?.icon} size={16} className="mr-2" />
              {mode?.label}
            </Button>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-text-secondary hover:text-foreground hover:bg-surface/50 transition-all duration-200 hover:scale-110"
            title="Export Calendar"
          >
            <Icon name="Download" size={18} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="text-text-secondary hover:text-foreground hover:bg-surface/50 transition-all duration-200 hover:scale-110"
            title="Calendar Settings"
          >
            <Icon name="Settings" size={18} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-accent hover:text-accent-foreground hover:bg-accent/20 transition-all duration-200 hover:scale-110"
            title="Refresh Calendar"
          >
            <Icon name="RefreshCw" size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;