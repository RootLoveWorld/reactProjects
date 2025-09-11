import React, { useEffect, useState } from 'react';
import { EditorProvider, useCurrentEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import * as Y from 'yjs';
import { Extension } from '@tiptap/core';

// Define a basic interface for WebsocketProvider
interface WebsocketProvider {
  wsconnected: boolean;
  awareness: {
    getStates: () => Map<number, unknown>;
  };
  destroy: () => void;
}

// Sample data for mentions
const users = [
  { id: 1, label: 'John Doe' },
  { id: 2, label: 'Jane Smith' },
  { id: 3, label: 'Bob Johnson' },
];

// Editor controls component
const EditorControls = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  const addEmoji = (emoji: string) => {
    editor.commands.insertContent(emoji);
  };

  const addMention = (user: { id: number; label: string }) => {
    editor.commands.insertContent(`@${user.label} `);
  };

  return (
    <div className="editor-controls">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
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
  const [provider, setProvider] = useState<WebsocketProvider | null>(null);
  const [ydoc, setYdoc] = useState<Y.Doc | null>(null);
  const [extensions, setExtensions] = useState<Extension[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let wsProvider: WebsocketProvider | null = null;
    let doc: Y.Doc | null = null;
    
    const initEditor = async () => {
      try {
        // Create Yjs document
        doc = new Y.Doc();
        setYdoc(doc);
        console.log('Yjs document created');
        
        // Dynamically import y-websocket to avoid potential import issues
        const yWebsocketModule = await import('y-websocket');
        const WebsocketProviderClass = yWebsocketModule.WebsocketProvider;
        
        // Create WebSocket provider
        wsProvider = new WebsocketProviderClass('ws://localhost:1235', 'tiptap-demo', doc);
        setProvider(wsProvider);
        console.log('WebSocket provider created');
        
        // Define extensions
        const editorExtensions: Extension[] = [
          StarterKit.configure({
            // @ts-expect-error - history is a valid option but not in the type definition
            history: false,
          }),
          Collaboration.configure({
            document: doc,
          }),
          CollaborationCursor.configure({
            provider: wsProvider,
            user: {
              name: 'User ' + Math.floor(Math.random() * 100),
              color: '#' + Math.floor(Math.random() * 16777215).toString(16),
            },
          }),
        ];
        
        setExtensions(editorExtensions);
        setLoading(false);
        console.log('Extensions configured');
      } catch (initError: unknown) {
        console.error('Error initializing collaborative editor:', initError);
        const errorMessage = initError instanceof Error ? initError.message : String(initError);
        setError('Error initializing collaborative editor: ' + errorMessage);
        setLoading(false);
      }
    };
    
    initEditor();
    
    // Cleanup function
    return () => {
      console.log('Cleaning up resources');
      if (wsProvider) {
        wsProvider.destroy();
      }
      if (doc) {
        doc.destroy();
      }
    };
  }, []);

  if (loading) {
    return <div className="collaborative-editor">Loading editor...</div>;
  }

  if (error) {
    return <div className="collaborative-editor">Error: {error}</div>;
  }

  if (!ydoc || !provider || extensions.length === 0) {
    return <div className="collaborative-editor">Editor not properly initialized</div>;
  }

  return (
    <div className="collaborative-editor">
      <EditorProvider 
        extensions={extensions} 
        content="<p>Start collaborating...</p>"
        slotBefore={<EditorControls />}
      >
        {/* The editor will be rendered here by the EditorProvider */}
      </EditorProvider>
      <div className="status-bar">
        <div className="connection-status">
          Connection status: {provider.wsconnected ? 'Connected' : 'Connecting...'}
        </div>
        <div className="user-count">
          Users online: {provider.awareness ? Object.keys(provider.awareness.getStates()).length : 0}
        </div>
      </div>
    </div>
  );
};

export default CollaborativeEditor;