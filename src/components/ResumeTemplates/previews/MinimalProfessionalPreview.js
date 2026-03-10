import React from 'react';

const MinimalProfessionalPreview = () => {
  return (
    <div className="bg-white w-full h-full text-[6px] p-2 font-sans overflow-hidden">
      {/* Header - Clean and Centered */}
      <header className="text-center pb-1 mb-2 border-b border-gray-200">
        <h1 className="text-[10px] font-bold text-gray-900 tracking-tight mb-1">
          Mahira Noor
        </h1>
        <div className="flex flex-wrap justify-center gap-1 text-gray-500 text-[5px]">
          <span>mahira.noor@email.com</span>
          <span>•</span>
          <span>+1 555-123-4567</span>
          <span>•</span>
          <span>San Francisco, USA</span>
        </div>
      </header>

      {/* Summary */}
      <section className="mb-2">
        <h2 className="text-[7px] font-semibold text-gray-900 mb-1 uppercase tracking-wide">
          Professional Summary
        </h2>
        <p className="text-gray-600 text-[5px] leading-tight line-clamp-2">
          Experienced professional with expertise in delivering results-driven solutions.
        </p>
      </section>

      {/* Skills */}
      <section className="mb-2">
        <h2 className="text-[7px] font-semibold text-gray-900 mb-1 uppercase tracking-wide">
          Skills
        </h2>
        <div className="flex flex-wrap gap-[2px]">
          {['JavaScript', 'React', 'Node.js', 'Python', 'AWS'].map((skill) => (
            <span 
              key={skill} 
              className="px-1 py-[1px] bg-gray-100 text-gray-600 text-[4px] rounded"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Work Experience */}
      <section className="mb-2">
        <h2 className="text-[7px] font-semibold text-gray-900 mb-1 uppercase tracking-wide">
          Work Experience
        </h2>
        <div className="mb-1">
          <div className="flex justify-between items-baseline">
            <div>
              <h3 className="font-semibold text-gray-800 text-[6px]">Senior Developer</h3>
              <p className="text-gray-500 text-[4px]">Tech Corp</p>
            </div>
            <span className="text-gray-400 text-[4px]">2020 - Present</span>
          </div>
        </div>
        <div className="mb-1">
          <div className="flex justify-between items-baseline">
            <div>
              <h3 className="font-semibold text-gray-800 text-[6px]">Software Engineer</h3>
              <p className="text-gray-500 text-[4px]">Startup Inc</p>
            </div>
            <span className="text-gray-400 text-[4px]">2018 - 2020</span>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="mb-2">
        <h2 className="text-[7px] font-semibold text-gray-900 mb-1 uppercase tracking-wide">
          Education
        </h2>
        <div>
          <h3 className="font-semibold text-gray-800 text-[6px]">BS Computer Science</h3>
          <p className="text-gray-500 text-[4px]">Stanford University • 2016 - 2020</p>
        </div>
      </section>

      {/* Projects */}
      <section>
        <h2 className="text-[7px] font-semibold text-gray-900 mb-1 uppercase tracking-wide">
          Projects
        </h2>
        <div>
          <h3 className="font-semibold text-gray-800 text-[6px]">E-Commerce Platform</h3>
          <p className="text-gray-500 text-[4px]">React, Node.js</p>
        </div>
      </section>
    </div>
  );
};

export default MinimalProfessionalPreview;
