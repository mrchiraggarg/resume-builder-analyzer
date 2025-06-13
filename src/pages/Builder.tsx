import React, { useState } from 'react';
import { Download, Eye, Settings, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';
import PersonalInfoForm from '../components/Builder/PersonalInfoForm';
import ExperienceForm from '../components/Builder/ExperienceForm';
import EducationForm from '../components/Builder/EducationForm';
import SkillsForm from '../components/Builder/SkillsForm';
import ProjectsForm from '../components/Builder/ProjectsForm';
import ResumePreview from '../components/Builder/ResumePreview';
import TemplateSelector from '../components/Builder/TemplateSelector';
import { exportToPDF } from '../utils/pdfExport';
import { useResume } from '../contexts/ResumeContext';

const Builder: React.FC = () => {
  const [activeSection, setActiveSection] = useState('personal');
  const [showPreview, setShowPreview] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const { resumeData } = useResume();

  const sections = [
    { id: 'personal', label: 'Personal Info', component: PersonalInfoForm },
    { id: 'experience', label: 'Experience', component: ExperienceForm },
    { id: 'education', label: 'Education', component: EducationForm },
    { id: 'skills', label: 'Skills', component: SkillsForm },
    { id: 'projects', label: 'Projects', component: ProjectsForm },
  ];

  const handleExportPDF = async () => {
    try {
      await exportToPDF(resumeData);
      toast.success('Resume exported successfully!');
    } catch (error) {
      toast.error('Failed to export resume. Please try again.');
    }
  };

  const handleSave = () => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    toast.success('Resume saved successfully!');
  };

  const ActiveComponent = sections.find(s => s.id === activeSection)?.component || PersonalInfoForm;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Resume Builder
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Create your professional resume step by step
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowTemplateSelector(true)}
                className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
              >
                <Settings className="h-4 w-4 mr-2" />
                Templates
              </button>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Eye className="h-4 w-4 mr-2" />
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </button>
              <button
                onClick={handleSave}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </button>
              <button
                onClick={handleExportPDF}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-200"
              >
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Section Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Sections
              </h2>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className={`${showPreview ? 'lg:col-span-1' : 'lg:col-span-2'}`}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <ActiveComponent />
            </div>
          </div>

          {/* Preview Panel */}
          {showPreview && (
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sticky top-8">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Preview
                </h2>
                <div className="transform scale-75 origin-top-left w-[133%] h-96 overflow-hidden border border-gray-200 dark:border-gray-600 rounded">
                  <ResumePreview />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Template Selector Modal */}
      {showTemplateSelector && (
        <TemplateSelector onClose={() => setShowTemplateSelector(false)} />
      )}
    </div>
  );
};

export default Builder;