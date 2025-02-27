import * as THREE from "three";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let camera;

export function destroyEarthScene(onComplete) {
  onComplete();
}
export function createEarthScene(scene, camera, currentSceneObjects) {
    
    let container = document.getElementById("content-container");
    container.innerHTML = "Earth";
    container.style.height = "500vh";
    
    //scene.add(cube);
    //currentSceneObjects.add(cube);
}