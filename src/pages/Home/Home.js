import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaFileAlt, FaEnvelope, FaSearch, FaThLarge, FaDownload, 
  FaShieldAlt, FaArrowRight, FaCheckCircle, FaStar, FaPencilAlt
} from 'react-icons/fa';
import TemplateRenderer from '../../components/ResumeTemplates/TemplateRenderer';
import { getAllTemplates } from '../../components/ResumeTemplates/TemplateRenderer';

const Home = () => {
  const features = [
    {
      icon: <FaFileAlt className="text-3xl" />,
      title: 'Resume Builder',
      description: 'Create structured, professional resumes with live preview.',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: <FaEnvelope className="text-3xl" />,
      title: 'Cover Letter Generator',
      description: 'Generate personalized cover letters in seconds.',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: <FaSearch className="text-3xl" />,
      title: 'ATS Resume Analyzer',
      description: 'Analyze resumes and receive optimization suggestions.',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: <FaThLarge className="text-3xl" />,
      title: 'Multiple Templates',
      description: 'Choose from modern professional templates.',
      color: 'bg-pink-100 text-pink-600',
    },
    {
      icon: <FaDownload className="text-3xl" />,
      title: 'One Click PDF Export',
      description: 'Download resumes and cover letters instantly.',
      color: 'bg-orange-100 text-orange-600',
    },
    {
      icon: <FaShieldAlt className="text-3xl" />,
      title: 'Secure Account System',
      description: 'Your data is protected with Firebase authentication.',
      color: 'bg-teal-100 text-teal-600',
    },
  ];

  const templates = getAllTemplates();

  const navigate = useNavigate();

  const handleUseTemplate = (templateId) => {
    navigate(`/resume-builder?template=${templateId}`);
  };

  return (
    <div className="min-h-screen">
      {/* Navbar spacer */}
      <div className="h-16 sm:h-20"></div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background - solid dark navy blue */}
        <div className="absolute inset-0 bg-[#1a2332]"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-2 sm:left-10 w-40 h-40 sm:w-72 sm:h-72 bg-[#bbad79]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-2 sm:right-10 w-52 h-52 sm:w-96 sm:h-96 bg-[#bbad79]/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fadeIn break-words">
            Build a Resume That{' '}
            <span className="text-[#bbad79]">Gets You Hired.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-2xl text-gray-300 mb-8 sm:mb-10 max-w-3xl mx-auto animate-fadeIn delay-100">
            Create professional resumes, powerful cover letters, and optimize them for ATS systems — 
            all in one powerful platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fadeIn delay-200 max-w-4xl mx-auto">
            <Link
              to="/resume-builder"
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-[#bbad79] text-white font-semibold rounded-xl hover:bg-[#9a9163] transition-all shadow-lg text-center"
            >
              Create Resume
            </Link>
            <Link
              to="/ats-check"
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/30 text-center"
            >
              Analyze My Resume
            </Link>
            <Link
              to="/signup"
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-transparent text-white font-semibold rounded-xl hover:bg-white/10 transition-all border border-white/30 text-center"
            >
              Get Started Free
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-8 animate-fadeIn delay-300">
            {[
              { number: '50K+', label: 'Resumes Created' },
              { number: '95%', label: 'Success Rate' },
              { number: '500+', label: 'Templates' },
              { number: '4.9/5', label: 'User Rating' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#bbad79] mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-[#bbad79] rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-14 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Build Your Career
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful tools to create professional resumes that stand out
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-5 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Preview Section */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Professional Resume Templates
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our collection of professionally designed templates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {templates.map((template) => (
              <div
                key={template.id}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
                onClick={() => handleUseTemplate(template.id)}
              >
                {/* Optimized Template Preview */}
                <div className="h-56 overflow-hidden bg-gray-50 p-4">
                  <TemplateRenderer templateId={template.id} isPreview={true} />
                </div>
                
                {/* Template Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#bbad79] transition-colors">
                      {template.name}
                    </h3>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar key={star} className="text-[#bbad79] text-xs" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{template.description}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUseTemplate(template.id);
                    }}
                    className="w-full py-2.5 bg-[#bbad79] text-white font-medium rounded-lg hover:bg-[#9a9163] transition-colors flex items-center justify-center gap-2"
                  >
                    Use Template
                    <FaArrowRight className="text-xs" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/templates"
              className="inline-flex items-center px-6 sm:px-8 py-3.5 sm:py-4 bg-[#bbad79] text-white font-semibold rounded-xl hover:bg-[#9a9163] transition-all group"
            >
              Browse Templates
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ATS Analyzer Promotion Section */}
      <section className="py-14 sm:py-20 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
                Is Your Resume <span className="text-[#bbad79]">ATS Friendly?</span>
              </h2>
              <p className="text-base sm:text-xl text-gray-300 mb-8">
                Most companies use ATS (Applicant Tracking Systems) to filter resumes. 
                Make sure yours passes the test!
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Keyword density analysis',
                  'Missing industry keywords detection',
                  'ATS formatting check',
                  'Skills optimization suggestions',
                  'Compatibility score out of 100',
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <FaCheckCircle className="text-[#bbad79] mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/ats-check"
                className="inline-flex items-center px-6 sm:px-8 py-3.5 sm:py-4 bg-[#bbad79] text-white font-semibold rounded-xl hover:bg-[#9a9163] transition-all"
              >
                Check My Resume
                <FaArrowRight className="ml-2" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-2xl">
              <div className="text-center mb-8">
                <div className="text-5xl sm:text-6xl font-bold text-[#bbad79] mb-2">78</div>
                <div className="text-gray-500">/ 100 ATS Score</div>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Keyword Optimization', value: 85, color: 'bg-green-500' },
                  { label: 'Formatting', value: 70, color: 'bg-yellow-500' },
                  { label: 'Skills Match', value: 90, color: 'bg-green-500' },
                  { label: 'Content Quality', value: 75, color: 'bg-yellow-500' },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{item.label}</span>
                      <span className="text-gray-500">{item.value}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-14 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Create your professional resume in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: <FaPencilAlt className="text-3xl" />,
                title: 'Fill Your Details',
                description: 'Enter your personal information, work experience, education, and skills.',
              },
              {
                icon: <FaThLarge className="text-3xl" />,
                title: 'Choose a Template',
                description: 'Select from our professional templates optimized for your industry.',
              },
              {
                icon: <FaDownload className="text-3xl" />,
                title: 'Download PDF',
                description: 'Export your resume as a professional PDF ready to apply.',
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-[#bbad79] text-white rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  {step.icon}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of professionals who landed their dream jobs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Marketing Manager',
                text: 'MN Resume Builder helped me create a professional resume that got me noticed. I landed my dream job within 2 weeks!',
              },
              {
                name: 'Michael Chen',
                role: 'Software Engineer',
                text: 'The ATS analyzer is incredible. It helped me optimize my resume and pass the initial screening for top tech companies.',
              },
              {
                name: 'Emily Davis',
                role: 'Product Designer',
                text: 'Beautiful templates and easy to use. The cover letter generator saved me so much time. Highly recommended!',
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-5 sm:p-8 rounded-2xl">
                <div className="flex text-[#bbad79] mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar key={star} />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 sm:py-20 bg-gradient-to-r from-[#bbad79] to-[#9a9163]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
            Start Building Your Professional Resume Today
          </h2>
          <p className="text-base sm:text-xl text-white/90 mb-8 sm:mb-10">
            Join thousands of professionals who have successfully built their careers with MN Resume Builder
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/resume-builder"
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-[#bbad79] font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-lg"
            >
              Create Resume
            </Link>
            <Link
              to="/signup"
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-transparent text-white font-semibold rounded-xl hover:bg-white/10 transition-all border-2 border-white"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </section>

      {/* Footer spacer */}
      <div className="h-16 sm:h-20"></div>
    </div>
  );
};

export default Home;

