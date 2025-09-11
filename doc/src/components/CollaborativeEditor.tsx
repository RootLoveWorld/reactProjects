import React, { useEffect, useRef } from 'react';
import { EditorProvider, useCurrentEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
// Import our extension manager
import extensionManager from '../extensions/ExtensionManager';

// Create a Yjs document
const ydoc = new Y.Doc();

// Create a WebSocket provider (you would replace this with your own server URL)
const provider = new WebsocketProvider('ws://localhost:1234', 'tiptap-demo', ydoc);

// Sample data for mentions
const users = [
  { id: 1, label: 'John Doe' },
  { id: 2, label: 'Jane Smith' },
  { id: 3, label: 'Bob Johnson' },
];

// Configure the extension manager for this specific editor
extensionManager
  .configureExtension('placeholder', {
    placeholder: 'Write something together...',
  });

// Add collaboration-specific extensions
const collaborationExtensions = [
  StarterKit.configure({
    // Disable features that are handled by collaboration
    history: false,
  }),
  Collaboration.configure({
    document: ydoc,
  }),
  CollaborationCursor.configure({
    provider,
    user: {
      name: 'User ' + Math.floor(Math.random() * 100),
      color: '#' + Math.floor(Math.random() * 16777215).toString(16),
    },
  }),
];

// Get all extensions from the manager and add collaboration extensions
const extensions = [
  ...extensionManager.getExtensions(),
  ...collaborationExtensions,
];

// Editor controls component
const EditorControls = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  const addEmoji = (emoji: string) => {
    // Check if the insertEmoji command exists
    if (editor.commands.insertEmoji) {
      editor.commands.insertEmoji(emoji);
    } else {
      // Fallback to insertContent
      editor.commands.insertContent(emoji);
    }
  };

  const addMention = (user: { id: number; label: string }) => {
    editor.commands.insertContent(`@${user.label} `);
  };

  return (
    <div className="editor-controls">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('customBold') ? 'is-active' : ''}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('customItalic') ? 'is-active' : ''}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        Strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'is-active' : ''}
      >
        Code
      </button>
      <button onClick={() => editor.chain().focus().setParagraph().run()}>
        Paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        Bullet List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        Ordered List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        Code Block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        Blockquote
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        Horizontal Rule
      </button>
      
      {/* Emoji buttons */}
      <button onClick={() => addEmoji('🙂')}>🙂</button>
      <button onClick={() => addEmoji('👍')}>👍</button>
      <button onClick={() => addEmoji('🎉')}>🎉</button>
      
      {/* Mention buttons */}
      <button onClick={() => addMention(users[0])}>@John</button>
      <button onClick={() => addMention(users[1])}>@Jane</button>
      
      <button onClick={() => editor.chain().focus().undo().run()}>
        Undo
      </button>
      <button onClick={() => editor.chain().focus().redo().run()}>
        Redo
      </button>
    </div>
  );
};

// Editor component
const CollaborativeEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cleanup function to destroy the provider when component unmounts
    return () => {
      provider.destroy();
    };
  }, []);

  return (
    <div className="collaborative-editor">
      <div ref={editorRef}>
        <EditorProvider 
          extensions={extensions} 
          content="<p></p>"
          slotBefore={<EditorControls />}
        >
          {/* The editor will be rendered here by the EditorProvider */}
        </EditorProvider>
      </div>
      <div className="status-bar">
        <div className="connection-status">
          Connection status: {provider.wsconnected ? 'Connected' : 'Connecting...'}
        </div>
        <div className="user-count">
          Users online: {Object.keys(provider.awareness.getStates()).length}
        </div>
      </div>
    </div>
  );
};

export default CollaborativeEditor;