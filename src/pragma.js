export const h = (tag, props, ...children) => {
  // If tag is a component (function), call it
  if (typeof tag === 'function') {
    return tag({ ...props }, children);
  }

  // Create HTML element with given attributes
  const el = document.createElement(tag);
  
  if (props) {
    Object.entries(props).forEach(([key, val]) => {
      if (key === 'className') {
        el.classList.add(...(val || '').trim().split(' '));
      } else {
        el.setAttribute(key, val);
      }
    });
  }

  // Append child elements into the parent
  children.forEach((child) => {
    el.append(child);
  });

  return el;
};