import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Lazy load all pages for performance
const Navbar = lazy(() => import('./components/Navbar/Navbar'));
const Footer = lazy(() => import('./components/Footer/Footer'));
const Home = lazy(() => import('./pages/Home/Home'));
const Login = lazy(() => import('./pages/Login/Login'));
const Signup = lazy(() => import('./pages/Signup/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const ResumeBuilder = lazy(() => import('./pages/ResumeBuilder/ResumeBuilder'));
const CoverLetterBuilder = lazy(() => import('./pages/CoverLetterBuilder/CoverLetterBuilder'));
const ATSAnalyzer = lazy(() => import('./pages/ATSAnalyzer/ATSAnalyzer'));
const Templates = lazy(() => import('./pages/Templates/Templates'));

// Simple Loading component (no external dependency)
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 border-4 border-[#bbad79] border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

// Page wrapper with Suspense
const PageWrapper = ({ children }) => (
  <Suspense fallback={<LoadingSpinner />}>
    {children}
  </Suspense>
);

function App() {
  return (
    <Router>
      <div className="App min-h-screen flex flex-col">
        {/* Routes that need Navbar */}
        <Routes>
          <Route path="/" element={
            <PageWrapper>
              <Navbar />
              <Home />
              <Footer />
            </PageWrapper>
          } />
          <Route path="/templates" element={
            <PageWrapper>
              <Navbar />
              <Templates />
              <Footer />
            </PageWrapper>
          } />
        </Routes>

        {/* Auth Routes without Navbar */}
        <Routes>
          <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
          <Route path="/signup" element={<PageWrapper><Signup /></PageWrapper>} />
        </Routes>

        {/* Protected Routes with Dashboard Layout */}
        <Routes>
          <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
          <Route path="/resume-builder" element={<PageWrapper><ResumeBuilder /></PageWrapper>} />
          <Route path="/cover-letter" element={<PageWrapper><CoverLetterBuilder /></PageWrapper>} />
          <Route path="/cover-letter-builder" element={<PageWrapper><CoverLetterBuilder /></PageWrapper>} />
          <Route path="/ats-check" element={<PageWrapper><ATSAnalyzer /></PageWrapper>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

