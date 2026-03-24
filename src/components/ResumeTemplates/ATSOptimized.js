import React from 'react';

const ATSOptimized = ({ data }) => {
  const { personal, skills, workExperience, education, projects, certifications, languages } = data;

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="bg-white p-8 min-h-full text-[13px] leading-6 template-safe">
      {/* Header - Simple and Clean */}
      <header className="mb-6 pb-4 border-b border-gray-300">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {personal.firstName || 'First Name'} {personal.lastName || 'Last Name'}
        </h1>
        
        <div className="text-gray-700 text-sm">
          {personal.email && <span>{personal.email}</span>}
          {personal.email && personal.phone && <span> | </span>}
          {personal.phone && <span>{personal.phone}</span>}
          {((personal.email || personal.phone) && (personal.city || personal.country)) && <span> | </span>}
          {(personal.city || personal.country) && <span>{personal.city}{personal.city && personal.country && ', '}{personal.country}</span>}
        </div>
        
        {(personal.linkedin || personal.portfolio) && (
          <div className="text-gray-700 text-sm mt-1">
            {personal.linkedin && <span>{personal.linkedin}</span>}
            {personal.linkedin && personal.portfolio && <span> | </span>}
            {personal.portfolio && <span>{personal.portfolio}</span>}
          </div>
        )}
      </header>

      {/* Professional Summary */}
      {personal.summary && (
        <section className="mb-5">
          <h2 className="text-base font-bold text-gray-900 mb-2 uppercase">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{personal.summary}</p>
        </section>
      )}

      {/* Skills - Plain Text Format for ATS */}
      {skills && skills.length > 0 && (
        <section className="mb-5">
          <h2 className="text-base font-bold text-gray-900 mb-2 uppercase">
            Skills
          </h2>
          <p className="text-gray-700">
            {skills.join(', ')}
          </p>
        </section>
      )}

      {/* Work Experience */}
      {workExperience && workExperience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-base font-bold text-gray-900 mb-2 uppercase">
            Work Experience
          </h2>
          {workExperience.map((work, index) => (
            <div key={index} className="mb-4">
              <div className="mb-1">
                <strong className="text-gray-900">{work.jobTitle || 'Job Title'}</strong>
                {work.company && <span className="text-gray-700"> at {work.company}</span>}
              </div>
              <div className="text-gray-600 text-sm mb-1">
                {formatDate(work.startDate)} – {work.endDate ? formatDate(work.endDate) : 'Present'}
              </div>
              {work.description && (
                <p className="text-gray-700 whitespace-pre-line">{work.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-base font-bold text-gray-900 mb-2 uppercase">
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="mb-1">
                <strong className="text-gray-900">{edu.degree || 'Degree'}</strong>
                {edu.institution && <span className="text-gray-700"> - {edu.institution}</span>}
              </div>
              <div className="text-gray-600 text-sm">
                {edu.startYear || 'Start'} – {edu.endYear || 'Present'}
                {edu.gpa && ` | GPA: ${edu.gpa}`}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-base font-bold text-gray-900 mb-2 uppercase">
            Projects
          </h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-3">
              <div className="mb-1">
                <strong className="text-gray-900">{project.name || 'Project Name'}</strong>
                {project.technologies && <span className="text-gray-700"> | {project.technologies}</span>}
              </div>
              {project.description && (
                <p className="text-gray-700">{project.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="mb-5">
          <h2 className="text-base font-bold text-gray-900 mb-2 uppercase">
            Certifications
          </h2>
          {certifications.map((cert, index) => (
            <div key={index} className="mb-1">
              <strong className="text-gray-900">{cert.name}</strong>
              {cert.issuer && <span className="text-gray-700"> - {cert.issuer}</span>}
              {cert.date && <span className="text-gray-600 text-sm"> ({formatDate(cert.date)})</span>}
            </div>
          ))}
        </section>
      )}

      {/* Languages */}
      {languages && languages.length > 0 && (
        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2 uppercase">
            Languages
          </h2>
          <p className="text-gray-700">
            {languages.map((lang, index) => (
              <span key={index}>
                {lang.name}
                {lang.proficiency && `: ${lang.proficiency}`}
                {index < languages.length - 1 ? '; ' : ''}
              </span>
            ))}
          </p>
        </section>
      )}
    </div>
  );
};

export default ATSOptimized;

