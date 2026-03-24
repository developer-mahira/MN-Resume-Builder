import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowLeft, FaUpload, FaSearch, FaCheckCircle, FaTimesCircle,
  FaExclamationTriangle, FaStar, FaFileAlt, FaDownload, FaSync
} from 'react-icons/fa';

const KEYWORD_GROUPS = {
  technical: ['javascript', 'react', 'node', 'python', 'sql', 'api', 'aws', 'docker', 'typescript'],
  leadership: ['leadership', 'mentor', 'stakeholder', 'collaboration', 'cross-functional', 'ownership'],
  delivery: ['agile', 'scrum', 'roadmap', 'launch', 'optimization', 'analysis', 'strategy'],
};

const ACTION_VERBS = [
  'built', 'led', 'improved', 'designed', 'developed', 'implemented', 'launched',
  'managed', 'optimized', 'created', 'delivered', 'scaled', 'reduced', 'increased'
];

const REQUIRED_SECTIONS = [
  { key: 'summary', label: 'Professional Summary', regex: /(summary|profile|objective)/i },
  { key: 'experience', label: 'Work Experience', regex: /(experience|employment|work history)/i },
  { key: 'education', label: 'Education', regex: /education/i },
  { key: 'skills', label: 'Skills', regex: /(skills|competencies|tech stack)/i },
];

