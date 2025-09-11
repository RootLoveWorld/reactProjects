import React, { useEffect, useState } from 'react';

const WebsocketTest = () => {
  const [status, setStatus] = useState('Connecting...');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    let ws: WebSocket;
    
    try {
      ws = new WebSocket('ws://localhost:1235');
      
      ws.onopen = () => {
        setStatus('Connected');
        setMessages(prev => [...prev, 'Connected to WebSocket server']);
      };
      
      ws.onmessage = (event) => {
        setMessages(prev => [...prev, `Received: ${event.data}`]);
      };
      
      ws.onclose = () => {
        setStatus('Disconnected');
        setMessages(prev => [...prev, 'Disconnected from WebSocket server']);
      };
      
      ws.onerror = (error) => {
        setStatus('Error');
        setMessages(prev => [...prev, `WebSocket error: ${error}`]);
      };
    } catch (error) {
      setStatus('Error');
      setMessages(prev => [...prev, `Failed to create WebSocket: ${error}`]);
    }
    
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  return (
    <div className="websocket-test">
      <h2>WebSocket Test</h2>
      <div>Status: {status}</div>
      <div>
        <h3>Messages:</h3>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WebsocketTest;