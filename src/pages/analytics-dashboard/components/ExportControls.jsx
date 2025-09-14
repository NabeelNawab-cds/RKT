import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ExportControls = () => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [dateRange, setDateRange] = useState('last-30-days');
  const [selectedDomains, setSelectedDomains] = useState(['all']);
  const [isExporting, setIsExporting] = useState(false);

  const formatOptions = [
    { value: 'pdf', label: 'PDF Report' },
    { value: 'csv', label: 'CSV Data' },
    { value: 'json', label: 'JSON Export' },
    { value: 'xlsx', label: 'Excel Spreadsheet' }
  ];

  const dateRangeOptions = [
    { value: 'last-7-days', label: 'Last 7 Days' },
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'last-90-days', label: 'Last 90 Days' },
    { value: 'this-year', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const domainOptions = [
    { value: 'all', label: 'All Domains' },
    { value: 'academic', label: 'Academic' },
    { value: 'fitness', label: 'Fitness' },
    { value: 'creative', label: 'Creative' },
    { value: 'social', label: 'Social' },
    { value: 'maintenance', label: 'Maintenance' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create mock download
    const filename = `batcave-analytics-${dateRange}-${Date.now()}.${exportFormat}`;
    console.log(`Exporting ${filename} with domains:`, selectedDomains);
    
    setIsExporting(false);
  };

  const quickExports = [
    {
      name: 'Weekly Summary',
      description: 'Last 7 days performance overview',
      format: 'PDF',
      icon: 'FileText',
      action: () => console.log('Exporting weekly summary')
    },
    {
      name: 'Domain Analysis',
      description: 'Cross-domain performance breakdown',
      format: 'Excel',
      icon: 'BarChart3',
      action: () => console.log('Exporting domain analysis')
    },
    {
      name: 'Raw Data',
      description: 'Complete dataset for external analysis',
      format: 'CSV',
      icon: 'Database',
      action: () => console.log('Exporting raw data')
    }
  ];

  return (
    <div className="glass-dark rounded-xl p-6 border border-primary/20 neon-glow">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
          <Icon name="Download" size={20} className="text-background" />
        </div>
        <div>
          <h2 className="font-heading text-xl font-bold text-foreground">Export Controls</h2>
          <p className="font-body text-sm text-text-secondary">Generate reports and export data</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Select
          label="Export Format"
          options={formatOptions}
          value={exportFormat}
          onChange={setExportFormat}
          className="mb-0"
        />
        
        <Select
          label="Date Range"
          options={dateRangeOptions}
          value={dateRange}
          onChange={setDateRange}
          className="mb-0"
        />
        
        <Select
          label="Domains"
          options={domainOptions}
          value={selectedDomains}
          onChange={setSelectedDomains}
          multiple
          className="mb-0"
        />
      </div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-text-secondary" />
            <span className="font-caption text-sm text-text-secondary">
              {dateRange === 'last-7-days' ? '7 days' : 
               dateRange === 'last-30-days' ? '30 days' : 
               dateRange === 'last-90-days' ? '90 days' : 
               dateRange === 'this-year' ? 'This year' : 'Custom range'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Layers" size={16} className="text-text-secondary" />
            <span className="font-caption text-sm text-text-secondary">
              {selectedDomains?.includes('all') ? 'All domains' : `${selectedDomains?.length} domains`}
            </span>
          </div>
        </div>

        <Button
          variant="default"
          onClick={handleExport}
          loading={isExporting}
          iconName="Download"
          iconPosition="left"
          iconSize={16}
          className="font-caption"
        >
          {isExporting ? 'Generating...' : 'Export Report'}
        </Button>
      </div>
      <div className="border-t border-primary/20 pt-6">
        <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Quick Exports</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickExports?.map((export_, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg bg-surface/20 border border-primary/10 hover:bg-surface/30 transition-all duration-300 group cursor-pointer"
              onClick={export_?.action}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300">
                  <Icon name={export_?.icon} size={18} className="text-primary" />
                </div>
                <span className="font-caption text-xs px-2 py-1 rounded bg-accent/20 text-accent">
                  {export_?.format}
                </span>
              </div>
              
              <h4 className="font-heading text-base font-semibold text-foreground mb-1">
                {export_?.name}
              </h4>
              <p className="font-body text-sm text-text-secondary mb-3">
                {export_?.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="font-caption text-xs text-text-secondary">Ready to export</span>
                <Icon name="ArrowRight" size={14} className="text-primary group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-success/10 to-primary/10 border border-success/20">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="font-caption text-sm font-medium text-success">Data Privacy</span>
        </div>
        <p className="font-body text-sm text-text-secondary">
          All exports are processed locally. Your data remains private and secure.
        </p>
      </div>
    </div>
  );
};

export default ExportControls;