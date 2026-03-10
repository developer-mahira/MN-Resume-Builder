import React from 'react';

const SidebarResumePreview = () => {
  return (
    <div className="bg-white w-full h-full text-[6px] flex overflow-hidden">
      {/* Left Sidebar - Dark Background */}
      <aside className="w-1/3 bg-gray-900 text-white p-1 min-h-full flex-shrink-0 flex flex-col">
        {/* Profile Photo Placeholder */}
        <div className="w-6 h-6 bg-gray-700 rounded-full mx-auto mb-1 flex items-center justify-center">
          <span className="text-[8px] font-light text-gray-400">JD</span>
        </div>

        {/* Name in Sidebar */}
        <h1 className="text-[7px] font-bold text-center mb-[1px]">
          Mahira Noor
        </h1>
        <p className="text-gray-400 text-[3px] text-center mb-1">Professional Resume</p>

        {/* Contact Information */}
        <div className="mb-1">
          <h2 className="text-[4px] font-bold uppercase tracking-wider text-gray-400 mb-1 border-b border-gray-700 pb-[1px]">
            Contact
          </h2>
          <div className="mb-[1px] text-[4px]">
            <div className="text-gray-500 text-[3px]">Email</div>
            <div className="text-white text-[4px] break-all">mahiranoor.088@email.com</div>
          </div>
          <div className="mb-[1px] text-[4px]">
            <div className="text-gray-500 text-[3px]">Phone</div>
            <div className="text-white">+1 555-123-4567</div>
          </div>
          <div className="text-[4px]">
            <div className="text-gray-500 text-[3px]">Location</div>
            <div className="text-white">San Francisco, USA</div>
          </div>
        </div>

        {/* Skills in Sidebar */}
        <div className="mb-1">
          <h2 className="text-[4px] font-bold uppercase tracking-wider text-gray-400 mb-1 border-b border-gray-700 pb-[1px]">
            Skills
          </h2>
          <div className="flex flex-wrap gap-[1px]">
            {['JavaScript', 'React', 'Node.js', 'Python', 'AWS'].map((skill) => (
              <span 
                key={skill} 
                className="px-1 py-[1px] bg-gray-800 text-gray-300 text-[3px] rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div>
          <h2 className="text-[4px] font-bold uppercase tracking-wider text-gray-400 mb-1 border-b border-gray-700 pb-[1px]">
            Languages
          </h2>
          <div className="text-[4px]">
            <span className="text-white font-medium">English</span>
            <span className="text-gray-400 text-[3px]"> - Native</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-1 overflow-hidden">
        {/* Professional Summary */}
        <section className="mb-1">
          <h2 className="text-[7px] font-bold text-gray-900 mb-[1px] flex items-center gap-1">
            <span className="w-0.5 h-2 bg-[#bbad79]"></span>
            Summary
          </h2>
          <p className="text-gray-600 text-[5px] leading-tight">
            Experienced professional with expertise in delivering results.
          </p>
        </section>

        {/* Work Experience */}
        <section className="mb-1">
          <h2 className="text-[7px] font-bold text-gray-900 mb-1 flex items-center gap-1">
            <span className="w-0.5 h-2 bg-[#bbad79]"></span>
            Experience
          </h2>
          <div className="mb-1 pl-1 border-l border-gray-200">
            <div className="flex justify-between items-start mb-[1px]">
              <div>
                <h3 className="font-bold text-gray-800 text-[5px]">Senior Developer</h3>
                <p className="text-[#bbad79] text-[4px] font-medium">Tech Corp</p>
              </div>
              <span className="text-gray-400 text-[3px]">2020 - Present</span>
            </div>
          </div>
          <div className="pl-1 border-l border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-800 text-[5px]">Software Engineer</h3>
                <p className="text-[#bbad79] text-[4px] font-medium">Startup Inc</p>
              </div>
              <span className="text-gray-400 text-[3px]">2018 - 2020</span>
            </div>
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-[7px] font-bold text-gray-900 mb-1 flex items-center gap-1">
            <span className="w-0.5 h-2 bg-[#bbad79]"></span>
            Education
          </h2>
          <div className="mb-1 pl-1 border-l border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-800 text-[5px]">BS Computer Science</h3>
                <p className="text-[#bbad79] text-[4px]">Stanford University</p>
              </div>
              <span className="text-gray-400 text-[3px]">2016 - 2020</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SidebarResumePreview;

