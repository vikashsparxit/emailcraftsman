import React, { useEffect } from 'react';
import TemplateEditor from './TemplateEditor';
import AutoSave from './AutoSave';
import NotesPanel from './NotesPanel';
import { Button } from './ui/button';
import { ArrowLeft, Download } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface EditorViewProps {
  html: string;
  notes?: string;
  onHtmlChange: (value: string) => void;
  onClose: () => void;
  lastSavedAt: Date | null;
  onSave: () => void;
  onExport: () => void;
}

const EditorView = ({ 
  html, 
  notes,
  onHtmlChange, 
  onClose, 
  lastSavedAt, 
  onSave,
  onExport 
}: EditorViewProps) => {
  const { user } = useAuth();

  const handleClose = async () => {
    if (html) {
      await onSave();
      toast.success('Template saved before closing');
    }
    onClose();
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 overflow-hidden">
      <div className="h-full flex flex-col p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="text-gray-100 hover:bg-gray-800"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            {notes && <NotesPanel notes={notes} />}
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              onClick={onExport}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export HTML
            </Button>

            {user && (
              <Button
                onClick={onSave}
                variant="default"
              >
                Save Template
              </Button>
            )}
          </div>
        </div>

        <TemplateEditor html={html} onHtmlChange={onHtmlChange} />
        <AutoSave html={html} lastSaved={lastSavedAt} onSave={onSave} />
      </div>
    </div>
  );
};

export default EditorView;