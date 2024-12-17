import React from 'react';
import { Template } from '@/utils/indexDB';
import { Header } from './landing/Header';
import { Hero } from './landing/Hero';
import { Features } from './landing/Features';
import { HowItWorks } from './landing/HowItWorks';
import { Testimonials } from './landing/Testimonials';
import { FAQ } from './landing/FAQ';
import { Footer } from './landing/Footer';

interface LandingPageProps {
  onFileUpload: (file: File) => void;
  onOpenSettings: () => void;
  onOpenTemplate?: (template: Template) => void;
}

const LandingPage = ({ onFileUpload, onOpenSettings, onOpenTemplate }: LandingPageProps) => {
  console.log('LandingPage rendering with onOpenTemplate:', !!onOpenTemplate);
  
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-16">
        <Header onOpenSettings={onOpenSettings} onOpenTemplate={onOpenTemplate} />
        <Hero onFileUpload={onFileUpload} />
        <Features />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;