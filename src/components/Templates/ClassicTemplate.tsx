import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Calendar, ExternalLink, Github } from 'lucide-react';
import { ResumeData } from '../../contexts/ResumeContext';

interface ClassicTemplateProps {
  data: ResumeData;
}

const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects } = data;

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="w-full h-full p-8 text-gray-800 bg-white" style={{ fontFamily: 'serif', fontSize: '12px', lineHeight: '1.4' }}>
      {/* Header */}
      <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2" style={{ fontSize: '28px' }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        
        <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-600">
          {personalInfo.email && (
            <div className="flex items-center">
              <Mail className="h-3 w-3 mr-1" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="h-3 w-3 mr-1" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center">
              <Globe className="h-3 w-3 mr-1" />
              <span>{personalInfo.website}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center">
              <Linkedin className="h-3 w-3 mr-1" />
              <span>LinkedIn</span>
            </div>
          )}
        </div>

        {personalInfo.summary && (
          <div className="mt-3">
            <h2 className="text-base font-semibold text-gray-800 mb-2" style={{ fontSize: '14px' }}>
              Professional Summary
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed max-w-4xl mx-auto">
              {personalInfo.summary}
            </p>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1" style={{ fontSize: '16px' }}>
              Professional Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-base font-semibold text-gray-800" style={{ fontSize: '14px' }}>
                        {exp.position}
                      </h3>
                      <p className="text-gray-700 font-medium text-sm">
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <Calendar className="h-3 w-3 mr-1" />
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-600 mt-1 text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1" style={{ fontSize: '16px' }}>
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-gray-700 text-sm">
                      {edu.institution}
                    </p>
                  </div>
                  <div className="text-right text-xs text-gray-600">
                    <div>{edu.startDate} - {edu.endDate}</div>
                    {edu.gpa && <div>GPA: {edu.gpa}</div>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {Object.keys(groupedSkills).length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1" style={{ fontSize: '16px' }}>
              Skills
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                <div key={category}>
                  <h3 className="font-semibold text-gray-700 mb-2 capitalize text-sm">
                    {category}
                  </h3>
                  <div className="text-xs text-gray-600">
                    {categorySkills.map((skill, index) => (
                      <span key={skill.id}>
                        {skill.name} ({skill.level})
                        {index < categorySkills.length - 1 && ', '}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1" style={{ fontSize: '16px' }}>
              Projects
            </h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id}>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-semibold text-gray-800" style={{ fontSize: '14px' }}>
                      {project.name}
                    </h3>
                    <div className="flex space-x-1">
                      {project.link && (
                        <ExternalLink className="h-3 w-3 text-gray-600" />
                      )}
                      {project.github && (
                        <Github className="h-3 w-3 text-gray-600" />
                      )}
                    </div>
                  </div>
                  {project.description && (
                    <p className="text-gray-600 mb-2 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  )}
                  {project.technologies.length > 0 && (
                    <p className="text-xs text-gray-500">
                      <strong>Technologies:</strong> {project.technologies.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ClassicTemplate;