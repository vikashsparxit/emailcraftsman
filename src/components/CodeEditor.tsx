import React from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
}

const CodeEditor = ({ value, onChange }: CodeEditorProps) => {
  return (
    <div className="h-full w-full bg-editor-bg rounded-lg overflow-hidden">
      <Editor
        height="100%"
        defaultLanguage="html"
        theme="vs-dark"
        value={value}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: 'JetBrains Mono',
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default CodeEditor;