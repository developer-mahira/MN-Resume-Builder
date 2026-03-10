import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaStar, FaDownload, FaEye } from 'react-icons/fa';
import TemplateRenderer from '../../components/ResumeTemplates/TemplateRenderer';
import { getAllTemplates } from '../../components/ResumeTemplates/TemplateRenderer';

// Sample data for previews
const sampleData = {
  personal: {
    firstName: 'Mahira',
    lastName: 'Noor',
    email: 'mahira.noor@email.com',
    phone: '+1 555-123-4567',
    city: 'San Francisco',
    country: 'USA',
    linkedin: 'linkedin.com/in/mahiranoor',
    portfolio: 'mahiranoor.dev',
    summary: 'Experienced professional with expertise in delivering results.',
  },
  skills: ['JavaScript', 'React', 'Node.js'],
  workExperience: [
    { jobTitle: 'Senior Developer', company: 'Tech Corp', startDate: '2020-01', endDate: '', description: 'Led development of key features.' },
  ],
  education: [
    { degree: 'BS Computer Science', institution: 'Stanford University', startYear: '2016', endYear: '2020', gpa: '3.8' },
  ],
  projects: [
    { name: 'E-Commerce Platform', technologies: 'React, Node.js', description: 'Built full-featured online store.' },
  ],
  certifications: [
    { name: 'AWS Solutions Architect', issuer: 'Amazon Web Services', date: '2022-06' },
  ],
  languages: [
    { name: 'English', proficiency: 'Native' },
  ],
};

const Templates = () => {
  const templates = getAllTemplates();

  const templateIdMap = {
    1: 'minimal',
    2: 'corporate',
    3: 'creative',
    4: 'ats',
    5: 'sidebar',
    6: 'developer',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-[#bbad79]">
            <FaArrowLeft />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Resume Templates</h1>
          <div></div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Professional Resume <span className="text-[#bbad79]">Templates</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our collection of professionally designed templates
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template, index) => (
            <div
              key={template.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Preview Area - Real Resume Preview */}
              <div className="bg-gray-100 h-56 overflow-hidden p-4">
                <TemplateRenderer templateId={template.id} isPreview={true} />
              </div>

              {/* Template Info */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar key={star} className="text-[#bbad79] text-sm" />
                  ))}
                  <span className="text-sm text-gray-500 ml-2">4.9 (128 reviews)</span>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Link
                    to={`/resume-builder?template=${template.id}`}
                    className="flex-1 py-2 bg-[#bbad79] text-white text-center rounded-lg hover:bg-[#9a9163] transition-colors text-sm font-medium"
                  >
                    Use Template
                  </Link>
                  <Link 
                    to={`/resume-builder?template=${template.id}`}
                    className="p-2 border border-gray-300 rounded-lg hover:border-[#bbad79] hover:text-[#bbad79] transition-colors"
                  >
                    <FaEye />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-[#bbad79] to-[#9a9163] rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Can't Find What You're Looking For?</h3>
          <p className="mb-6 max-w-xl mx-auto">
            We have many more templates in our collection. Sign up to access all templates and features.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/signup"
              className="px-8 py-3 bg-white text-[#bbad79] font-semibold rounded-xl hover:bg-gray-100 transition-colors"
            >
              Sign Up Free
            </Link>
            <Link
              to="/resume-builder"
              className="px-8 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-colors"
            >
              Create Custom Resume
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Templates;

