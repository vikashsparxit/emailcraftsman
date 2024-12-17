import React from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
}

const CodeEditor = ({ value, onChange }: CodeEditorProps) => {
  console.log('CodeEditor rendering with value:', value?.substring(0, 100) + '...');

  const handleEditorDidMount = (editor: any) => {
    console.log('Editor mounted successfully');
    editor.focus();
  };

  return (
    <div className="h-full w-full bg-editor-bg rounded-lg overflow-hidden border border-editor-line">
      <Editor
        height="100%"
        defaultLanguage="html"
        theme="vs-dark"
        value={value}
        onChange={onChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: 'JetBrains Mono',
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          wrappingIndent: 'indent',
          formatOnPaste: true,
          formatOnType: true,
          renderWhitespace: 'selection',
          snippetSuggestions: 'top',
          suggest: {
            showKeywords: true
          },
          quickSuggestions: {
            other: true,
            comments: true,
            strings: true
          }
        }}
      />
    </div>
  );
};

export default CodeEditor;