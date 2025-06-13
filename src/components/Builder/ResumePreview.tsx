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
    <div className="bg-white shadow-lg" id="resume-preview">
      {renderTemplate()}
    </div>
  );
};

export default ResumePreview;