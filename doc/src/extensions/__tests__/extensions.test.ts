import { Extension } from '@tiptap/core';
import { CustomBold, CustomItalic, Placeholder } from '../index';

describe('Custom Extensions', () => {
  test('CustomBold extension should be configured correctly', () => {
    const extension = CustomBold;
    expect(extension.name).toBe('customBold');
    // Check if HTMLAttributes is defined
    if (extension.options && extension.options.HTMLAttributes) {
      expect(extension.options.HTMLAttributes.class).toBe('custom-bold');
    }
  });

  test('CustomItalic extension should be configured correctly', () => {
    const extension = CustomItalic;
    expect(extension.name).toBe('customItalic');
    // Check if HTMLAttributes is defined
    if (extension.options && extension.options.HTMLAttributes) {
      expect(extension.options.HTMLAttributes.class).toBe('custom-italic');
    }
  });

  test('Placeholder extension should be configured correctly', () => {
    const extension = Placeholder.configure({
      placeholder: 'Test placeholder'
    });
    expect(extension.name).toBe('placeholder');
    if (extension.options) {
      expect(extension.options.placeholder).toBe('Test placeholder');
    }
  });

  test('Extensions should be extendable', () => {
    // Test that our extensions properly extend the base Tiptap extensions
    expect(typeof CustomBold.extend).toBe('function');
    expect(typeof CustomItalic.extend).toBe('function');
    expect(typeof Placeholder.extend).toBe('function');
  });
});