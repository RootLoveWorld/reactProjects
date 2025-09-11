# Collaborative Rich Text Editor with Tiptap and Yjs

This project demonstrates a collaborative rich text editor built with Tiptap and Yjs using a plugin-based architecture for extensibility.

## Features

1. **Real-time Collaboration**: Multiple users can edit the same document simultaneously
2. **Presence Indicators**: See other users' cursors and selections
3. **Plugin-based Architecture**: Extensible through custom extensions
4. **Rich Text Editing**: Standard formatting options (bold, italic, headings, lists, etc.)
5. **Advanced Features**: Emoji conversion, mentions, and custom extensions

## Architecture

The editor follows a plugin-based approach where functionality is added through extensions:

- **Core Extensions**: Provided by Tiptap (StarterKit, Collaboration, etc.)
- **Custom Extensions**: Built-in extensions for specific functionality
- **Third-party Extensions**: Additional features from the Tiptap ecosystem

## Extensions Included

1. **CustomBold/CustomItalic**: Enhanced versions of basic formatting
2. **Placeholder**: Shows placeholder text when editor is empty
3. **EmojiExtension**: Converts text shortcuts to emojis (e.g., :) → 🙂)
4. **MentionExtension**: Allows mentioning other users with @

## How to Run

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

## Customizing Extensions

To add new functionality:

1. Create a new extension in the `src/extensions` directory
2. Extend from `BaseExtension` or directly from Tiptap's Extension/Node classes
3. Add the extension to the `extensions` array in `CollaborativeEditor.tsx`

## Collaboration Features

- **Real-time Sync**: Changes from other users appear instantly
- **Cursor Tracking**: See where other users are editing
- **User Identification**: Each user has a unique name and color
- **Conflict Resolution**: Yjs handles conflict resolution automatically

## Extending Functionality

The plugin-based architecture allows you to:

1. **Modify existing behavior**: Extend core extensions with custom functionality
2. **Add new features**: Implement completely new capabilities through extensions
3. **Configure options**: Customize extension behavior through configuration
4. **Share extensions**: Reuse extensions across different editor instances

## Example Extension Structure

```typescript
import { Extension } from '@tiptap/core';

const MyExtension = Extension.create({
  name: 'myExtension',
  
  addOptions() {
    return {
      // Extension options
    };
  },

  addCommands() {
    return {
      // Custom commands
    };
  },

  addKeyboardShortcuts() {
    return {
      // Keyboard shortcuts
    };
  },
});

export default MyExtension;
```