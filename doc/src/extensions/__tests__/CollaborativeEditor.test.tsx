import React from 'react';
import { render, screen } from '@testing-library/react';
import CollaborativeEditor from '../../components/CollaborativeEditor';

// Mock the WebSocket provider to avoid connection errors in tests
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

// Mock the EditorProvider to avoid complex setup in tests
jest.mock('@tiptap/react', () => {
  return {
    ...jest.requireActual('@tiptap/react'),
    EditorProvider: ({ slotBefore, children }: any) => (
      <div>
        {slotBefore}
        <div data-testid="editor-content">{children}</div>
      </div>
    ),
    useCurrentEditor: () => ({
      editor: {
        isActive: jest.fn().mockReturnValue(false),
        chain: () => ({
          focus: () => ({
            toggleBold: () => ({ run: jest.fn() }),
            toggleItalic: () => ({ run: jest.fn() }),
            // Add other chain methods as needed
          }),
        }),
        commands: {
          insertEmoji: jest.fn(),
          insertContent: jest.fn(),
        },
      },
    }),
  };
});

describe('CollaborativeEditor', () => {
  test('renders editor controls', () => {
    render(<CollaborativeEditor />);
    
    // Check that basic controls are rendered
    expect(screen.getByText('Bold')).toBeInTheDocument();
    expect(screen.getByText('Italic')).toBeInTheDocument();
    expect(screen.getByText('H1')).toBeInTheDocument();
    expect(screen.getByText('H2')).toBeInTheDocument();
  });

  test('renders connection status', () => {
    render(<CollaborativeEditor />);
    
    // Check that connection status is displayed
    expect(screen.getByText(/Connection status:/)).toBeInTheDocument();
  });

  test('renders emoji buttons', () => {
    render(<CollaborativeEditor />);
    
    // Check that emoji buttons are rendered
    expect(screen.getByText('🙂')).toBeInTheDocument();
    expect(screen.getByText('👍')).toBeInTheDocument();
    expect(screen.getByText('🎉')).toBeInTheDocument();
  });

  test('renders mention buttons', () => {
    render(<CollaborativeEditor />);
    
    // Check that mention buttons are rendered
    expect(screen.getByText('@John')).toBeInTheDocument();
    expect(screen.getByText('@Jane')).toBeInTheDocument();
  });
});