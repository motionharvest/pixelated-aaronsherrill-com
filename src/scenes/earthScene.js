import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { navigateTo } from "../router.js";
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
    container.style.fontFamily = "Arial"
    container.style.paddingLeft = "1em"
    container.innerHTML = `
    <h1 id="title">Pixelated</h1>
    <p id="description">A series of scrollable envrionments developed entirely on a Google Pixel 6 Pro.</p>
    <p id="scroll-prompt">Scroll to begin</p>
    `;
    container.style.height = "500vh";
    
    gsap.from("#title", {
      y: "-=50px",
      opacity: 0,
      duration: .5
    })
    
    gsap.from("#description", {
      delay: .5,
      opacity: 0,
      duration: .5
    })
    
    gsap.from("#scroll-prompt", {
      delay: 4,
      opacity: 0,
      left: "-= 50px"
    })
    
    let tl = gsap.timeline({
      onComplete: function() {
          navigateTo("/cube");
        },
        scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom bottom",
            scrub: true
        }
    })
    
    tl.to(camera.position, {
        z: 1,
        duration: 2
    }, "zoom");
    
    
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
  if(model){
  model.rotation.y -= .002;
  requestAnimationFrame(animate);
  }
}