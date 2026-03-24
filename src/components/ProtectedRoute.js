import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LoadingSpinner } from './LoadingSpinner'; // We'll create this next

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    const returnUrl = window.location.pathname;
    localStorage.setItem('rba_redirect_after_login', returnUrl);
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

