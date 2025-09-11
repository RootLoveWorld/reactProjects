import React from 'react';
import { render, screen } from '@testing-library/react';
import CollaborativeEditor from '../CollaborativeEditor';

// Mock the dynamic import of y-websocket
jest.mock('y-websocket', () => {
  return {
    WebsocketProvider: jest.fn().mockImplementation(() => {
      return {
        destroy: jest.fn(),
        wsconnected: false,
        awareness: {
          getStates: jest.fn().mockReturnValue({}),
        },
      };
    }),
  };
});

describe('CollaborativeEditor', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    render(<CollaborativeEditor />);
    
    // Check that loading message is displayed
    expect(screen.getByText(/Loading collaborative editor/)).toBeInTheDocument();
  });

  // Note: Testing the fully initialized editor would require more complex mocking
  // of the Tiptap editor and Yjs functionality, which is beyond the scope of this test
});