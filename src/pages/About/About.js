import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowRight,
  FaBullseye,
  FaCheckCircle,
  FaEnvelope,
  FaFileAlt,
  FaHeart,
  FaSearch,
  FaShieldAlt,
  FaUsers
} from 'react-icons/fa';

const pillars = [
  {
    icon: <FaFileAlt className="text-2xl" />,
    title: 'Professional Builders',
    description: 'Create clean resumes and cover letters with live editing, thoughtful structure, and polished presentation.'
  },
  {
    icon: <FaSearch className="text-2xl" />,
    title: 'ATS-Focused Tools',
    description: 'Improve keyword alignment, readability, and compatibility so your applications perform better in modern hiring systems.'
  },
  {
    icon: <FaShieldAlt className="text-2xl" />,
    title: 'Simple, Reliable Experience',
    description: 'Use a workflow that feels fast and intuitive across desktop, tablet, and mobile without sacrificing quality.'
  }
];

const values = [
  {
    title: 'Clarity first',
    body: 'We believe career tools should remove stress, not add to it. Every screen is designed to help users move forward with confidence.'
  },
  {
    title: 'Design with purpose',
    body: 'Templates and flows are built to feel premium while staying practical for real job applications and recruiter expectations.'
  },
  {
    title: 'Useful feedback',
    body: 'From ATS analysis to content structure, the goal is simple: help users understand what to improve and why it matters.'
  }
];

const stats = [
  { value: 'Resume', label: 'Builder that feels polished and easy to use' },
  { value: 'Cover Letter', label: 'Writer for faster, stronger applications' },
  { value: 'ATS', label: 'Checks to help improve job-match readiness' }
];

const About = () => (
  <div className="min-h-screen bg-white">
    <section className="relative overflow-hidden bg-[#1a2332] pt-28 sm:pt-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(187,173,121,0.16),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(187,173,121,0.12),_transparent_30%)]" />
      <div className="absolute -top-10 left-0 h-56 w-56 rounded-full bg-[#bbad79]/10 blur-3xl" />
      <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-[#bbad79]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-sm">
              <FaHeart className="text-[#bbad79]" />
              Built to make career growth feel more achievable
            </div>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              About MN Resume Builder
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
              MN Resume Builder helps professionals create strong resumes, compelling cover letters, and ATS-friendly applications in one cohesive experience. The focus is equal parts quality, simplicity, and confidence.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/resume-builder"
                className="inline-flex items-center justify-center rounded-xl bg-[#bbad79] px-6 py-3.5 font-semibold text-white transition-all hover:bg-[#9a9163]"
              >
                Build Your Resume
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 font-semibold text-white transition-all hover:bg-white/15"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {stats.map((stat) => (
              <div key={stat.value} className="rounded-3xl border border-white/10 bg-white/10 p-5 text-white shadow-xl backdrop-blur-sm">
                <div className="text-xl font-semibold text-[#bbad79]">{stat.value}</div>
                <p className="mt-2 text-sm leading-6 text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="bg-[#f7f5ee] py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#bbad79]/10 px-4 py-2 text-sm font-medium text-[#8e835c]">
            <FaBullseye />
            Our mission
          </div>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Career tools that feel premium, practical, and easy to trust
          </h2>
          <p className="mt-4 text-base leading-8 text-gray-600 sm:text-lg">
            The platform is designed for people who want a beautiful result without fighting complicated tools. Every feature aims to make application prep faster while still keeping output professional.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="rounded-3xl border border-[#e7dfc3] bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1a2332] text-[#bbad79]">
                {pillar.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{pillar.title}</h3>
              <p className="mt-3 text-gray-600 leading-7">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="rounded-[2rem] bg-[#1a2332] p-8 text-white shadow-2xl sm:p-10">
          <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#bbad79] text-white">
            <FaUsers className="text-2xl" />
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl">What users can expect</h2>
          <p className="mt-4 text-gray-300 leading-8">
            A smooth workflow, focused content tools, and layouts that stay aligned with the professional tone of the rest of the platform.
          </p>
          <div className="mt-8 space-y-4">
            {[
              'Responsive editing and preview experiences across screen sizes',
              'Templates that support both strong design and recruiter readability',
              'A cohesive system for resumes, cover letters, and ATS preparation'
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                <FaCheckCircle className="mt-1 text-[#bbad79]" />
                <p className="text-sm leading-6 text-gray-200">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-gray-100 bg-gray-50 p-8 shadow-sm sm:p-10">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">The values behind the experience</h2>
          <div className="mt-8 space-y-6">
            {values.map((value) => (
              <div key={value.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                <h3 className="text-xl font-semibold text-gray-900">{value.title}</h3>
                <p className="mt-3 text-gray-600 leading-7">{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="bg-gradient-to-r from-[#bbad79] to-[#9a9163] py-14 sm:py-18">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to create something application-ready?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/90 sm:text-lg">
          Start your resume, polish your cover letter, or reach out if you want to connect with the team behind the platform.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/resume-builder"
            className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 font-semibold text-[#8e835c] transition-all hover:bg-gray-100"
          >
            Start Building
            <FaArrowRight className="ml-2" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-transparent px-6 py-3.5 font-semibold text-white transition-all hover:bg-white/10"
          >
            <FaEnvelope className="mr-2" />
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default About;
