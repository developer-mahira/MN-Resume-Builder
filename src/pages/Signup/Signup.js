import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash, FaFileAlt, FaCheck, FaTimes, FaGoogle, FaGithub } from 'react-icons/fa';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [activeSocialProvider, setActiveSocialProvider] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();
  const { user, loading, signupWithEmail, loginWithGoogle, loginWithGithub } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      const redirectUrl = localStorage.getItem('rba_redirect_after_login');
      localStorage.removeItem('rba_redirect_after_login');
      navigate(redirectUrl || '/dashboard');
    }
  }, [loading, navigate, user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const passwordRequirements = [
    { label: 'At least 8 characters', met: formData.password.length >= 8 },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(formData.password) },
    { label: 'Contains lowercase letter', met: /[a-z]/.test(formData.password) },
    { label: 'Contains number', met: /[0-9]/.test(formData.password) },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!passwordRequirements.every(req => req.met)) {
      setError('Please meet all password requirements');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!agreedToTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }

    setFormLoading(true);

    try {
      await signupWithEmail({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      const redirectUrl = localStorage.getItem('rba_redirect_after_login');
      localStorage.removeItem('rba_redirect_after_login');

      navigate(redirectUrl || '/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-[#bbad79]/30 flex items-center justify-center"
      style={{ 
        position: 'relative', 
        overflow: 'hidden', 
        width: '100%', 
        maxWidth: '100vw',
        minHeight: '100vh'
      }}
    >
      {/* Decorative elements - hidden on mobile, visible on sm+ */}
      <div 
        className="hidden sm:block absolute" 
        style={{ 
          top: '5rem', 
          right: '2.5rem', 
          width: '18rem', 
          height: '18rem', 
          backgroundColor: 'rgba(187, 173, 121, 0.1)', 
          borderRadius: '50%', 
          filter: 'blur(3rem)',
          maxWidth: '40vw',
          maxHeight: '40vw'
        }}
      ></div>
      <div 
        className="hidden sm:block absolute" 
        style={{ 
          bottom: '5rem', 
          left: '2.5rem', 
          width: '24rem', 
          height: '24rem', 
          backgroundColor: 'rgba(187, 173, 121, 0.1)', 
          borderRadius: '50%', 
          filter: 'blur(3rem)',
          maxWidth: '40vw',
          maxHeight: '40vw'
        }}
      ></div>

      {/* Main Container */}
      <div 
        className="relative z-10"
        style={{ 
          width: '100%', 
          maxWidth: '420px',
          padding: '16px',
          boxSizing: 'border-box'
        }}
      >
        {/* Logo */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center space-x-2 group">
            <div className="w-12 h-12 bg-[#bbad79] rounded-xl flex items-center justify-center group-hover:bg-[#9a9163] transition-all shadow-lg" style={{ backgroundColor: '#bbad79' }}>
              <FaFileAlt className="text-white text-xl" />
            </div>
            <span className="font-bold text-xl text-white">MN Resume Builder</span>
          </Link>
        </div>

        {/* Signup Card */}
        <div 
          className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl"
          style={{ 
            padding: '24px 20px',
            boxSizing: 'border-box',
            width: '100%'
          }}
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-600 text-sm">Start building your professional resume today</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4 flex items-center">
              <span className="text-lg mr-2">⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#bbad79] focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                  placeholder="John Doe"
                  style={{ fontSize: '16px', minHeight: '48px', boxSizing: 'border-box', width: '100%' }}
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#bbad79] focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                  placeholder="you@example.com"
                  style={{ fontSize: '16px', minHeight: '48px', boxSizing: 'border-box', width: '100%' }}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-14 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#bbad79] focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                  placeholder="••••••••"
                  style={{ fontSize: '16px', minHeight: '48px', boxSizing: 'border-box', width: '100%' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-[#bbad79] transition-colors"
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-400" />
                  ) : (
                    <FaEye className="text-gray-400" />
                  )}
                </button>
              </div>
              
              {/* Password Requirements */}
              {formData.password && (
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center text-xs">
                      {req.met ? (
                        <FaCheck className="text-green-500 mr-1.5" />
                      ) : (
                        <FaTimes className="text-gray-400 mr-1.5" />
                      )}
                      <span className={req.met ? 'text-green-600' : 'text-gray-500'}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#bbad79] focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                  placeholder="••••••••"
                  style={{ fontSize: '16px', minHeight: '48px', boxSizing: 'border-box', width: '100%' }}
                />
              </div>
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <div className="flex items-center text-sm text-green-600 mt-2">
                  <FaCheck className="mr-2" />
                  Passwords match
                </div>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-4 h-4 mt-1 text-[#bbad79] border-gray-300 rounded focus:ring-[#bbad79] cursor-pointer"
              />
              <span className="ml-2 text-sm text-gray-600">
                I agree to the{' '}
                <Link to="/terms" className="text-[#bbad79] hover:text-[#9a9163] font-medium">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-[#bbad79] hover:text-[#9a9163] font-medium">
                  Privacy Policy
                </Link>
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={formLoading}
              className="w-full py-4 bg-gradient-to-r from-[#bbad79] to-[#9a9163] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#bbad79]/30 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              style={{ minHeight: '48px', boxSizing: 'border-box', width: '100%' }}
            >
              {formLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or sign up with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex flex-col gap-3">
            <button 
              onClick={async () => {
                setActiveSocialProvider('google');
                setError('');
                try {
                  const result = await loginWithGoogle();
                  if (!result?.redirecting) {
                    const redirectUrl = localStorage.getItem('rba_redirect_after_login');
                    localStorage.removeItem('rba_redirect_after_login');
                    navigate(redirectUrl || '/dashboard');
                  }
                } catch (err) {
                  setError(err.message || 'Google sign up failed. Please try again.');
                } finally {
                  setActiveSocialProvider('');
                }
              }}
              disabled={!!activeSocialProvider}
              className="flex items-center justify-center py-4 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-[#bbad79] transition-all group w-full disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ minHeight: '48px', boxSizing: 'border-box', width: '100%' }}
            >
              <FaGoogle className="text-gray-600 group-hover:text-[#bbad79] transition-colors mr-2" />
              <span className="text-gray-700 font-medium">
                {activeSocialProvider === 'google' ? 'Connecting...' : 'Google'}
              </span>
            </button>
            <button 
              onClick={async () => {
                setActiveSocialProvider('github');
                setError('');
                try {
                  const result = await loginWithGithub();
                  if (!result?.redirecting) {
                    const redirectUrl = localStorage.getItem('rba_redirect_after_login');
                    localStorage.removeItem('rba_redirect_after_login');
                    navigate(redirectUrl || '/dashboard');
                  }
                } catch (err) {
                  setError(err.message || 'GitHub sign up failed. Please try again.');
                } finally {
                  setActiveSocialProvider('');
                }
              }}
              disabled={!!activeSocialProvider}
              className="flex items-center justify-center py-4 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-[#bbad79] transition-all group w-full disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ minHeight: '48px', boxSizing: 'border-box', width: '100%' }}
            >
              <FaGithub className="text-gray-600 group-hover:text-[#bbad79] transition-colors mr-2" />
              <span className="text-gray-700 font-medium">
                {activeSocialProvider === 'github' ? 'Connecting...' : 'GitHub'}
              </span>
            </button>
          </div>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-gray-600 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-[#bbad79] hover:text-[#9a9163] font-semibold">
              Sign in
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6 pb-4">
          <Link to="/" className="text-gray-400 hover:text-white transition-colors inline-flex items-center text-sm">
            <span className="mr-2">←</span> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;

