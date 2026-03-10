import React from 'react';
import MinimalProfessional from './MinimalProfessional';
import CorporateClassic from './CorporateClassic';
import CreativeDesigner from './CreativeDesigner';
import ATSOptimized from './ATSOptimized';
import SidebarResume from './SidebarResume';
import DeveloperTech from './DeveloperTech';

// Preview components
import MinimalProfessionalPreview from './previews/MinimalProfessionalPreview';
import CorporateClassicPreview from './previews/CorporateClassicPreview';
import CreativeDesignerPreview from './previews/CreativeDesignerPreview';
import ATSOptimizedPreview from './previews/ATSOptimizedPreview';
import SidebarResumePreview from './previews/SidebarResumePreview';
import DeveloperTechPreview from './previews/DeveloperTechPreview';

const TemplateRenderer = ({ templateId, data, isPreview = false }) => {
  const templates = {
    minimal: {
      component: MinimalProfessional,
      previewComponent: MinimalProfessionalPreview,
      name: 'Minimal Professional',
      description: 'Clean and simple design with strong typography and white space. Ideal for corporate jobs.',
      preview: 'A clean, centered layout with elegant spacing.',
    },
    corporate: {
      component: CorporateClassic,
      previewComponent: CorporateClassicPreview,
      name: 'Corporate Classic',
      description: 'Traditional resume layout with clear sections and professional formatting.',
      preview: 'Classic serif font with professional borders.',
    },
    creative: {
      component: CreativeDesigner,
      previewComponent: CreativeDesignerPreview,
      name: 'Creative Designer',
      description: 'Modern layout with stylish dividers and visual personality. Perfect for creative roles.',
      preview: 'Vibrant colors with timeline-style experience.',
    },
    ats: {
      component: ATSOptimized,
      previewComponent: ATSOptimizedPreview,
      name: 'ATS Optimized',
      description: 'Designed specifically to pass Applicant Tracking Systems with simple structure.',
      preview: 'Plain text format optimized for algorithms.',
    },
    sidebar: {
      component: SidebarResume,
      previewComponent: SidebarResumePreview,
      name: 'Sidebar Resume',
      description: 'Modern layout with left sidebar for skills and contact information.',
      preview: 'Two-column layout with dark sidebar.',
    },
    developer: {
      component: DeveloperTech,
      previewComponent: DeveloperTechPreview,
      name: 'Developer / Tech',
      description: 'Tech-focused resume highlighting skills, projects, and technologies.',
      preview: 'Code-style formatting with terminal aesthetic.',
    },
  };

  // Handle case where templateId might be a key in the wrong format
  const templateKey = templateId?.toLowerCase() || 'minimal';
  
  // Get template config
  const templateConfig = templates[templateKey] || templates.minimal;
  
  // If isPreview is true, render the preview component instead
  if (isPreview) {
    const PreviewComponent = templateConfig.previewComponent;
    return <PreviewComponent />;
  }

  // Special handling for creative template
  const TemplateComponent = templateKey === 'creative' 
    ? CreativeDesigner 
    : templateConfig.component || MinimalProfessional;

  return <TemplateComponent data={data} />;
};

// Export all templates for the gallery
export const getAllTemplates = () => [
  {
    id: 'minimal',
    name: 'Minimal Professional',
    description: 'Clean and simple design with strong typography and white space. Ideal for corporate jobs.',
    preview: 'A clean, centered layout with elegant spacing.',
    icon: '📄',
  },
  {
    id: 'corporate',
    name: 'Corporate Classic',
    description: 'Traditional resume layout with clear sections and professional formatting.',
    preview: 'Classic serif font with professional borders.',
    icon: '🏢',
  },
  {
    id: 'creative',
    name: 'Creative Designer',
    description: 'Modern layout with stylish dividers and visual personality. Perfect for creative roles.',
    preview: 'Vibrant colors with timeline-style experience.',
    icon: '🎨',
  },
  {
    id: 'ats',
    name: 'ATS Optimized',
    description: 'Designed specifically to pass Applicant Tracking Systems with simple structure.',
    preview: 'Plain text format optimized for algorithms.',
    icon: '📋',
  },
  {
    id: 'sidebar',
    name: 'Sidebar Resume',
    description: 'Modern layout with left sidebar for skills and contact information.',
    preview: 'Two-column layout with dark sidebar.',
    icon: '📐',
  },
  {
    id: 'developer',
    name: 'Developer / Tech',
    description: 'Tech-focused resume highlighting skills, projects, and technologies.',
    preview: 'Code-style formatting with terminal aesthetic.',
    icon: '💻',
  },
];

export default TemplateRenderer;

