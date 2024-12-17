import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FileText } from 'lucide-react';

interface NotesPanelProps {
  notes: string;
}

const NotesPanel = ({ notes }: NotesPanelProps) => {
  const [open, setOpen] = useState(false);

  // Filter out the unwanted messages
  const filteredNotes = notes
    .split('\n')
    .filter(line => 
      !line.includes("boilerplate code") && 
      !line.includes("Let me know if you need")
    )
    .join('\n');

  return (
    <Sheet open={open} onOpenChange={setOpen}>
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
        <ScrollArea className="h-[calc(100vh-8rem)] mt-4 pr-4">
          <div className="space-y-4 text-sm">
            {filteredNotes.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default NotesPanel;