export const Fragment = Symbol("Fragment"); // Unique identifier for fragments

export const h = (tag, props, ...children) => {
  // Handle JSX Fragments
  if (tag === Fragment) {
    const fragment = document.createDocumentFragment();
    children.forEach(child => {
      if (Array.isArray(child)) {
        child.forEach(nestedChild => fragment.append(nestedChild)); // Flatten children
      } else {
        fragment.append(child);
      }
    });
    return fragment;
  }

  // If tag is a function, treat it as a component
  if (typeof tag === 'function') {
    return tag({ ...props }, children);
  }

  // Create a standard HTML element
  const el = document.createElement(tag);

  // Set attributes
  if (props) {
    Object.entries(props).forEach(([key, val]) => {
      if (key === 'className') {
        el.classList.add(...(val || '').trim().split(' '));
      } else {
        el.setAttribute(key, val);
      }
    });
  }

  // Append child elements
  children.forEach(child => {
    if (Array.isArray(child)) {
      child.forEach(nestedChild => el.append(nestedChild)); // Flatten children
    } else {
      el.append(child);
    }
  });

  return el;
};