/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe, Link as LinkIcon } from 'lucide-react';
import { Resume } from '../types';

interface Props {
  resume: Resume;
  scale?: number;
}

export default function ResumePreview({ resume, scale = 1 }: Props) {
  const { personal, experiences, education, projects, skills } = resume;

  return (
    <div 
      id="resume-document"
      className="bg-white text-[#1a1c20] shadow-2xl origin-top transition-transform duration-300"
      style={{ 
        width: '210mm', 
        minHeight: '297mm', 
        padding: '20mm',
        transform: `scale(${scale})`,
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Header */}
      <header className={`border-b border-gray-200 pb-8 mb-8 ${personal.photoUrl ? 'flex items-center gap-8 text-left' : 'text-center'}`}>
        {personal.photoUrl && (
          <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-indigo-50 shadow-sm shrink-0">
            <img 
              src={personal.photoUrl} 
              alt={personal.fullName} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold tracking-tighter uppercase mb-2 text-gray-900">
            {personal.fullName || 'Your Name'}
          </h1>
          <p className="text-lg font-medium text-indigo-600 mb-4">
            {personal.professionalTitle || 'Professional Title'}
          </p>
          <div className={`flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-semibold text-gray-500 uppercase tracking-wider ${personal.photoUrl ? 'justify-start' : 'justify-center'}`}>
            {personal.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" /> {personal.email}
              </span>
            )}
            {personal.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" /> {personal.phone}
              </span>
            )}
            {personal.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {personal.location}
              </span>
            )}
            {personal.linkedin && (
              <span className="flex items-center gap-1">
                <Linkedin className="w-3 h-3" /> {personal.linkedin}
              </span>
            )}
            {personal.website && (
              <span className="flex items-center gap-1">
                <Globe className="w-3 h-3" /> {personal.website}
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-10">
        {/* Main Column */}
        <div className="col-span-2 space-y-8">
          {/* Experience */}
          <section>
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-indigo-700 mb-4 pb-1 border-b-2 border-indigo-50">
              Experience
            </h2>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-0 before:w-0.5 before:bg-indigo-50">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-[15px] font-extrabold text-gray-900 leading-tight">
                      {exp.jobTitle || 'Job Title'}
                    </h3>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline mb-3">
                    <span className="text-[13px] font-bold text-indigo-600">
                      {exp.company || 'Company'}
                    </span>
                    <span className="text-[11px] text-gray-500 italic">
                      {exp.location}
                    </span>
                  </div>
                  {exp.description && (
                    <div className="text-[12px] text-gray-600 leading-relaxed whitespace-pre-wrap">
                      {exp.description.split('\n').map((line, i) => (
                        <p key={i} className="mb-1">{line}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {experiences.length === 0 && (
                <p className="text-sm text-gray-300 italic">Add your work history...</p>
              )}
            </div>
          </section>

          {/* Projects */}
          <section>
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-indigo-700 mb-4 pb-1 border-b-2 border-indigo-50">
              Projects
            </h2>
            <div className="space-y-6">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[15px] font-bold text-gray-900">
                        {proj.title || 'Project Title'}
                      </h3>
                      {proj.link && (
                        <a href={proj.link} className="text-[10px] text-gray-400 hover:text-indigo-600 flex items-center gap-1 transition-colors">
                          <LinkIcon className="w-2.5 h-2.5" /> {proj.link.replace(/^https?:\/\//, '')}
                        </a>
                      )}
                    </div>
                  </div>
                  {proj.technologies.length > 0 && (
                    <div className="text-[10px] font-medium text-gray-500 mb-2">
                      <span className="font-bold text-gray-800 mr-2 uppercase tracking-tight">Tech:</span>
                      {proj.technologies.join(' • ')}
                    </div>
                  )}
                  <p className="text-[12px] text-gray-600 leading-relaxed">
                    {proj.description || 'Project description...'}
                  </p>
                </div>
              ))}
              {projects.length === 0 && (
                <p className="text-sm text-gray-300 italic">Add your key projects...</p>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar Column */}
        <div className="col-span-1 space-y-8">
          {/* Skills */}
          <section>
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-indigo-700 mb-4 pb-1 border-b-2 border-indigo-50">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span 
                  key={skill.id}
                  className="px-2 py-1 bg-gray-50 border border-gray-100 text-[10px] font-bold text-gray-600 rounded uppercase tracking-wider"
                >
                  {skill.name}
                </span>
              ))}
              {skills.length === 0 && (
                <p className="text-sm text-gray-300 italic">Add your expertise...</p>
              )}
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-indigo-700 mb-4 pb-1 border-b-2 border-indigo-50">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="text-[13px] font-bold text-gray-900 leading-tight">
                    {edu.degree || 'Degree'}
                  </h3>
                  <p className="text-[12px] font-bold text-indigo-600 mb-1">
                    {edu.institution || 'Institution'}
                  </p>
                  <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    <span>{edu.graduationDate}</span>
                    <span>{edu.location}</span>
                  </div>
                </div>
              ))}
              {education.length === 0 && (
                <p className="text-sm text-gray-300 italic">Add academic details...</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
