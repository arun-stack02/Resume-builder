/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { FormInput } from '../FormUI';
import { PersonalDetails } from '../../types';
import { Camera, Loader2, Trash2 } from 'lucide-react';

interface Props {
  data: PersonalDetails;
  onChange: (data: PersonalDetails) => void;
}

export default function PersonalSection({ data, onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      setError('Only JPG, JPEG, and PNG files are allowed.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB.');
      return;
    }

    setError(null);
    setIsUploading(true);

    const formData = new FormData();
    formData.append('photo', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload photo');
      }

      const result = await response.json();
      onChange({ ...data, photoUrl: result.url });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removePhoto = () => {
    onChange({ ...data, photoUrl: undefined });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-2xl font-black tracking-tight text-gray-900 mb-2">Personal Details</h1>
        <p className="text-sm text-gray-500">The foundational elements of your professional manuscript.</p>
      </header>

      <div className="flex items-center gap-6 p-4 rounded-xl bg-gray-50 border border-gray-100">
        <div 
          className="h-20 w-20 rounded-full bg-indigo-100/50 flex items-center justify-center border border-indigo-200 overflow-hidden relative group cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          {data.photoUrl ? (
            <img 
              src={data.photoUrl} 
              alt="Profile" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <Camera className="w-8 h-8 text-indigo-400 group-hover:scale-110 transition-transform" />
          )}
          
          <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            {isUploading && <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />}
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-sm font-bold text-gray-900 mb-1">Profile Photo</h3>
          <p className="text-xs text-gray-400 mb-3 uppercase tracking-widest font-bold">JPG, PNG • Max 5MB</p>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="text-[10px] font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-widest disabled:opacity-50"
            >
              {data.photoUrl ? 'Change Photo' : 'Upload Image'}
            </button>
            
            {data.photoUrl && (
              <button 
                onClick={removePhoto}
                className="text-[10px] font-black text-red-500 hover:text-red-700 uppercase tracking-widest flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" /> Remove
              </button>
            )}
          </div>
          
          {error && <p className="text-[10px] text-red-500 mt-2 font-bold uppercase">{error}</p>}
        </div>

        <input 
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png"
          className="hidden"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
        <div className="md:col-span-2">
          <FormInput 
            label="Full Name" 
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
            placeholder="Julian Voss"
          />
        </div>
        <div className="md:col-span-2">
          <FormInput 
            label="Professional Title" 
            name="professionalTitle"
            value={data.professionalTitle}
            onChange={handleChange}
            placeholder="Senior Product Designer"
          />
        </div>
        <FormInput 
          label="Email Address" 
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          placeholder="julian@manuscript.io"
        />
        <FormInput 
          label="Phone Number" 
          name="phone"
          value={data.phone}
          onChange={handleChange}
          placeholder="+49 176 0000 0000"
        />
        <FormInput 
          label="Location" 
          name="location"
          value={data.location}
          onChange={handleChange}
          placeholder="Berlin, Germany"
        />
        <FormInput 
          label="LinkedIn Profile" 
          name="linkedin"
          value={data.linkedin}
          onChange={handleChange}
          placeholder="linkedin.com/in/julianvoss"
        />
      </div>
    </div>
  );
}
