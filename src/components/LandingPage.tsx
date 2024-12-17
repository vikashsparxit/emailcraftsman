import React from 'react';
import FileUpload from './FileUpload';
import { Button } from './ui/button';
import { Settings } from 'lucide-react';

interface LandingPageProps {
  onFileUpload: (file: File) => void;
  onOpenSettings: () => void;
}

const LandingPage = ({ onFileUpload, onOpenSettings }: LandingPageProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold tracking-tight">Transform Email Designs into Code</h2>
          <p className="text-xl text-gray-400">
            Upload your email design and let AI convert it into a responsive HTML template instantly.
          </p>
        </div>

        <div className="p-8 border-2 border-dashed border-gray-700 rounded-lg bg-gray-800/50">
          <FileUpload onFileUpload={onFileUpload} />
          <p className="mt-2 text-sm text-gray-400">Supports PNG, JPG, JPEG, GIF</p>
        </div>

        <Button
          variant="outline"
          onClick={onOpenSettings}
          className="gap-2"
        >
          <Settings className="w-4 h-4" />
          Configure API Key
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;