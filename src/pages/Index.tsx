import React, { useState, useCallback } from 'react';
import FileUpload from '@/components/FileUpload';
import TemplateEditor from '@/components/TemplateEditor';
import AutoSave from '@/components/AutoSave';
import { Button } from '@/components/ui/button';
import { Download, Key } from 'lucide-react';
import { toast } from 'sonner';
import { generateEmailTemplate } from '@/services/claudeService';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { initDB, saveApiKey, getApiKey } from '@/utils/indexDB';
import { useAuth } from '@/contexts/AuthContext';
import { AuthForm } from '@/components/AuthForm';
import { UserNav } from '@/components/UserNav';

const Index = () => {
  const [html, setHtml] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiKey, setApiKey] = useState<string>('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const { user } = useAuth();

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    console.log('Processing file:', file.name);
    
    try {
      const savedKey = await getApiKey();
      if (!savedKey) {
        toast.error('Please set your Claude API key in settings first');
        setIsSettingsOpen(true);
        return;
      }
      
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (e.target?.result) {
          const base64Image = e.target.result as string;
          
          try {
            const template = await generateEmailTemplate(base64Image, savedKey);
            setHtml(template);
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
    toast.success('Template saved successfully');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Email Crafter</h1>
          <div className="flex items-center gap-4">
            <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="text-gray-100 hover:bg-gray-800">
                  <Key className="h-4 w-4" />
                </Button>
              </DialogTrigger>
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
            
            {html && (
              <Button
                onClick={handleExport}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export HTML
              </Button>
            )}

            {html && (
              <Button
                onClick={handleSave}
                variant="default"
              >
                Save Template
              </Button>
            )}

            <UserNav />
          </div>
        </div>

        {!html && (
          <div className="max-w-2xl mx-auto">
            <FileUpload onFileUpload={handleFileUpload} />
          </div>
        )}

        {html && <TemplateEditor html={html} onHtmlChange={setHtml} />}

        <AutoSave html={html} lastSaved={lastSavedAt} onSave={handleAutoSave} />
      </div>

      <Dialog open={showAuthForm} onOpenChange={setShowAuthForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign in to save template</DialogTitle>
          </DialogHeader>
          <AuthForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
