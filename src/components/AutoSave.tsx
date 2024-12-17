import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { saveTemplate, updateTemplate, getLatestTemplate } from '@/utils/indexDB';

interface AutoSaveProps {
  html: string;
  lastSaved: Date | null;
  onSave: () => void;
}

const AutoSave = ({ html, lastSaved, onSave }: AutoSaveProps) => {
  const { user } = useAuth();
  const [templateId, setTemplateId] = useState<number | null>(null);

  useEffect(() => {
    // Load the latest template on component mount
    const loadLatestTemplate = async () => {
      try {
        const template = await getLatestTemplate();
        if (template) {
          setTemplateId(template.id);
        }
      } catch (error) {
        console.error('Error loading latest template:', error);
      }
    };

    if (user) {
      loadLatestTemplate();
    }
  }, [user]);

  useEffect(() => {
    if (!html || !user) return;

    const saveTimer = setTimeout(async () => {
      try {
        if (templateId) {
          await updateTemplate(templateId, html);
        } else {
          await saveTemplate(html);
          const latest = await getLatestTemplate();
          if (latest) {
            setTemplateId(latest.id);
          }
        }
        onSave();
        console.log('Changes auto-saved successfully');
      } catch (error) {
        console.error('Error saving template:', error);
        toast.error('Failed to save changes');
      }
    }, 2000);

    return () => clearTimeout(saveTimer);
  }, [html, user, templateId, onSave]);

  if (!lastSaved) return null;

  return (
    <div className="text-sm text-gray-400 text-right">
      Last saved: {lastSaved.toLocaleTimeString()}
    </div>
  );
};

export default AutoSave;