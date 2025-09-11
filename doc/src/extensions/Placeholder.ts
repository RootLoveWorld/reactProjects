import { Extension } from '@tiptap/core';

// Placeholder extension to show placeholder text when editor is empty
const Placeholder = Extension.create({
  name: 'placeholder',
  
  addOptions() {
    return {
      placeholder: 'Write something...',
    };
  },

  // Add attributes to the editor to support placeholder
  addGlobalAttributes() {
    return [
      {
        types: ['paragraph'],
        attributes: {
          placeholder: {
            default: null,
            parseHTML: element => element.getAttribute('data-placeholder'),
            renderHTML: attributes => {
              if (!attributes.placeholder) {
                return {};
              }

              return {
                'data-placeholder': attributes.placeholder,
              };
            },
          },
        },
      },
    ];
  },

  // Add keyboard shortcuts
  addKeyboardShortcuts() {
    return {
      // Add any placeholder-related shortcuts here
    };
  },
});

export default Placeholder;