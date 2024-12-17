import React, { useState } from 'react';
import { Button } from './ui/button';
import { LogIn, User, Edit } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Template } from '@/utils/indexDB';
import SavedTemplates from './SavedTemplates';
import PromptEditor from './PromptEditor';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserNavProps {
  onOpenTemplate?: (template: Template) => void;
}

export function UserNav({ onOpenTemplate }: UserNavProps) {
  const { user, signInWithGoogle, logout } = useAuth();
  const [isPromptEditorOpen, setIsPromptEditorOpen] = useState(false);
  console.log('UserNav rendering with user:', user?.email);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const isAdmin = user?.email === 'vikashshingh@gmail.com';

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <>
          <SavedTemplates onOpenTemplate={onOpenTemplate} />
          {isAdmin && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsPromptEditorOpen(true)}
              className="bg-purple-100 hover:bg-purple-200 border-purple-200"
            >
              <Edit className="h-4 w-4 text-purple-600" />
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="text-sm text-gray-500">
                {user.email}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <PromptEditor
            open={isPromptEditorOpen}
            onOpenChange={setIsPromptEditorOpen}
          />
        </>
      ) : (
        <Button
          onClick={handleLogin}
          variant="outline"
          className="flex items-center gap-2"
        >
          <LogIn className="h-4 w-4" />
          Login
        </Button>
      )}
    </div>
  );
}