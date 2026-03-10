import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaFileAlt, FaGoogle, FaGithub } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    // Accept any email + password combination for frictionless demo/testing
    try {
      const user = {
        email: email,
        name: email.split('@')[0], // Use part before @ as default name
        password: password
      };
      
      // Save session
      localStorage.setItem('rba_current_user', JSON.stringify(user));
      
      // Check for redirect after login
      const redirectUrl = localStorage.getItem('rba_redirect_after_login');
      localStorage.removeItem('rba_redirect_after_login');
      
      setTimeout(() => {
        if (redirectUrl) {
          navigate(redirectUrl);
        } else {
          navigate('/dashboard');
        }
      }, 500);
    } catch (err) {
      setError('Failed to sign in. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-[#bbad79]/30 flex items-center justify-center px-4 py-12">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#bbad79]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#bbad79]/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#bbad79]/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-3 group">
            <div className="w-14 h-14 bg-[#bbad79] rounded-2xl flex items-center justify-center group-hover:bg-[#9a9163] transition-all shadow-lg shadow-[#bbad79]/30">
              <FaFileAlt className="text-white text-2xl" />
            </div>
            <span className="font-bold text-2xl text-white">MN Resume Builder</span>
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to continue building your career</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 flex items-center">
              <span className="text-lg mr-2">⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#bbad79] focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                  placeholder="you@example.com"
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
                  className="w-full pl-12 pr-14 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#bbad79] focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                  placeholder="••••••••"
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
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-[#bbad79] border-gray-300 rounded focus:ring-[#bbad79] cursor-pointer" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-[#bbad79] hover:text-[#9a9163] font-medium">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[#bbad79] to-[#9a9163] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#bbad79]/30 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
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
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center py-3.5 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-[#bbad79] transition-all group">
              <FaGoogle className="text-gray-600 group-hover:text-[#bbad79] transition-colors mr-2" />
              <span className="text-gray-700 font-medium">Google</span>
            </button>
            <button className="flex items-center justify-center py-3.5 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-[#bbad79] transition-all group">
              <FaGithub className="text-gray-600 group-hover:text-[#bbad79] transition-colors mr-2" />
              <span className="text-gray-700 font-medium">GitHub</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#bbad79] hover:text-[#9a9163] font-semibold">
              Sign up for free
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link to="/" className="text-gray-400 hover:text-white transition-colors inline-flex items-center">
            <span className="mr-2">←</span> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

