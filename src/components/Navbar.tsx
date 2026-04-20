/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Settings, HelpCircle, Download, Sun, Moon } from 'lucide-react';

interface Props {
  onDownload: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Navbar({ onDownload, isDarkMode, toggleDarkMode }: Props) {
  return (
    <nav className="h-16 border-b border-gray-100 bg-white px-6 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <span className="text-xl font-black tracking-tighter text-indigo-700 uppercase">
          Manuscript
        </span>
        <div className="hidden md:flex gap-6 items-center">
          <a href="#" className="text-sm font-semibold text-gray-400 hover:text-indigo-600 transition-colors">Preview</a>
          <a href="#" className="text-sm font-semibold text-gray-400 hover:text-indigo-600 transition-colors">History</a>
          <a href="#" className="text-sm font-semibold text-gray-400 hover:text-indigo-600 transition-colors">Templates</a>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors rounded-full hover:bg-gray-50">
          <Settings className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors rounded-full hover:bg-gray-50">
          <HelpCircle className="w-5 h-5" />
        </button>
        <button 
          onClick={toggleDarkMode}
          className="p-2 text-gray-400 hover:text-indigo-600 transition-colors rounded-full hover:bg-gray-50"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <button 
          onClick={onDownload}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-bold text-sm shadow-sm hover:bg-indigo-700 transition-all flex items-center gap-2 active:scale-95"
        >
          <Download className="w-4 h-4" /> Download PDF
        </button>
        <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100 ml-2">
          <img 
            src="https://picsum.photos/seed/user/100/100" 
            alt="User" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
}
