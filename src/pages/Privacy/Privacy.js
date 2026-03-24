import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const sections = [
  {
    title: 'What we collect',
    body: 'We store the information you provide to create resumes, cover letters, and account access, including names, emails, resume content, and builder preferences.'
  },
  {
    title: 'How data is used',
    body: 'Your data is used to power editing, template rendering, downloads, account sessions, and resume analysis features inside the app.'
  },
  {
    title: 'Authentication data',
    body: 'Social sign-in and email authentication are handled through configured authentication providers. Provider-specific profile data may be used to identify your account.'
  },
  {
    title: 'Your control',
    body: 'You can delete locally stored resumes from the dashboard, sign out of your account, and stop using the platform at any time.'
  }
];

const Privacy = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <Link to="/signup" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#bbad79] mb-8">
        <FaArrowLeft />
        <span>Back</span>
      </Link>
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">
          This page explains how MN Resume Builder handles user data inside the app.
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

export default Privacy;
