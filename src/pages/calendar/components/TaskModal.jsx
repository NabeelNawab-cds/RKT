import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TaskModal = ({ 
  isOpen, 
  onClose, 
  task, 
  onSave, 
  onDelete, 
  selectedDate 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    domain: 'academic',
    priority: 'medium',
    effortUnits: 1,
    dueDate: '',
    dueTime: '',
    completed: false
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      const dueDate = new Date(task.dueDate);
      setFormData({
        ...task,
        dueDate: dueDate?.toISOString()?.split('T')?.[0],
        dueTime: dueDate?.toTimeString()?.slice(0, 5)
      });
    } else if (selectedDate) {
      setFormData(prev => ({
        ...prev,
        dueDate: selectedDate?.toISOString()?.split('T')?.[0],
        dueTime: '09:00'
      }));
    }
  }, [task, selectedDate]);

  const domains = [
    { value: 'academic', label: 'Academic', icon: 'BookOpen', multiplier: 1.0 },
    { value: 'fitness', label: 'Fitness', icon: 'Dumbbell', multiplier: 2.5 },
    { value: 'creative', label: 'Creative', icon: 'Palette', multiplier: 0.8 },
    { value: 'social', label: 'Social', icon: 'Users', multiplier: 1.2 },
    { value: 'maintenance', label: 'Maintenance', icon: 'Wrench', multiplier: 0.6 }
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: 'text-text-secondary' },
    { value: 'medium', label: 'Medium', color: 'text-warning' },
    { value: 'high', label: 'High', color: 'text-error' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.title?.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData?.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    
    if (formData?.effortUnits < 0.1 || formData?.effortUnits > 10) {
      newErrors.effortUnits = 'Effort units must be between 0.1 and 10';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const dueDateTime = new Date(`${formData.dueDate}T${formData.dueTime}`);
    const taskData = {
      ...formData,
      dueDate: dueDateTime?.toISOString(),
      id: task?.id || Date.now()?.toString()
    };

    onSave(taskData);
    onClose();
  };

  const handleDelete = () => {
    if (task && onDelete) {
      onDelete(task?.id);
      onClose();
    }
  };

  const selectedDomain = domains?.find(d => d?.value === formData?.domain);
  const calculatedXP = Math.round(formData?.effortUnits * (selectedDomain?.multiplier || 1) * 10);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 glass-dark rounded-xl border border-primary/20 p-6 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-heading text-xl font-bold text-foreground">
            {task ? 'Edit Task' : 'Create Task'}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-text-secondary hover:text-foreground"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Title */}
          <Input
            label="Task Title"
            type="text"
            value={formData?.title}
            onChange={(e) => handleInputChange('title', e?.target?.value)}
            placeholder="Enter task title"
            error={errors?.title}
            required
          />

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <textarea
              value={formData?.description}
              onChange={(e) => handleInputChange('description', e?.target?.value)}
              placeholder="Task description (optional)"
              rows={3}
              className="w-full px-3 py-2 bg-surface/30 border border-surface/50 rounded-lg text-foreground placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </div>

          {/* Domain Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Domain
            </label>
            <div className="grid grid-cols-2 gap-2">
              {domains?.map((domain) => (
                <button
                  key={domain?.value}
                  type="button"
                  onClick={() => handleInputChange('domain', domain?.value)}
                  className={`
                    p-3 rounded-lg border transition-all duration-200
                    flex items-center space-x-2
                    ${formData?.domain === domain?.value
                      ? 'bg-primary/20 border-primary text-primary' :'bg-surface/20 border-surface/50 text-text-secondary hover:border-primary/50'
                    }
                  `}
                >
                  <Icon name={domain?.icon} size={16} />
                  <span className="text-sm font-medium">{domain?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Priority and Effort Units */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Priority
              </label>
              <select
                value={formData?.priority}
                onChange={(e) => handleInputChange('priority', e?.target?.value)}
                className="w-full px-3 py-2 bg-surface/30 border border-surface/50 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {priorities?.map((priority) => (
                  <option key={priority?.value} value={priority?.value}>
                    {priority?.label}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Effort Units"
              type="number"
              value={formData?.effortUnits}
              onChange={(e) => handleInputChange('effortUnits', parseFloat(e?.target?.value) || 0)}
              min="0.1"
              max="10"
              step="0.1"
              error={errors?.effortUnits}
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Due Date"
              type="date"
              value={formData?.dueDate}
              onChange={(e) => handleInputChange('dueDate', e?.target?.value)}
              error={errors?.dueDate}
              required
            />

            <Input
              label="Due Time"
              type="time"
              value={formData?.dueTime}
              onChange={(e) => handleInputChange('dueTime', e?.target?.value)}
            />
          </div>

          {/* XP Preview */}
          <div className="glass rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Expected XP:</span>
              <span className="font-heading font-bold text-accent">
                {calculatedXP} XP
              </span>
            </div>
            <div className="text-xs text-text-secondary mt-1">
              {formData?.effortUnits} EU × {selectedDomain?.multiplier} multiplier × 10
            </div>
          </div>

          {/* Completion Status */}
          {task && (
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="completed"
                checked={formData?.completed}
                onChange={(e) => handleInputChange('completed', e?.target?.checked)}
                className="w-4 h-4 text-primary bg-surface/30 border-surface/50 rounded focus:ring-primary focus:ring-2"
              />
              <label htmlFor="completed" className="text-sm text-foreground">
                Mark as completed
              </label>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-primary/20">
          {task && onDelete ? (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              iconName="Trash2"
              iconPosition="left"
              iconSize={16}
            >
              Delete
            </Button>
          ) : (
            <div />
          )}

          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleSave}
              iconName="Save"
              iconPosition="left"
              iconSize={16}
            >
              {task ? 'Update' : 'Create'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;