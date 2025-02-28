export const Fragment = Symbol("Fragment"); // Unique identifier for fragments

export const h = (tag, props, ...children) => {
  // Handle JSX Fragments - check both Symbol and null/undefined
  // JSX compilers often translate <></> to either null or React.Fragment
  if (tag === Fragment || tag === null || tag === undefined) {
    const fragment = document.createDocumentFragment();
    appendChildren(fragment, children);
    return fragment;
  }

  // If tag is a function, treat it as a component
  if (typeof tag === 'function') {
    return tag({ ...(props || {}) }, children);
  }

  // Create a standard HTML element
  const el = document.createElement(tag);

  // Set attributes
  if (props) {
    Object.entries(props).forEach(([key, val]) => {
      if (key === 'className') {
        el.classList.add(...(val || '').trim().split(' '));
      } else if (key.startsWith('on') && typeof val === 'function') {
        // Handle event listeners (e.g. onClick)
        const eventName = key.substring(2).toLowerCase();
        el.addEventListener(eventName, val);
      } else {
        el.setAttribute(key, val);
      }
    });
  }

  // Append child elements
  appendChildren(el, children);

  return el;
};

// Helper function to append children, handling arrays and primitives
function appendChildren(parent, children) {
  children.forEach(child => {
    if (child == null) {
      // Skip null or undefined children
      return;
    }
    
    if (Array.isArray(child)) {
      // Recursively append arrays of children
      appendChildren(parent, child);
    } else if (typeof child !== 'object') {
      // Convert primitives (strings, numbers) to text nodes
      parent.append(document.createTextNode(child));
    } else {
      // Append DOM nodes directly
      parent.append(child);
    }
  });
}