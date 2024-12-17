import React from 'react';
import { Key } from 'lucide-react';
import { Button } from '../ui/button';
import { UserNav } from '../UserNav';
import { Template } from '@/utils/indexDB';

interface HeaderProps {
  onOpenSettings: () => void;
  onOpenTemplate?: (template: Template) => void;
}

export const Header = ({ onOpenSettings, onOpenTemplate }: HeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-900">Email Crafter</h1>
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="icon" 
          className="text-gray-700 hover:bg-gray-100 border-gray-200"
          onClick={onOpenSettings}
          aria-label="API Keys"
        >
          <Key className="h-4 w-4" />
        </Button>
        <UserNav onOpenTemplate={onOpenTemplate} />
      </div>
    </div>
  );
};