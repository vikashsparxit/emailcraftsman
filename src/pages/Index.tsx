import React, { useState, useEffect } from 'react';
import FileUpload from '@/components/FileUpload';
import CodeEditor from '@/components/CodeEditor';
import Preview from '@/components/Preview';
import { Button } from '@/components/ui/button';
import { Download, Settings, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { generateEmailTemplate } from '@/utils/claudeApi';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { initDB, saveApiKey, getApiKey } from '@/utils/indexDB';
import { useAuth } from '@/contexts/AuthContext';
import { AuthForm } from '@/components/AuthForm';

const Index = () => {
  const [html, setHtml] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    const initialize = async () => {
      try {
        await initDB();
        const savedKey = await getApiKey();
        if (savedKey) {
          setApiKey(savedKey);
          console.log('API key loaded from IndexDB');
        }
      } catch (error) {
        console.error('Error initializing IndexDB:', error);
        toast.error('Failed to load saved settings');
      }
    };
    
    initialize();
  }, []);

  // Auto-save effect
  useEffect(() => {
    if (!html) return;

    const saveTimer = setTimeout(() => {
      // Here we'll implement the auto-save logic once we add authentication
      setLastSavedAt(new Date());
      console.log('Changes auto-saved');
    }, 2000);

    return () => clearTimeout(saveTimer);
  }, [html]);

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
      
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
      
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (e.target?.result) {
          const base64Image = e.target.result as string;
          
          try {
            const template = await generateEmailTemplate(base64Image);
            setHtml(template);
            toast.success('Template generated successfully');
          } catch (error) {
            console.error('Error generating template:', error);
            toast.error('Failed to generate template');
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

  const handleCodeChange = (value: string | undefined) => {
    if (value) {
      setHtml(value);
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

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
        <AuthForm />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Email Template Creator</h1>
          <div className="flex items-center gap-4">
            <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="text-gray-100 hover:bg-gray-800">
                  <Settings className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Settings</DialogTitle>
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
                    Save Settings
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button
              onClick={handleExport}
              disabled={!html}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export HTML
            </Button>

            <Button
              onClick={logout}
              variant="ghost"
              size="icon"
              className="text-gray-100 hover:bg-gray-800"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!html && (
          <div className="max-w-2xl mx-auto">
            <FileUpload onFileUpload={handleFileUpload} />
          </div>
        )}

        {html && (
          <div className="grid grid-cols-2 gap-6 h-[calc(100vh-12rem)]">
            <CodeEditor value={html} onChange={handleCodeChange} />
            <Preview html={html} />
          </div>
        )}

        {lastSavedAt && (
          <div className="text-sm text-gray-400 text-right">
            Last saved: {lastSavedAt.toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
