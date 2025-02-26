import * as THREE from "three";
import { transitionOut, transitionIn } from "./utils/transitions.js";
import { createCubeScene } from "./scenes/cubeScene.js";
import { createSphereScene } from "./scenes/sphereScene.js";

let scene, camera, renderer;
let currentSceneObjects = new Set();

export function initScene() {
    // Set up Three.js renderer
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("canvas-container").appendChild(renderer.domElement);
    
    camera.position.z = 5;
    animate();
}

// Keep rendering loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

export function loadScene(route) {
    // Fade out, clear scene, then load new scene
    transitionOut(scene, () => {
        clearScene();
        if (route === "/cube") createCubeScene(scene, currentSceneObjects);
        else if (route === "/sphere") createSphereScene(scene, currentSceneObjects);
        transitionIn(scene);
    });
}

// Remove old objects
function clearScene() {
    currentSceneObjects.forEach(obj => scene.remove(obj));
    currentSceneObjects.clear();
}