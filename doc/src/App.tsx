import React from 'react';
import './App.css';
import CollaborativeEditor from './components/CollaborativeEditor';
import './components/CollaborativeEditor.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Collaborative Rich Text Editor</h1>
        <p>Using Tiptap + Yjs with Plugin-based Extensions</p>
      </header>
      <main>
        <CollaborativeEditor />
      </main>
    </div>
  );
}

export default App;
