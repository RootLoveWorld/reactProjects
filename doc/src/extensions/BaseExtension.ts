import { Extension } from '@tiptap/core';

// Base extension class that other extensions can extend
const BaseExtension = Extension.create({
  name: 'baseExtension',
  
  // Default configuration that can be overridden by specific extensions
  addOptions() {
    return {
      ...this.parent?.(),
      // Add any default options here
    };
  },

  // Default functionality that can be extended
  addCommands() {
    return {
      // Add any default commands here
    };
  },

  // Default keyboard shortcuts
  addKeyboardShortcuts() {
    return {
      // Add any default keyboard shortcuts here
    };
  },
});

export default BaseExtension;