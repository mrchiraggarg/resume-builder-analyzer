import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Calendar, ExternalLink, Github, Star } from 'lucide-react';
import { ResumeData } from '../../contexts/ResumeContext';

interface ModernTemplateProps {
  data: ResumeData;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects } = data;

  const getSkillLevelStars = (level: string) => {
    const levels = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3, 'Expert': 4 };
    return levels[level as keyof typeof levels] || 1;
  };

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="w-full h-full p-8 text-gray-800 bg-white" style={{ fontFamily: 'system-ui, sans-serif', fontSize: '12px', lineHeight: '1.4' }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 -m-8 mb-6">
        <div className="flex flex-col">
          <div className="mb-4">
            <h1 className="text-2xl font-bold mb-2" style={{ fontSize: '24px', fontWeight: 'bold' }}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            {personalInfo.summary && (
              <p className="text-blue-100 text-base leading-relaxed" style={{ fontSize: '14px' }}>
                {personalInfo.summary}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 text-sm">
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
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-800 mb-3 pb-1 border-b-2 border-blue-600" style={{ fontSize: '16px' }}>
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
                        <p className="text-blue-600 font-medium" style={{ fontSize: '13px' }}>
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

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-800 mb-3 pb-1 border-b-2 border-blue-600" style={{ fontSize: '16px' }}>
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
                          <ExternalLink className="h-3 w-3 text-blue-600" />
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
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded"
                            style={{ fontSize: '10px' }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-base font-bold text-gray-800 mb-3 pb-1 border-b-2 border-blue-600" style={{ fontSize: '14px' }}>
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-semibold text-gray-800 text-sm">
                      {edu.degree}
                    </h3>
                    <p className="text-blue-600 font-medium text-sm">
                      {edu.field}
                    </p>
                    <p className="text-gray-600 text-xs">
                      {edu.institution}
                    </p>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{edu.startDate} - {edu.endDate}</span>
                      {edu.gpa && <span>GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {Object.keys(groupedSkills).length > 0 && (
            <section>
              <h2 className="text-base font-bold text-gray-800 mb-3 pb-1 border-b-2 border-blue-600" style={{ fontSize: '14px' }}>
                Skills
              </h2>
              <div className="space-y-3">
                {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                  <div key={category}>
                    <h3 className="font-semibold text-gray-700 mb-2 capitalize text-sm">
                      {category}
                    </h3>
                    <div className="space-y-1">
                      {categorySkills.map((skill) => (
                        <div key={skill.id} className="flex items-center justify-between">
                          <span className="text-gray-600 text-xs">
                            {skill.name}
                          </span>
                          <div className="flex items-center">
                            {[...Array(4)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-2 w-2 ${
                                  i < getSkillLevelStars(skill.level)
                                    ? 'text-blue-500 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;