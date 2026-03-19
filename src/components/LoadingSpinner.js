import React from 'react';

export const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-16 h-16 border-4 border-[#bbad79]/20 border-t-[#bbad79] rounded-full animate-spin"></div>
      <div className="text-center">
        <p className="text-lg font-semibold text-gray-700">Loading your workspace...</p>
        <p className="text-sm text-gray-500 mt-1">Setting up your account</p>
      </div>
    </div>
  </div>
);

