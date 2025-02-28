class JSSLite {
  constructor() {
    this.styleTag = document.createElement('style');
    document.head.appendChild(this.styleTag);
    this.styles = {}; // Stores all styles
  }

  /**
   * Converts a JavaScript object into a valid CSS rule string.
   */
  static toCSS(selector, style) {
    if (selector.startsWith('@media')) {
      return `${selector} { ${Object.entries(style)
        .map(([innerSelector, innerStyles]) => JSSLite.toCSS(innerSelector, innerStyles))
        .join(' ')} }`;
    }

    const rules = Object.entries(style)
      .map(([prop, value]) => `${prop}: ${value};`)
      .join(' ');
    return `${selector} { ${rules} }`;
  }

  /**
   * Adds new styles and updates the stylesheet.
   */
  add(newStyles) {
    Object.assign(this.styles, newStyles); // Merge styles
    this.inject();
  }

  /**
   * Injects the updated styles into the document.
   */
  inject() {
    const cssContent = Object.entries(this.styles)
      .map(([selector, style]) => JSSLite.toCSS(selector, style))
      .join('\n');

    this.styleTag.textContent = cssContent;
  }

  /**
   * Removes all injected styles.
   */
  remove() {
    this.styleTag.textContent = ''; // Clears styles instead of removing the tag
    this.styles = {};
  }
}

// Create a function wrapper that initializes JSSLite
const jssLite = (styles) => {
  const instance = new JSSLite();
  instance.add(styles); // Initialize with styles
  return instance;
};

// Export the function-like singleton
export default jssLite;