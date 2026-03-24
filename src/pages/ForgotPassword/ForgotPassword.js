import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft, FaFileAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const result = await resetPassword(email);
      setMessage(result.message);
    } catch (err) {
      setError(err.message || 'Unable to send reset email right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a2332] via-[#243042] to-[#0f1722] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white/95 backdrop-blur rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        <div className="px-6 sm:px-8 pt-7 pb-6 border-b border-gray-100">
          <Link to="/login" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#bbad79] transition-colors">
            <FaArrowLeft />
            <span>Back to Login</span>
          </Link>
          <div className="mt-6 flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#bbad79] flex items-center justify-center text-white">
              <FaFileAlt />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
              <p className="text-sm text-gray-500">We’ll help you get back into your account.</p>
            </div>
          </div>
        </div>

        <div className="px-6 sm:px-8 py-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#bbad79] focus:border-transparent min-h-[48px]"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {message && (
              <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {message}
              </div>
            )}

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3.5 bg-[#bbad79] text-white font-semibold rounded-xl hover:bg-[#9a9163] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending reset link...' : 'Send Reset Link'}
            </button>
          </form>

          <p className="mt-5 text-sm text-gray-500 leading-6">
            Demo/local accounts do not support email reset links. Firebase email accounts and supported providers do.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
