import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { getLatestTemplate, Template } from '@/utils/indexDB';
import { useQuery } from '@tanstack/react-query';
import { Loader2, Edit2 } from 'lucide-react';

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
      console.error('onOpenInEditor callback is not defined');
    }
  };

  if (error) {
    console.error('Error fetching templates:', error);
    return (
      <div className="p-4 text-red-500">
        Error loading templates. Please try again later.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-4 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <span>Loading saved templates...</span>
      </div>
    );
  }

  if (!templates?.length) {
    return (
      <div className="p-4 text-gray-500">
        No saved templates found. Generate a template to see it here.
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px] w-full">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Saved Templates</h2>
        <div className="space-y-4">
          {templates.map((template, index) => (
            <div 
              key={index} 
              className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="text-sm text-gray-500">
                Last updated: {new Date(template.updatedAt).toLocaleString()}
              </div>
              <div className="mt-2 text-sm">
                <div className="font-medium mb-1">Template Preview</div>
                <div className="text-gray-600 dark:text-gray-400 line-clamp-3">
                  {template.html.substring(0, 150)}...
                </div>
              </div>
              <div className="mt-4">
                <Button
                  onClick={() => handleOpenInEditor(template)}
                  className="flex items-center gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Open in Editor
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};

export default SavedTemplates;