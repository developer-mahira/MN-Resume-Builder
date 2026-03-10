import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaArrowLeft, FaUpload, FaSearch, FaCheckCircle, FaTimesCircle, 
  FaExclamationTriangle, FaStar, FaFileAlt, FaDownload, FaSync
} from 'react-icons/fa';

const ATSAnalyzer = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      setResults(null);
    }
  };

  const analyzeResume = () => {
    if (!uploadedFile) return;

    setAnalyzing(true);

    // Simulate analysis
    setTimeout(() => {
      setResults({
        overallScore: 78,
        analysis: {
          keywordOptimization: {
            score: 85,
            status: 'good',
            suggestions: [
              'Good use of industry keywords',
              'Consider adding more technical skills',
            ],
          },
          formatting: {
            score: 70,
            status: 'needswork',
            suggestions: [
              'Use a cleaner font format',
              'Avoid tables and columns',
              'Keep consistent bullet point styles',
            ],
          },
          skillsMatch: {
            score: 90,
            status: 'excellent',
            suggestions: [
              'Strong technical skills section',
              'Consider adding more soft skills',
            ],
          },
          contentQuality: {
            score: 75,
            status: 'good',
            suggestions: [
              'Add measurable achievements',
              'Quantify your accomplishments',
              'Include more action verbs',
            ],
          },
        },
        missingKeywords: [
          'Project Management',
          'Agile Methodology',
          'Data Analysis',
          'Team Leadership',
        ],
        atsCompatibility: {
          score: 80,
          status: 'good',
          details: [
            'File format is ATS-friendly (PDF)',
            'No images or graphics detected',
            'Standard headings used',
            'Contact information is clear',
          ],
        },
      });
      setAnalyzing(false);
    }, 2000);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'excellent':
        return <FaCheckCircle className="text-green-500" />;
      case 'good':
        return <FaCheckCircle className="text-yellow-500" />;
      case 'needswork':
        return <FaExclamationTriangle className="text-orange-500" />;
      default:
        return <FaTimesCircle className="text-red-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="text-gray-600 hover:text-[#bbad79] flex items-center space-x-2">
              <FaArrowLeft />
              <span>Back to Dashboard</span>
            </Link>
          </div>
          <h1 className="text-xl font-bold text-gray-900">ATS Resume Analyzer</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Is Your Resume <span className="text-[#bbad79]">ATS Friendly?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your resume and get instant insights on how to optimize it for 
            Applicant Tracking Systems (ATS)
          </p>
        </div>

        {/* Upload Section */}
        {!results && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer hover:border-[#bbad79] transition-colors"
              >
                {uploadedFile ? (
                  <div>
                    <FaFileAlt className="text-6xl text-[#bbad79] mx-auto mb-4" />
                    <p className="text-lg font-semibold text-gray-900">{uploadedFile.name}</p>
                    <p className="text-gray-500">Click to change file</p>
                  </div>
                ) : (
                  <div>
                    <FaUpload className="text-6xl text-gray-300 mx-auto mb-4" />
                    <p className="text-lg font-semibold text-gray-900 mb-2">
                      Drop your resume here or click to upload
                    </p>
                    <p className="text-gray-500">
                      Supports PDF, DOC, DOCX (Max 5MB)
                    </p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {uploadedFile && (
                <button
                  onClick={analyzeResume}
                  disabled={analyzing}
                  className="w-full mt-6 py-4 bg-[#bbad79] text-white font-semibold rounded-xl hover:bg-[#9a9163] transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {analyzing ? (
                    <>
                      <FaSync className="animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <FaSearch />
                      <span>Analyze Resume</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                <FaFileAlt className="text-3xl text-[#bbad79] mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Keyword Analysis</h3>
                <p className="text-gray-600 text-sm">We check for industry-specific keywords</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                <FaCheckCircle className="text-3xl text-[#bbad79] mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Format Check</h3>
                <p className="text-gray-600 text-sm">Ensure ATS-compatible formatting</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                <FaStar className="text-3xl text-[#bbad79] mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Score & Tips</h3>
                <p className="text-gray-600 text-sm">Get actionable improvement suggestions</p>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {results && (
          <div className="max-w-4xl mx-auto">
            {/* Overall Score */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Overall ATS Score</h3>
                <button
                  onClick={() => setResults(null)}
                  className="flex items-center space-x-2 text-[#bbad79] hover:text-[#9a9163]"
                >
                  <FaSync />
                  <span>Analyze Another</span>
                </button>
              </div>

              <div className="flex items-center justify-center">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="#e5e7eb"
                      strokeWidth="10"
                      fill="none"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="#bbad79"
                      strokeWidth="10"
                      fill="none"
                      strokeDasharray={`${(results.overallScore / 100) * 440} 440`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-4xl font-bold ${getScoreColor(results.overallScore)}`}>
                      {results.overallScore}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-center text-gray-600 mt-4">
                {results.overallScore >= 80 
                  ? 'Great! Your resume is well-optimized for ATS.' 
                  : results.overallScore >= 60 
                  ? 'Good, but there\'s room for improvement.' 
                  : 'Your resume needs optimization to pass ATS.'}
              </p>
            </div>

            {/* Detailed Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {Object.entries(results.analysis).map(([key, data]) => (
                <div key={key} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </h4>
                    {getStatusIcon(data.status)}
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Score</span>
                      <span className={`font-semibold ${getScoreColor(data.score)}`}>{data.score}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${data.score >= 80 ? 'bg-green-500' : data.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${data.score}%` }}
                      />
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {data.suggestions.map((suggestion, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                        <span className="text-[#bbad79]">•</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Missing Keywords */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h4 className="font-semibold text-gray-900 mb-4">Missing Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {results.missingKeywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 text-sm mt-4">
                Consider adding these industry-relevant keywords to improve your ATS score.
              </p>
            </div>

            {/* ATS Compatibility */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h4 className="font-semibold text-gray-900 mb-4">ATS Compatibility Check</h4>
              <div className="space-y-3">
                {results.atsCompatibility.details.map((detail, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <FaCheckCircle className="text-green-500" />
                    <span className="text-gray-700">{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-[#bbad79] to-[#9a9163] rounded-2xl p-8 text-center text-white">
              <h4 className="text-xl font-semibold mb-4">Ready to Improve Your Resume?</h4>
              <p className="mb-6">Use our Resume Builder to create an ATS-friendly resume</p>
              <div className="flex justify-center space-x-4">
                <Link
                  to="/resume-builder"
                  className="px-6 py-3 bg-white text-[#bbad79] font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Create Resume
                </Link>
                <button className="px-6 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-colors flex items-center space-x-2">
                  <FaDownload />
                  <span>Download Report</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ATSAnalyzer;

