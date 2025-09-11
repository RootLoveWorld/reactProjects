import { WebSocketServer } from 'ws';
import { Doc, encodeStateAsUpdate, applyUpdate } from 'yjs';

// Store documents in memory (in production, you'd want to use a database)
const documents = new Map();

// Create a WebSocket server on port 1235 to avoid conflicts
const wss = new WebSocketServer({ port: 1235 });

console.log('WebSocket server starting on ws://localhost:1235');

// Handle WebSocket connections
wss.on('connection', (ws, req) => {
  console.log('New client connected');
  
  // Extract room name from URL
  const url = new URL(req.url, `http://${req.headers.host}`);
  const room = url.pathname.slice(1) || 'default';
  console.log(`Client connected to room: ${room}`);
  
  // Get or create document for this room
  if (!documents.has(room)) {
    console.log(`Creating new document for room: ${room}`);
    documents.set(room, new Doc());
  }
  const doc = documents.get(room);
  
  // Store the WebSocket connection
  if (!doc.websockets) {
    doc.websockets = new Set();
  }
  doc.websockets.add(ws);
  
  // Send the current document state to the new client
  try {
    const state = encodeStateAsUpdate(doc);
    ws.send(state);
    console.log(`Sent initial document state to client in room: ${room}`);
  } catch (err) {
    console.error('Error sending initial state:', err);
  }
  
  // Handle messages from the client
  ws.on('message', (message) => {
    try {
      // Log the message type for debugging
      console.log('Received message of type:', typeof message);
      console.log('Message length:', message.length || message.byteLength);
      
      // Convert to Uint8Array if needed
      let messageArray;
      if (message instanceof Buffer) {
        messageArray = new Uint8Array(message);
      } else if (message instanceof ArrayBuffer) {
        messageArray = new Uint8Array(message);
      } else if (message instanceof Uint8Array) {
        messageArray = message;
      } else {
        // If it's a string or other type, try to convert
        console.log('Message is not a recognized binary type, converting...');
        messageArray = new Uint8Array(message);
      }
      
      // Apply the update to the document
      applyUpdate(doc, messageArray);
      
      // Broadcast the update to all other clients in the same room
      doc.websockets.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    } catch (err) {
      console.error('Error processing message:', err);
      console.error('Message type:', typeof message);
    }
  });
  
  // Handle client disconnect
  ws.on('close', () => {
    console.log('Client disconnected');
    if (doc.websockets) {
      doc.websockets.delete(ws);
      // Clean up empty documents if needed
      if (doc.websockets.size === 0) {
        documents.delete(room);
        console.log(`Cleaned up document for room: ${room}`);
      }
    }
  });
  
  // Handle errors
  ws.on('error', (err) => {
    console.error('WebSocket error:', err);
  });
});

wss.on('listening', () => {
  console.log('WebSocket server is running on ws://localhost:1235');
});

wss.on('error', (err) => {
  console.error('WebSocket server error:', err);
});