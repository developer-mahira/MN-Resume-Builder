import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

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
const ForgotPassword = lazy(() => import('./pages/ForgotPassword/ForgotPassword'));
const Terms = lazy(() => import('./pages/Terms/Terms'));
const Privacy = lazy(() => import('./pages/Privacy/Privacy'));
const About = lazy(() => import('./pages/About/About'));
const Contact = lazy(() => import('./pages/Contact/Contact'));

// Page wrapper with Suspense
const PageWrapper = ({ children }) => (
  <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 border-4 border-[#bbad79] border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>}>
    {children}
  </Suspense>
);

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  return null;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
<div className="App min-h-screen flex flex-col max-w-full overflow-x-hidden antialiased">
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
            <Route path="/about" element={
              <PageWrapper>
                <Navbar />
                <About />
                <Footer />
              </PageWrapper>
            } />
            <Route path="/contact" element={
              <PageWrapper>
                <Navbar />
                <Contact />
                <Footer />
              </PageWrapper>
            } />
          </Routes>

          {/* Auth Routes without Navbar */}
          <Routes>
            <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
            <Route path="/signup" element={<PageWrapper><Signup /></PageWrapper>} />
            <Route path="/forgot-password" element={<PageWrapper><ForgotPassword /></PageWrapper>} />
            <Route path="/terms" element={<PageWrapper><Terms /></PageWrapper>} />
            <Route path="/privacy" element={<PageWrapper><Privacy /></PageWrapper>} />
          </Routes>

          {/* Protected Routes with Dashboard Layout */}
          <Routes>
            <Route 
              path="/dashboard" 
              element={
                <PageWrapper>
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                </PageWrapper>
              } 
            />
            <Route 
              path="/resume-builder" 
              element={
                <PageWrapper>
                  <ProtectedRoute>
                    <ResumeBuilder />
                  </ProtectedRoute>
                </PageWrapper>
              } 
            />
            <Route 
              path="/cover-letter" 
              element={
                <PageWrapper>
                  <ProtectedRoute>
                    <CoverLetterBuilder />
                  </ProtectedRoute>
                </PageWrapper>
              } 
            />
            <Route 
              path="/cover-letter-builder" 
              element={
                <PageWrapper>
                  <ProtectedRoute>
                    <CoverLetterBuilder />
                  </ProtectedRoute>
                </PageWrapper>
              } 
            />
            <Route 
              path="/ats-check" 
              element={
                <PageWrapper>
                  <ProtectedRoute>
                    <ATSAnalyzer />
                  </ProtectedRoute>
                </PageWrapper>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

