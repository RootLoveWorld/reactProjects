// Simple test script to verify WebSocket connection
import WebSocket from 'ws';

console.log('Testing WebSocket connection to ws://localhost:1235');

const ws = new WebSocket('ws://localhost:1235');

ws.on('open', () => {
  console.log('Connected to WebSocket server');
  ws.send('Hello from test client');
});

ws.on('message', (data) => {
  console.log('Received from server:', data);
  ws.close();
});

ws.on('close', () => {
  console.log('Connection closed');
});

ws.on('error', (err) => {
  console.error('WebSocket error:', err);
});