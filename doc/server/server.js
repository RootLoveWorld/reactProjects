import { WebSocketServer } from 'ws';
import { setupWSConnection } from 'y-websocket/bin/utils.js';

// Create a WebSocket server
const wss = new WebSocketServer({ port: 1234 });

// Set up the Yjs WebSocket connection handler
wss.on('connection', setupWSConnection);

console.log('WebSocket server running on ws://localhost:1234');