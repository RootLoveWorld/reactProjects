import { CustomBold, CustomItalic, Placeholder } from '../index';

describe('Custom Extensions', () => {
  test('CustomBold extension should be configured correctly', () => {
    const extension = CustomBold;
    expect(extension.name).toBe('customBold');
    expect(extension.options.HTMLAttributes.class).toBe('custom-bold');
  });

  test('CustomItalic extension should be configured correctly', () => {
    const extension = CustomItalic;
    expect(extension.name).toBe('customItalic');
    expect(extension.options.HTMLAttributes.class).toBe('custom-italic');
  });

  test('Placeholder extension should be configured correctly', () => {
    const extension = Placeholder.configure({
      placeholder: 'Test placeholder'
    });
    expect(extension.name).toBe('placeholder');
    expect(extension.options.placeholder).toBe('Test placeholder');
  });

  test('Extensions should be extendable', () => {
    // Test that our extensions properly extend the base Tiptap extensions
    expect(CustomBold.extend).toBeDefined();
    expect(CustomItalic.extend).toBeDefined();
    expect(Placeholder.extend).toBeDefined();
  });
});