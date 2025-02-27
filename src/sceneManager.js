import * as THREE from "three";
import { transitionOut, transitionIn } from "./utils/transitions.js";
import { createCubeScene, destroyCubeScene } from "./scenes/cubeScene.js";
import { createSphereScene, destroySphereScene } from "./scenes/sphereScene.js";
import { createEarthScene, destroyEarthScene } from "./scenes/earthScene.js";

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
    }
}
let scene, camera, renderer;
let currentSceneObjects = new Set();

export function initScene() {
    // Set up Three.js renderer
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    
    // Listen for window resize
    window.addEventListener("resize", () => resizeThreeCanvas(renderer, camera));


    document.getElementById("canvas-container").appendChild(renderer.domElement);
    
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
      clearScene();
      
      if(routes.hasOwnProperty(route)) {
        routes[route].create(scene, camera, currentSceneObjects);
        ghostRoute = route;
      }
    })
  } else {
    if(routes.hasOwnProperty(route)) {
      routes[route].create(scene, camera, currentSceneObjects)  
      ghostRoute = route;
    }
  }
}

// Remove old objects
function clearScene() {
    currentSceneObjects.forEach(obj => scene.remove(obj));
    currentSceneObjects.clear();
    let contentContainer = document.getElementById("content-container");
    contentContainer.innerHTML = "";
   // contentContainer.style = {};
}