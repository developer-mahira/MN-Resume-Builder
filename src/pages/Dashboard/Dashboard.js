import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaFileAlt, FaEnvelope, FaSearch, FaPlus, FaEdit, FaTrash, 
  FaDownload, FaUser, FaSignOutAlt, FaBars, FaCheckCircle, FaClock
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { LoadingSpinner } from '../../components/LoadingSpinner';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [savedResumes, setSavedResumes] = useState([]);
  const location = useLocation();
  const { user, logout, loading } = useAuth();

  useEffect(() => {
    if (user) {
      loadResumes();
    }
  }, [user]);

  const loadResumes = () => {
    const resumes = JSON.parse(localStorage.getItem('rba_resumes') || '[]');
    setSavedResumes(resumes);
  };

  const handleLogout = async () => {
    await logout();
  };

  const deleteResume = (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      const resumes = savedResumes.filter(r => r.id !== id);
      localStorage.setItem('rba_resumes', JSON.stringify(resumes));
      setSavedResumes(resumes);
    }
  };

  const menuItems = [
    { icon: <FaFileAlt className="w-4 h-4" />, label: 'My Resumes', path: '/dashboard' },
    { icon: <FaPlus className="w-4 h-4" />, label: 'Create New', path: '/resume-builder' },
    { icon: <FaEnvelope className="w-4 h-4" />, label: 'Cover Letters', path: '/cover-letter-builder' },
    { icon: <FaSearch className="w-4 h-4" />, label: 'ATS Analyzer', path: '/ats-check' },
  ];

  const stats = [
    { label: 'Total Resumes', value: savedResumes.length, icon: <FaFileAlt className="w-5 h-5" /> },
    { label: 'Completed', value: savedResumes.filter(r => r.status === 'complete').length, icon: <FaCheckCircle className="w-5 h-5" /> },
    { label: 'Drafts', value: savedResumes.filter(r => r.status === 'draft').length, icon: <FaClock className="w-5 h-5" /> },
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        {/* Logo */}
        <div className="h-16 lg:h-20 flex items-center px-4 lg:px-6 border-b border-gray-100">
          <Link to="/" className="flex items-center space-x-2">
            <FaFileAlt className="text-xl lg:text-2xl text-[#bbad79]" />
            <span className="font-bold text-lg lg:text-xl text-gray-900">MN Resume</span>
          </Link>
        </div>

        {/* User Info */}
        <div className="p-4 lg:p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 lg:w-10 lg:h-10 bg-[#bbad79] rounded-full flex items-center justify-center flex-shrink-0">
              <FaUser className="text-white text-sm" />
            </div>
            <div className="min-w-0">
              <p className="font-medium text-gray-900 truncate">{user.name || 'User'}</p>
              <p className="text-xs lg:text-sm text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-3 lg:p-4 space-y-1">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center space-x-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-[#bbad79] text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-3 lg:px-4 py-2.5 lg:py-3 w-full text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <FaSignOutAlt className="w-4 h-4" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <header className="min-h-[56px] lg:min-h-[80px] bg-white shadow-sm flex items-center justify-between gap-3 px-3 lg:px-6 lg:px-8 py-2">
          <button 
            className="lg:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-600"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars className="text-lg lg:text-xl" />
          </button>

          <h1 className="text-lg lg:text-xl font-semibold text-gray-900 lg:hidden">Dashboard</h1>
          <div className="hidden lg:block"></div>

          <Link
            to="/resume-builder"
            className="flex items-center space-x-2 px-3 lg:px-4 py-2.5 bg-[#bbad79] text-white rounded-lg hover:bg-[#9a9163] transition-colors text-sm shrink-0"
          >
            <FaPlus className="w-4 h-4" />
            <span className="hidden sm:inline">Create Resume</span>
            <span className="sm:hidden">New</span>
          </Link>
        </header>

        {/* Dashboard Content */}
        <main className="p-3 lg:p-6 xl:p-8">
          {/* Welcome Section */}
          <div className="mb-6 lg:mb-8">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-1 lg:mb-2">
              Welcome back, {user.name || 'User'}! 👋
            </h2>
            <p className="text-sm lg:text-base text-gray-600">
              Here's an overview of your resume activities
            </p>
          </div>

          {/* Stats Cards - Responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs lg:text-sm text-gray-500 mb-1">{stat.label}</p>
                    <p className="text-2xl lg:text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className="w-10 lg:w-12 h-10 lg:h-12 bg-[#bbad79]/10 rounded-lg flex items-center justify-center text-[#bbad79]">
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions - Responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
            <Link
              to="/resume-builder"
              className="bg-gradient-to-br from-[#bbad79] to-[#9a9163] rounded-xl p-4 lg:p-6 text-white hover:shadow-lg transition-shadow"
            >
              <FaPlus className="text-2xl lg:text-3xl mb-3 lg:mb-4" />
              <h3 className="text-base lg:text-xl font-semibold mb-1 lg:mb-2">Create New Resume</h3>
              <p className="text-white/80 text-sm">Start building a professional resume from scratch</p>
            </Link>

            <Link
              to="/cover-letter-builder"
              className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <FaEnvelope className="text-2xl lg:text-3xl text-purple-500 mb-3 lg:mb-4" />
              <h3 className="text-base lg:text-xl font-semibold text-gray-900 mb-1 lg:mb-2">Cover Letter</h3>
              <p className="text-gray-600 text-sm">Generate a personalized cover letter</p>
            </Link>

            <Link
              to="/ats-check"
              className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <FaSearch className="text-2xl lg:text-3xl text-green-500 mb-3 lg:mb-4" />
              <h3 className="text-base lg:text-xl font-semibold text-gray-900 mb-1 lg:mb-2">ATS Check</h3>
              <p className="text-gray-600 text-sm">Analyze your resume for ATS compatibility</p>
            </Link>
          </div>

          {/* Saved Resumes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-4 lg:p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-base lg:text-lg font-semibold text-gray-900">My Resumes</h3>
                <Link
                  to="/resume-builder"
                  className="text-[#bbad79] hover:text-[#9a9163] font-medium text-sm"
                >
                  View All
                </Link>
              </div>
            </div>

            {/* Resume List - Responsive */}
            <div className="divide-y divide-gray-100">
              {savedResumes.map((resume) => (
                <div key={resume.id} className="p-4 lg:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3 lg:space-x-4 min-w-0">
                    <div className="w-10 lg:w-12 h-10 lg:h-12 bg-[#bbad79]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaFileAlt className="text-[#bbad79]" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">{resume.name}</h4>
                      <p className="text-xs lg:text-sm text-gray-500">
                        {resume.template} • {resume.lastModified}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3">
                    <span className={`px-2 lg:px-3 py-1 rounded-full text-xs font-medium ${
                      resume.status === 'complete' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {resume.status === 'complete' ? 'Completed' : 'Draft'}
                    </span>

                    <div className="flex items-center flex-wrap gap-1 lg:gap-2">
                      <Link 
                        to={`/resume-builder?resumeId=${resume.id}`}
                        className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-500 hover:text-[#bbad79] transition-colors"
                      >
                        <FaEdit className="text-sm" />
                      </Link>
                      <Link
                        to={`/resume-builder?resumeId=${resume.id}&download=1`}
                        className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-500 hover:text-green-600 transition-colors"
                      >
                        <FaDownload className="text-sm" />
                      </Link>
                      <button 
                        onClick={() => deleteResume(resume.id)} 
                        className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-500 hover:text-red-600 transition-colors"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {savedResumes.length === 0 && (
              <div className="p-8 lg:p-12 text-center">
                <FaFileAlt className="text-5xl lg:text-6xl text-gray-200 mx-auto mb-4" />
                <h4 className="text-base lg:text-lg font-medium text-gray-900 mb-2">No resumes yet</h4>
                <p className="text-gray-500 mb-6 text-sm lg:text-base">Create your first resume to get started</p>
                <Link
                  to="/resume-builder"
                  className="inline-flex items-center space-x-2 px-5 lg:px-6 py-2.5 lg:py-3 bg-[#bbad79] text-white rounded-lg hover:bg-[#9a9163] transition-colors text-sm"
                >
                  <FaPlus />
                  <span>Create Resume</span>
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

