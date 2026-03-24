import React from 'react';

const DeveloperTech = ({ data }) => {
  const { personal, skills, workExperience, education, projects, certifications, languages } = data;

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white p-8 min-h-full text-[13px] leading-6 font-mono template-safe">
      {/* Header - Tech Style */}
      <header className="mb-8 pb-6 border-b-4 border-gray-900">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              {personal.firstName || 'First Name'} <span className="text-[#bbad79]">{personal.lastName || 'Last Name'}</span>
            </h1>
            <p className="text-gray-600 text-sm">{personal.summary ? personal.summary.substring(0, 80) + '...' : 'Software Developer'}</p>
          </div>
          
            {/* Tech-style badge */}
          <div className="text-right">
            <div className="inline-block px-4 py-2 bg-gray-900 text-white text-xs font-bold">
              {'<'}DEVELOPER {'/>'}
            </div>
          </div>
        </div>
        
        {/* Contact Row - Code Style */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <span className="text-gray-500">const contact = {'{'}</span>
          {personal.email && <span className="text-[#22863a]">email:</span>}
          {personal.email && <span className="text-gray-700">"{personal.email}"</span>}
          {personal.email && personal.phone && <span className="text-gray-400">,</span>}
          {personal.phone && <span className="text-[#22863a]">phone:</span>}
          {personal.phone && <span className="text-gray-700">"{personal.phone}"</span>}
          {((personal.email || personal.phone) && (personal.city || personal.country)) && <span className="text-gray-400">,</span>}
          {(personal.city || personal.country) && <span className="text-[#22863a]">location:</span>}
          {(personal.city || personal.country) && <span className="text-gray-700">"{personal.city}{personal.city && personal.country && ', '}{personal.country}"</span>}
          <span className="text-gray-500">{'}'}</span>
        </div>
        
        {(personal.linkedin || personal.portfolio) && (
          <div className="mt-2 flex flex-wrap gap-4 text-sm">
            <span className="text-gray-500">const links = {'{'}</span>
            {personal.linkedin && <span className="text-[#0056b3]">linkedin:</span>}
            {personal.linkedin && <span className="text-gray-700">"{personal.linkedin}"</span>}
            {personal.linkedin && personal.portfolio && <span className="text-gray-400">,</span>}
            {personal.portfolio && <span className="text-[#0056b3]">portfolio:</span>}
            {personal.portfolio && <span className="text-gray-700">"{personal.portfolio}"</span>}
            <span className="text-gray-500">{'}'}</span>
          </div>
        )}
      </header>

      {/* Skills - Tech Stack Style */}
      {skills && skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-[#bbad79]">#</span> Technical Skills
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-gray-900 text-white text-xs rounded font-mono"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Work Experience - Terminal Style */}
      {workExperience && workExperience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-[#bbad79]">#</span> Work Experience
          </h2>
          {workExperience.map((work, index) => (
            <div key={index} className="mb-6">
              <div className="flex flex-wrap justify-between items-start gap-x-4 gap-y-1 mb-2">
                <div>
                  <h3 className="font-bold text-gray-900">
                    <span className="text-[#22863a]">{'>'}</span> {work.jobTitle || 'Job Title'}
                  </h3>
                  <p className="text-gray-600 ml-1">at {work.company || 'Company Name'}</p>
                </div>
                <span className="text-gray-500 text-sm font-mono">
                  [{formatDate(work.startDate)} - {work.endDate ? formatDate(work.endDate) : 'Present'}]
                </span>
              </div>
              {work.description && (
                <div className="ml-4 p-3 bg-gray-50 rounded border-l-2 border-[#bbad79]">
                  <p className="text-gray-700 whitespace-pre-line">{work.description}</p>
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Projects - Repository Style */}
      {projects && projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-[#bbad79]">#</span> Projects
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {projects.map((project, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-[#bbad79] transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <span className="text-lg">📁</span> {project.name || 'Project Name'}
                  </h3>
                </div>
                {project.technologies && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.technologies.split(',').map((tech, i) => (
                      <span key={i} className="px-2 py-0.5 bg-[#bbad79]/20 text-[#bbad79] text-xs rounded">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                )}
                {project.description && (
                  <p className="text-gray-600 text-sm">{project.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education - Simple List */}
      {education && education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-[#bbad79]">#</span> Education
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4 flex flex-wrap justify-between items-start gap-x-4 gap-y-2 p-3 bg-gray-50 rounded">
              <div>
                <h3 className="font-bold text-gray-900">{edu.degree || 'Degree'}</h3>
                <p className="text-gray-600">{edu.institution || 'Institution'}</p>
              </div>
              <div className="text-right">
                <span className="text-gray-500 text-sm">
                  {edu.startYear || 'Start'} - {edu.endYear || 'Present'}
                </span>
                {edu.gpa && (
                  <p className="text-[#bbad79] text-sm font-mono">GPA: {edu.gpa}</p>
                )}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Certifications - Badge Style */}
      {certifications && certifications.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-[#bbad79]">#</span> Certifications
          </h2>
          <div className="flex flex-wrap gap-3">
            {certifications.map((cert, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg"
              >
                <span className="text-[#bbad79]">✓</span>
                <span className="font-medium">{cert.name}</span>
                {cert.issuer && <span className="text-gray-400 text-xs">({cert.issuer})</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages - Minimal */}
      {languages && languages.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span className="text-[#bbad79]">#</span> Languages
          </h2>
          <div className="flex flex-wrap gap-4">
            {languages.map((lang, index) => (
              <span key={index} className="text-gray-700">
                <span className="font-bold">{lang.name}:</span> {lang.proficiency || 'Not specified'}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="mt-8 pt-4 border-t border-gray-200 text-center text-gray-500 text-xs">
        <span className="text-[#bbad79]">{'//'}</span> Built with MN Resume Builder <span className="text-[#bbad79]">{'//'}</span>
      </footer>
    </div>
  );
};

export default DeveloperTech;

