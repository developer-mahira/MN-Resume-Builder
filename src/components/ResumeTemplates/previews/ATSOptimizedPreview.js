import React from 'react';

const ATSOptimizedPreview = () => {
  return (
    <div className="bg-white w-full h-full text-[6px] p-2 overflow-hidden">
      {/* Header - Simple and Clean */}
      <header className="pb-1 mb-2 border-b border-gray-300">
        <h1 className="text-[10px] font-bold text-gray-900 mb-1">
          Mahira Noor
        </h1>
        <div className="text-gray-600 text-[5px]">
          john@email.com | +1 555-123-4567 | San Francisco, USA
        </div>
      </header>

      {/* Professional Summary */}
      <section className="mb-2">
        <h2 className="text-[7px] font-bold text-gray-900 mb-1 uppercase">
          Professional Summary
        </h2>
        <p className="text-gray-600 text-[5px] leading-tight">
          Experienced professional with proven track record of delivering results.
        </p>
      </section>

      {/* Skills - Plain Text Format for ATS */}
      <section className="mb-2">
        <h2 className="text-[7px] font-bold text-gray-900 mb-1 uppercase">
          Skills
        </h2>
        <p className="text-gray-600 text-[5px]">
          JavaScript, React, Node.js, Python, AWS, SQL, Git, HTML, CSS
        </p>
      </section>

      {/* Work Experience */}
      <section className="mb-2">
        <h2 className="text-[7px] font-bold text-gray-900 mb-1 uppercase">
          Work Experience
        </h2>
        <div className="mb-1">
          <div className="mb-[1px]">
            <strong className="text-gray-800 text-[6px]">Senior Developer</strong>
            <span className="text-gray-600 text-[5px]"> at Tech Corp</span>
          </div>
          <div className="text-gray-500 text-[4px] mb-[1px]">
            January 2020 – Present
          </div>
          <p className="text-gray-600 text-[5px]">
            Led development of key features and managed team of 5 developers.
          </p>
        </div>
        <div className="mb-1">
          <div className="mb-[1px]">
            <strong className="text-gray-800 text-[6px]">Software Engineer</strong>
            <span className="text-gray-600 text-[5px]"> at Startup Inc</span>
          </div>
          <div className="text-gray-500 text-[4px]">
            January 2018 – December 2019
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="mb-2">
        <h2 className="text-[7px] font-bold text-gray-900 mb-1 uppercase">
          Education
        </h2>
        <div className="mb-1">
          <strong className="text-gray-800 text-[6px]">BS Computer Science</strong>
          <span className="text-gray-600 text-[5px]"> - Stanford University</span>
          <div className="text-gray-500 text-[4px]">2016 – 2020 | GPA: 3.8</div>
        </div>
      </section>

      {/* Projects */}
      <section className="mb-2">
        <h2 className="text-[7px] font-bold text-gray-900 mb-1 uppercase">
          Projects
        </h2>
        <div>
          <strong className="text-gray-800 text-[6px]">E-Commerce Platform</strong>
          <span className="text-gray-600 text-[5px]"> | React, Node.js</span>
          <p className="text-gray-600 text-[5px]">Built full-featured online store with payment integration.</p>
        </div>
      </section>

      {/* Certifications */}
      <section>
        <h2 className="text-[7px] font-bold text-gray-900 mb-1 uppercase">
          Certifications
        </h2>
        <div className="text-[5px]">
          <strong className="text-gray-800">AWS Solutions Architect</strong>
          <span className="text-gray-600"> - Amazon Web Services (June 2022)</span>
        </div>
      </section>
    </div>
  );
};

export default ATSOptimizedPreview;

