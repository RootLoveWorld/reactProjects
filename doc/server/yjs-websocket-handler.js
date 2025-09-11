import { setupWSConnection } from 'y-websocket/src/y-websocket.js';

// Handle WebSocket connections for Yjs
export function handleConnection(conn, req) {
  // Set up the Yjs WebSocket connection
  setupWSConnection(conn, req);
}