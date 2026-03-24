import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaStar, FaEye } from 'react-icons/fa';
import TemplateRenderer from '../../components/ResumeTemplates/TemplateRenderer';
import { getAllTemplates } from '../../components/ResumeTemplates/TemplateRenderer';

const Templates = () => {
  const templates = getAllTemplates();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-[#bbad79] text-sm sm:text-base">
            <FaArrowLeft />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-base sm:text-xl font-bold text-gray-900 text-right">Resume Templates</h1>
          <div></div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Professional Resume <span className="text-[#bbad79]">Templates</span>
          </h2>
          <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our collection of professionally designed templates
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
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
              <div className="p-5 sm:p-6">
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
                    className="flex-1 py-2.5 bg-[#bbad79] text-white text-center rounded-lg hover:bg-[#9a9163] transition-colors text-sm font-medium"
                  >
                    Use Template
                  </Link>
                  <Link 
                    to={`/resume-builder?template=${template.id}`}
                    className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center border border-gray-300 rounded-lg hover:border-[#bbad79] hover:text-[#bbad79] transition-colors"
                  >
                    <FaEye />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-[#bbad79] to-[#9a9163] rounded-2xl p-5 sm:p-8 text-center text-white">
          <h3 className="text-xl sm:text-2xl font-bold mb-4">Can't Find What You're Looking For?</h3>
          <p className="mb-6 max-w-xl mx-auto">
            We have many more templates in our collection. Sign up to access all templates and features.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/signup"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-white text-[#bbad79] font-semibold rounded-xl hover:bg-gray-100 transition-colors"
            >
              Sign Up Free
            </Link>
            <Link
              to="/resume-builder"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-colors"
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

