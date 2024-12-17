import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { getLatestTemplate } from '@/utils/indexDB';
import { useQuery } from '@tanstack/react-query';

const SavedTemplates = () => {
  const { data: templates, isLoading } = useQuery({
    queryKey: ['templates'],
    queryFn: async () => {
      const template = await getLatestTemplate();
      return template ? [template] : [];
    }
  });

  if (isLoading) {
    return <div className="p-4">Loading saved templates...</div>;
  }

  if (!templates?.length) {
    return <div className="p-4">No saved templates found</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Saved Templates</h2>
      <div className="space-y-4">
        {templates.map((template, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <div className="text-sm text-gray-500">
              Last updated: {new Date(template.updatedAt).toLocaleString()}
            </div>
            <div className="mt-2 text-sm truncate">{template.html.substring(0, 100)}...</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedTemplates;