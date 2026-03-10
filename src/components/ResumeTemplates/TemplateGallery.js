import React, { useState } from 'react';
import { getAllTemplates } from './TemplateRenderer';
import TemplateRenderer from './TemplateRenderer';

const TemplateGallery = ({ selectedTemplate, onSelectTemplate, resumeData }) => {
  const templates = getAllTemplates();
  const [hoveredTemplate, setHoveredTemplate] = useState(null);

  // Sample data for preview
  const sampleData = {
    personal: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      city: 'San Francisco',
      country: 'USA',
      linkedin: 'linkedin.com/in/johndoe',
      portfolio: 'johndoe.dev',
      summary: 'Experienced software engineer with 5+ years of experience in full-stack development.',
    },
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker'],
    workExperience: [
      {
        jobTitle: 'Senior Developer',
        company: 'Tech Corp',
        startDate: '2020-01',
        endDate: '',
        description: 'Led development of key features.',
      },
    ],
    education: [
      {
        degree: 'BS Computer Science',
        institution: 'Stanford University',
        startYear: '2016',
        endYear: '2020',
        gpa: '3.8',
      },
    ],
    projects: [
      {
        name: 'E-Commerce Platform',
        technologies: 'React, Node.js',
        description: 'Built a full-featured online store.',
      },
    ],
    certifications: [
      {
        name: 'AWS Solutions Architect',
        issuer: 'Amazon Web Services',
        date: '2022-06',
      },
    ],
    languages: [
      { name: 'English', proficiency: 'Native' },
      { name: 'Spanish', proficiency: 'Advanced' },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Choose a Template</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${
              selectedTemplate === template.id
                ? 'border-[#bbad79] shadow-lg'
                : 'border-gray-200 hover:border-[#bbad79]/50 hover:shadow-md'
            }`}
            onClick={() => onSelectTemplate(template.id)}
            onMouseEnter={() => setHoveredTemplate(template.id)}
            onMouseLeave={() => setHoveredTemplate(null)}
          >
            {/* Template Preview */}
            <div className="h-48 bg-gray-100 overflow-hidden relative">
              <div className="scale-[0.25] origin-top-left w-[400%] h-[400%]">
                <TemplateRenderer 
                  templateId={template.id} 
                  data={sampleData} 
                />
              </div>
              
              {/* Overlay on hover */}
              <div className={`absolute inset-0 bg-[#bbad79]/90 flex items-center justify-center transition-opacity duration-200 ${
                hoveredTemplate === template.id ? 'opacity-100' : 'opacity-0'
              }`}>
                <button className="px-4 py-2 bg-white text-[#bbad79] font-semibold rounded-lg">
                  Select Template
                </button>
              </div>
            </div>

            {/* Template Info */}
            <div className="p-4 bg-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{template.icon}</span>
                <h4 className="font-semibold text-gray-900">{template.name}</h4>
              </div>
              <p className="text-sm text-gray-600">{template.description}</p>
            </div>

            {/* Selected Badge */}
            {selectedTemplate === template.id && (
              <div className="absolute top-2 right-2 bg-[#bbad79] text-white text-xs font-bold px-2 py-1 rounded-full">
                ✓ Selected
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateGallery;

