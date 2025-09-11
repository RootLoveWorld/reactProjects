# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Collaborative Rich Text Editor

This project has been extended with a collaborative rich text editor implementation using:

- [Tiptap](https://tiptap.dev/) - A headless editor framework
- [Yjs](https://yjs.dev/) - A CRDT for real-time collaboration
- Plugin-based architecture for extensibility

### Features

1. **Real-time Collaboration**: Multiple users can edit the same document simultaneously
2. **Presence Indicators**: See other users' cursors and selections
3. **Plugin-based Architecture**: Extensible through custom extensions
4. **Rich Text Editing**: Standard formatting options (bold, italic, headings, lists, etc.)
5. **Advanced Features**: Emoji conversion, mentions, and custom extensions

### Architecture

The editor follows a plugin-based approach where functionality is added through extensions:

- **Core Extensions**: Provided by Tiptap (StarterKit, Collaboration, etc.)
- **Custom Extensions**: Built-in extensions for specific functionality
- **Third-party Extensions**: Additional features from the Tiptap ecosystem

### Extensions Included

1. **CustomBold/CustomItalic**: Enhanced versions of basic formatting
2. **Placeholder**: Shows placeholder text when editor is empty
3. **EmojiExtension**: Converts text shortcuts to emojis (e.g., :) → 🙂)
4. **MentionExtension**: Allows mentioning other users with @

### How to Run

1. **Start the WebSocket Server**:
   ```bash
   npm run server
   ```

2. **Start the Development Server**:
   ```bash
   npm run dev
   ```

3. **Open in Browser**:
   Visit `http://localhost:5173` (or the URL provided by Vite)

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
```