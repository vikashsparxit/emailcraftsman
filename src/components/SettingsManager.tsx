import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AuthForm } from '@/components/AuthForm';

interface SettingsManagerProps {
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  showAuthForm: boolean;
  setShowAuthForm: (show: boolean) => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  onApiKeySave: () => void;
}

const SettingsManager = ({
  isSettingsOpen,
  setIsSettingsOpen,
  showAuthForm,
  setShowAuthForm,
  apiKey,
  setApiKey,
  onApiKeySave
}: SettingsManagerProps) => {
  return (
    <>
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
            <Button onClick={onApiKeySave} className="w-full">
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

export default SettingsManager;