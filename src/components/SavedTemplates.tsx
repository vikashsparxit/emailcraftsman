import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { getLatestTemplate, Template } from '@/utils/indexDB';
import { useQuery } from '@tanstack/react-query';
import { Loader2, Edit2 } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SavedTemplatesProps {
  onOpenTemplate?: (template: Template) => void;
}

const SavedTemplates = ({ onOpenTemplate }: SavedTemplatesProps) => {
  const { data: templates, isLoading, error } = useQuery({
    queryKey: ['templates'],
    queryFn: async () => {
      console.log('Fetching saved templates...');
      const template = await getLatestTemplate();
      console.log('Retrieved template:', template);
      return template ? [template] : [];
    }
  });

  const handleOpenInEditor = (template: Template) => {
    console.log('Opening template in editor:', {
      htmlLength: template.html.length,
      notesLength: template.notes?.length
    });
    if (onOpenTemplate) {
      onOpenTemplate(template);
    } else {
      console.error('onOpenTemplate callback is not defined');
    }
  };

  if (error) {
    console.error('Error fetching templates:', error);
    return null;
  }

  if (isLoading) {
    return (
      <Button variant="ghost" size="sm" disabled>
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
        Loading...
      </Button>
    );
  }

  if (!templates?.length) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
        >
          Saved Templates
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="end">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Saved Templates</h2>
        </div>
        <ScrollArea className="h-[300px]">
          <div className="p-4 space-y-4">
            {templates.map((template, index) => (
              <div 
                key={index} 
                className="p-4 border rounded-lg hover:bg-gray-50 space-y-2"
              >
                <div className="text-sm text-gray-500">
                  Last updated: {new Date(template.updatedAt).toLocaleString()}
                </div>
                <div>
                  <div className="font-medium mb-1">Template Preview</div>
                  <div className="text-sm text-gray-600 line-clamp-3 font-mono bg-gray-50 p-2 rounded">
                    {template.html.substring(0, 150)}...
                  </div>
                </div>
                <Button
                  onClick={() => handleOpenInEditor(template)}
                  className="w-full flex items-center justify-center gap-2"
                  variant="default"
                >
                  <Edit2 className="w-4 h-4" />
                  Open in Editor
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default SavedTemplates;