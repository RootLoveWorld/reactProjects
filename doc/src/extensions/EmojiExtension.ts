import { Extension } from '@tiptap/core';

// An extension that adds emoji support with a custom command
const EmojiExtension = Extension.create({
  name: 'emojiExtension',

  addCommands() {
    return {
      insertEmoji: (emoji: string) => ({ commands }) => {
        return commands.insertContent(emoji);
      },
    };
  },
});

export default EmojiExtension;