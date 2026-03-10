import React, { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaDownload, FaEye, FaEyeSlash, FaUser, FaBuilding, FaPencilAlt } from 'react-icons/fa';
import html2pdf from 'html2pdf.js';

const CoverLetterBuilder = () => {
  const [showPreview, setShowPreview] = useState(true);
  const [viewMode, setViewMode] = useState('edit');
  const coverLetterRef = useRef();

  const [coverLetterData, setCoverLetterData] = useState({
    yourName: 'Mahira Noor',
    yourEmail: 'mahira.noor@email.com',
    yourPhone: '(555) 123-4567',
    yourAddress: '123 Main Street, San Francisco, CA',
    date: new Date().toISOString().split('T')[0],
    hiringManagerName: 'Jane Smith',
    companyName: 'Tech Innovations Inc.',
    companyAddress: '456 Business Park Drive, San Francisco, CA 94102',
    introduction: 'I am writing to express my strong interest in the Senior Software Engineer position at Tech Innovations Inc.',
    bodyParagraph1: 'Throughout my career, I have successfully delivered multiple enterprise-level applications.',
    bodyParagraph2: 'I am particularly drawn to Tech Innovations Inc. because of your commitment to innovation.',
    closing: 'Thank you for considering my application. I look forward to the opportunity to discuss how my skills can contribute to your success.',
  });

  const handleChange = useCallback((field, value) => {
    setCoverLetterData(prev => ({ ...prev, [field]: value }));
  }, []);

  const downloadPDF = () => {
    const element = coverLetterRef.current;
    const opt = { margin: 10, filename: 'cover_letter.pdf', image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2, useCORS: true }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } };
    html2pdf().set(opt).from(element).save();
  };

  const templates = [
    { id: 'modern', name: 'Modern', color: '#1a2332', accentColor: '#d4af37' },
    { id: 'classic', name: 'Classic', color: '#1f2937', accentColor: '#374151' },
    { id: 'creative', name: 'Creative', color: '#0d7377', accentColor: '#3d2c8d' },
    { id: 'minimal', name: 'Minimal', color: '#6b7280', accentColor: '#9ca3af' },
  ];

  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  const renderModernTemplate = (isPreview) => {
    const p = isPreview ? 6 : 40;
    const fs = isPreview ? 5 : 14;
    return (
      <div className="bg-white w-full h-full" style={{ fontFamily: 'Inter, sans-serif', fontSize: fs, lineHeight: 1.7 }}>
        <div style={{ backgroundColor: '#1a2332', padding: p, marginLeft: -p, marginRight: -p, marginTop: -p }}>
          <h1 className="text-2xl font-bold text-white mb-2">{coverLetterData.yourName || 'Your Name'}</h1>
          <div className="flex flex-wrap gap-2 text-gray-400 text-xs">
            {coverLetterData.yourEmail && <span>{coverLetterData.yourEmail}</span>}
            {coverLetterData.yourPhone && <span> | {coverLetterData.yourPhone}</span>}
          </div>
        </div>
        <div style={{ height: 3, backgroundColor: '#d4af37', marginLeft: -p, marginRight: -p }} />
        <div style={{ padding: p }}>
          <div className="mb-4 text-gray-600">{coverLetterData.date && new Date(coverLetterData.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
          <div className="mb-4">{coverLetterData.hiringManagerName && <div className="font-medium">{coverLetterData.hiringManagerName}</div>}{coverLetterData.companyName && <div>{coverLetterData.companyName}</div>}</div>
          <div className="mb-4 font-medium">Dear {coverLetterData.hiringManagerName || 'Hiring Manager'},</div>
          <div className="space-y-3">
            {coverLetterData.introduction && <div className="whitespace-pre-line">{coverLetterData.introduction}</div>}
            {coverLetterData.bodyParagraph1 && <div className="whitespace-pre-line">{coverLetterData.bodyParagraph1}</div>}
            {coverLetterData.bodyParagraph2 && <div className="whitespace-pre-line">{coverLetterData.bodyParagraph2}</div>}
            {coverLetterData.closing && <div className="whitespace-pre-line">{coverLetterData.closing}</div>}
          </div>
          <div className="mt-6">Sincerely, {coverLetterData.yourName}</div>
        </div>
      </div>
    );
  };

  const renderClassicTemplate = (isPreview) => {
    const p = isPreview ? 6 : 45;
    const fs = isPreview ? 5 : 14;
    return (
      <div className="bg-white w-full h-full" style={{ fontFamily: 'Georgia, serif', fontSize: fs, lineHeight: 2 }}>
        <div style={{ padding: p }}>
          <h1 className="text-xl mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{coverLetterData.yourName}</h1>
          <div style={{ borderBottom: '1px solid #374151', marginTop: 8 }} />
          <div className="text-center mb-6 text-gray-600">{coverLetterData.yourAddress && <div>{coverLetterData.yourAddress}</div>}{coverLetterData.yourEmail && <div>{coverLetterData.yourEmail}</div>}{coverLetterData.yourPhone && <div>{coverLetterData.yourPhone}</div>}</div>
          <div className="mb-5">{coverLetterData.date && new Date(coverLetterData.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
          <div className="mb-5">{coverLetterData.companyName && <div>{coverLetterData.companyName}</div>}{coverLetterData.companyAddress && <div>{coverLetterData.companyAddress}</div>}</div>
          <div className="mb-4">Dear {coverLetterData.hiringManagerName || 'Hiring Manager'},</div>
          <div className="space-y-4">
            {coverLetterData.introduction && <div className="whitespace-pre-line">{coverLetterData.introduction}</div>}
            {coverLetterData.bodyParagraph1 && <div className="whitespace-pre-line">{coverLetterData.bodyParagraph1}</div>}
            {coverLetterData.bodyParagraph2 && <div className="whitespace-pre-line">{coverLetterData.bodyParagraph2}</div>}
            {coverLetterData.closing && <div className="whitespace-pre-line">{coverLetterData.closing}</div>}
          </div>
          <div className="mt-8"><div className="mb-16">Sincerely,</div><div>{coverLetterData.yourName}</div></div>
        </div>
      </div>
    );
  };

  const renderCreativeTemplate = (isPreview) => {
    const p = isPreview ? 4 : 35;
    const fs = isPreview ? 5 : 14;
    return (
      <div className="bg-white w-full h-full flex" style={{ fontFamily: 'Nunito, sans-serif', fontSize: fs, lineHeight: 1.7 }}>
        <div style={{ backgroundColor: '#0d7377', width: isPreview ? '25%' : '180px', padding: p }}>
          <h1 className="text-base font-bold text-white mb-2">{coverLetterData.yourName}</h1>
          <div style={{ width: 8, height: 8, backgroundColor: '#3d2c8d', borderRadius: '50%', marginBottom: 8 }} />
          <div className="text-white/90 text-xs">{coverLetterData.yourEmail && <div className="break-all">{coverLetterData.yourEmail}</div>}{coverLetterData.yourPhone && <div>{coverLetterData.yourPhone}</div>}</div>
        </div>
        <div className="flex-1 p-5" style={{ padding: p }}>
          <div className="flex gap-2 mb-5"><div style={{ width: 20, height: 3, backgroundColor: '#3d2c8d' }} /><div style={{ width: 40, height: 3, backgroundColor: '#0d7377' }} /></div>
          <div className="mb-4 text-gray-500">{coverLetterData.date && new Date(coverLetterData.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
          <div className="mb-4">{coverLetterData.hiringManagerName && <div style={{ color: '#0d7377' }}>{coverLetterData.hiringManagerName}</div>}{coverLetterData.companyName && <div>{coverLetterData.companyName}</div>}</div>
          <div className="mb-4 font-semibold" style={{ color: '#3d2c8d' }}>Dear {coverLetterData.hiringManagerName || 'Hiring Manager'},</div>
          <div className="space-y-3 text-gray-600">
            {coverLetterData.introduction && <div className="whitespace-pre-line">{coverLetterData.introduction}</div>}
            {coverLetterData.bodyParagraph1 && <div className="whitespace-pre-line">{coverLetterData.bodyParagraph1}</div>}
            {coverLetterData.bodyParagraph2 && <div className="whitespace-pre-line">{coverLetterData.bodyParagraph2}</div>}
            {coverLetterData.closing && <div className="whitespace-pre-line">{coverLetterData.closing}</div>}
          </div>
          <div className="mt-5"><div style={{ color: '#0d7377' }}>Best regards,</div><div style={{ color: '#3d2c8d' }}>{coverLetterData.yourName}</div></div>
        </div>
      </div>
    );
  };

  const renderMinimalTemplate = (isPreview) => {
    const p = isPreview ? 6 : 50;
    const fs = isPreview ? 5 : 14;
    return (
      <div className="bg-white w-full h-full" style={{ backgroundColor: '#f9f9f9', fontFamily: 'DM Sans, sans-serif', fontSize: fs, lineHeight: 1.8, color: '#444' }}>
        <div style={{ padding: p, backgroundColor: '#f9f9f9' }}>
          <h1 className="text-lg font-light mb-2" style={{ fontWeight: 300 }}>{coverLetterData.yourName}</h1>
          <div style={{ borderBottom: '1px solid #e0e0e0', marginTop: 12, width: 60 }} />
          <div className="flex gap-3 text-gray-400 mb-8 text-xs">{coverLetterData.yourEmail && <span>{coverLetterData.yourEmail}</span>}{coverLetterData.yourPhone && <span>• {coverLetterData.yourPhone}</span>}</div>
          <div className="mb-6">{coverLetterData.date && new Date(coverLetterData.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
          <div className="mb-6">{coverLetterData.hiringManagerName && <div>{coverLetterData.hiringManagerName}</div>}{coverLetterData.companyName && <div>{coverLetterData.companyName}</div>}</div>
          <div className="mb-5">Dear {coverLetterData.hiringManagerName || 'Hiring Manager'},</div>
          <div className="space-y-3">
            {coverLetterData.introduction && <div className="whitespace-pre-line">{coverLetterData.introduction}</div>}
            {coverLetterData.bodyParagraph1 && <div className="whitespace-pre-line">{coverLetterData.bodyParagraph1}</div>}
            {coverLetterData.bodyParagraph2 && <div className="whitespace-pre-line">{coverLetterData.bodyParagraph2}</div>}
            {coverLetterData.closing && <div className="whitespace-pre-line">{coverLetterData.closing}</div>}
          </div>
          <div className="mt-8">Kind regards, {coverLetterData.yourName}</div>
        </div>
      </div>
    );
  };

  const renderTemplate = (isPreview = false) => {
    switch (selectedTemplate) {
      case 'modern': return renderModernTemplate(isPreview);
      case 'classic': return renderClassicTemplate(isPreview);
      case 'creative': return renderCreativeTemplate(isPreview);
      case 'minimal': return renderMinimalTemplate(isPreview);
      default: return renderModernTemplate(isPreview);
    }
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  const showSplitView = showPreview && !isMobile;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm py-3 px-3 sm:px-6 flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Link to="/dashboard" className="text-gray-600 hover:text-[#bbad79] text-sm sm:text-base">← Back</Link>
          <h1 className="text-base sm:text-xl font-bold text-gray-900">Cover Letter Builder</h1>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button onClick={() => setViewMode(viewMode === 'edit' ? 'preview' : 'edit')} className="lg:hidden flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-[#bbad79] min-w-[44px] min-h-[44px] justify-center">
            {viewMode === 'edit' ? <FaEye /> : <FaEyeSlash />}<span className="text-sm">{viewMode === 'edit' ? 'Preview' : 'Edit'}</span>
          </button>
          <button onClick={() => setShowPreview(!showPreview)} className="hidden lg:flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-[#bbad79]">
            {showPreview ? <FaEyeSlash /> : <FaEye />}<span>{showPreview ? 'Hide Preview' : 'Show Preview'}</span>
          </button>
          <button onClick={downloadPDF} className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm min-h-[44px]">
            <FaDownload /><span className="hidden sm:inline">Download PDF</span>
          </button>
        </div>
      </header>
      <div className="bg-white border-b px-3 sm:px-6 py-2 sm:py-3 overflow-x-auto">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Template:</span>
          <div className="flex gap-2">
            {templates.map((template) => (
              <button key={template.id} onClick={() => setSelectedTemplate(template.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap min-h-[44px] ${selectedTemplate === template.id ? 'text-white' : 'bg-gray-100 text-gray-700'}`}
                style={{ backgroundColor: selectedTemplate === template.id ? template.color : undefined }}>
                {template.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col lg:flex-row">
        <div className={`${showSplitView ? 'w-1/2' : 'w-full'} overflow-y-auto ${viewMode === 'preview' && isMobile ? 'hidden' : ''}`}>
          <div className="p-3 sm:p-6">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2"><FaUser className="text-[#bbad79]" /><span>Your Information</span></h2>
                <div className="space-y-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label><input type="text" value={coverLetterData.yourName} onChange={(e) => handleChange('yourName', e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79] min-h-[44px]" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" value={coverLetterData.yourEmail} onChange={(e) => handleChange('yourEmail', e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79] min-h-[44px]" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><input type="tel" value={coverLetterData.yourPhone} onChange={(e) => handleChange('yourPhone', e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79] min-h-[44px]" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Address</label><input type="text" value={coverLetterData.yourAddress} onChange={(e) => handleChange('yourAddress', e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79] min-h-[44px]" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Date</label><input type="date" value={coverLetterData.date} onChange={(e) => handleChange('date', e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79] min-h-[44px]" /></div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2"><FaBuilding className="text-[#bbad79]" /><span>Recipient Information</span></h2>
                <div className="space-y-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Hiring Manager</label><input type="text" value={coverLetterData.hiringManagerName} onChange={(e) => handleChange('hiringManagerName', e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79] min-h-[44px]" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label><input type="text" value={coverLetterData.companyName} onChange={(e) => handleChange('companyName', e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79] min-h-[44px]" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Company Address</label><input type="text" value={coverLetterData.companyAddress} onChange={(e) => handleChange('companyAddress', e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79] min-h-[44px]" /></div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2"><FaPencilAlt className="text-[#bbad79]" /><span>Cover Letter Content</span></h2>
                <div className="space-y-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Introduction</label><textarea value={coverLetterData.introduction} onChange={(e) => handleChange('introduction', e.target.value)} rows={3} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79]" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Body Paragraph 1</label><textarea value={coverLetterData.bodyParagraph1} onChange={(e) => handleChange('bodyParagraph1', e.target.value)} rows={3} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79]" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Body Paragraph 2</label><textarea value={coverLetterData.bodyParagraph2} onChange={(e) => handleChange('bodyParagraph2', e.target.value)} rows={3} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79]" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Closing</label><textarea value={coverLetterData.closing} onChange={(e) => handleChange('closing', e.target.value)} rows={2} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79]" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {(showSplitView || (viewMode === 'preview' && isMobile)) && (
          <div className={`${showSplitView ? 'w-1/2' : 'w-full'} bg-gray-200 overflow-y-auto p-4 sm:p-8 ${viewMode === 'edit' && isMobile ? 'hidden lg:block' : ''}`}>
            <div className="max-w-[210mm] mx-auto bg-white shadow-2xl" ref={coverLetterRef}>{renderTemplate(false)}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoverLetterBuilder;

