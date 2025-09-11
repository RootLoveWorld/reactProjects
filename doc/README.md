# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Collaborative Rich Text Editor

This project implements a collaborative rich text editor using Tiptap and Yjs with a plugin-based approach for extending core functionality.

## Features

- Real-time collaborative editing
- Rich text formatting (bold, italic, headings, lists, etc.)
- Emoji insertion
- Mention functionality
- Connection status indicators
- User presence indicators

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

## Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

1. Start the WebSocket server:
   ```bash
   npm run server
   ```
   
2. In a separate terminal, start the development server:
   ```bash
   npm run dev
   ```
   
3. Open your browser and navigate to `http://localhost:5173` (or the port shown in the terminal)

## Project Structure

- `src/components/CollaborativeEditor.tsx` - Main collaborative editor component
- `src/components/SimpleEditor.tsx` - Simple Tiptap editor for testing
- `src/components/WebsocketTest.tsx` - WebSocket connectivity test component
- `server/server.js` - WebSocket server implementation
- `src/extensions/` - Custom Tiptap extensions

## Troubleshooting

If you encounter issues:

1. Make sure the WebSocket server is running on port 1235
2. Check the browser console for any errors
3. Verify that all dependencies are installed correctly
4. Ensure there are no port conflicts (the server uses port 1235)

## Dependencies

- React 18+
- Tiptap (v2)
- Yjs
- y-websocket
- WebSocket (ws)

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])