import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { navigateTo } from "../router.js";

gsap.registerPlugin(ScrollTrigger);

let camera;
let model;
let thescene;
let styles;
let tl;

export function destroyRotaryScene(onComplete) {
  styles.remove();
  onComplete();
}
export function createRotaryScene(camera, currentSceneObjects) {
    camera.position.z = 5;
    camera.position.y = 0;
    
    let container = document.getElementById("content-container");
    styles = jssLite({
      "#content-container" : {
        "font-family": "Arial",
        "padding-left": "1em",
        height: "500vh"
      }
    })
    
    container.append(
      <>
        <h1 id="title">Rotary Dial Phone</h1>
      </>
    );
    

    
    gsap.from("#title", {
      y: "-=50px",
      opacity: 0,
      duration: .5
    })
    
    
    tl = gsap.timeline({
      onComplete: function() {
        console.log("Rotary Scroll Complete");
          navigateTo("/cube");
        },
        onReverseComplete: function() {
          console.log("back at start.")
        },
        scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom bottom",
            scrub: true
        }
    })
    
    tl.to(camera.position, {
        z: 1.5,
        duration: 2
    }, "zoom");
    
    
    if(!model) {
      const loader = new GLTFLoader();
      loader.load("/models/Rotary.glb", (gltf) => {
        model = gltf.scene;
        model.position.set(0,0,0);
        
        currentSceneObjects.add(model);
        
      }, undefined, (error) => {
       console.error("Error loading model", error);
      })
    } else {
      currentSceneObjects.add(model);
    }
    
    
}
