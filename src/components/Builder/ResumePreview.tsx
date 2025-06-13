import React from 'react';
import { useResume } from '../../contexts/ResumeContext';
import ModernTemplate from '../Templates/ModernTemplate';
import ClassicTemplate from '../Templates/ClassicTemplate';
import CreativeTemplate from '../Templates/CreativeTemplate';

const ResumePreview: React.FC = () => {
  const { resumeData } = useResume();

  const renderTemplate = () => {
    switch (resumeData.template) {
      case 'classic':
        return <ClassicTemplate data={resumeData} />;
      case 'creative':
        return <CreativeTemplate data={resumeData} />;
      case 'modern':
      default:
        return <ModernTemplate data={resumeData} />;
    }
  };

  return (
    <div 
      className="bg-white shadow-lg min-h-[297mm] w-[210mm] mx-auto" 
      id="resume-preview"
      style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '14px',
        lineHeight: '1.4',
        color: '#000000',
        backgroundColor: '#ffffff'
      }}
    >
      {renderTemplate()}
    </div>
  );
};

export default ResumePreview;