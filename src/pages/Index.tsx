import React, { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { generateEmailTemplate } from '@/services/claudeService';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { initDB, saveApiKey, getApiKey } from '@/utils/indexDB';
import { AuthForm } from '@/components/AuthForm';
import LandingPage from '@/components/LandingPage';
import EditorView from '@/components/EditorView';
import ProcessingLoader from '@/components/ProcessingLoader';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const [html, setHtml] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [apiKey, setApiKey] = useState<string>('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const { user } = useAuth();

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    setProcessingStep(1);
    setShowEditor(false);
    console.log('Processing file:', file.name);
    
    try {
      const savedKey = await getApiKey();
      if (!savedKey) {
        toast.error('Please set your Claude API key in settings first');
        setIsSettingsOpen(true);
        return;
      }
      
      // Simulate steps with delays
      const simulateStep = async (step: number, delay: number) => {
        await new Promise(resolve => setTimeout(resolve, delay));
        setProcessingStep(step);
      };

      const reader = new FileReader();
      reader.onload = async (e) => {
        if (e.target?.result) {
          const base64Image = e.target.result as string;
          
          try {
            await simulateStep(2, 1000);
            await simulateStep(3, 1500);
            await simulateStep(4, 1000);
            
            const template = await generateEmailTemplate(base64Image);
            await simulateStep(5, 500);
            
            setHtml(template);
            setShowEditor(true);
            toast.success('Template generated successfully');
          } catch (error) {
            console.error('Error generating template:', error);
            toast.error('Failed to generate template. Please check your API key and try again.');
          }
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error processing file:', error);
      toast.error('Error processing the image');
    } finally {
      setIsProcessing(false);
      setProcessingStep(0);
    }
  };

  const handleExport = () => {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'email-template.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Template exported successfully');
  };

  const handleApiKeySave = async () => {
    try {
      await saveApiKey(apiKey);
      toast.success('API key saved successfully');
      setIsSettingsOpen(false);
    } catch (error) {
      console.error('Error saving API key:', error);
      toast.error('Failed to save API key');
    }
  };

  const handleAutoSave = useCallback(() => {
    setLastSavedAt(new Date());
    console.log('Changes auto-saved');
  }, []);

  const handleSave = () => {
    if (!user) {
      setShowAuthForm(true);
      return;
    }
    // Save template logic here
    handleAutoSave();
    toast.success('Template saved successfully');
  };

  return (
    <>
      {!showEditor && !isProcessing && (
        <LandingPage 
          onFileUpload={handleFileUpload}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />
      )}

      {isProcessing && <ProcessingLoader currentStep={processingStep} />}

      {showEditor && (
        <EditorView
          html={html}
          onHtmlChange={setHtml}
          onClose={() => setShowEditor(false)}
          lastSavedAt={lastSavedAt}
          onSave={handleSave}
          onExport={handleExport}
        />
      )}

      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>API Keys</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="apiKey" className="text-sm font-medium">
                Claude API Key
              </label>
              <Input
                id="apiKey"
                type="password"
                placeholder="Enter your Claude API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
            <Button onClick={handleApiKeySave} className="w-full">
              Save API Key
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showAuthForm} onOpenChange={setShowAuthForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign in to save template</DialogTitle>
          </DialogHeader>
          <AuthForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Index;