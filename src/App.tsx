/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ResumePreview from './components/ResumePreview';
import PersonalSection from './components/sections/PersonalSection';
import ExperienceSection from './components/sections/ExperienceSection';
import EducationSection from './components/sections/EducationSection';
import SkillsSection from './components/sections/SkillsSection';
import ProjectsSection from './components/sections/ProjectsSection';
import { Resume, SectionType } from './types';
import { ChevronRight, ChevronLeft, ZoomIn, ZoomOut } from 'lucide-react';

const initialResume: Resume = {
  personal: {
    fullName: 'Julian Voss',
    professionalTitle: 'Senior Product Designer',
    email: 'julian@manuscript.io',
    phone: '+49 176 0000 0000',
    location: 'Berlin, Germany',
    linkedin: 'linkedin.com/in/julianvoss',
  },
  experiences: [
    {
      id: '1',
      jobTitle: 'Senior Product Designer',
      company: 'Acme Corporation',
      location: 'Berlin, Germany',
      startDate: 'Mar 2021',
      endDate: 'Present',
      isCurrent: true,
      description: '• Spearheaded the redesign of the core web application, resulting in a 40% increase in user engagement.\n• Mentored a team of 4 junior designers, establishing a unified design system.\n• Collaborated directly with engineering leads to ensure 100% fidelity in implementation.'
    }
  ],
  education: [
    {
      id: '1',
      institution: 'Technical University of Berlin',
      degree: 'B.Sc. in Human-Computer Interaction',
      location: 'Berlin, Germany',
      graduationDate: '2021',
      description: 'First Class Honours. Specialized in Cognitive Ergonomics.'
    }
  ],
  projects: [
    {
      id: '1',
      title: 'Manuscript',
      link: 'github.com/voss/manuscript',
      technologies: ['React', 'TypeScript', 'Tailwind'],
      description: 'A precision resume builder with AI assistance and live A4 preview.'
    }
  ],
  skills: [
    { id: '1', name: 'Figma' },
    { id: '2', name: 'Design Systems' },
    { id: '3', name: 'Prototyping' },
    { id: '4', name: 'User Research' },
  ],
};

const sectionOrder: SectionType[] = ['personal', 'experience', 'education', 'skills', 'projects'];

export default function App() {
  const [resume, setResume] = useState<Resume>(initialResume);
  const [activeSection, setActiveSection] = useState<SectionType>('personal');
  const [scale, setScale] = useState(0.8);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleNext = () => {
    const currentIndex = sectionOrder.indexOf(activeSection);
    if (currentIndex < sectionOrder.length - 1) {
      setActiveSection(sectionOrder[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    const currentIndex = sectionOrder.indexOf(activeSection);
    if (currentIndex > 0) {
      setActiveSection(sectionOrder[currentIndex - 1]);
    }
  };

  const updateResume = useCallback((field: keyof Resume, value: any) => {
    setResume(prev => ({ ...prev, [field]: value }));
  }, []);

  const downloadPdf = () => {
    window.print();
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalSection data={resume.personal} onChange={(val) => updateResume('personal', val)} />;
      case 'experience':
        return <ExperienceSection experiences={resume.experiences} onChange={(val) => updateResume('experiences', val)} />;
      case 'education':
        return <EducationSection education={resume.education} onChange={(val) => updateResume('education', val)} />;
      case 'skills':
        return <SkillsSection skills={resume.skills} experiences={resume.experiences} onChange={(val) => updateResume('skills', val)} />;
      case 'projects':
        return <ProjectsSection projects={resume.projects} onChange={(val) => updateResume('projects', val)} />;
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans ${isDarkMode ? 'dark' : ''}`}>
      <Navbar 
        onDownload={downloadPdf} 
        isDarkMode={isDarkMode} 
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)} 
      />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        
        <main className="flex-1 flex overflow-hidden bg-white">
          {/* Form Side */}
          <section className="w-full lg:w-[45%] h-full overflow-y-auto border-r border-gray-100 bg-gray-50/50 p-8 lg:p-12 relative flex flex-col">
            <div className="max-w-2xl mx-auto w-full flex-1">
              {renderSection()}
            </div>
            
            <div className="mt-12 flex justify-between items-center py-6 border-t border-gray-200">
              <button 
                onClick={handlePrev}
                disabled={activeSection === 'personal'}
                className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-indigo-600 disabled:opacity-0 disabled:pointer-events-none transition-all group"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
              </button>
              
              {activeSection !== 'projects' ? (
                <button 
                  onClick={handleNext}
                  className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-[0.14em] flex items-center gap-2 hover:bg-indigo-700 transition-all active:scale-95 group shadow-lg shadow-indigo-100"
                >
                  Next Section <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button 
                  onClick={downloadPdf}
                  className="bg-green-600 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-[0.14em] flex items-center gap-2 hover:bg-green-700 transition-all active:scale-95 group shadow-lg shadow-green-100"
                >
                  Finalize & Download
                </button>
              )}
            </div>
          </section>

          {/* Preview Side */}
          <section className="hidden lg:flex flex-1 bg-gray-200/50 h-full overflow-y-auto relative py-12 px-8 flex-col items-center">
            {/* Controls */}
            <div className="fixed bottom-10 right-10 flex gap-2 z-20">
              <button 
                onClick={() => setScale(Math.max(0.4, scale - 0.1))}
                className="w-12 h-12 bg-white/80 backdrop-blur-md rounded-full shadow-xl border border-white flex items-center justify-center hover:bg-white transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-5 h-5 text-gray-600" />
              </button>
              <div className="h-12 px-5 bg-white/80 backdrop-blur-md rounded-full shadow-xl border border-white flex items-center justify-center text-sm font-black text-gray-900">
                {Math.round(scale * 100)}%
              </div>
              <button 
                onClick={() => setScale(Math.min(1.2, scale + 0.1))}
                className="w-12 h-12 bg-white/80 backdrop-blur-md rounded-full shadow-xl border border-white flex items-center justify-center hover:bg-white transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <ResumePreview resume={resume} scale={scale} />
          </section>
        </main>
      </div>

      <style>{`
        @media print {
          nav, aside, section:first-of-type, .fixed {
            display: none !important;
          }
          main {
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
            height: auto !important;
            display: block !important;
            background: white !important;
          }
          section:last-of-type {
            display: block !important;
            padding: 0 !important;
            background: white !important;
            width: 100% !important;
            height: auto !important;
            overflow: visible !important;
          }
          #resume-document {
            transform: scale(1) !important;
            margin: 0 !important;
            box-shadow: none !important;
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
