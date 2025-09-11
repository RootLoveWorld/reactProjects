// ExtensionManager.ts
import { AnyExtension } from '@tiptap/core';
import { 
  CustomBold, 
  CustomItalic, 
  Placeholder, 
  EmojiExtension, 
  MentionExtension 
} from './index';

/**
 * ExtensionManager provides a centralized way to manage and configure extensions
 */
class ExtensionManager {
  private extensions: AnyExtension[] = [];
  private config: Record<string, any> = {};

  /**
   * Add a single extension
   */
  addExtension(extension: AnyExtension): this {
    this.extensions.push(extension);
    return this;
  }

  /**
   * Add multiple extensions
   */
  addExtensions(extensions: AnyExtension[]): this {
    this.extensions.push(...extensions);
    return this;
  }

  /**
   * Remove an extension by name
   */
  removeExtension(name: string): this {
    this.extensions = this.extensions.filter(ext => ext.name !== name);
    return this;
  }

  /**
   * Configure an extension
   */
  configureExtension(name: string, config: any): this {
    this.config[name] = config;
    return this;
  }

  /**
   * Get all extensions with their configurations
   */
  getExtensions(): AnyExtension[] {
    return this.extensions.map(ext => {
      if (this.config[ext.name]) {
        return ext.configure(this.config[ext.name]);
      }
      return ext;
    });
  }

  /**
   * Check if an extension is registered
   */
  hasExtension(name: string): boolean {
    return this.extensions.some(ext => ext.name === name);
  }

  /**
   * Get extension by name
   */
  getExtension(name: string): AnyExtension | undefined {
    return this.extensions.find(ext => ext.name === name);
  }

  /**
   * Clear all extensions
   */
  clear(): this {
    this.extensions = [];
    this.config = {};
    return this;
  }

  /**
   * Get the count of registered extensions
   */
  count(): number {
    return this.extensions.length;
  }
}

// Create a default extension manager with common extensions
const defaultManager = new ExtensionManager();

// Add default extensions
defaultManager
  .addExtension(CustomBold)
  .addExtension(CustomItalic)
  .addExtension(Placeholder.configure({
    placeholder: 'Write something...'
  }))
  .addExtension(EmojiExtension)
  .addExtension(MentionExtension);

export { ExtensionManager };
export default defaultManager;