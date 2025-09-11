import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 1234 });

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  ws.on('message', (message) => {
    console.log('Received:', message.toString());
    // Echo the message back
    ws.send(`Echo: ${message}`);
  });
  
  ws.send('Hello from server!');
});

console.log('Test WebSocket server running on ws://localhost:1234');