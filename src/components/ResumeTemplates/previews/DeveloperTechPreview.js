import React from 'react';

const DeveloperTechPreview = () => {
  return (
    <div className="bg-white w-full h-full text-[6px] p-2 font-mono overflow-hidden">
      {/* Header - Tech Style */}
      <header className="mb-2 pb-1 border-b-2 border-gray-900">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[10px] font-bold text-gray-900 mb-[1px]">
              Mahira <span className="text-[#bbad79]">Noor</span>
            </h1>
            <p className="text-gray-500 text-[4px]">Software Developer</p>
          </div>
          {/* Tech-style badge */}
          <div className="text-right">
            <div className="px-1 py-[1px] bg-gray-900 text-white text-[3px] font-bold">
              {'<'}DEV{'/>'}
            </div>
          </div>
        </div>
        
        {/* Contact Row - Code Style */}
        <div className="mt-1 flex flex-wrap gap-1 text-[4px]">
          <span className="text-gray-400">{'{'}</span>
          <span className="text-green-600">email:</span>
          <span className="text-gray-700">"mahiranoor.088@email.com"</span>
          <span className="text-gray-400">,</span>
          <span className="text-green-600">phone:</span>
          <span className="text-gray-700">"+1 555-..."</span>
          <span className="text-gray-400">{'}'}</span>
        </div>
      </header>

      {/* Skills - Tech Stack Style */}
      <section className="mb-2">
        <h2 className="text-[7px] font-bold text-gray-900 mb-1 flex items-center gap-1">
          <span className="text-[#bbad79]">#</span> Skills
        </h2>
        <div className="bg-gray-50 p-1 rounded">
          <div className="flex flex-wrap gap-[1px]">
            {['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker'].map((skill) => (
              <span 
                key={skill} 
                className="px-1 py-[1px] bg-gray-900 text-white text-[3px] rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Work Experience - Terminal Style */}
      <section className="mb-2">
        <h2 className="text-[7px] font-bold text-gray-900 mb-1 flex items-center gap-1">
          <span className="text-[#bbad79]">#</span> Experience
        </h2>
        <div className="mb-1">
          <div className="flex justify-between items-start mb-[1px]">
            <div>
              <h3 className="font-bold text-gray-800 text-[5px]">
                <span className="text-green-600">{'>'}</span> Senior Developer
              </h3>
              <p className="text-gray-500 text-[4px] ml-1">at Tech Corp</p>
            </div>
            <span className="text-gray-400 text-[4px]">[2020 - Present]</span>
          </div>
        </div>
        <div className="mb-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-gray-800 text-[5px]">
                <span className="text-green-600">{'>'}</span> Software Engineer
              </h3>
              <p className="text-gray-500 text-[4px] ml-1">at Startup Inc</p>
            </div>
            <span className="text-gray-400 text-[4px]">[2018 - 2020]</span>
          </div>
        </div>
      </section>

      {/* Projects - Repository Style */}
      <section className="mb-2">
        <h2 className="text-[7px] font-bold text-gray-900 mb-1 flex items-center gap-1">
          <span className="text-[#bbad79]">#</span> Projects
        </h2>
        <div className="grid grid-cols-2 gap-1">
          <div className="p-1 border border-gray-200 rounded">
            <h3 className="font-bold text-gray-800 text-[5px]">E-Commerce</h3>
            <div className="flex gap-[1px] mb-[1px]">
              <span className="px-1 bg-[#bbad79]/20 text-[#bbad79] text-[3px] rounded">React</span>
              <span className="px-1 bg-[#bbad79]/20 text-[#bbad79] text-[3px] rounded">Node</span>
            </div>
          </div>
          <div className="p-1 border border-gray-200 rounded">
            <h3 className="font-bold text-gray-800 text-[5px]">Portfolio</h3>
            <div className="flex gap-[1px]">
              <span className="px-1 bg-[#bbad79]/20 text-[#bbad79] text-[3px] rounded">Vue</span>
            <span className="px-1 bg-[#bbad79]/20 text-[#bbad79] text-[3px] rounded">CSS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Education - Simple List */}
      <section>
        <h2 className="text-[7px] font-bold text-gray-900 mb-1 flex items-center gap-1">
          <span className="text-[#bbad79]">#</span> Education
        </h2>
        <div className="flex justify-between items-start p-1 bg-gray-50 rounded">
          <div>
            <h3 className="font-bold text-gray-800 text-[5px]">BS Computer Science</h3>
            <p className="text-gray-500 text-[4px]">Stanford University</p>
          </div>
          <div className="text-right">
            <span className="text-gray-400 text-[4px]">2016 - 2020</span>
            <p className="text-[#bbad79] text-[4px]">GPA: 3.8</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DeveloperTechPreview;

