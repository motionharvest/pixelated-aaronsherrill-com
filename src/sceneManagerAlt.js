import * as THREE from "three";
import { createCubeScene, destroyCubeScene } from "./scenes/cubeScene.js";
import { createSphereScene, destroySphereScene } from "./scenes/sphereScene.jsx";
import { createEarthScene, destroyEarthScene } from "./scenes/earthScene.jsx";
import { createRotaryScene, destroyRotaryScene } from "./scenes/rotaryScene.jsx";

const routes = {
    "/": {
      create: createEarthScene,
      destroy: destroyEarthScene
      
    },
    "/cube": {
      create: createCubeScene,
      destroy: destroyCubeScene
    },
    "/sphere": {
      create: createSphereScene,
      destroy: destroySphereScene
    },
    "/rotary": {
      create: createRotaryScene,
      destroy: destroyRotaryScene
    }
}
let scene, camera, renderer;
let currentSceneObjects;
let contentContainer;

export function initScene() {
    contentContainer = document.getElementById("content-container");
    
    // Set up Three.js renderer
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const canvas = document.getElementById("canvas");
    renderer = new THREE.WebGLRenderer({canvas});
    //
    currentSceneObjects = new THREE.Group();
    scene.add(currentSceneObjects);
    
    //
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // White light, intensity 1
    directionalLight.position.set(0, 5, 5); // Move light to (x=0, y=-5, z=-5)
    scene.add(directionalLight);
    
    const ambientLight = new THREE.AmbientLight(0x404040, 1); // Soft ambient light
    scene.add(ambientLight);
    
    // Listen for window resize
    window.addEventListener("resize", () => resizeThreeCanvas(renderer, camera));
    
    camera.position.z = 5;
    animate();
    resizeThreeCanvas(renderer, camera);
    
}

function resizeThreeCanvas(renderer, camera) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    
}

// Keep rendering loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
let ghostRoute;
export function loadScene(route) {
  //let each scene decide how it transitions
  if(ghostRoute) {
    routes[ghostRoute].destroy(() => {
      clearScene(()=>{
        if(routes.hasOwnProperty(route)) {
          routes[route].create(camera, currentSceneObjects);
          ghostRoute = route;
        }
      });
    })
  } else {
    if(routes.hasOwnProperty(route)) {
      routes[route].create(camera, currentSceneObjects)  
      ghostRoute = route;
    }
  }
}

// Remove old objects
function clearScene(onComplete) {
    const MAX_WAIT_TIME = 1000; // Fallback in case of unexpected delays
    let isComplete = false;

    function finalize() {
        if (!isComplete) {
            isComplete = true;
            console.log("[clearScene] Cleanup complete, proceeding...");
            onComplete();
        }
    }

    console.log("[clearScene] Starting cleanup...");

    // Remove all Three.js objects properly
    while (currentSceneObjects.children.length) {
        const child = currentSceneObjects.children[0];

        if (child.geometry) {
            console.log("[clearScene] Disposing geometry...");
            child.geometry.dispose();
        }
        if (child.material) {
            console.log("[clearScene] Disposing material...");
            if (Array.isArray(child.material)) {
                child.material.forEach(mat => mat.dispose());
            } else {
                child.material.dispose();
            }
        }

        console.log("[clearScene] Removing child from scene...");
        currentSceneObjects.remove(child);
    }

    // Clear DOM content
    console.log("[clearScene] Clearing DOM...");
    contentContainer.innerHTML = "";
    contentContainer.style.cssText = "";
    window.scrollTo(0, 0);

    // Ensure updates are applied before proceeding
    requestAnimationFrame(() => {
        console.log("[clearScene] First animation frame...");
        requestAnimationFrame(() => {
            console.log("[clearScene] Second animation frame, finalizing...");
            finalize();
        });
    });

    // Fallback timeout in case of delays
    setTimeout(() => {
        console.log("[clearScene] Timeout triggered...");
        finalize();
    }, MAX_WAIT_TIME);
}