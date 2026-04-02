import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowRight,
  FaClock,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTwitter
} from 'react-icons/fa';

const contactMethods = [
  {
    icon: <FaEnvelope className="text-xl" />,
    title: 'Email support',
    value: 'support@mnresumebuilder.com',
    href: 'mailto:support@mnresumebuilder.com',
    note: 'Best for feedback, product questions, and general help.'
  },
  {
    icon: <FaPhoneAlt className="text-xl" />,
    title: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
    note: 'For direct communication during working hours.'
  },
  {
    icon: <FaMapMarkerAlt className="text-xl" />,
    title: 'Location',
    value: 'Karachi, Pakistan',
    href: 'https://maps.google.com/?q=Karachi,+Pakistan',
    note: 'Serving professionals and job seekers across devices and regions.'
  }
];

const faqs = [
  {
    title: 'Can I get help with resume or cover letter issues?',
    body: 'Yes. If something feels off in the builder, export flow, or account experience, the contact options on this page are the best place to reach out.'
  },
  {
    title: 'Do you accept product feedback?',
    body: 'Absolutely. Suggestions about templates, analysis quality, UX polish, and export behavior are all welcome.'
  },
  {
    title: 'How quickly should I expect a response?',
    body: 'Response times can vary, but messages are typically reviewed as soon as possible during active support hours.'
  }
];

const Contact = () => (
  <div className="min-h-screen bg-white">
    <section className="relative overflow-hidden bg-[#1a2332] pt-28 sm:pt-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(187,173,121,0.15),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(187,173,121,0.12),_transparent_30%)]" />
      <div className="absolute left-0 top-20 h-64 w-64 rounded-full bg-[#bbad79]/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#bbad79]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-sm">
              <FaEnvelope className="text-[#bbad79]" />
              We would love to hear from you
            </div>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Contact MN Resume Builder
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
              Reach out for support, feature feedback, collaboration, or any questions about the platform. The page is designed to feel as polished and approachable as the rest of the product.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="mailto:support@mnresumebuilder.com"
                className="inline-flex items-center justify-center rounded-xl bg-[#bbad79] px-6 py-3.5 font-semibold text-white transition-all hover:bg-[#9a9163]"
              >
                Email Support
              </a>
              <Link
                to="/about"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 font-semibold text-white transition-all hover:bg-white/15"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-sm sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <FaClock className="text-2xl text-[#bbad79]" />
                <h2 className="mt-4 text-lg font-semibold">Support hours</h2>
                <p className="mt-2 text-sm leading-6 text-gray-300">Monday to Saturday, with messages reviewed as quickly as possible.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <FaMapMarkerAlt className="text-2xl text-[#bbad79]" />
                <h2 className="mt-4 text-lg font-semibold">Based in Karachi</h2>
                <p className="mt-2 text-sm leading-6 text-gray-300">Built with a global audience in mind and optimized for modern devices.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-[#f7f5ee] py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {contactMethods.map((method) => (
            <a
              key={method.title}
              href={method.href}
              target={method.href.startsWith('http') ? '_blank' : undefined}
              rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="rounded-[1.75rem] border border-[#e7dfc3] bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1a2332] text-[#bbad79]">
                {method.icon}
              </div>
              <h2 className="text-xl font-semibold text-gray-900">{method.title}</h2>
              <p className="mt-3 break-all text-base font-medium text-[#8e835c]">{method.value}</p>
              <p className="mt-3 text-gray-600 leading-7">{method.note}</p>
            </a>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="rounded-[2rem] bg-gray-50 p-8 shadow-sm ring-1 ring-gray-100 sm:p-10">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Reach out the way you prefer</h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
            Whether you want support, want to report an issue, or simply want to share an idea, these channels keep everything easy to access on both desktop and mobile.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <a
              href="https://linkedin.com/in/mahira-noor-developer08"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-gray-100 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <FaLinkedin className="mx-auto text-3xl text-[#0a66c2]" />
              <div className="mt-3 font-semibold text-gray-900">LinkedIn</div>
              <div className="mt-1 text-sm text-gray-500">Professional updates</div>
            </a>
            <a
              href="https://twitter.com/Mahiranoor088"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-gray-100 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <FaTwitter className="mx-auto text-3xl text-[#1d9bf0]" />
              <div className="mt-3 font-semibold text-gray-900">Twitter</div>
              <div className="mt-1 text-sm text-gray-500">Quick connection</div>
            </a>
            <a
              href="https://github.com/developer-mahira"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-gray-100 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <FaGithub className="mx-auto text-3xl text-gray-900" />
              <div className="mt-3 font-semibold text-gray-900">GitHub</div>
              <div className="mt-1 text-sm text-gray-500">Projects and work</div>
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] bg-[#1a2332] p-8 text-white shadow-2xl sm:p-10">
          <h2 className="text-3xl font-bold sm:text-4xl">Common questions</h2>
          <div className="mt-8 space-y-4">
            {faqs.map((faq) => (
              <div key={faq.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-semibold text-white">{faq.title}</h3>
                <p className="mt-2 text-sm leading-7 text-gray-300">{faq.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="bg-gradient-to-r from-[#bbad79] to-[#9a9163] py-14 sm:py-18">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">Want to explore the platform while you are here?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/90 sm:text-lg">
          You can jump straight into building a resume or read more about the product vision and experience behind MN Resume Builder.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/resume-builder"
            className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 font-semibold text-[#8e835c] transition-all hover:bg-gray-100"
          >
            Build Resume
            <FaArrowRight className="ml-2" />
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-transparent px-6 py-3.5 font-semibold text-white transition-all hover:bg-white/10"
          >
            About the Platform
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default Contact;
