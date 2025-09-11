import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const SimpleEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World! This is a simple Tiptap editor.</p>',
  });

  if (!editor) {
    return <div>Editor is loading...</div>;
  }

  return (
    <div className="simple-editor">
      <h2>Simple Editor Test</h2>
      <div style={{ border: '1px solid #ccc', padding: '10px', minHeight: '200px' }}>
        <EditorContent editor={editor} />
      </div>
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          Bold
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          Italic
        </button>
      </div>
    </div>
  );
};

export default SimpleEditor;