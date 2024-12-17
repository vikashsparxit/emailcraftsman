import React from 'react';
import FileUpload from './FileUpload';
import { UserNav } from './UserNav';
import { Button } from './ui/button';
import { Key } from 'lucide-react';

interface LandingPageProps {
  onFileUpload: (file: File) => void;
  onOpenSettings: () => void;
  onOpenTemplate?: (html: string) => void;
}

const LandingPage = ({ onFileUpload, onOpenSettings, onOpenTemplate }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-12">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Email Crafter</h1>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              className="text-gray-100 hover:bg-gray-800 border-gray-700"
              onClick={onOpenSettings}
              aria-label="API Keys"
            >
              <Key className="h-4 w-4" />
            </Button>
            <UserNav onOpenTemplate={onOpenTemplate} />
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center space-y-4 py-12">
          <h1 className="text-4xl font-bold tracking-tight">
            Transform Email Designs into Code
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Upload your email design and let AI convert it into a responsive HTML template instantly.
          </p>
        </div>

        {/* Uploader Section */}
        <div className="relative max-w-2xl mx-auto">
          <FileUpload onFileUpload={onFileUpload} />
        </div>

        {/* Features Section */}
        <div className="py-24 space-y-12">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">1. Upload Design</h3>
              <p className="text-gray-400">
                Simply drag and drop your email design image or click to upload.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">2. AI Generation</h3>
              <p className="text-gray-400">
                Our AI analyzes your design and generates clean, responsive HTML code.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">3. Export & Use</h3>
              <p className="text-gray-400">
                Edit the generated code if needed, then export your template ready for use.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-800 py-6 mt-12">
          <div className="flex justify-between items-center">
            <p className="text-gray-400">Copyright Sparx IT Solutions Pvt. Ltd</p>
            <p className="text-gray-400">Powered by TrueAgents.ai</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;