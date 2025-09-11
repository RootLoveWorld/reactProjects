import React from 'react';
import './App.css';
import CollaborativeEditor from './components/CollaborativeEditor';
import SimpleEditor from './components/SimpleEditor';
import WebsocketTest from './components/WebsocketTest';
import TestEditorProvider from './components/TestEditorProvider';
import './components/CollaborativeEditor.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Collaborative Rich Text Editor</h1>
        <p>Using Tiptap + Yjs with Plugin-based Extensions</p>
      </header>
      <main>
        <h2>Test EditorProvider</h2>
        <TestEditorProvider />
        <h2>Simple Editor Test</h2>
        <SimpleEditor />
        <h2>WebSocket Test</h2>
        <WebsocketTest />
        <h2>Collaborative Editor</h2>
        <CollaborativeEditor />
      </main>
    </div>
  );
}

export default App;