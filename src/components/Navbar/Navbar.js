import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaFileAlt, FaUser, FaSignOutAlt, FaHome, FaThLarge, FaSearch, FaChartLine, FaEnvelope } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedUser = localStorage.getItem('rba_current_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [location]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('rba_current_user');
    setUser(null);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: <FaHome className="w-4 h-4" /> },
    { name: 'Templates', path: '/templates', icon: <FaThLarge className="w-4 h-4" /> },
    { name: 'Cover Letter', path: '/cover-letter-builder', icon: <FaEnvelope className="w-4 h-4" /> },
    { name: 'ATS Analyzer', path: '/ats-check', icon: <FaSearch className="w-4 h-4" /> },
    { name: 'Dashboard', path: '/dashboard', icon: <FaChartLine className="w-4 h-4" /> },
  ];

  const textColor = 'text-white';
  const bgColor = 'bg-[#1a2332]';

  return (
    <nav className={`fixed w-full z-50 py-3 lg:py-4 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo - Always visible */}
          <Link to="/" className="flex items-center space-x-2 group flex-shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#bbad79] rounded-lg flex items-center justify-center group-hover:bg-[#9a9163] transition-colors">
              <FaFileAlt className="text-white text-sm sm:text-lg" />
            </div>
            <span className={`font-bold text-lg sm:text-xl ${textColor} transition-colors hidden xs:block`}>
              MN Resume
            </span>
            <span className={`font-bold text-lg sm:text-xl ${textColor} transition-colors xs:hidden`}>
              MN
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-[#bbad79]/10 ${
                  location.pathname === link.path
                    ? 'text-[#bbad79] bg-[#bbad79]/10'
                    : `${textColor} hover:text-[#bbad79]`
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#bbad79] rounded-full flex items-center justify-center">
                    <FaUser className="text-white text-sm" />
                  </div>
                  <span className="text-sm text-gray-300 hidden xl:block">{user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors"
                >
                  <FaSignOutAlt />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-sm font-medium px-3 py-2 rounded-lg transition-colors text-white hover:text-[#bbad79]"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-[#bbad79] text-white text-sm font-medium rounded-lg hover:bg-[#9a9163] transition-all hover:shadow-lg"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <FaTimes className="text-white text-xl" />
            ) : (
              <FaBars className={`${textColor} text-xl`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? 'max-h-[500px] mt-3' : 'max-h-0'
          }`}
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl py-2 px-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === link.path
                    ? 'bg-[#bbad79] text-white'
                    : 'text-gray-700 hover:bg-[#bbad79]/10 hover:text-[#bbad79]'
                }`}
              >
                {link.icon}
                <span className="font-medium">{link.name}</span>
              </Link>
            ))}
            <hr className="my-2 border-gray-200" />
            {user ? (
              <div className="px-4 py-2">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-[#bbad79] rounded-full flex items-center justify-center">
                    <FaUser className="text-white text-sm" />
                  </div>
                  <span className="text-sm text-gray-700">{user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2 px-3 py-2">
                <Link
                  to="/login"
                  className="block w-full px-4 py-3 text-center text-gray-700 hover:bg-[#bbad79]/10 hover:text-[#bbad79] rounded-lg transition-colors font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="block w-full px-4 py-3 text-center bg-[#bbad79] text-white rounded-lg hover:bg-[#9a9163] transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

