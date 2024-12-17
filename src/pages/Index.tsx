import React, { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { saveApiKey } from '@/utils/indexDB';
import LandingPage from '@/components/LandingPage';
import EditorView from '@/components/EditorView';
import ProcessingLoader from '@/components/ProcessingLoader';
import { useAuth } from '@/contexts/AuthContext';
import { useTemplateGeneration } from '@/hooks/useTemplateGeneration';
import SettingsManager from '@/components/SettingsManager';

const Index = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const { user } = useAuth();

  const {
    isProcessing,
    processingStep,
    html,
    notes,
    setHtml,
    generateTemplate
  } = useTemplateGeneration();

  const handleFileUpload = async (file: File) => {
    setShowEditor(false);
    const success = await generateTemplate(file);
    if (success) {
      setShowEditor(true);
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
    handleAutoSave();
    toast.success('Template saved successfully');
  };

  const handleOpenTemplate = (templateHtml: string) => {
    console.log('Index: Opening template in editor');
    setHtml(templateHtml);
    setShowEditor(true);
  };

  return (
    <>
      {!showEditor && !isProcessing && (
        <LandingPage 
          onFileUpload={handleFileUpload}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenTemplate={handleOpenTemplate}
        />
      )}

      {isProcessing && <ProcessingLoader currentStep={processingStep} />}

      {showEditor && (
        <EditorView
          html={html}
          notes={notes}
          onHtmlChange={setHtml}
          onClose={() => setShowEditor(false)}
          lastSavedAt={lastSavedAt}
          onSave={handleSave}
          onExport={handleExport}
        />
      )}

      <SettingsManager
        isSettingsOpen={isSettingsOpen}
        setIsSettingsOpen={setIsSettingsOpen}
        showAuthForm={showAuthForm}
        setShowAuthForm={setShowAuthForm}
        apiKey={apiKey}
        setApiKey={setApiKey}
        onApiKeySave={handleApiKeySave}
      />
    </>
  );
};

export default Index;