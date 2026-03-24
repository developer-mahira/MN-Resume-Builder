import React from 'react';

const MinimalProfessional = ({ data }) => {
  const { personal, skills, workExperience, education, projects, certifications, languages } = data;

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white p-8 min-h-full text-[13px] leading-6 font-sans template-safe">
      {/* Header - Clean and Centered */}
      <header className="text-center pb-6 mb-8 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-3">
          {personal.firstName || 'First Name'} {personal.lastName || 'Last Name'}
        </h1>
        
        <div className="flex flex-wrap justify-center gap-3 text-gray-600 text-sm">
          {personal.email && (
            <span className="flex items-center gap-1">
              {personal.email}
            </span>
          )}
          {personal.phone && <span>• {personal.phone}</span>}
          {personal.city && <span>• {personal.city}</span>}
          {personal.country && <span>, {personal.country}</span>}
        </div>
        
        {(personal.linkedin || personal.portfolio) && (
          <div className="flex flex-wrap justify-center gap-3 text-gray-600 text-sm mt-2">
            {personal.linkedin && <span>{personal.linkedin}</span>}
            {personal.linkedin && personal.portfolio && <span>•</span>}
            {personal.portfolio && <span>{personal.portfolio}</span>}
          </div>
        )}
      </header>

      {/* Professional Summary */}
      {personal.summary && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{personal.summary}</p>
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Work Experience */}
      {workExperience && workExperience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide">
            Work Experience
          </h2>
          {workExperience.map((work, index) => (
            <div key={index} className="mb-6">
              <div className="flex flex-wrap justify-between items-baseline gap-x-4 gap-y-1 mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">{work.jobTitle || 'Job Title'}</h3>
                  <p className="text-gray-600">{work.company || 'Company Name'}</p>
                </div>
                <span className="text-gray-500 text-sm">
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
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide">
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex flex-wrap justify-between items-baseline gap-x-4 gap-y-1 mb-1">
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.degree || 'Degree'}</h3>
                  <p className="text-gray-600">{edu.institution || 'Institution'}</p>
                </div>
                <span className="text-gray-500 text-sm">
                  {edu.startYear || 'Start'} — {edu.endYear || 'Present'}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </span>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide">
            Projects
          </h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold text-gray-900">{project.name || 'Project Name'}</h3>
              {project.technologies && (
                <p className="text-gray-600 text-sm mb-1">{project.technologies}</p>
              )}
              {project.description && (
                <p className="text-gray-700">{project.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide">
            Certifications
          </h2>
          {certifications.map((cert, index) => (
            <div key={index} className="mb-2">
              <span className="font-medium text-gray-900">{cert.name}</span>
              <span className="text-gray-600"> — {cert.issuer}</span>
              {cert.date && (
                <span className="text-gray-500 text-sm"> ({formatDate(cert.date)})</span>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Languages */}
      {languages && languages.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide">
            Languages
          </h2>
          <div className="flex flex-wrap gap-4">
            {languages.map((lang, index) => (
              <span key={index} className="text-gray-700">
                <span className="font-medium">{lang.name}</span>
                {lang.proficiency && <span className="text-gray-500"> — {lang.proficiency}</span>}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default MinimalProfessional;

