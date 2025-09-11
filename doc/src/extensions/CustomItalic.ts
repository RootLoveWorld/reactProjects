import { Extension } from '@tiptap/core';

// Custom italic extension that extends the default italic functionality
const CustomItalic = Extension.create({
  name: 'customItalic',
  
  addOptions() {
    return {
      HTMLAttributes: {
        class: 'custom-italic',
      },
    };
  },

  // Add custom functionality or override existing functionality
  addCommands() {
    return {
      // Add custom commands here if needed
    };
  },
});

export default CustomItalic;