const readFileText = async (file) => {
  const buffer = await file.arrayBuffer();
  const text = new TextDecoder('utf-8', { fatal: false }).decode(buffer);

  return text
    .replace(/<[^>]+>/g, ' ')
    .replace(/\/[A-Za-z0-9.#_-]+/g, ' ')
    .replace(/[^\x20-\x7E\n]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const clampScore = (value) => Math.max(0, Math.min(100, Math.round(value)));

const buildSectionSuggestions = (score, positives, improvements) => {
  const suggestions = [...positives, ...improvements];
  if (suggestions.length === 0) {
    suggestions.push('Your resume is in strong shape in this area.');
  }

  return {
    score,
    status: score >= 85 ? 'excellent' : score >= 70 ? 'good' : score >= 50 ? 'needswork' : 'poor',
    suggestions,
  };
};

const analyzeResumeText = (text, file) => {
  const lowerText = text.toLowerCase();
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const uniqueWords = new Set(lowerText.split(/\s+/).filter(Boolean));
  const hasEmail = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(text);
  const hasPhone = /(\+\d{1,3}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{4}/.test(text);
  const hasLinkedIn = /linkedin\.com/i.test(text);
  const hasPortfolio = /(github\.com|portfolio|behance|dribbble|website)/i.test(text);
  const numericMatches = text.match(/\b\d+[%+x]?\b/g) || [];
  const actionVerbMatches = ACTION_VERBS.filter((verb) => lowerText.includes(verb));
  const missingSections = REQUIRED_SECTIONS.filter((section) => !section.regex.test(text));
  const presentSections = REQUIRED_SECTIONS.filter((section) => section.regex.test(text));
  const tableRisk = /(table|columns|textbox|shape|graphic|image)/i.test(text);
  const bulletMatches = text.match(/[•*-]\s+[A-Za-z]/g) || [];

  const keywordCoverage = Object.entries(KEYWORD_GROUPS).map(([group, keywords]) => {
    const matched = keywords.filter((keyword) => lowerText.includes(keyword));
    return { group, matched, missing: keywords.filter((keyword) => !lowerText.includes(keyword)) };
  });

  const matchedKeywordCount = keywordCoverage.reduce((sum, group) => sum + group.matched.length, 0);
  const totalKeywordCount = keywordCoverage.reduce((sum, group) => sum + group.matched.length + group.missing.length, 0);
  const missingKeywords = keywordCoverage
    .flatMap((group) => group.missing.slice(0, 3))
    .filter((keyword, index, array) => array.indexOf(keyword) === index)
    .slice(0, 8);

  const keywordScore = clampScore((matchedKeywordCount / Math.max(totalKeywordCount, 1)) * 100 + (wordCount > 250 ? 10 : 0));
  const formattingScore = clampScore(
    55 +
    (hasEmail ? 10 : 0) +
    (hasPhone ? 10 : 0) +
    (bulletMatches.length >= 3 ? 10 : 0) +
    (presentSections.length * 4) -
    (tableRisk ? 15 : 0)
  );
  const skillsScore = clampScore(
    35 +
    matchedKeywordCount * 6 +
    (hasLinkedIn ? 8 : 0) +
    (hasPortfolio ? 7 : 0)
  );
  const contentScore = clampScore(
    40 +
    Math.min(numericMatches.length, 6) * 7 +
    Math.min(actionVerbMatches.length, 6) * 5 +
    (wordCount >= 250 && wordCount <= 900 ? 10 : 0) -
    (missingSections.length * 8)
  );

  const overallScore = clampScore((keywordScore + formattingScore + skillsScore + contentScore) / 4);

  const atsDetails = [
    hasEmail ? 'Contact email is present.' : 'Add a professional email address near the top.',
    hasPhone ? 'Phone number is present.' : 'Add a reachable phone number.',
    presentSections.length >= 4 ? 'Core ATS sections are clearly represented.' : `Add missing sections: ${missingSections.map((section) => section.label).join(', ')}.`,
    tableRisk ? 'Possible ATS-unfriendly layout terms were detected.' : 'No obvious ATS-unfriendly layout markers were detected.',
  ];

  return {
    overallScore,
    extractedTextLength: text.length,
    fileMeta: {
      name: file.name,
      sizeKb: Math.round(file.size / 1024),
      type: file.type || 'Unknown',
    },
    analysis: {
      keywordOptimization: buildSectionSuggestions(
        keywordScore,
        matchedKeywordCount > 0 ? [`Matched ${matchedKeywordCount} tracked ATS keywords across technical, leadership, and delivery themes.`] : [],
        missingKeywords.length ? [`Add keywords such as ${missingKeywords.slice(0, 4).join(', ')} to better match job descriptions.`] : ['Keyword coverage is broad and well distributed.']
      ),
      formatting: buildSectionSuggestions(
        formattingScore,
        [
          hasEmail ? 'Header contact details include email.' : null,
          hasPhone ? 'Header contact details include phone.' : null,
          bulletMatches.length >= 3 ? 'Bullet formatting is detectable in the resume text.' : null,
        ].filter(Boolean),
        [
          tableRisk ? 'Avoid tables, text boxes, and decorative layout elements for ATS compatibility.' : null,
          missingSections.length ? `Include clear section headings for ${missingSections.map((section) => section.label).join(', ')}.` : null,
        ].filter(Boolean)
      ),
      skillsMatch: buildSectionSuggestions(
        skillsScore,
        [
          hasLinkedIn ? 'LinkedIn profile is referenced.' : null,
          hasPortfolio ? 'Portfolio or work sample link is referenced.' : null,
          uniqueWords.size > 120 ? 'Skill vocabulary looks reasonably varied.' : null,
        ].filter(Boolean),
        [
          matchedKeywordCount < 6 ? 'Expand your hard skills and domain terms so the resume aligns with more roles.' : null,
          !hasPortfolio ? 'Add a portfolio, GitHub, or relevant work sample if it supports your field.' : null,
        ].filter(Boolean)
      ),
      contentQuality: buildSectionSuggestions(
        contentScore,
        [
          numericMatches.length >= 3 ? 'The resume includes measurable impact indicators.' : null,
          actionVerbMatches.length >= 4 ? 'Strong action verbs are present throughout the content.' : null,
          wordCount >= 250 && wordCount <= 900 ? 'Resume length is within a healthy content range.' : null,
        ].filter(Boolean),
        [
          numericMatches.length < 3 ? 'Add more measurable results like percentages, revenue, users, time saved, or growth.' : null,
          actionVerbMatches.length < 4 ? 'Use stronger action verbs such as built, led, improved, delivered, or optimized.' : null,
        ].filter(Boolean)
      ),
    },
    missingKeywords,
    atsCompatibility: {
      score: formattingScore,
      status: formattingScore >= 80 ? 'good' : formattingScore >= 60 ? 'needswork' : 'poor',
      details: atsDetails,
    },
  };
};

const ATSAnalyzer = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('Please upload a resume smaller than 5MB.');
      setUploadedFile(null);
      setResults(null);
      return;
    }

    setError('');
    setUploadedFile(file);
    setResults(null);
  };

  const analyzeResume = async () => {
    if (!uploadedFile) return;

    setAnalyzing(true);
    setError('');

    try {
      const extractedText = await readFileText(uploadedFile);

      if (extractedText.length < 80) {
        throw new Error('We could not read enough resume text. Try a text-based PDF, DOC, or DOCX file.');
      }

      const analysisResult = analyzeResumeText(extractedText, uploadedFile);
      setResults(analysisResult);
    } catch (err) {
      setError(err.message || 'Resume analysis failed. Please try another file.');
      setResults(null);
    } finally {
      setAnalyzing(false);
    }
  };

  const downloadReport = () => {
    if (!results) return;

    const report = [
      `ATS Report for ${results.fileMeta.name}`,
      `Overall score: ${results.overallScore}`,
      '',
      ...Object.entries(results.analysis).flatMap(([sectionKey, sectionValue]) => [
        `${sectionKey}: ${sectionValue.score}`,
        ...sectionValue.suggestions.map((suggestion) => `- ${suggestion}`),
        '',
      ]),
      `Missing keywords: ${results.missingKeywords.join(', ') || 'None'}`,
      '',
      'ATS compatibility details:',
      ...results.atsCompatibility.details.map((detail) => `- ${detail}`),
    ].join('\n');

    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${results.fileMeta.name.replace(/\.[^.]+$/, '')}_ats_report.txt`;
    anchor.click();
    window.URL.revokeObjectURL(url);
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
      <header className="bg-white shadow-sm py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center space-x-4 min-w-0">
            <Link to="/dashboard" className="text-gray-600 hover:text-[#bbad79] flex items-center space-x-2 text-sm sm:text-base">
              <FaArrowLeft />
              <span>Back to Dashboard</span>
            </Link>
          </div>
          <h1 className="text-base sm:text-xl font-bold text-gray-900 text-right">ATS Resume Analyzer</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Is Your Resume <span className="text-[#bbad79]">ATS Friendly?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your resume and get a score based on keyword coverage, formatting signals,
            section structure, and measurable impact.
          </p>
        </div>

        {!results && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 sm:p-12 text-center cursor-pointer hover:border-[#bbad79] transition-colors"
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

              {error && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                <FaFileAlt className="text-3xl text-[#bbad79] mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Keyword Analysis</h3>
                <p className="text-gray-600 text-sm">Checks role signals across technical, leadership, and delivery terms</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                <FaCheckCircle className="text-3xl text-[#bbad79] mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Structure Check</h3>
                <p className="text-gray-600 text-sm">Looks for ATS-safe sections, contact info, and formatting clues</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                <FaStar className="text-3xl text-[#bbad79] mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Actionable Report</h3>
                <p className="text-gray-600 text-sm">Generates resume-specific strengths, gaps, and improvement ideas</p>
              </div>
            </div>
          </div>
        )}

        {results && (
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Overall ATS Score</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {results.fileMeta.name} • {results.fileMeta.sizeKb} KB • {results.fileMeta.type}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setResults(null);
                      setUploadedFile(null);
                    }}
                    className="flex items-center space-x-2 text-[#bbad79] hover:text-[#9a9163]"
                  >
                    <FaSync />
                    <span>Analyze Another</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="80" cy="80" r="70" stroke="#e5e7eb" strokeWidth="10" fill="none" />
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
                <p className="text-center text-gray-600 mt-4 max-w-2xl">
                  {results.overallScore >= 80
                    ? 'Your resume is showing strong ATS signals with good structure and keyword coverage.'
                    : results.overallScore >= 60
                    ? 'Your resume has a solid base, but a few content and formatting improvements can lift its match rate.'
                    : 'Your resume needs stronger structure, clearer keywords, and more measurable impact to perform well in ATS.'}
                </p>
              </div>
            </div>

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

            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h4 className="font-semibold text-gray-900 mb-4">Suggested Keywords To Add</h4>
              <div className="flex flex-wrap gap-2">
                {results.missingKeywords.length > 0 ? results.missingKeywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium"
                  >
                    {keyword}
                  </span>
                )) : (
                  <span className="text-sm text-green-700 bg-green-100 rounded-full px-4 py-2">
                    No major keyword gaps detected from the tracked set.
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm mt-4">
                Use keywords naturally inside experience bullets, summary text, and skills sections.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h4 className="font-semibold text-gray-900 mb-4">ATS Compatibility Check</h4>
              <div className="space-y-3">
                {results.atsCompatibility.details.map((detail, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <FaCheckCircle className={detail.startsWith('Add ') || detail.startsWith('Possible') ? 'text-yellow-500' : 'text-green-500'} />
                    <span className="text-gray-700">{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#bbad79] to-[#9a9163] rounded-2xl p-8 text-center text-white">
              <h4 className="text-xl font-semibold mb-4">Ready to Improve Your Resume?</h4>
              <p className="mb-6">Use the builder, apply the missing keywords, and tighten your impact bullets before sending applications.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/resume-builder"
                  className="px-6 py-3 bg-white text-[#bbad79] font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Create Resume
                </Link>
                <button
                  onClick={downloadReport}
                  className="px-6 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-colors flex items-center justify-center space-x-2"
                >
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
