import React from 'react';
import { Button } from './ui/button';
import { LogIn } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Template } from '@/utils/indexDB';
import SavedTemplates from './SavedTemplates';

interface UserNavProps {
  onOpenTemplate?: (template: Template) => void;
}

export function UserNav({ onOpenTemplate }: UserNavProps) {
  const { user, signInWithGoogle } = useAuth();
  console.log('UserNav rendering with user:', user?.email);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <SavedTemplates onOpenTemplate={onOpenTemplate} />
      ) : (
        <Button
          onClick={handleLogin}
          className="bg-purple-600 hover:bg-purple-700 text-white"
          size="sm"
        >
          <LogIn className="mr-2 h-4 w-4" />
          Login
        </Button>
      )}
    </div>
  );
}