import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Calendar, ExternalLink, Github, Star } from 'lucide-react';
import { ResumeData } from '../../contexts/ResumeContext';

interface CreativeTemplateProps {
  data: ResumeData;
}

const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ data }) => {
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
    <div className="w-full h-full bg-white text-gray-800" style={{ fontFamily: 'sans-serif', fontSize: '12px', lineHeight: '1.4' }}>
      <div className="grid grid-cols-3 min-h-full">
        {/* Left Sidebar */}
        <div className="bg-gradient-to-b from-purple-600 to-purple-800 text-white p-6">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-2xl font-bold">
                {personalInfo.fullName ? personalInfo.fullName.charAt(0) : 'Y'}
              </span>
            </div>
            <h1 className="text-lg font-bold mb-1" style={{ fontSize: '16px' }}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
          </div>

          {/* Contact Info */}
          <div className="space-y-2 mb-6">
            <h2 className="text-sm font-semibold mb-3 border-b border-purple-400 pb-1">
              Contact
            </h2>
            {personalInfo.email && (
              <div className="flex items-center text-xs">
                <Mail className="h-3 w-3 mr-2 flex-shrink-0" />
                <span className="break-all">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center text-xs">
                <Phone className="h-3 w-3 mr-2 flex-shrink-0" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center text-xs">
                <MapPin className="h-3 w-3 mr-2 flex-shrink-0" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center text-xs">
                <Globe className="h-3 w-3 mr-2 flex-shrink-0" />
                <span className="break-all">{personalInfo.website}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center text-xs">
                <Linkedin className="h-3 w-3 mr-2 flex-shrink-0" />
                <span>LinkedIn</span>
              </div>
            )}
          </div>

          {/* Skills */}
          {Object.keys(groupedSkills).length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-semibold mb-3 border-b border-purple-400 pb-1">
                Skills
              </h2>
              <div className="space-y-3">
                {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                  <div key={category}>
                    <h3 className="font-medium text-purple-200 mb-2 capitalize text-xs">
                      {category}
                    </h3>
                    <div className="space-y-1">
                      {categorySkills.map((skill) => (
                        <div key={skill.id}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs">{skill.name}</span>
                            <div className="flex">
                              {[...Array(4)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-2 w-2 ${
                                    i < getSkillLevelStars(skill.level)
                                      ? 'text-yellow-300 fill-current'
                                      : 'text-purple-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold mb-3 border-b border-purple-400 pb-1">
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-medium text-xs">{edu.degree}</h3>
                    <p className="text-purple-200 text-xs">{edu.field}</p>
                    <p className="text-purple-300 text-xs">{edu.institution}</p>
                    <div className="flex justify-between text-xs text-purple-300 mt-1">
                      <span>{edu.startDate} - {edu.endDate}</span>
                      {edu.gpa && <span>GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="col-span-2 p-6">
          {/* Summary */}
          {personalInfo.summary && (
            <section className="mb-6">
              <h2 className="text-lg font-bold text-purple-800 mb-3 relative" style={{ fontSize: '16px' }}>
                About Me
                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-purple-600 to-purple-400"></div>
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm">
                {personalInfo.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-bold text-purple-800 mb-4 relative" style={{ fontSize: '16px' }}>
                Experience
                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-purple-600 to-purple-400"></div>
              </h2>
              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <div key={exp.id} className="relative pl-4">
                    <div className="absolute left-0 top-1 w-2 h-2 bg-purple-600 rounded-full"></div>
                    {index < experience.length - 1 && (
                      <div className="absolute left-0.5 top-3 w-0.5 h-full bg-purple-200"></div>
                    )}
                    
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h3 className="text-sm font-semibold text-gray-800">
                            {exp.position}
                          </h3>
                          <p className="text-purple-600 font-medium text-sm">
                            {exp.company}
                          </p>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </div>
                      </div>
                      {exp.description && (
                        <p className="text-gray-600 mt-1 text-xs leading-relaxed">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-purple-800 mb-4 relative" style={{ fontSize: '16px' }}>
                Projects
                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-purple-600 to-purple-400"></div>
              </h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border-l-4 border-purple-600">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-gray-800">
                        {project.name}
                      </h3>
                      <div className="flex space-x-1">
                        {project.link && (
                          <ExternalLink className="h-3 w-3 text-purple-600" />
                        )}
                        {project.github && (
                          <Github className="h-3 w-3 text-gray-600" />
                        )}
                      </div>
                    </div>
                    {project.description && (
                      <p className="text-gray-600 mb-2 text-xs leading-relaxed">
                        {project.description}
                      </p>
                    )}
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded-full font-medium"
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
      </div>
    </div>
  );
};

export default CreativeTemplate;