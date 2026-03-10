import React from 'react';
import { Link } from 'react-router-dom';
import { FaFileAlt, FaEnvelope, FaPhone, FaMapMarker, FaLinkedin, FaTwitter, FaGithub, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Home', path: '/' },
      { name: 'Templates', path: '/templates' },
      { name: 'ATS Analyzer', path: '/ats-check' },
      { name: 'Dashboard', path: '/dashboard' },
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
    ],
    features: [
      { name: 'Resume Builder', path: '/resume-builder' },
      { name: 'Cover Letter', path: '/cover-letter-builder' },
      { name: 'ATS Check', path: '/ats-check' },
    ],
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className="w-12 h-12 bg-[#bbad79] rounded-xl flex items-center justify-center group-hover:bg-[#9a9163] transition-colors">
                <FaFileAlt className="text-white text-xl" />
              </div>
              <span className="font-bold text-2xl">MN Resume Builder</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Helping professionals build stronger careers. Create professional resumes, 
              powerful cover letters, and optimize them for ATS systems.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#bbad79] hover:text-white transition-all">
                <FaLinkedin className="text-lg" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#bbad79] hover:text-white transition-all">
                <FaTwitter className="text-lg" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#bbad79] hover:text-white transition-all">
                <FaGithub className="text-lg" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#bbad79]">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-[#bbad79] transition-colors inline-block relative group"
                  >
                    {link.name}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#bbad79] transition-all group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#bbad79]">Features</h3>
            <ul className="space-y-3">
              {footerLinks.features.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-[#bbad79] transition-colors inline-block relative group"
                  >
                    {link.name}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#bbad79] transition-all group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#bbad79]">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-[#bbad79] transition-colors inline-block relative group"
                  >
                    {link.name}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#bbad79] transition-all group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-wrap justify-between items-center gap-6">
            <div className="flex flex-wrap gap-6 text-gray-400">
              <a href="mailto:support@mnresumebuilder.com" className="flex items-center gap-2 hover:text-[#bbad79] transition-colors">
                <FaEnvelope className="text-[#bbad79]" />
                support@mnresumebuilder.com
              </a>
              <span className="flex items-center gap-2">
                <FaPhone className="text-[#bbad79]" />
                +1 (555) 123-4567
              </span>
              <span className="flex items-center gap-2">
                <FaMapMarker className="text-[#bbad79]" />
                San Francisco, CA
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black py-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm gap-4">
            <div className="flex items-center gap-2">
              <p>Created by Mahira — © {currentYear} All Rights Reserved</p>
            </div>
            <p className="flex items-center gap-1">
              Made with <FaHeart className="text-red-500 text-xs mx-1" /> for professionals
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

