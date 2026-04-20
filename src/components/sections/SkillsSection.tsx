/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FormInput } from '../FormUI';
import { Skill, Experience } from '../../types';
import { Plus, X, Sparkles, Loader2 } from 'lucide-react';
import { suggestSkills } from '../../services/geminiService';

interface Props {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
  experiences: Experience[];
}

export default function SkillsSection({ skills, onChange, experiences }: Props) {
  const [newSkill, setNewSkill] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const addSkill = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!newSkill.trim()) return;
    
    // Support comma separated skills
    const names = newSkill.split(',').map(s => s.trim()).filter(s => s);
    const newSkills = names.map(name => ({
      id: Math.random().toString(36).substr(2, 9),
      name
    }));
    
    onChange([...skills, ...newSkills]);
    setNewSkill('');
  };

  const addSpecificSkill = (name: string) => {
    if (skills.some(s => s.name.toLowerCase() === name.toLowerCase())) return;
    const newSkillObj: Skill = {
      id: Math.random().toString(36).substr(2, 9),
      name
    };
    onChange([...skills, newSkillObj]);
    setSuggestions(prev => prev.filter(s => s !== name));
  };

  const handleSuggest = async () => {
    if (experiences.length === 0) return;
    
    // Use the most recent experience for context
    const latest = experiences[0];
    setIsAiLoading(true);
    try {
      const suggested = await suggestSkills(latest.jobTitle, latest.description);
      // Filter out already added skills
      const filtered = suggested.filter(s => !skills.some(existing => existing.name.toLowerCase() === s.toLowerCase()));
      setSuggestions(filtered);
    } finally {
      setIsAiLoading(false);
    }
  };

  const removeSkill = (id: string) => {
    onChange(skills.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-2xl font-black tracking-tight text-gray-900 mb-2">Technical Expertise</h1>
        <p className="text-sm text-gray-500">Highlight your core competencies and professional skills.</p>
      </header>

      <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 space-y-8">
        <form onSubmit={addSkill} className="space-y-4">
          <FormInput 
            label="Add Skills" 
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addSkill()}
            placeholder="e.g. React, UX Design, Project Management"
          />
          <button 
            type="button"
            onClick={addSkill}
            className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-indigo-700 transition-colors"
          >
            Add
          </button>
        </form>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Your Expertise</h3>
            {experiences.length > 0 && (
              <button 
                onClick={handleSuggest}
                disabled={isAiLoading}
                className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-700 transition-colors bg-indigo-50 px-2 py-1 rounded"
              >
                {isAiLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                Suggest via AI
              </button>
            )}
          </div>
          
          {suggestions.length > 0 && (
            <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 flex flex-wrap gap-2 animate-in slide-in-from-top-2 duration-300">
              <span className="text-[10px] font-black uppercase text-indigo-400 w-full mb-1">Recommended:</span>
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => addSpecificSkill(suggestion)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-white text-indigo-600 border border-indigo-200 rounded-lg text-xs font-bold hover:bg-indigo-600 hover:text-white transition-all group"
                >
                  <Plus className="w-3 h-3 group-hover:scale-125 transition-transform" />
                  {suggestion}
                </button>
              ))}
              <button 
                onClick={() => setSuggestions([])}
                className="text-[9px] font-black uppercase text-gray-400 hover:text-gray-600 ml-auto"
              >
                Clear
              </button>
            </div>
          )}

          <div className="flex flex-wrap gap-2 min-h-[100px] items-start">
            {skills.map((skill) => (
              <div 
                key={skill.id}
                className="group flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-xl transition-all hover:bg-indigo-100"
              >
                <span className="text-sm font-bold uppercase tracking-wider">{skill.name}</span>
                <button 
                  onClick={() => removeSkill(skill.id)}
                  className="opacity-50 hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            {skills.length === 0 && (
              <p className="text-sm text-gray-300 italic py-4">No skills added yet...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
