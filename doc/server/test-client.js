// Simple WebSocket client for testing
import WebSocket from 'ws';

// Connect to the WebSocket server
const ws = new WebSocket('ws://localhost:1234');

ws.on('open', () => {
  console.log('Connected to server');
  ws.send('Hello from client!');
});

ws.on('message', (data) => {
  console.log('Received from server:', data.toString());
});

ws.on('close', () => {
  console.log('Disconnected from server');
});

// Keep the process alive
setTimeout(() => {
  ws.close();
}, 5000);