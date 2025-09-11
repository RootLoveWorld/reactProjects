import React from 'react';
import { EditorProvider, useCurrentEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

// Simple editor controls component
const SimpleEditorControls = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div style={{ marginBottom: '10px' }}>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        style={{ marginRight: '5px' }}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        style={{ marginRight: '5px' }}
      >
        Italic
      </button>
    </div>
  );
};

// Test component for EditorProvider
const TestEditorProvider = () => {
  const extensions = [
    StarterKit,
  ];

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      <h3>Test EditorProvider</h3>
      <EditorProvider 
        extensions={extensions} 
        content="<p>This is a test editor to check if EditorProvider works.</p>"
        slotBefore={<SimpleEditorControls />}
      >
        {/* The editor will be rendered here by the EditorProvider */}
      </EditorProvider>
    </div>
  );
};

export default TestEditorProvider;