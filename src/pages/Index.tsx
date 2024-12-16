import React, { useState, useEffect } from 'react';
import FileUpload from '@/components/FileUpload';
import CodeEditor from '@/components/CodeEditor';
import Preview from '@/components/Preview';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [html, setHtml] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const savedHtml = localStorage.getItem('emailTemplate');
    if (savedHtml) {
      setHtml(savedHtml);
    }
  }, []);

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    // TODO: Integrate with Claude AI API
    // For now, we'll use a placeholder template
    const template = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Template</title>
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 20px; text-align: center; background-color: #f8f9fa;">
        <h1 style="color: #1a202c;">Your Email Template</h1>
        <p style="color: #4a5568;">This is a placeholder template. The actual template will be generated using Claude AI.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
    
    setHtml(template);
    localStorage.setItem('emailTemplate', template);
    setIsProcessing(false);
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