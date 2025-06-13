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
    <div className="max-w-4xl mx-auto bg-white text-gray-800 font-sans">
      <div className="grid md:grid-cols-3 min-h-screen">
        {/* Left Sidebar */}
        <div className="bg-gradient-to-b from-purple-600 to-purple-800 text-white p-8">
          <div className="text-center mb-8">
            <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-4xl font-bold">{personalInfo.fullName.charAt(0)}</span>
            </div>
            <h1 className="text-2xl font-bold mb-2">{personalInfo.fullName}</h1>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 mb-8">
            <h2 className="text-lg font-semibold mb-4 border-b border-purple-400 pb-2">Contact</h2>
            {personalInfo.email && (
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-3 flex-shrink-0" />
                <span className="break-all">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-3 flex-shrink-0" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-3 flex-shrink-0" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center text-sm">
                <Globe className="h-4 w-4 mr-3 flex-shrink-0" />
                <span className="break-all">{personalInfo.website}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center text-sm">
                <Linkedin className="h-4 w-4 mr-3 flex-shrink-0" />
                <span>LinkedIn</span>
              </div>
            )}
          </div>

          {/* Skills */}
          {Object.keys(groupedSkills).length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 border-b border-purple-400 pb-2">Skills</h2>
              <div className="space-y-4">
                {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                  <div key={category}>
                    <h3 className="font-medium text-purple-200 mb-2 capitalize text-sm">{category}</h3>
                    <div className="space-y-2">
                      {categorySkills.map((skill) => (
                        <div key={skill.id}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm">{skill.name}</span>
                            <div className="flex">
                              {[...Array(4)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
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
              <h2 className="text-lg font-semibold mb-4 border-b border-purple-400 pb-2">Education</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-medium text-sm">{edu.degree}</h3>
                    <p className="text-purple-200 text-sm">{edu.field}</p>
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
        <div className="md:col-span-2 p-8">
          {/* Summary */}
          {personalInfo.summary && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-800 mb-4 relative">
                About Me
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-purple-600 to-purple-400"></div>
              </h2>
              <p className="text-gray-600 leading-relaxed">{personalInfo.summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-800 mb-6 relative">
                Experience
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-purple-600 to-purple-400"></div>
              </h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={exp.id} className="relative pl-6">
                    <div className="absolute left-0 top-2 w-3 h-3 bg-purple-600 rounded-full"></div>
                    {index < experience.length - 1 && (
                      <div className="absolute left-1.5 top-5 w-0.5 h-full bg-purple-200"></div>
                    )}
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{exp.position}</h3>
                          <p className="text-purple-600 font-medium">{exp.company}</p>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1 md:mt-0">
                          <Calendar className="h-4 w-4 mr-1" />
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </div>
                      </div>
                      {exp.description && (
                        <p className="text-gray-600 mt-2">{exp.description}</p>
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
              <h2 className="text-2xl font-bold text-purple-800 mb-6 relative">
                Projects
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-purple-600 to-purple-400"></div>
              </h2>
              <div className="grid gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border-l-4 border-purple-600">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
                      <div className="flex space-x-2">
                        {project.link && (
                          <ExternalLink className="h-4 w-4 text-purple-600" />
                        )}
                        {project.github && (
                          <Github className="h-4 w-4 text-gray-600" />
                        )}
                      </div>
                    </div>
                    {project.description && (
                      <p className="text-gray-600 mb-3">{project.description}</p>
                    )}
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium"
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