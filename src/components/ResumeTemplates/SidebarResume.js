import React from 'react';

const SidebarResume = ({ data }) => {
  const { personal, skills, workExperience, education, projects, certifications, languages } = data;

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white p-0 min-h-[1123px] text-sm flex">
      {/* Left Sidebar - Dark Background */}
      <aside className="w-72 bg-gray-900 text-white p-6 min-h-[1123px] flex-shrink-0">
        {/* Profile Photo Placeholder */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-700 rounded-full mx-auto mb-6 flex items-center justify-center">
          <span className="text-2xl sm:text-4xl font-light text-gray-400">
            {personal.firstName ? personal.firstName[0] : 'P'}{personal.lastName ? personal.lastName[0] : ''}
          </span>
        </div>

        {/* Name in Sidebar */}
        <h1 className="text-xl font-bold text-center mb-2">
          {personal.firstName || 'First'} {personal.lastName || 'Name'}
        </h1>
        <p className="text-gray-400 text-center text-xs mb-6">Professional Resume</p>

        {/* Contact Information */}
        <div className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 border-b border-gray-700 pb-2">
            Contact
          </h2>
          
          {personal.email && (
            <div className="mb-3 text-sm">
              <div className="text-gray-400 text-xs">Email</div>
              <div className="text-white break-all">{personal.email}</div>
            </div>
          )}
          
          {personal.phone && (
            <div className="mb-3 text-sm">
              <div className="text-gray-400 text-xs">Phone</div>
              <div className="text-white">{personal.phone}</div>
            </div>
          )}
          
          {(personal.city || personal.country) && (
            <div className="mb-3 text-sm">
              <div className="text-gray-400 text-xs">Location</div>
              <div className="text-white">
                {personal.city}{personal.city && personal.country && ', '}{personal.country}
              </div>
            </div>
          )}
          
          {personal.linkedin && (
            <div className="mb-3 text-sm">
              <div className="text-gray-400 text-xs">LinkedIn</div>
              <div className="text-white break-all">{personal.linkedin}</div>
            </div>
          )}
          
          {personal.portfolio && (
            <div className="mb-3 text-sm">
              <div className="text-gray-400 text-xs">Portfolio</div>
              <div className="text-white break-all">{personal.portfolio}</div>
            </div>
          )}
        </div>

        {/* Skills in Sidebar */}
        {skills && skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 border-b border-gray-700 pb-2">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages in Sidebar */}
        {languages && languages.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 border-b border-gray-700 pb-2">
              Languages
            </h2>
            {languages.map((lang, index) => (
              <div key={index} className="mb-2 text-sm">
                <span className="text-white font-medium">{lang.name}</span>
                {lang.proficiency && (
                  <span className="text-gray-400 text-xs ml-1">- {lang.proficiency}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        {/* Professional Summary */}
        {personal.summary && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#bbad79]"></span>
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{personal.summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {workExperience && workExperience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#bbad79]"></span>
              Work Experience
            </h2>
            {workExperience.map((work, index) => (
              <div key={index} className="mb-6 pl-4 border-l-2 border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900">{work.jobTitle || 'Job Title'}</h3>
                    <p className="text-[#bbad79] font-medium">{work.company || 'Company Name'}</p>
                  </div>
                  <span className="text-gray-500 text-sm whitespace-nowrap">
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
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#bbad79]"></span>
              Education
            </h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-4 pl-4 border-l-2 border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{edu.degree || 'Degree'}</h3>
                    <p className="text-[#bbad79]">{edu.institution || 'Institution'}</p>
                  </div>
                  <span className="text-gray-500 text-sm whitespace-nowrap">
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

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#bbad79]"></span>
              Projects
            </h2>
            {projects.map((project, index) => (
              <div key={index} className="mb-4 pl-4 border-l-2 border-gray-200">
                <h3 className="font-bold text-gray-900">{project.name || 'Project Name'}</h3>
                {project.technologies && (
                  <p className="text-[#bbad79] text-sm">{project.technologies}</p>
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
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#bbad79]"></span>
              Certifications
            </h2>
            {certifications.map((cert, index) => (
              <div key={index} className="mb-3 pl-4 border-l-2 border-gray-200">
                <span className="font-bold text-gray-900">{cert.name}</span>
                <span className="text-gray-600"> — {cert.issuer}</span>
                {cert.date && (
                  <span className="text-gray-500 text-sm ml-2">
                    ({formatDate(cert.date)})
                  </span>
                )}
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default SidebarResume;

