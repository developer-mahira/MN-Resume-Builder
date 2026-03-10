import React from 'react';

const CreativeDesignerPreview = () => {
  return (
    <div className="bg-white w-full h-full text-[6px] p-2 overflow-hidden" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Creative Header - Left Aligned with Accent */}
      <header className="mb-2 relative">
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-red-500 to-purple-500"></div>
        <div className="pl-2">
          <h1 className="text-[12px] font-bold text-gray-900" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            Mahira <span className="font-light">Noor</span>
          </h1>
          <div className="flex flex-wrap gap-2 text-gray-500 text-[5px] mt-1" style={{ fontFamily: 'Arial, sans-serif' }}>
            <span className="flex items-center gap-[1px]">
              <span className="text-red-500">✉</span> john@email.com
            </span>
            <span className="flex items-center gap-[1px]">
              <span className="text-red-500">☎</span> +1 555-123-4567
            </span>
            <span className="flex items-center gap-[1px]">
              <span className="text-red-500">📍</span> San Francisco
            </span>
          </div>
        </div>
      </header>

      {/* Professional Summary - Styled Box */}
      <section className="mb-2">
        <div className="bg-gray-50 p-1 rounded border-l-2 border-red-500">
          <h2 className="text-[7px] font-bold text-gray-900 mb-[1px] flex items-center gap-1" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
            About Me
          </h2>
          <p className="text-gray-600 text-[5px] leading-tight">
            Creative professional with passion for design and innovation.
          </p>
        </div>
      </section>

      {/* Skills - Modern Card Grid */}
      <section className="mb-2">
        <h2 className="text-[7px] font-bold text-gray-900 mb-1 flex items-center gap-1" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
          <span className="w-1 h-1 bg-purple-500 rounded-full"></span>
          Skills
        </h2>
        <div className="grid grid-cols-2 gap-[1px]">
          {['UI Design', 'React', 'Figma', 'Node.js', 'CSS3', 'Python'].map((skill) => (
            <div key={skill} className="flex items-center gap-[1px] p-[1px] bg-gray-50 rounded">
              <span className="w-0.5 h-0.5 bg-purple-500 rounded-full"></span>
              <span className="text-gray-600 text-[4px]">{skill}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Work Experience - Timeline Style */}
      <section className="mb-2">
        <h2 className="text-[7px] font-bold text-gray-900 mb-1 flex items-center gap-1" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
          <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
          Work Experience
        </h2>
        <div className="mb-1 relative pl-2 border-l border-gray-200">
          <div className="absolute left-[-3px] top-0 w-1.5 h-1.5 bg-white border-2 border-blue-500 rounded-full"></div>
          <div className="mb-[1px]">
            <h3 className="font-bold text-gray-800 text-[5px]">Senior Designer</h3>
            <p className="text-blue-500 text-[4px] font-medium">Design Studio</p>
          </div>
          <span className="inline-block px-1 bg-gray-100 text-gray-500 text-[3px] rounded">
            2020 - Present
          </span>
        </div>
        <div className="relative pl-2 border-l border-gray-200">
          <div className="absolute left-[-3px] top-0 w-1.5 h-1.5 bg-white border-2 border-blue-500 rounded-full"></div>
          <div className="mb-[1px]">
            <h3 className="font-bold text-gray-800 text-[5px]">UI Designer</h3>
            <p className="text-blue-500 text-[4px] font-medium">Creative Agency</p>
          </div>
          <span className="inline-block px-1 bg-gray-100 text-gray-500 text-[3px] rounded">
            2018 - 2020
          </span>
        </div>
      </section>

      {/* Education */}
      <section>
        <h2 className="text-[7px] font-bold text-gray-900 mb-1 flex items-center gap-1" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
          <span className="w-1 h-1 bg-green-500 rounded-full"></span>
          Education
        </h2>
        <div className="mb-1 p-1 bg-gray-50 rounded">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-gray-800 text-[5px]">BFA Design</h3>
              <p className="text-green-500 text-[4px]">Art Institute</p>
            </div>
            <span className="text-gray-400 text-[3px] bg-white px-1 rounded">2016 - 2020</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreativeDesignerPreview;

