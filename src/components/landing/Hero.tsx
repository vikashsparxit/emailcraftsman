import React from 'react';
import FileUpload from '../FileUpload';

interface HeroProps {
  onFileUpload: (file: File) => void;
}

export const Hero = ({ onFileUpload }: HeroProps) => {
  return (
    <div className="text-center space-y-12">
      <div className="space-y-6">
        <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Transform Email Designs into Code
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Upload your email design and let AI convert it into a responsive HTML template in minutes.
        </p>
      </div>
      
      <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
        <FileUpload onFileUpload={onFileUpload} />
      </div>
    </div>
  );
};