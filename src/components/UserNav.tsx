import React, { useState } from 'react';
import { Button } from './ui/button';
import { LogIn, User, Edit } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Template } from '@/utils/indexDB';
import SavedTemplates from './SavedTemplates';
import PromptEditor from './PromptEditor';
import { AuthForm } from './AuthForm';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface UserNavProps {
  onOpenTemplate?: (template: Template) => void;
}

export function UserNav({ onOpenTemplate }: UserNavProps) {
  const { user, signInWithGoogle, logout } = useAuth();
  const [isPromptEditorOpen, setIsPromptEditorOpen] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  console.log('UserNav rendering with user:', user?.email);

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
              <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.photoURL || undefined} alt={user.email || ''} />
                  <AvatarFallback>
                    {user.email ? user.email[0].toUpperCase() : <User className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
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
        <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-purple-100 hover:bg-purple-200 border-purple-200"
            >
              <LogIn className="h-4 w-4 text-purple-600" />
              <span className="text-purple-600">Login</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <AuthForm />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}