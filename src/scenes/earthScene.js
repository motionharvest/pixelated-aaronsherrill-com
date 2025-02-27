import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let camera;
let model;
let thescene;
export function destroyEarthScene(onComplete) {
  if(model) {
    thescene.remove(model);
    model = undefined;
  }
  onComplete();
}
export function createEarthScene(scene, camera, currentSceneObjects) {
    thescene = scene;
    let container = document.getElementById("content-container");
    container.innerHTML = "Earth";
    container.style.height = "500vh";
    
    gsap.to(camera.position, {
        z: 2,
        scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom bottom",
            scrub: true
        }
    });
    
    if(!model) {
      const loader = new GLTFLoader();
      loader.load("/models/Earth.glb", (gltf) => {
        model = gltf.scene;
        model.position.set(0,0,0);
        
        scene.add(model);
        animate()
      }, undefined, (error) => {
       console.error("Error loading model", error);
      })
    }
    
    
}

function animate() {
  model.rotation.y -= .002;
  requestAnimationFrame(animate);
}