import React from 'react';
import { Button } from './ui/button';
import { LogIn, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Template } from '@/utils/indexDB';
import SavedTemplates from './SavedTemplates';
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
        <>
          <SavedTemplates onOpenTemplate={onOpenTemplate} />
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
        </>
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