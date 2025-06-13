import React from 'react';
import { X } from 'lucide-react';
import { useResume } from '../../contexts/ResumeContext';
import { toast } from 'react-hot-toast';

interface TemplateSelectorProps {
  onClose: () => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onClose }) => {
  const { resumeData, setTemplate } = useResume();

  const templates = [
    { id: 'modern', name: 'Modern Professional', color: 'blue' },
    { id: 'classic', name: 'Classic Executive', color: 'gray' },
    { id: 'creative', name: 'Creative Portfolio', color: 'purple' },
  ];

  const handleSelectTemplate = (templateId: string) => {
    setTemplate(templateId);
    toast.success(`Template "${templates.find(t => t.id === templateId)?.name}" selected!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Choose Template
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            {templates.map((template) => {
              const isSelected = resumeData.template === template.id;
              
              return (
                <div
                  key={template.id}
                  className={`border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-blue-400'
                  }`}
                  onClick={() => handleSelectTemplate(template.id)}
                >
                  <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-700 rounded-t-lg relative overflow-hidden">
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

                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-center">
                      {template.name}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;