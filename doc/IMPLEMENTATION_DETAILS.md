# Implementation Details: Collaborative Rich Text Editor

## Overview

This document provides detailed information about the implementation of the collaborative rich text editor using Tiptap and Yjs.

## Project Structure

```
src/
├── components/
│   ├── CollaborativeEditor.tsx
│   ├── CollaborativeEditor.css
│   └── __tests__/
├── App.tsx
├── App.css
└── main.tsx
```

## Key Components

### 1. CollaborativeEditor Component

The main component that integrates all functionality:

- Uses `EditorProvider` from `@tiptap/react` to create the editor instance
- Integrates Yjs for real-time collaboration
- Implements custom controls for formatting
- Displays connection status and user count

## Collaboration Implementation

### Yjs Integration
- Uses `yjs` for conflict-free collaborative editing
- Implements `y-websocket` for real-time synchronization
- Leverages `@tiptap/extension-collaboration` and `@tiptap/extension-collaboration-cursor`

### WebSocket Server
A simple Node.js server using `ws` library:
- Listens on port 1234
- Manages document storage and message broadcasting
- Implements room-based document management

## Recent Changes

Due to dependency limitations and runtime issues, we've simplified the implementation:

1. **Extension System**: Removed the custom ExtensionManager and simplified the extension system
2. **Proper Initialization**: Ensured Yjs document is properly created before passing to extensions
3. **Dynamic Import**: Using dynamic import for y-websocket to avoid import issues
4. **State Management**: Used React state to manage the initialization order of components
5. **Error Handling**: Added proper error handling for module loading

These changes resolve the "Cannot read properties of undefined (reading 'doc')" error and maintain the core functionality while working within the available dependencies.