/**
 * Three.js Scene Utilities
 * Provides functions for clearing and managing Three.js scenes
 * to prevent memory leaks and ensure proper resource disposal.
 */

// Helper to dispose of material and its textures
function disposeMaterial(material) {
  // Dispose of all material properties that are textures
  for (const prop in material) {
    const value = material[prop];
    if (value && typeof value === 'object' && typeof value.dispose === 'function') {
      if (value.isTexture || value.isRenderTarget) {
        value.dispose();
      }
    }
  }

  // Special handling for common texture types
  if (material.map) material.map.dispose();
  if (material.lightMap) material.lightMap.dispose();
  if (material.bumpMap) material.bumpMap.dispose();
  if (material.normalMap) material.normalMap.dispose();
  if (material.displacementMap) material.displacementMap.dispose();
  if (material.emissiveMap) material.emissiveMap.dispose();
  if (material.specularMap) material.specularMap.dispose();
  if (material.envMap) material.envMap.dispose();
  if (material.alphaMap) material.alphaMap.dispose();
  if (material.aoMap) material.aoMap.dispose();
  if (material.metalnessMap) material.metalnessMap.dispose();
  if (material.roughnessMap) material.roughnessMap.dispose();

  // Finally dispose the material itself
  material.dispose();
}

// Recursive function to process each object
function disposeObject(obj) {
  // Cancel any animation frame/loop attached to the object
  if (obj.userData && obj.userData.animationId) {
    cancelAnimationFrame(obj.userData.animationId);
  }

  // Remove event listeners if any
  if (obj.userData && obj.userData.eventListeners) {
    for (const [event, listener] of Object.entries(obj.userData.eventListeners)) {
      obj.removeEventListener(event, listener);
    }
  }

  // Dispose of geometries
  if (obj.geometry) {
    obj.geometry.dispose();
  }

  // Dispose of materials and their textures
  if (obj.material) {
    // Handle array of materials
    if (Array.isArray(obj.material)) {
      obj.material.forEach(material => disposeMaterial(material));
    } else {
      // Handle single material
      disposeMaterial(obj.material);
    }
  }

  // Recursive call for children
  if (obj.children && obj.children.length > 0) {
    // Create a copy of the children array to avoid issues while removing
    const children = [...obj.children];
    for (const child of children) {
      disposeObject(child);
    }
  }
}

/**
 * Completely clears a Three.js scene by removing all objects,
 * properly disposing of geometries, materials, and textures
 * to prevent memory leaks.
 * 
 * @param {THREE.Scene} scene - The Three.js scene to clear
 * @param {Function} [callback] - Optional callback function to execute when clearing is complete
 */
export function clearScene(scene, callback) {
  // Create a copy of the children array to avoid modification issues during iteration
  const children = [...scene.children];

  for (const object of children) {
    // Skip lights
    if (object.isLight) {
      continue;
    }

    disposeObject(object);
    scene.remove(object);
  }

  // Optionally, you might want to reset some scene properties
  scene.background = null;
  scene.environment = null;

  // Call garbage collector (if available in the environment)
  if (window.gc) {
    window.gc();
  }

  console.log('Scene cleared and resources disposed (excluding lights)');

  // Execute callback if provided
  if (typeof callback === 'function') {
    callback();
  }
}

/**
 * Removes a specific object from the scene by name
 * 
 * @param {THREE.Scene} scene - The Three.js scene
 * @param {string} name - Name of the object to remove
 * @returns {boolean} - True if object was found and removed
 */
export function removeObjectByName(scene, name) {
  const object = scene.getObjectByName(name);
  if (object) {
    disposeObject(object);
    scene.remove(object);
    return true;
  }
  return false;
}

/**
 * Removes all objects of a specific type from the scene
 * 
 * @param {THREE.Scene} scene - The Three.js scene
 * @param {function} type - Constructor function (e.g., THREE.Mesh)
 * @returns {number} - Number of objects removed
 */
export function removeObjectsByType(scene, type) {
  const objectsToRemove = [];
  scene.traverse((object) => {
    if (object instanceof type) {
      objectsToRemove.push(object);
    }
  });
  
  for (const object of objectsToRemove) {
    if (object.parent) {
      disposeObject(object);
      object.parent.remove(object);
    }
  }
  
  return objectsToRemove.length;
}

// Export the dispose utility function as well
export { disposeObject };