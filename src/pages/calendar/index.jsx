import React, { useState, useEffect } from 'react';
import CalendarHeader from './components/CalendarHeader';
import CalendarGrid from './components/CalendarGrid';
import TaskSidebar from './components/TaskSidebar';
import TaskModal from './components/TaskModal';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data initialization with current dates
  useEffect(() => {
    const today = new Date();
    const mockTasks = [
      {
        id: '1',
        title: 'Complete React Assignment',
        description: 'Finish the calendar component implementation with drag-and-drop functionality',
        domain: 'academic',
        priority: 'high',
        effortUnits: 3.5,
        dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 10, 0)?.toISOString(),
        completed: false,
        xpValue: 35
      },
      {
        id: '2',
        title: 'Morning Workout',
        description: 'Cardio and strength training session',
        domain: 'fitness',
        priority: 'medium',
        effortUnits: 2.0,
        dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 7, 0)?.toISOString(),
        completed: true,
        xpValue: 50
      },
      {
        id: '3',
        title: 'Design Portfolio Review',
        description: 'Review and update portfolio with latest projects',
        domain: 'creative',
        priority: 'medium',
        effortUnits: 2.5,
        dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 14, 0)?.toISOString(),
        completed: false,
        xpValue: 20
      },
      {
        id: '4',
        title: 'Team Meeting',
        description: 'Weekly sync with project team',
        domain: 'social',
        priority: 'high',
        effortUnits: 1.5,
        dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3, 15, 30)?.toISOString(),
        completed: false,
        xpValue: 18
      },
      {
        id: '5',
        title: 'Clean Workspace',
        description: 'Organize desk and clean room',
        domain: 'maintenance',
        priority: 'low',
        effortUnits: 1.0,
        dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4, 16, 0)?.toISOString(),
        completed: false,
        xpValue: 6
      },
      {
        id: '6',
        title: 'Study Data Structures',
        description: 'Review binary trees and graph algorithms',
        domain: 'academic',
        priority: 'high',
        effortUnits: 4.0,
        dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5, 9, 0)?.toISOString(),
        completed: false,
        xpValue: 40
      },
      {
        id: '7',
        title: 'Yoga Session',
        description: 'Evening relaxation and flexibility training',
        domain: 'fitness',
        priority: 'low',
        effortUnits: 1.5,
        dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 6, 18, 0)?.toISOString(),
        completed: false,
        xpValue: 37
      }
    ];

    // Simulate loading
    setTimeout(() => {
      setTasks(mockTasks);
      setIsLoading(false);
    }, 1000);
  }, []);

  const streakData = {
    current: 12,
    best: 28,
    thisWeek: 5
  };

  const dailyMetrics = {
    xpGained: 125,
    tasksCompleted: 3,
    efficiency: 87,
    focusTime: 6.5
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTaskDrop = (task, newDate) => {
    const updatedTasks = tasks?.map(t => {
      if (t?.id === task?.id) {
        const newDateTime = new Date(newDate);
        const originalDate = new Date(task.dueDate);
        newDateTime?.setHours(originalDate?.getHours(), originalDate?.getMinutes());
        
        return {
          ...t,
          dueDate: newDateTime?.toISOString()
        };
      }
      return t;
    });
    
    setTasks(updatedTasks);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const handleTaskCreate = (date) => {
    setSelectedTask(null);
    setSelectedDate(date);
    setIsTaskModalOpen(true);
  };

  const handleTaskEdit = (task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const handleTaskSave = (taskData) => {
    if (selectedTask) {
      // Update existing task
      setTasks(prev => prev?.map(task => 
        task?.id === selectedTask?.id ? taskData : task
      ));
    } else {
      // Create new task
      setTasks(prev => [...prev, taskData]);
    }
    setIsTaskModalOpen(false);
    setSelectedTask(null);
  };

  const handleTaskDelete = (taskId) => {
    setTasks(prev => prev?.filter(task => task?.id !== taskId));
    setIsTaskModalOpen(false);
    setSelectedTask(null);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="glass-dark rounded-xl p-8 border border-primary/20">
          <div className="animate-spin w-12 h-12 border-3 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-foreground font-heading text-lg">Loading Calendar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-surface/10 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Calendar Header */}
        <CalendarHeader
          currentDate={currentDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onToday={handleToday}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
        />

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Calendar Grid */}
          <div className="flex-1 min-w-0">
            <CalendarGrid
              currentDate={currentDate}
              tasks={tasks}
              onTaskDrop={handleTaskDrop}
              onDateSelect={handleDateSelect}
              selectedDate={selectedDate}
              onTaskClick={handleTaskClick}
              viewMode={viewMode}
            />
          </div>

          {/* Task Sidebar */}
          <TaskSidebar
            selectedDate={selectedDate}
            tasks={tasks}
            streakData={streakData}
            dailyMetrics={dailyMetrics}
            onTaskCreate={handleTaskCreate}
            onTaskEdit={handleTaskEdit}
          />
        </div>

        {/* Task Modal */}
        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={() => {
            setIsTaskModalOpen(false);
            setSelectedTask(null);
          }}
          task={selectedTask}
          onSave={handleTaskSave}
          onDelete={handleTaskDelete}
          selectedDate={selectedDate}
        />
      </div>
    </div>
  );
};

export default Calendar;