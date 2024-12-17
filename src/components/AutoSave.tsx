import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface AutoSaveProps {
  html: string;
  lastSaved: Date | null;
  onSave: () => void;
}

const AutoSave = ({ html, lastSaved, onSave }: AutoSaveProps) => {
  const { user } = useAuth();

  useEffect(() => {
    if (!html || !user) return;

    const saveTimer = setTimeout(() => {
      onSave();
      console.log('Auto-saving changes...');
    }, 2000);

    return () => clearTimeout(saveTimer);
  }, [html, user, onSave]);

  if (!lastSaved) return null;

  return (
    <div className="text-sm text-gray-400 text-right">
      Last saved: {lastSaved.toLocaleTimeString()}
    </div>
  );
};

export default AutoSave;