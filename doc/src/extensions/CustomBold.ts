import { Extension } from '@tiptap/core';

// Custom bold extension that extends the default bold functionality
const CustomBold = Extension.create({
  name: 'customBold',
  
  addOptions() {
    return {
      HTMLAttributes: {
        class: 'custom-bold',
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

export default CustomBold;