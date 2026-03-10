import React from 'react';

const CorporateClassicPreview = () => {
  return (
    <div className="bg-white w-full h-full text-[6px] p-2 font-serif overflow-hidden">
      {/* Header - Classic Two-Line Format */}
      <header className="pb-1 mb-2 border-b-2 border-gray-800">
        <h1 className="text-[12px] font-bold text-gray-900 mb-1 uppercase tracking-wider">
          Mahira Noor
        </h1>
        <div className="text-gray-600 text-[5px]">
          <div className="flex flex-wrap gap-1">
            <span>mahiranoor.088@gmail.com</span>
            <span>|</span>
            <span>+1 555-123-4567</span>
            <span>|</span>
            <span>San Francisco, USA</span>
          </div>
        </div>
      </header>

      {/* Professional Summary */}
      <section className="mb-2">
        <h2 className="text-[7px] font-bold text-gray-900 mb-1 border-b border-gray-300 pb-[1px]">
          PROFESSIONAL SUMMARY
        </h2>
        <p className="text-gray-600 text-[5px] leading-tight">
          Results-driven professional with extensive experience in delivering high-quality solutions.
        </p>
      </section>

      {/* Core Competencies */}
      <section className="mb-2">
        <h2 className="text-[7px] font-bold text-gray-900 mb-1 border-b border-gray-300 pb-[1px]">
          CORE COMPETENCIES
        </h2>
        <div className="flex flex-wrap gap-x-3 gap-y-[1px]">
          {['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'SQL'].map((skill) => (
            <span key={skill} className="text-gray-600 text-[5px]">
              • {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Professional Experience */}
      <section className="mb-2">
        <h2 className="text-[7px] font-bold text-gray-900 mb-1 border-b border-gray-300 pb-[1px]">
          PROFESSIONAL EXPERIENCE
        </h2>
        <div className="mb-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-gray-800 text-[6px]">Senior Developer</h3>
              <p className="text-gray-600 italic text-[5px]">Tech Corp</p>
            </div>
            <span className="text-gray-500 text-[4px]">2020 - Present</span>
          </div>
        </div>
        <div className="mb-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-gray-800 text-[6px]">Software Engineer</h3>
              <p className="text-gray-600 italic text-[5px]">Startup Inc</p>
            </div>
            <span className="text-gray-500 text-[4px]">2018 - 2020</span>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="mb-2">
        <h2 className="text-[7px] font-bold text-gray-900 mb-1 border-b border-gray-300 pb-[1px]">
          EDUCATION
        </h2>
        <div className="mb-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-gray-800 text-[6px]">BS Computer Science</h3>
              <p className="text-gray-600 text-[5px]">Stanford University</p>
            </div>
            <div className="text-right">
              <span className="text-gray-500 text-[4px]">2016 - 2020</span>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section>
        <h2 className="text-[7px] font-bold text-gray-900 mb-1 border-b border-gray-300 pb-[1px]">
          CERTIFICATIONS
        </h2>
        <div className="flex justify-between text-[5px]">
          <div>
            <span className="font-bold text-gray-800">AWS Solutions Architect</span>
            <span className="text-gray-600"> - Amazon</span>
          </div>
          <span className="text-gray-500">2022</span>
        </div>
      </section>
    </div>
  );
};

export default CorporateClassicPreview;

