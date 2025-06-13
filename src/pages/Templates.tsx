import React from 'react';
import { useResume } from '../contexts/ResumeContext';
import { toast } from 'react-hot-toast';

const Templates: React.FC = () => {
  const { resumeData, setTemplate } = useResume();

  const templates = [
    {
      id: 'modern',
      name: 'Modern Professional',
      description: 'Clean, contemporary design perfect for tech and creative roles',
      preview: '/api/placeholder/300/400',
      color: 'blue',
    },
    {
      id: 'classic',
      name: 'Classic Executive',
      description: 'Traditional layout ideal for corporate and finance positions',
      preview: '/api/placeholder/300/400',
      color: 'gray',
    },
    {
      id: 'creative',
      name: 'Creative Portfolio',
      description: 'Bold design for designers, marketers, and creative professionals',
      preview: '/api/placeholder/300/400',
      color: 'purple',
    },
    {
      id: 'minimal',
      name: 'Minimal Clean',
      description: 'Simple, elegant layout that highlights your content',
      preview: '/api/placeholder/300/400',
      color: 'green',
    },
    {
      id: 'academic',
      name: 'Academic Research',
      description: 'Comprehensive format for researchers and academics',
      preview: '/api/placeholder/300/400',
      color: 'indigo',
    },
    {
      id: 'startup',
      name: 'Startup Dynamic',
      description: 'Fresh, innovative design for startup and entrepreneurial roles',
      preview: '/api/placeholder/300/400',
      color: 'orange',
    },
  ];

  const handleSelectTemplate = (templateId: string) => {
    setTemplate(templateId);
    toast.success(`Template "${templates.find(t => t.id === templateId)?.name}" selected!`);
  };

  const getColorClasses = (color: string, isSelected: boolean) => {
    const baseClasses = 'border-2 transition-all duration-200';
    const colorMap = {
      blue: isSelected ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-blue-200 hover:border-blue-400',
      gray: isSelected ? 'border-gray-500 bg-gray-50 dark:bg-gray-700/20' : 'border-gray-200 hover:border-gray-400',
      purple: isSelected ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-purple-200 hover:border-purple-400',
      green: isSelected ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-green-200 hover:border-green-400',
      indigo: isSelected ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-indigo-200 hover:border-indigo-400',
      orange: isSelected ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' : 'border-orange-200 hover:border-orange-400',
    };
    return `${baseClasses} ${colorMap[color as keyof typeof colorMap]}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Template
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Select from our professionally designed templates, each optimized for different industries and career levels.
          </p>
        </div>

        {/* Current Template Indicator */}
        {resumeData.template && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8">
            <p className="text-blue-800 dark:text-blue-200 text-center">
              Currently using: <strong>{templates.find(t => t.id === resumeData.template)?.name}</strong>
            </p>
          </div>
        )}

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => {
            const isSelected = resumeData.template === template.id;
            
            return (
              <div
                key={template.id}
                className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-200 ${
                  getColorClasses(template.color, isSelected)
                }`}
                onClick={() => handleSelectTemplate(template.id)}
              >
                {/* Template Preview */}
                <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-gray-500 dark:text-gray-400">
                      <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-lg mb-4 mx-auto"></div>
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-24 mx-auto"></div>
                        <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-16 mx-auto"></div>
                        <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-20 mx-auto"></div>
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="absolute top-4 right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Template Info */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {template.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {template.description}
                  </p>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectTemplate(template.id);
                    }}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                      isSelected
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {isSelected ? 'Selected' : 'Select Template'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Template Features */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            All Templates Include
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">ATS Optimized</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                All templates are designed to pass through Applicant Tracking Systems
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Mobile Responsive</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Perfect formatting across all devices and screen sizes
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Print Ready</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                High-quality PDF export with professional formatting
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;