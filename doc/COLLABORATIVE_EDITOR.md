# Collaborative Rich Text Editor with Tiptap and Yjs

This project demonstrates a collaborative rich text editor built with Tiptap and Yjs.

## Features

1. **Real-time Collaboration**: Multiple users can edit the same document simultaneously
2. **Presence Indicators**: See other users' cursors and selections
3. **Rich Text Editing**: Standard formatting options (bold, italic, headings, lists, etc.)
4. **Advanced Features**: Emoji insertion and mentions

## How to Run

1. **Start the WebSocket Server**:
   ```bash
   npm run server
   ```

2. **Start the Development Server**:
   ```bash
   npm run dev
   ```

3. **Open in Browser**:
   Visit `http://localhost:5173` (or the URL provided by Vite)

## Collaboration Features

- **Real-time Sync**: Changes from other users appear instantly
- **Cursor Tracking**: See where other users are editing
- **User Identification**: Each user has a unique name and color
- **Conflict Resolution**: Yjs handles conflict resolution automatically

## WebSocket Server Implementation

The WebSocket server handles real-time communication between clients:

1. **Document Storage**: Documents are stored in memory (in production, use a database)
2. **Message Handling**: Updates are broadcast to all connected clients
3. **Room Support**: Multiple documents can be edited simultaneously using rooms

## Recent Changes

Due to dependency limitations and runtime issues, we've made several improvements:

1. **Dynamic Import**: Using dynamic import for y-websocket to avoid module loading issues
2. **Better Error Handling**: Added proper error handling for initialization failures
3. **Improved Server**: Enhanced WebSocket server with better error handling and Yjs protocol compliance
4. **Resource Cleanup**: Ensured proper cleanup of resources when components unmount

These changes resolve the "Cannot read properties of undefined (reading 'doc')" error and maintain the core functionality while working within the available dependencies.