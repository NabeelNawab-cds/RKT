import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';


const CalendarGrid = ({ 
  currentDate, 
  tasks, 
  onTaskDrop, 
  onDateSelect, 
  selectedDate, 
  onTaskClick,
  viewMode = 'month' 
}) => {
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverDate, setDragOverDate] = useState(null);
  const gridRef = useRef(null);

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];
    
    // Previous month's trailing days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days?.push({
        date: prevDate,
        isCurrentMonth: false,
        isToday: false
      });
    }

    // Current month's days
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days?.push({
        date,
        isCurrentMonth: true,
        isToday: date?.toDateString() === today?.toDateString()
      });
    }

    // Next month's leading days
    const remainingCells = 42 - days?.length;
    for (let day = 1; day <= remainingCells; day++) {
      const nextDate = new Date(year, month + 1, day);
      days?.push({
        date: nextDate,
        isCurrentMonth: false,
        isToday: false
      });
    }

    return days;
  };

  const getTasksForDate = (date) => {
    const dateStr = date?.toDateString();
    return tasks?.filter(task => 
      new Date(task?.dueDate)?.toDateString() === dateStr
    ) || [];
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
    e?.dataTransfer?.setData('text/plain', '');
  };

  const handleDragOver = (e, date) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverDate(date);
  };

  const handleDragLeave = () => {
    setDragOverDate(null);
  };

  const handleDrop = (e, date) => {
    e?.preventDefault();
    if (draggedTask) {
      onTaskDrop(draggedTask, date);
      setDraggedTask(null);
      setDragOverDate(null);
    }
  };

  const getDomainColor = (domain) => {
    const colors = {
      academic: 'bg-primary/20 border-primary/50 text-primary',
      fitness: 'bg-success/20 border-success/50 text-success',
      creative: 'bg-accent/20 border-accent/50 text-accent',
      social: 'bg-warning/20 border-warning/50 text-warning',
      maintenance: 'bg-error/20 border-error/50 text-error'
    };
    return colors?.[domain] || 'bg-surface/20 border-surface/50 text-foreground';
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const days = getDaysInMonth(currentDate);

  return (
    <div className="glass-dark rounded-xl border border-primary/20 overflow-hidden shadow-xl">
      {/* Calendar Header */}
      <div className="grid grid-cols-7 border-b border-primary/20 bg-surface/20">
        {weekDays?.map((day) => (
          <div
            key={day}
            className="p-4 text-center font-heading font-semibold text-text-secondary bg-gradient-to-b from-surface/30 to-surface/10"
          >
            {day}
          </div>
        ))}
      </div>
      {/* Calendar Grid */}
      <div ref={gridRef} className="grid grid-cols-7">
        {days?.map((dayInfo, index) => {
          const dayTasks = getTasksForDate(dayInfo?.date);
          const isSelected = selectedDate && 
            dayInfo?.date?.toDateString() === selectedDate?.toDateString();
          const isDragOver = dragOverDate && 
            dayInfo?.date?.toDateString() === dragOverDate?.toDateString();

          return (
            <div
              key={index}
              className={`
                min-h-32 p-3 border-r border-b border-primary/10 cursor-pointer
                transition-all duration-300 relative group
                ${dayInfo?.isCurrentMonth 
                  ? 'bg-background/50 hover:bg-surface/20' :'bg-surface/5 text-text-secondary opacity-60'
                }
                ${dayInfo?.isToday ? 'bg-primary/5 border-primary/30 ring-1 ring-primary/20' : ''}
                ${isSelected ? 'bg-primary/10 border-primary/50 ring-2 ring-primary/30' : ''}
                ${isDragOver ? 'bg-accent/10 border-accent/50 ring-2 ring-accent/30' : ''}
                hover:scale-[1.02] hover:shadow-lg hover:z-10
              `}
              onClick={() => onDateSelect(dayInfo?.date)}
              onDragOver={(e) => handleDragOver(e, dayInfo?.date)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, dayInfo?.date)}
            >
              {/* Date Number */}
              <div className={`
                text-sm font-bold mb-2 flex items-center justify-between
                ${dayInfo?.isToday ? 'text-primary font-black text-lg' : ''}
                ${dayInfo?.isCurrentMonth ? 'text-foreground' : 'text-text-secondary'}
              `}>
                <span>{dayInfo?.date?.getDate()}</span>
                {dayTasks?.length > 0 && (
                  <div className="flex items-center space-x-1">
                    <div className={`
                      w-2 h-2 rounded-full 
                      ${dayTasks?.some(t => !t?.completed) ? 'bg-warning animate-pulse' : 'bg-success'}
                    `} />
                    <span className="text-xs text-text-secondary font-medium">
                      {dayTasks?.length}
                    </span>
                  </div>
                )}
              </div>
              {/* Tasks */}
              <div className="space-y-1">
                {dayTasks?.slice(0, 3)?.map((task, taskIndex) => (
                  <div
                    key={task?.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                    onClick={(e) => {
                      e?.stopPropagation();
                      onTaskClick(task);
                    }}
                    className={`
                      text-xs px-2 py-1.5 rounded-md border cursor-move
                      transition-all duration-200 hover:scale-105 hover:shadow-md
                      ${getDomainColor(task?.domain)}
                      ${task?.completed ? 'opacity-60 line-through' : ''}
                      group-hover:opacity-100
                    `}
                    style={{ animationDelay: `${taskIndex * 50}ms` }}
                  >
                    <div className="flex items-center space-x-1.5">
                      <Icon 
                        name={task?.completed ? "CheckCircle2" : "Circle"} 
                        size={10} 
                        className="flex-shrink-0"
                      />
                      <span className="truncate font-medium text-xs leading-tight">
                        {task?.title}
                      </span>
                    </div>
                  </div>
                ))}
                
                {dayTasks?.length > 3 && (
                  <div className="text-xs text-text-secondary px-2 py-1 bg-surface/20 rounded-md border border-surface/30">
                    <Icon name="MoreHorizontal" size={12} className="inline mr-1" />
                    +{dayTasks?.length - 3} more
                  </div>
                )}
              </div>
              {/* Today Indicator */}
              {dayInfo?.isToday && (
                <div className="absolute top-2 right-2 w-3 h-3 bg-primary rounded-full neon-glow animate-pulse" />
              )}

              {/* Selection Indicator */}
              {isSelected && (
                <div className="absolute inset-0 border-2 border-primary rounded-lg pointer-events-none">
                  <div className="absolute top-1 left-1 w-2 h-2 bg-primary rounded-full neon-glow" />
                </div>
              )}

              {/* Drag Over Indicator */}
              {isDragOver && (
                <div className="absolute inset-0 border-2 border-accent border-dashed rounded-lg pointer-events-none bg-accent/5">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon name="Plus" size={24} className="text-accent opacity-50" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;