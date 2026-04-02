import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaUser, FaBriefcase, FaGraduationCap, FaCode, FaProjectDiagram, FaCertificate, FaLanguage, FaPlus, FaTrash, FaDownload, FaEye, FaEyeSlash, FaSave } from 'react-icons/fa';
import html2pdf from 'html2pdf.js';
import TemplateRenderer from '../../components/ResumeTemplates/TemplateRenderer';
import { getAllTemplates } from '../../components/ResumeTemplates/TemplateRenderer';

const createDefaultResumeData = () => ({
  personal: { firstName: 'Mahira', lastName: 'Noor', email: '', phone: '', city: '', country: '', linkedin: '', portfolio: '', summary: '' },
  skills: [],
  workExperience: [],
  education: [],
  projects: [],
  certifications: [],
  languages: [],
});

const ResumeBuilder = () => {
  const [activeSection, setActiveSection] = useState('personal');
  const [showPreview, setShowPreview] = useState(true);
  const [viewMode, setViewMode] = useState('edit');
  const [selectedTemplate, setSelectedTemplate] = useState('minimal');
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);
  const [searchParams, setSearchParams] = useSearchParams();
  const resumeRef = useRef();
  const printableResumeRef = useRef();
  const resumeId = searchParams.get('resumeId');
  const requestedTemplate = searchParams.get('template');
  const shouldAutoDownload = searchParams.get('download') === '1';

  const [resumeData, setResumeData] = useState(createDefaultResumeData);

  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!resumeId) {
      setResumeData(createDefaultResumeData());
      setSelectedTemplate(requestedTemplate || 'minimal');
      return;
    }

    const resumes = JSON.parse(localStorage.getItem('rba_resumes') || '[]');
    const existingResume = resumes.find((resume) => resume.id === resumeId);

    if (existingResume) {
      setResumeData(existingResume.data || createDefaultResumeData());
      setSelectedTemplate(existingResume.template || 'minimal');
    }
  }, [requestedTemplate, resumeId]);

  const handleInputChange = useCallback((section, field, value) => {
    setResumeData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  }, []);

  const handleArrayAdd = useCallback((section, defaultItem) => {
    setResumeData(prev => ({ ...prev, [section]: [...prev[section], defaultItem] }));
  }, []);

  const handleArrayRemove = useCallback((section, index) => {
    setResumeData(prev => ({ ...prev, [section]: prev[section].filter((_, i) => i !== index) }));
  }, []);

  const handleArrayChange = useCallback((section, index, field, value) => {
    setResumeData(prev => ({ ...prev, [section]: prev[section].map((item, i) => i === index ? { ...item, [field]: value } : item) }));
  }, []);

  const addSkill = useCallback(() => {
    if (newSkill.trim()) {
      setResumeData(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
      setNewSkill('');
    }
  }, [newSkill]);

  const removeSkill = useCallback((index) => {
    setResumeData(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }));
  }, []);

  const downloadPDF = useCallback(() => {
    const element = printableResumeRef.current || resumeRef.current;
    if (!element) return;
    const opt = {
      margin: 0,
      filename: `${resumeData.personal.firstName || 'resume'}_${resumeData.personal.lastName || 'builder'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  }, [resumeData.personal.firstName, resumeData.personal.lastName]);

  useEffect(() => {
    if (!shouldAutoDownload || !resumeId) return;

    const timeoutId = window.setTimeout(() => {
      downloadPDF();
      setSearchParams((currentParams) => {
        const nextParams = new URLSearchParams(currentParams);
        nextParams.delete('download');
        return nextParams;
      });
    }, 350);

    return () => window.clearTimeout(timeoutId);
  }, [downloadPDF, resumeId, selectedTemplate, shouldAutoDownload, setSearchParams, resumeData]);

  const saveResume = useCallback(() => {
    setSaving(true);
    setSaveMessage('');

    const resumes = JSON.parse(localStorage.getItem('rba_resumes') || '[]');
    const nextResumeId = resumeId || `resume-${Date.now()}`;
    const displayName = `${resumeData.personal.firstName || 'Untitled'} ${resumeData.personal.lastName || 'Resume'}`.trim();
    const nextResume = {
      id: nextResumeId,
      name: displayName,
      template: selectedTemplate,
      data: resumeData,
      status: 'complete',
      lastModified: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    const existingIndex = resumes.findIndex((resume) => resume.id === nextResumeId);
    if (existingIndex >= 0) {
      resumes[existingIndex] = nextResume;
    } else {
      resumes.unshift(nextResume);
    }

    localStorage.setItem('rba_resumes', JSON.stringify(resumes));

    if (!resumeId) {
      setSearchParams({ resumeId: nextResumeId });
    }

    setSaving(false);
    setSaveMessage('Resume saved successfully.');

    window.setTimeout(() => {
      setSaveMessage('');
    }, 2500);
  }, [resumeData, resumeId, selectedTemplate, setSearchParams]);

  const sections = [
    { id: 'personal', label: 'Personal', icon: <FaUser className="w-4 h-4" /> },
    { id: 'skills', label: 'Skills', icon: <FaCode className="w-4 h-4" /> },
    { id: 'work', label: 'Experience', icon: <FaBriefcase className="w-4 h-4" /> },
    { id: 'education', label: 'Education', icon: <FaGraduationCap className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <FaProjectDiagram className="w-4 h-4" /> },
    { id: 'certifications', label: 'Certs', icon: <FaCertificate className="w-4 h-4" /> },
    { id: 'languages', label: 'Languages', icon: <FaLanguage className="w-4 h-4" /> },
  ];

  const templates = getAllTemplates();
  const isMobile = viewportWidth < 768;
  const showSplitView = showPreview && !isMobile;
  const shouldShowPreviewPanel = isMobile ? viewMode === 'preview' : showPreview;
  const shouldShowEditorPanel = !isMobile || viewMode === 'edit';
  const documentWidth = 794;
  const documentHeight = 1123;
  const availablePreviewWidth = isMobile
    ? Math.max(viewportWidth - 16, 280)
    : showSplitView
      ? Math.max((viewportWidth - 96) / 2, 360)
      : Math.max(viewportWidth - 96, 360);
  const previewScale = Math.min(1, availablePreviewWidth / documentWidth);
  const scaledDocumentWidth = documentWidth * previewScale;
  const scaledDocumentHeight = documentHeight * previewScale;
  const previewShellWidth = isMobile ? '100%' : `${scaledDocumentWidth}px`;
  const deviceLabel = viewportWidth < 768 ? 'Mobile' : viewportWidth < 1024 ? 'Tablet' : 'Desktop';

  const renderForm = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">First Name</label><input type="text" value={resumeData.personal.firstName} onChange={(e) => handleInputChange('personal', 'firstName', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79] focus:border-transparent min-h-[48px] text-base" placeholder="First Name" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label><input type="text" value={resumeData.personal.lastName} onChange={(e) => handleInputChange('personal', 'lastName', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79] focus:border-transparent min-h-[48px] text-base" placeholder="Last Name" /></div>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" value={resumeData.personal.email} onChange={(e) => handleInputChange('personal', 'email', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79] focus:border-transparent min-h-[48px] text-base" placeholder="email@example.com" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><input type="tel" value={resumeData.personal.phone} onChange={(e) => handleInputChange('personal', 'phone', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79] focus:border-transparent min-h-[48px] text-base" placeholder="+1 555-123-4567" /></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">City</label><input type="text" value={resumeData.personal.city} onChange={(e) => handleInputChange('personal', 'city', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79] focus:border-transparent min-h-[48px] text-base" placeholder="City" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Country</label><input type="text" value={resumeData.personal.country} onChange={(e) => handleInputChange('personal', 'country', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79] focus:border-transparent min-h-[48px] text-base" placeholder="Country" /></div>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label><input type="url" value={resumeData.personal.linkedin} onChange={(e) => handleInputChange('personal', 'linkedin', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79] focus:border-transparent min-h-[48px] text-base" placeholder="linkedin.com/in/yourprofile" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Portfolio</label><input type="url" value={resumeData.personal.portfolio} onChange={(e) => handleInputChange('personal', 'portfolio', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79] focus:border-transparent min-h-[48px] text-base" placeholder="yourwebsite.com" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Summary</label><textarea value={resumeData.personal.summary} onChange={(e) => handleInputChange('personal', 'summary', e.target.value)} rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79] focus:border-transparent min-h-[100px] text-base" placeholder="Professional summary..." /></div>
          </div>
        );
      case 'skills':
        return (
          <div className="space-y-4">
            <div className="flex gap-2"><input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addSkill()} className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79] min-h-[48px] text-base" placeholder="Add a skill" /><button onClick={addSkill} className="px-5 py-3 bg-[#bbad79] text-white rounded-lg hover:bg-[#9a9163] min-w-[48px] min-h-[48px] flex items-center justify-center"><FaPlus /></button></div>
            <div className="flex flex-wrap gap-2">{resumeData.skills.map((skill, index) => (<span key={index} className="inline-flex items-center gap-2 px-3 py-2 bg-[#bbad79]/10 text-[#bbad79] rounded-full text-sm min-h-[40px]">{skill}<button onClick={() => removeSkill(index)} className="hover:text-red-500 p-1"><FaTrash className="text-xs" /></button></span>))}</div>
            {resumeData.skills.length === 0 && <p className="text-gray-500 text-center py-4">No skills added yet.</p>}
          </div>
        );
      case 'work':
        return (
          <div className="space-y-6">{resumeData.workExperience.map((work, index) => (<div key={index} className="p-4 bg-gray-50 rounded-lg relative"><button onClick={() => handleArrayRemove('workExperience', index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"><FaTrash /></button><div className="space-y-3"><input type="text" value={work.jobTitle || ''} onChange={(e) => handleArrayChange('workExperience', index, 'jobTitle', e.target.value)} placeholder="Job Title" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79] min-h-[48px] text-base" /><input type="text" value={work.company || ''} onChange={(e) => handleArrayChange('workExperience', index, 'company', e.target.value)} placeholder="Company" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79] min-h-[48px] text-base" /><div className="grid grid-cols-1 sm:grid-cols-2 gap-3"><input type="month" value={work.startDate || ''} onChange={(e) => handleArrayChange('workExperience', index, 'startDate', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79] min-h-[48px] text-base" /><input type="month" value={work.endDate || ''} onChange={(e) => handleArrayChange('workExperience', index, 'endDate', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79] min-h-[48px] text-base" /></div><textarea value={work.description || ''} onChange={(e) => handleArrayChange('workExperience', index, 'description', e.target.value)} rows={3} placeholder="Description" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79] min-h-[100px] text-base" /></div></div>))}<button onClick={() => handleArrayAdd('workExperience', { jobTitle: '', company: '', startDate: '', endDate: '', description: '' })} className="w-full py-4 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-[#bbad79] hover:text-[#bbad79] min-h-[48px] flex items-center justify-center gap-2"><FaPlus /> Add Experience</button></div>
        );
      case 'education':
        return (
          <div className="space-y-6">{resumeData.education.map((edu, index) => (<div key={index} className="p-4 bg-gray-50 rounded-lg relative"><button onClick={() => handleArrayRemove('education', index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"><FaTrash /></button><div className="space-y-3"><input type="text" value={edu.degree || ''} onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)} placeholder="Degree" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79] min-h-[48px] text-base" /><input type="text" value={edu.institution || ''} onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)} placeholder="Institution" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79] min-h-[48px] text-base" /><div className="grid grid-cols-1 sm:grid-cols-2 gap-3"><input type="number" value={edu.startYear || ''} onChange={(e) => handleArrayChange('education', index, 'startYear', e.target.value)} placeholder="Start Year" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79] min-h-[48px] text-base" /><input type="number" value={edu.endYear || ''} onChange={(e) => handleArrayChange('education', index, 'endYear', e.target.value)} placeholder="End Year" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79] min-h-[48px] text-base" /></div></div></div>))}<button onClick={() => handleArrayAdd('education', { degree: '', institution: '', startYear: '', endYear: '', gpa: '' })} className="w-full py-4 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-[#bbad79] hover:text-[#bbad79] min-h-[48px] flex items-center justify-center gap-2"><FaPlus /> Add Education</button></div>
        );
      case 'projects':
        return (
          <div className="space-y-6">{resumeData.projects.map((project, index) => (<div key={index} className="p-4 bg-gray-50 rounded-lg relative"><button onClick={() => handleArrayRemove('projects', index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"><FaTrash /></button><div className="space-y-3"><input type="text" value={project.name || ''} onChange={(e) => handleArrayChange('projects', index, 'name', e.target.value)} placeholder="Project Name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79] min-h-[48px] text-base" /><input type="text" value={project.technologies || ''} onChange={(e) => handleArrayChange('projects', index, 'technologies', e.target.value)} placeholder="Technologies" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79] min-h-[48px] text-base" /><textarea value={project.description || ''} onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)} rows={3} placeholder="Description" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79] min-h-[100px] text-base" /></div></div>))}<button onClick={() => handleArrayAdd('projects', { name: '', technologies: '', description: '' })} className="w-full py-4 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-[#bbad79] hover:text-[#bbad79] min-h-[48px] flex items-center justify-center gap-2"><FaPlus /> Add Project</button></div>
        );
      case 'certifications':
        return (
          <div className="space-y-6">{resumeData.certifications.map((cert, index) => (<div key={index} className="p-4 bg-gray-50 rounded-lg relative"><button onClick={() => handleArrayRemove('certifications', index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"><FaTrash /></button><div className="space-y-3"><input type="text" value={cert.name || ''} onChange={(e) => handleArrayChange('certifications', index, 'name', e.target.value)} placeholder="Certification Name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79] min-h-[48px] text-base" /><input type="text" value={cert.issuer || ''} onChange={(e) => handleArrayChange('certifications', index, 'issuer', e.target.value)} placeholder="Issuing Organization" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79] min-h-[48px] text-base" /><input type="month" value={cert.date || ''} onChange={(e) => handleArrayChange('certifications', index, 'date', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79] min-h-[48px] text-base" /></div></div>))}<button onClick={() => handleArrayAdd('certifications', { name: '', issuer: '', date: '' })} className="w-full py-4 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-[#bbad79] hover:text-[#bbad79] min-h-[48px] flex items-center justify-center gap-2"><FaPlus /> Add Certification</button></div>
        );
      case 'languages':
        return (
          <div className="space-y-6">{resumeData.languages.map((lang, index) => (<div key={index} className="p-4 bg-gray-50 rounded-lg relative"><button onClick={() => handleArrayRemove('languages', index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"><FaTrash /></button><div className="grid grid-cols-1 sm:grid-cols-2 gap-3"><input type="text" value={lang.name || ''} onChange={(e) => handleArrayChange('languages', index, 'name', e.target.value)} placeholder="Language" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79] min-h-[48px] text-base" /><select value={lang.proficiency || ''} onChange={(e) => handleArrayChange('languages', index, 'proficiency', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bbad79] min-h-[48px] text-base"><option value="">Select</option><option value="Native">Native</option><option value="Fluent">Fluent</option><option value="Advanced">Advanced</option><option value="Intermediate">Intermediate</option><option value="Basic">Basic</option></select></div></div>))}<button onClick={() => handleArrayAdd('languages', { name: '', proficiency: '' })} className="w-full py-4 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-[#bbad79] hover:text-[#bbad79] min-h-[48px] flex items-center justify-center gap-2"><FaPlus /> Add Language</button></div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col max-w-full overflow-x-hidden">
      <header className="bg-white shadow-sm py-3 px-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center space-x-3 min-w-0">
          <Link to="/dashboard" className="text-gray-600 hover:text-[#bbad79] text-sm whitespace-nowrap">← Back</Link>
          <h1 className="text-base font-bold text-gray-900 truncate max-w-[150px] sm:max-w-none">Resume Builder</h1>
        </div>
        <div className="flex items-center flex-wrap justify-end gap-2 w-full sm:w-auto">
          <button onClick={() => setViewMode(viewMode === 'edit' ? 'preview' : 'edit')} className="md:hidden flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-[#bbad79] min-w-[44px] min-h-[44px] justify-center"><FaEye /><span className="text-sm">{viewMode === 'edit' ? 'Preview' : 'Edit'}</span></button>
          <button onClick={() => { setShowPreview(!showPreview); setViewMode('edit'); }} className="hidden md:flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-[#bbad79]">{showPreview ? <FaEyeSlash /> : <FaEye />}<span>{showPreview ? 'Hide' : 'Show'} Preview</span></button>
          <button onClick={saveResume} className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-[#bbad79] text-white rounded-lg hover:bg-[#9a9163] text-sm min-h-[44px]"><FaSave /><span className="hidden sm:inline">{saving ? 'Saving...' : 'Save'}</span></button>
          <button onClick={downloadPDF} className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm min-h-[44px]"><FaDownload /><span className="hidden sm:inline">Download</span></button>
        </div>
      </header>
      <div className="bg-white border-b overflow-x-auto whitespace-nowrap scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
        <div className="flex gap-2 px-4 py-2">
          {templates.map((template) => (<button key={template.id} onClick={() => setSelectedTemplate(template.id)} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap min-h-[44px] ${selectedTemplate === template.id ? 'bg-[#bbad79] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>{template.name}</button>))}
        </div>
      </div>
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Editor Panel */}
        <div className={`${
          showSplitView ? 'lg:w-1/2' : 'w-full'
        } overflow-y-auto transition-all duration-300 ${
          shouldShowEditorPanel ? '' : 'hidden'
        }`}>
          <div className="bg-white border-b scrollbar-hide-mobile overflow-x-auto whitespace-nowrap" style={{ WebkitOverflowScrolling: 'touch' }}>
            <div className="flex px-4 py-2">
              {sections.map((section) => (
                <button 
                  key={section.id} 
                  onClick={() => setActiveSection(section.id)} 
                  className={`flex items-center space-x-2 px-4 py-3 border-b-2 whitespace-nowrap min-h-[44px] rounded-b-none transition-all ${
                    activeSection === section.id 
                      ? 'border-[#bbad79] text-[#bbad79] bg-[#bbad79]/5' 
                      : 'border-transparent text-gray-600 hover:text-[#bbad79] hover:border-[#bbad79]/30'
                  }`}
                >
                  {section.icon}
                  <span className="text-xs sm:text-sm font-medium">{section.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 template-safe">
                {sections.find(s => s.id === activeSection)?.label} Information
              </h2>
              {saveMessage && (
                <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                  {saveMessage}
                </div>
              )}
              {renderForm()}
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        {shouldShowPreviewPanel && (
          <div className={`
            ${showSplitView ? 'lg:w-1/2' : 'w-full'}
            bg-gradient-to-br from-gray-50 to-gray-200 overflow-hidden transition-all duration-300
          `}>
            <div className="sticky top-0 p-4 sm:p-6 lg:p-8 bg-white/80 backdrop-blur-sm z-10 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 template-safe">
                  Live Preview
                </h3>
                <span className="text-xs text-gray-500 hidden sm:inline">
                  {deviceLabel} View
                </span>
              </div>
            </div>
            <div className={`resume-preview-wrapper mx-auto overflow-y-auto overflow-x-hidden scrollbar-hide-mobile max-h-screen ${isMobile ? 'p-2' : 'p-4 sm:p-6 lg:p-8'}`}>
              <div
                className="document-shell relative"
                style={{
                  width: isMobile ? `${scaledDocumentWidth}px` : previewShellWidth,
                  maxWidth: `${scaledDocumentWidth}px`,
                  height: `${scaledDocumentHeight}px`,
                  margin: '0 auto'
                }}
              >
                <div 
                  className={`document-page absolute left-0 top-0 shadow-2xl border border-gray-200 overflow-hidden ${isMobile ? 'rounded-lg' : 'rounded-2xl'}`}
                  ref={resumeRef}
                  style={{
                    width: `${documentWidth}px`,
                    minHeight: `${documentHeight}px`,
                    transform: `scale(${previewScale})`,
                    transformOrigin: 'top left'
                  }}
                >
                  <TemplateRenderer templateId={selectedTemplate} data={resumeData} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Mobile Floating Action Button - Non-overlapping */}
      {isMobile && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 pointer-events-auto">
          <button 
            onClick={() => setViewMode(viewMode === 'edit' ? 'preview' : 'edit')} 
            className={`
              flex items-center space-x-2 px-4 py-3 sm:px-5 sm:py-4 
              rounded-full shadow-2xl backdrop-blur-md border border-white/20
              text-white font-semibold text-sm sm:text-base min-h-[48px] min-w-[110px] sm:min-w-[120px]
              transition-all duration-300 active:scale-95
              ${viewMode === 'edit' ? 'bg-gradient-to-r from-[#bbad79] to-[#9a9163] shadow-[#bbad79]/30' : 'bg-gradient-to-r from-gray-700 to-gray-800 shadow-gray-500/30'}
            `}
          >
            {viewMode === 'edit' ? (
              <>
                <FaEye className="w-4 h-4" />
                <span>Preview</span>
              </>
            ) : (
              <>
                <FaEyeSlash className="w-4 h-4" />
                <span>Edit</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Inline styles deprecated - All moved to Tailwind */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: '-10000px',
          top: 0,
          width: `${documentWidth}px`,
          minHeight: `${documentHeight}px`,
          background: '#ffffff',
          pointerEvents: 'none',
          opacity: 1,
          overflow: 'visible',
          zIndex: -1
        }}
      >
        <div
          ref={printableResumeRef}
          className="document-page"
          style={{
            width: `${documentWidth}px`,
            minHeight: `${documentHeight}px`,
            background: '#ffffff'
          }}
        >
          <TemplateRenderer templateId={selectedTemplate} data={resumeData} />
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;

