import React from 'react';
import { FileText } from 'lucide-react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NotesPanelProps {
  notes: string;
}

const NotesPanel = ({ notes }: NotesPanelProps) => {
  if (!notes) return null;

  const notePoints = notes
    .split('\n')
    .filter(line => line.trim())
    .map(line => line.trim());

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-100 hover:bg-gray-800"
        >
          <FileText className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Template Notes</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          {notePoints.map((point, index) => (
            <div key={index} className="text-sm">
              {point.startsWith('-') ? (
                <div className="flex gap-2">
                  <span className="text-gray-400">•</span>
                  <span>{point.substring(1).trim()}</span>
                </div>
              ) : (
                <p className="font-medium">{point}</p>
              )}
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotesPanel;