/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

interface InputProps {
  label: string;
  [key: string]: any;
}

export const FormInput = ({ label, className, ...props }: InputProps) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
      {label}
    </label>
    <input 
      {...props}
      className={`
        w-full bg-white border-b border-gray-200 focus:border-indigo-600 focus:ring-0 px-0 py-2.5 
        text-sm font-medium text-gray-900 transition-all outline-none placeholder:text-gray-300
        hover:border-gray-300
        ${className || ''}
      `}
    />
  </div>
);

interface TextareaProps {
  label: string;
  onAiAssist?: () => void;
  isAiLoading?: boolean;
  [key: string]: any;
}

export const FormTextarea = ({ label, className, onAiAssist, isAiLoading, ...props }: TextareaProps) => (
  <div className="flex flex-col gap-2 w-full">
    <div className="flex justify-between items-end">
      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
        {label}
      </label>
      {onAiAssist && (
        <button 
          type="button"
          onClick={onAiAssist}
          disabled={isAiLoading}
          className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-700 transition-colors bg-indigo-50 px-2 py-1 rounded"
        >
          {isAiLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
          AI Assist
        </button>
      )}
    </div>
    <textarea 
      {...props}
      className={`
        w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3 
        text-sm font-medium text-gray-900 transition-all outline-none placeholder:text-gray-300
        focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-200
        min-h-[120px] resize-y
        ${className || ''}
      `}
    />
  </div>
);
