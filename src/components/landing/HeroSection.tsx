import React from 'react';
import FileUpload from '../FileUpload';

interface HeroSectionProps {
  onFileUpload: (file: File) => void;
}

const HeroSection = ({ onFileUpload }: HeroSectionProps) => {
  return (
    <div className="text-center space-y-6 py-16">
      <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Transform Email Designs into Code
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Upload your email design and let AI convert it into a responsive HTML template in minutes.
      </p>
      
      {/* Uploader Section moved directly under hero text */}
      <div className="relative max-w-2xl mx-auto bg-white rounded-xl p-8 border border-gray-200 shadow-sm mt-8">
        <FileUpload onFileUpload={onFileUpload} />
      </div>
    </div>
  );
};

export default HeroSection;