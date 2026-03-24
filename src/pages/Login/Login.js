import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaFileAlt, FaGoogle, FaGithub } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  const [activeSocialProvider, setActiveSocialProvider] = useState('');
  const navigate = useNavigate();
  const { loginWithEmail, loginWithGoogle, loginWithGithub, error: authError } = useAuth();

  const navigateAfterAuth = () => {
    const redirectUrl = localStorage.getItem('rba_redirect_after_login');
    localStorage.removeItem('rba_redirect_after_login');
    navigate(redirectUrl || '/dashboard');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setEmailLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setEmailLoading(false);
      return;
    }

    try {
      await loginWithEmail(email, password);
      navigateAfterAuth();
    } catch (err) {
      setError(err.message || 'Failed to sign in. Please try again.');
    } finally {
      setEmailLoading(false);
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-[#bbad79]/30 flex items-center justify-center w-full overflow-hidden relative px-3 sm:px-0">
      {/* Decorative elements - hidden on mobile, visible on sm+ */}
      <div className="hidden sm:block absolute top-20 left-10 w-72 h-72 bg-[rgba(187,173,121,0.1)] rounded-full [filter:blur(3rem)] max-w-[40vw] max-h-[40vw]"></div>
      <div className="hidden sm:block absolute bottom-20 right-10 w-96 h-96 bg-[rgba(187,173,121,0.1)] rounded-full [filter:blur(3rem)] max-w-[40vw] max-h-[40vw]"></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md mx-auto p-4 sm:max-w-lg">
        {/* Logo */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center space-x-2 group">
            <div className="w-12 h-12 bg-[#bbad79] rounded-xl flex items-center justify-center group-hover:bg-[#9a9163] transition-all shadow-lg">
              <FaFileAlt className="text-white text-xl" />
            </div>
            <span className="font-bold text-xl text-white">MN Resume Builder</span>
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 w-full box-border">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600 text-sm">Sign in to continue building your career</p>
          </div>

{error || authError ? (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4 flex items-center">
              <span className="text-lg mr-2">⚠️</span>
              {error || authError}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-[#bbad79] border-gray-300 rounded focus:ring-[#bbad79] cursor-pointer" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-[#bbad79] hover:text-[#9a9163] font-medium text-right sm:text-left">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={emailLoading}
              className="w-full py-4 bg-gradient-to-r from-[#bbad79] to-[#9a9163] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#bbad79]/30 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              style={{ minHeight: '48px', boxSizing: 'border-box', width: '100%' }}
            >
              {emailLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with</span>
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
                    navigateAfterAuth();
                  }
                } catch (err) {
                  setError(err.message || 'Google login failed. Please try again.');
                } finally {
                  setActiveSocialProvider('');
                }
              }}
              disabled={!!activeSocialProvider}
              className="flex items-center justify-center py-4 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-[#bbad79] transition-all group w-full disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ minHeight: '48px', boxSizing: 'border-box', width: '100%' }}
            >
              {activeSocialProvider === 'google' ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <FaGoogle className="text-gray-600 group-hover:text-[#bbad79] transition-colors mr-2" />
              )}
              <span className="text-gray-700 font-medium">
                {activeSocialProvider === 'google' ? 'Signing in with Google...' : 'Google'}
              </span>
            </button>
            <button 
              onClick={async () => {
                setActiveSocialProvider('github');
                setError('');
                try {
                  const result = await loginWithGithub();
                  if (!result?.redirecting) {
                    navigateAfterAuth();
                  }
                } catch (err) {
                  setError(err.message || 'GitHub login failed. Please try again.');
                } finally {
                  setActiveSocialProvider('');
                }
              }}
              disabled={!!activeSocialProvider}
              className="flex items-center justify-center py-4 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-[#bbad79] transition-all group w-full disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ minHeight: '48px', boxSizing: 'border-box', width: '100%' }}
            >
              {activeSocialProvider === 'github' ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <FaGithub className="text-gray-600 group-hover:text-[#bbad79] transition-colors mr-2" />
              )}
              <span className="text-gray-700 font-medium">
                {activeSocialProvider === 'github' ? 'Signing in with GitHub...' : 'GitHub'}
              </span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-gray-600 text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#bbad79] hover:text-[#9a9163] font-semibold">
              Sign up for free
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

export default Login;

