import React, { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import CodeEditor from '@/components/CodeEditor';
import Preview from '@/components/Preview';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from 'sonner';
import { generateEmailTemplate } from '@/utils/claudeApi';
import { Input } from '@/components/ui/input';

const Index = () => {
  const [html, setHtml] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    console.log('Processing file:', file.name);
    
    try {
      // Create a URL for the uploaded image
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
      
      // Convert image to base64
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (e.target?.result) {
          const base64Image = e.target.result as string;
          
          // Check if we have an API key
          const apiKey = localStorage.getItem('CLAUDE_API_KEY');
          if (!apiKey) {
            toast.error('Please enter your Claude API key first');
            return;
          }
          
          try {
            const template = await generateEmailTemplate(base64Image);
            setHtml(template);
            localStorage.setItem('emailTemplate', template);
            toast.success('Template generated successfully');
          } catch (error) {
            console.error('Error generating template:', error);
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
      localStorage.setItem('emailTemplate', value);
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

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('CLAUDE_API_KEY', e.target.value);
    toast.success('API key saved');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Email Template Creator</h1>
          <Button
            onClick={handleExport}
            disabled={!html}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export HTML
          </Button>
        </div>

        <div className="max-w-md mx-auto mb-8">
          <Input
            type="password"
            placeholder="Enter your Claude API key"
            onChange={handleApiKeyChange}
            defaultValue={localStorage.getItem('CLAUDE_API_KEY') || ''}
            className="w-full"
          />
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
      </div>
    </div>
  );
};

export default Index;