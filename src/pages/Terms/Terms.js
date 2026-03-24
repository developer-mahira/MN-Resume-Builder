import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const sections = [
  {
    title: 'Using the platform',
    body: 'MN Resume Builder is provided to help users create resumes, cover letters, and analysis reports for professional use. You are responsible for the accuracy of the information you enter.'
  },
  {
    title: 'Account responsibility',
    body: 'You are responsible for maintaining access to your account and for all actions taken under it. Please keep your sign-in method secure and up to date.'
  },
  {
    title: 'Content ownership',
    body: 'Your resume and cover letter content remain yours. By using the platform, you allow the app to process that content only to provide builder, export, and analysis features.'
  },
  {
    title: 'Acceptable use',
    body: 'You may not use the service for unlawful, misleading, abusive, or harmful activity, including impersonation, fraud, or malicious uploads.'
  }
];

const Terms = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <Link to="/signup" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#bbad79] mb-8">
        <FaArrowLeft />
        <span>Back</span>
      </Link>
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Terms of Service</h1>
        <p className="text-gray-600 mb-8">
          These terms explain the basic rules for using MN Resume Builder.
        </p>
        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{section.title}</h2>
              <p className="text-gray-600 leading-7">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Terms;
