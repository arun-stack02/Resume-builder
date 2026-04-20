/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FormInput, FormTextarea } from '../FormUI';
import { Education } from '../../types';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  education: Education[];
  onChange: (education: Education[]) => void;
}

export default function EducationSection({ education, onChange }: Props) {
  const addEducation = () => {
    const newEdu: Education = {
      id: Math.random().toString(36).substr(2, 9),
      institution: '',
      degree: '',
      location: '',
      graduationDate: '',
      description: ''
    };
    onChange([...education, newEdu]);
  };

  const removeEducation = (id: string) => {
    onChange(education.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    onChange(education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-2xl font-black tracking-tight text-gray-900 mb-2">Education History</h1>
        <p className="text-sm text-gray-500">Detail your academic background to build institutional credibility.</p>
      </header>

      <div className="space-y-8">
        {education.map((edu, index) => (
          <div key={edu.id} className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 relative group animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-8">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">Institution {index + 1}</span>
              <button 
                onClick={() => removeEducation(edu.id)}
                className="text-red-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
              <div className="md:col-span-2">
                <FormInput 
                  label="Institution" 
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                  placeholder="e.g. Stanford University"
                />
              </div>
              <div className="md:col-span-2">
                <FormInput 
                  label="Degree & Field" 
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  placeholder="e.g. M.S. in Computer Science"
                />
              </div>
              <FormInput 
                label="Location" 
                value={edu.location}
                onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                placeholder="Palo Alto, CA"
              />
              <FormInput 
                label="Graduation Year" 
                value={edu.graduationDate}
                onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                placeholder="2022"
              />
              <div className="md:col-span-2">
                <FormTextarea 
                  label="GPA / Honors / Coursework" 
                  value={edu.description}
                  onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                  placeholder="3.9 GPA. Phi Beta Kappa. Artificial Intelligence focus."
                  className="min-h-[80px]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={addEducation}
        className="w-full py-6 border-2 border-dashed border-gray-100 rounded-2xl text-gray-400 hover:border-indigo-300 hover:bg-indigo-50/30 hover:text-indigo-500 transition-all font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" /> Add Another Institution
      </button>
    </div>
  );
}
