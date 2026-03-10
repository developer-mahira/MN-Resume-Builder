import React from 'react';

const CorporateClassic = ({ data }) => {
  const { personal, skills, workExperience, education, projects, certifications, languages } = data;

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white p-8 min-h-[1123px] text-sm font-serif">
      {/* Header - Classic Two-Line Format */}
      <header className="pb-6 mb-6 border-b-2 border-gray-800">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 uppercase tracking-wider">
          {personal.firstName || 'First Name'} {personal.lastName || 'Last Name'}
        </h1>
        
        <div className="text-gray-700 text-sm">
          <div className="flex flex-wrap gap-2">
            {personal.email && <span>{personal.email}</span>}
            {personal.email && (personal.phone || personal.city) && <span>|</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.phone && personal.city && <span>|</span>}
            {personal.city && <span>{personal.city}{personal.country && `, ${personal.country}`}</span>}
          </div>
          {(personal.linkedin || personal.portfolio) && (
            <div className="flex flex-wrap gap-2 mt-1">
              {personal.linkedin && <span>{personal.linkedin}</span>}
              {personal.linkedin && personal.portfolio && <span>|</span>}
              {personal.portfolio && <span>{personal.portfolio}</span>}
            </div>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {personal.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-gray-700 leading-relaxed">{personal.summary}</p>
        </section>
      )}

      {/* Core Competencies / Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            CORE COMPETENCIES
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {skills.map((skill, index) => (
              <span key={index} className="text-gray-700">
                • {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Professional Experience */}
      {workExperience && workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
            PROFESSIONAL EXPERIENCE
          </h2>
          {workExperience.map((work, index) => (
            <div key={index} className="mb-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-900 text-base">{work.jobTitle || 'Job Title'}</h3>
                  <p className="text-gray-700 italic">{work.company || 'Company Name'}</p>
                </div>
                <span className="text-gray-600 text-sm whitespace-nowrap">
                  {formatDate(work.startDate)} — {work.endDate ? formatDate(work.endDate) : 'Present'}
                </span>
              </div>
              {work.description && (
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{work.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            EDUCATION
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{edu.degree || 'Degree'}</h3>
                  <p className="text-gray-700">{edu.institution || 'Institution'}</p>
                </div>
                <div className="text-right">
                  <span className="text-gray-600 text-sm">
                    {edu.startYear || 'Start'} — {edu.endYear || 'Present'}
                  </span>
                  {edu.gpa && (
                    <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            NOTABLE PROJECTS
          </h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-3">
              <h3 className="font-bold text-gray-900">{project.name || 'Project Name'}</h3>
              {project.technologies && (
                <p className="text-gray-600 text-sm"><span className="font-medium">Technologies:</span> {project.technologies}</p>
              )}
              {project.description && (
                <p className="text-gray-700 mt-1">{project.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            CERTIFICATIONS
          </h2>
          {certifications.map((cert, index) => (
            <div key={index} className="mb-2 flex justify-between">
              <div>
                <span className="font-bold text-gray-900">{cert.name}</span>
                <span className="text-gray-700"> — {cert.issuer}</span>
              </div>
              {cert.date && (
                <span className="text-gray-600 text-sm">{formatDate(cert.date)}</span>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Languages */}
      {languages && languages.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            LANGUAGES
          </h2>
          <div className="flex flex-wrap gap-6">
            {languages.map((lang, index) => (
              <span key={index} className="text-gray-700">
                <span className="font-bold">{lang.name}:</span> {lang.proficiency || 'Not specified'}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default CorporateClassic;

