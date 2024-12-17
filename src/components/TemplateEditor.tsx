import React from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';

interface TemplateEditorProps {
  html: string;
  onHtmlChange: (value: string) => void;
}

const TemplateEditor = ({ html, onHtmlChange }: TemplateEditorProps) => {
  return (
    <div className="grid grid-cols-2 gap-6 h-[calc(100vh-12rem)]">
      <CodeEditor value={html} onChange={(value) => onHtmlChange(value || '')} />
      <Preview html={html} />
    </div>
  );
};

export default TemplateEditor;