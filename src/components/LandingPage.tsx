import React from 'react';
import FileUpload from './FileUpload';
import { UserNav } from './UserNav';
import { Button } from './ui/button';
import { Key, Star, MessageCircle, Check } from 'lucide-react';
import { Template } from '@/utils/indexDB';
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-16">
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
        <div className="text-center space-y-6 py-16">
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Transform Email Designs into Code
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Upload your email design and let AI convert it into a responsive HTML template in minutes.
          </p>
          <div className="flex justify-center gap-4 pt-8">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Get Started
            </Button>
            <Button size="lg" variant="outline">
              View Demo
            </Button>
          </div>
        </div>

        {/* Uploader Section */}
        <div className="relative max-w-2xl mx-auto bg-gray-800/50 rounded-xl p-8 border border-gray-700">
          <FileUpload onFileUpload={onFileUpload} />
        </div>

        {/* Features Section */}
        <div className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-purple-600/20 flex items-center justify-center">
                <Star className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold">AI-Powered Conversion</h3>
              <p className="text-gray-400">
                Advanced AI technology that understands design patterns and generates clean, responsive code.
              </p>
            </div>
            <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-purple-600/20 flex items-center justify-center">
                <Check className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold">Real-time Preview</h3>
              <p className="text-gray-400">
                See your changes instantly with our live preview feature. Edit and perfect your template in real-time.
              </p>
            </div>
            <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-purple-600/20 flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold">Export Ready</h3>
              <p className="text-gray-400">
                Download your template as HTML file, ready to use in your email marketing campaigns.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="py-16 bg-gray-800/30 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="text-4xl font-bold text-purple-400">01</div>
              <h3 className="text-xl font-semibold">Upload Design</h3>
              <p className="text-gray-400">
                Simply drag and drop your email design image or click to upload.
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl font-bold text-purple-400">02</div>
              <h3 className="text-xl font-semibold">AI Generation</h3>
              <p className="text-gray-400">
                Our AI analyzes your design and generates clean, responsive HTML code.
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl font-bold text-purple-400">03</div>
              <h3 className="text-xl font-semibold">Export & Use</h3>
              <p className="text-gray-400">
                Edit the generated code if needed, then export your template ready for use.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Customer Speaks</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-purple-600/20 flex items-center justify-center">
                  <Star className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-gray-300 mb-4">
                    "Email Crafter has revolutionized our email template creation process. What used to take hours now takes minutes!"
                  </p>
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-sm text-gray-400">Marketing Director, TechCorp</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-purple-600/20 flex items-center justify-center">
                  <Star className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-gray-300 mb-4">
                    "The AI-powered conversion is incredibly accurate. It's like having a professional email developer on standby."
                  </p>
                  <p className="font-semibold">Michael Chen</p>
                  <p className="text-sm text-gray-400">Founder, StartupX</p>
                </div>
              </div>
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