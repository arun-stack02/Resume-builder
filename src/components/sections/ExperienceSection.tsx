/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FormInput, FormTextarea } from '../FormUI';
import { Experience } from '../../types';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { improveDescription } from '../../services/geminiService';

interface Props {
  experiences: Experience[];
  onChange: (experiences: Experience[]) => void;
}

export default function ExperienceSection({ experiences, onChange }: Props) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const addExperience = () => {
    const newExp: Experience = {
      id: Math.random().toString(36).substr(2, 9),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: ''
    };
    onChange([...experiences, newExp]);
  };

  const removeExperience = (id: string) => {
    onChange(experiences.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onChange(experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
  };

  const handleAiAssist = async (id: string) => {
    const exp = experiences.find(e => e.id === id);
    if (!exp || !exp.description) return;

    setLoadingId(id);
    const improved = await improveDescription(exp.description, `Experience at ${exp.company} as ${exp.jobTitle}`);
    updateExperience(id, 'description', improved);
    setLoadingId(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-2xl font-black tracking-tight text-gray-900 mb-2">Work Experience</h1>
        <p className="text-sm text-gray-500">Detail your professional journey. Focus on achievements rather than responsibilities.</p>
      </header>

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div key={exp.id} className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 relative group animate-in zoom-in-95 duration-300">
            <div className="absolute -left-3 top-8 w-6 h-6 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity">
              <GripVertical className="w-3.5 h-3.5 text-gray-400" />
            </div>
            
            <div className="flex justify-between items-center mb-8">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">Role {index + 1}</span>
              <button 
                onClick={() => removeExperience(exp.id)}
                className="text-red-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors"
                title="Remove Role"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
              <div className="md:col-span-2">
                <FormInput 
                  label="Job Title" 
                  value={exp.jobTitle}
                  onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                  placeholder="e.g. Senior Product Designer"
                />
              </div>
              <FormInput 
                label="Company" 
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                placeholder="Acme Corp"
              />
              <FormInput 
                label="Location" 
                value={exp.location}
                onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                placeholder="San Francisco, CA"
              />
              <FormInput 
                label="Start Date" 
                value={exp.startDate}
                onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                placeholder="Mar 2021"
              />
              <FormInput 
                label="End Date" 
                value={exp.endDate}
                onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                placeholder="Present"
                disabled={exp.isCurrent}
              />
              <div className="md:col-span-2">
                <FormTextarea 
                  label="Description" 
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  onAiAssist={() => handleAiAssist(exp.id)}
                  isAiLoading={loadingId === exp.id}
                  placeholder="• Spearheaded the redesign of the core web application..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={addExperience}
        className="w-full py-6 border-2 border-dashed border-gray-100 rounded-2xl text-gray-400 hover:border-indigo-300 hover:bg-indigo-50/30 hover:text-indigo-500 transition-all font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" /> Add Another Experience
      </button>
    </div>
  );
}
