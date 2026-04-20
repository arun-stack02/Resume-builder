/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FormInput, FormTextarea } from '../FormUI';
import { Project } from '../../types';
import { Plus, Trash2, Link as LinkIcon, Sparkles, Loader2 } from 'lucide-react';
import { improveDescription } from '../../services/geminiService';

interface Props {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

export default function ProjectsSection({ projects, onChange }: Props) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const addProject = () => {
    const newProj: Project = {
      id: Math.random().toString(36).substr(2, 9),
      title: '',
      link: '',
      technologies: [],
      description: ''
    };
    onChange([...projects, newProj]);
  };

  const removeProject = (id: string) => {
    onChange(projects.filter(p => p.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    onChange(projects.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleAiAssist = async (id: string) => {
    const proj = projects.find(p => p.id === id);
    if (!proj || !proj.description) return;

    setLoadingId(id);
    const improved = await improveDescription(proj.description, `Project titled ${proj.title}`);
    updateProject(id, 'description', improved);
    setLoadingId(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <p className="text-indigo-600 font-bold text-[10px] uppercase tracking-widest mb-1">Final Section</p>
        <h1 className="text-2xl font-black tracking-tight text-gray-900 mb-2">Key Projects</h1>
        <p className="text-sm text-gray-500">Showcase your side projects, open source contributions, or portfolio highlights.</p>
      </header>

      <div className="space-y-8">
        {projects.map((proj, index) => (
          <div key={proj.id} className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 relative group animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-8">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">Project {index + 1}</span>
              <button 
                onClick={() => removeProject(proj.id)}
                className="text-red-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors"
                title="Remove Project"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
              <div className="md:col-span-2">
                <FormInput 
                  label="Project Title" 
                  value={proj.title}
                  onChange={(e) => updateProject(proj.id, 'title', e.target.value)}
                  placeholder="e.g. Manuscript"
                />
              </div>
              <div className="md:col-span-2 relative">
                <div className="absolute left-0 bottom-[14px]">
                  <LinkIcon className="w-3.5 h-3.5 text-gray-400" />
                </div>
                <FormInput 
                  label="Link / URL" 
                  value={proj.link}
                  onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                  placeholder="github.com/yourusername/project"
                  className="pl-5"
                />
              </div>
              <div className="md:col-span-2">
                <FormInput 
                  label="Technologies (comma separated)" 
                  value={proj.technologies.join(', ')}
                  onChange={(e) => updateProject(proj.id, 'technologies', e.target.value.split(',').map(s => s.trim()))}
                  placeholder="React, TypeScript, Tailwind"
                />
              </div>
              <div className="md:col-span-2">
                <FormTextarea 
                  label="Description" 
                  value={proj.description}
                  onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                  onAiAssist={() => handleAiAssist(proj.id)}
                  isAiLoading={loadingId === proj.id}
                  placeholder="Describe your role and what you built..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={addProject}
        className="w-full py-6 border-2 border-dashed border-gray-100 rounded-2xl text-gray-400 hover:border-indigo-300 hover:bg-indigo-50/30 hover:text-indigo-500 transition-all font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" /> Add Another Project
      </button>
    </div>
  );
}
