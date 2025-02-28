class JSSLite {
  constructor() {
    if (JSSLite.instance) {
      return JSSLite.instance;
    }

    this.styleTag = document.createElement('style');
    document.head.appendChild(this.styleTag);
    
    JSSLite.instance = this;
  }

  /**
   * Converts a JavaScript style object to a CSS string.
   */
  static toCSS(selector, style) {
    const rules = Object.entries(style)
      .map(([prop, value]) => `${JSSLite.camelToKebab(prop)}: ${value};`)
      .join(' ');
    return `${selector} { ${rules} }`;
  }

  /**
   * Converts camelCase properties to kebab-case for CSS.
   */
  static camelToKebab(str) {
    return str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
  }

  /**
   * Injects a scoped style block and returns a removal function.
   */
  create(styles) {
    const styleTag = document.createElement('style');
    document.head.appendChild(styleTag);

    const cssContent = Object.entries(styles)
      .map(([selector, style]) => JSSLite.toCSS(selector, style))
      .join('\n');

    styleTag.textContent = cssContent;

    return {
      remove: () => styleTag.remove()
    };
  }
}

// Create a singleton instance that works as a function
const jssLite = (styles) => new JSSLite().create(styles);

// Export the function-like singleton
export default jssLite;