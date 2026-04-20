/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { User, Briefcase, GraduationCap, Brain, FolderKanban, Plus, LogOut, Layout } from 'lucide-react';
import { SectionType } from '../types';
import { motion } from 'motion/react';

interface Props {
  activeSection: SectionType;
  setActiveSection: (section: SectionType) => void;
}

const sections: { id: SectionType; label: string; icon: React.ReactNode }[] = [
  { id: 'personal', label: 'Personal', icon: <User className="w-5 h-5" /> },
  { id: 'experience', label: 'Experience', icon: <Briefcase className="w-5 h-5" /> },
  { id: 'education', label: 'Education', icon: <GraduationCap className="w-5 h-5" /> },
  { id: 'skills', label: 'Skills', icon: <Brain className="w-5 h-5" /> },
  { id: 'projects', label: 'Projects', icon: <FolderKanban className="w-5 h-5" /> },
];

export default function Sidebar({ activeSection, setActiveSection }: Props) {
  return (
    <aside className="w-64 border-r border-gray-100 bg-gray-50 flex flex-col p-6 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
      <div className="mb-10">
        <h2 className="text-lg font-black tracking-tighter text-gray-900 mb-1">Drafting Table</h2>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">V1.0.4</span>
          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
          <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-400">Manuscript</span>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`
                group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${isActive 
                  ? 'bg-white shadow-sm text-indigo-600 ring-1 ring-gray-100' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-200/50'}
              `}
            >
              <span className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                {section.icon}
              </span>
              <span className={`text-sm font-bold uppercase tracking-wider ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>
                {section.label}
              </span>
              {isActive && (
                <motion.div 
                  layoutId="active-pill"
                  className="ml-auto w-1 h-5 bg-indigo-600 rounded-full"
                />
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-200 space-y-4">
        <button className="w-full py-3 px-4 bg-indigo-50 text-indigo-700 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-100 transition-colors">
          <Plus className="w-4 h-4" /> New Draft
        </button>
        
        <div className="flex flex-col gap-1">
          <button className="flex items-center gap-3 px-4 py-2 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">
            <Layout className="w-4 h-4" /> Account
          </button>
          <button className="flex items-center gap-3 px-4 py-2 text-sm font-bold text-red-400 hover:text-red-500 transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
