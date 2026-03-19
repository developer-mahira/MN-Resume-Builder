import React from 'react';

const CreativeDesigner = ({ data }) => {
  const { personal, skills, workExperience, education, projects, certifications, languages } = data;

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 min-h-screen sm:min-h-[900px] text-xs sm:text-sm template-safe" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Creative Header - Left Aligned with Accent */}
      <header className="mb-8 relative">
        <div className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-[#e74c3c] to-[#9b59b6]"></div>
        <div className="pl-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            {personal.firstName || 'First Name'} <span className="font-light">{personal.lastName || 'Last Name'}</span>
          </h1>
          
          <div className="flex flex-wrap gap-4 text-gray-600 text-sm mt-3" style={{ fontFamily: 'Arial, sans-serif' }}>
            {personal.email && (
              <span className="flex items-center gap-1">
                <span className="text-[#e74c3c]">✉</span> {personal.email}
              </span>
            )}
            {personal.phone && (
              <span className="flex items-center gap-1">
                <span className="text-[#e74c3c]">☎</span> {personal.phone}
              </span>
            )}
            {personal.city && (
              <span className="flex items-center gap-1">
                <span className="text-[#e74c3c]">📍</span> {personal.city}{personal.country && `, ${personal.country}`}
              </span>
            )}
          </div>
          
          {(personal.linkedin || personal.portfolio) && (
            <div className="flex flex-wrap gap-4 text-gray-600 text-sm mt-2" style={{ fontFamily: 'Arial, sans-serif' }}>
              {personal.linkedin && (
                <span className="flex items-center gap-1">
                  <span className="text-[#e74c3c]">🔗</span> {personal.linkedin}
                </span>
              )}
              {personal.portfolio && (
                <span className="flex items-center gap-1">
                  <span className="text-[#e74c3c]">🌐</span> {personal.portfolio}
                </span>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Professional Summary - Styled Box */}
      {personal.summary && (
        <section className="mb-8">
          <div className="bg-gradient-to-r from-gray-50 to-white p-5 rounded-lg border-l-4 border-[#e74c3c]">
            <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
              <span className="w-3 h-3 bg-[#e74c3c] rounded-full"></span>
              About Me
            </h2>
            <p className="text-gray-700 leading-relaxed">{personal.summary}</p>
          </div>
        </section>
      )}

      {/* Skills - Modern Card Grid */}
      {skills && skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            <span className="w-3 h-3 bg-[#9b59b6] rounded-full"></span>
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 p-2 bg-gray-50 rounded"
              >
                <span className="w-2 h-2 bg-[#9b59b6] rounded-full"></span>
                <span className="text-gray-700">{skill}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Work Experience - Timeline Style */}
      {workExperience && workExperience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            <span className="w-3 h-3 bg-[#3498db] rounded-full"></span>
            Work Experience
          </h2>
          {workExperience.map((work, index) => (
            <div key={index} className="mb-5 relative pl-6 border-l-2 border-gray-200">
              <div className="absolute left-[-9px] top-0 w-4 h-4 bg-white border-2 border-[#3498db] rounded-full"></div>
              <div className="mb-2">
                <h3 className="font-bold text-gray-900 text-base">{work.jobTitle || 'Job Title'}</h3>
                <p className="text-[#3498db] font-medium">{work.company || 'Company Name'}</p>
              </div>
              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded mb-2">
                {formatDate(work.startDate)} — {work.endDate ? formatDate(work.endDate) : 'Present'}
              </span>
              {work.description && (
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{work.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education - Simple Clean */}
      {education && education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            <span className="w-3 h-3 bg-[#27ae60] rounded-full"></span>
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{edu.degree || 'Degree'}</h3>
                  <p className="text-[#27ae60]">{edu.institution || 'Institution'}</p>
                </div>
                <span className="text-gray-500 text-sm bg-white px-2 py-1 rounded">
                  {edu.startYear || 'Start'} — {edu.endYear || 'Present'}
                </span>
              </div>
              {edu.gpa && (
                <p className="text-gray-600 text-sm mt-1">GPA: {edu.gpa}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Projects - Card Style */}
      {projects && projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            <span className="w-3 h-3 bg-[#e74c3c] rounded-full"></span>
            Featured Projects
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {projects.map((project, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-[#e74c3c] transition-colors">
                <h3 className="font-bold text-gray-900 mb-1">{project.name || 'Project Name'}</h3>
                {project.technologies && (
                  <p className="text-[#e74c3c] text-xs mb-2">{project.technologies}</p>
                )}
                {project.description && (
                  <p className="text-gray-600 text-sm">{project.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications - Badge Style */}
      {certifications && certifications.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            <span className="w-3 h-3 bg-[#f39c12] rounded-full"></span>
            Certifications
          </h2>
          <div className="flex flex-wrap gap-3">
            {certifications.map((cert, index) => (
              <div 
                key={index} 
                className="px-4 py-2 bg-gradient-to-r from-[#f39c12] to-[#f1c40f] text-white rounded-full font-medium"
              >
                {cert.name}
                {cert.issuer && <span className="opacity-80 text-xs ml-1">- {cert.issuer}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {languages && languages.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            <span className="w-3 h-3 bg-[#1abc9c] rounded-full"></span>
            Languages
          </h2>
          <div className="flex flex-wrap gap-3">
            {languages.map((lang, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-[#1abc9c]/10 text-[#1abc9c] rounded-full font-medium"
              >
                {lang.name}
                {lang.proficiency && <span className="opacity-70 ml-1">- {lang.proficiency}</span>}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default CreativeDesigner;

