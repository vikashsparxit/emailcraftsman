import React from 'react';
import { UserNav } from './UserNav';
import { Button } from './ui/button';
import { KeyRound } from 'lucide-react';
import { Template } from '@/utils/indexDB';
import HeroSection from './landing/HeroSection';
import FeaturesSection from './landing/FeaturesSection';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Email Crafter</h1>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-purple-100 hover:bg-purple-200 border-purple-200"
              onClick={onOpenSettings}
              aria-label="API Keys"
            >
              <KeyRound className="h-4 w-4 text-purple-600" />
            </Button>
            <UserNav onOpenTemplate={onOpenTemplate} />
          </div>
        </div>

        {/* Hero Section with Uploader */}
        <HeroSection onFileUpload={onFileUpload} />

        {/* Features Section */}
        <FeaturesSection />

        {/* How It Works Section */}
        <div className="py-16 bg-gray-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="text-4xl font-bold text-purple-600">01</div>
              <h3 className="text-xl font-semibold">Upload Design</h3>
              <p className="text-gray-600">
                Simply drag and drop your email design image or click to upload.
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl font-bold text-purple-600">02</div>
              <h3 className="text-xl font-semibold">AI Generation</h3>
              <p className="text-gray-600">
                Our AI analyzes your design and generates clean, responsive HTML code.
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl font-bold text-purple-600">03</div>
              <h3 className="text-xl font-semibold">Export & Use</h3>
              <p className="text-gray-600">
                Edit the generated code if needed, then export your template ready for use.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How accurate is the AI conversion?</AccordionTrigger>
                <AccordionContent>
                  Our AI model has been trained on thousands of email templates and achieves high accuracy in converting designs to code. While occasional minor adjustments might be needed, the generated code is clean, responsive, and follows email development best practices.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What file formats are supported?</AccordionTrigger>
                <AccordionContent>
                  We support common image formats including PNG, JPG, and JPEG. The uploaded design should be clear and represent the final desired layout of your email template.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I edit the generated code?</AccordionTrigger>
                <AccordionContent>
                  Yes! Our built-in code editor allows you to make any necessary adjustments to the generated HTML. You can preview changes in real-time and export when ready.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Are the templates responsive?</AccordionTrigger>
                <AccordionContent>
                  Yes, all generated templates are responsive by default and will look great across different email clients and devices.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 py-6 mt-12">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Copyright Sparx IT Solutions Pvt. Ltd</p>
            <p className="text-gray-600">Powered by TrueAgents.ai</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
