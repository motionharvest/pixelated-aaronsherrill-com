import * as THREE from "three";
import {h} from "../pragma";
import jssLite from "../utils/jss-lite";

let style;


export function destroySphereScene(onComplete) {
  onComplete();
  style.remove();
}

export function createSphereScene(scene, camera, currentSceneObjects) {
  let container = document.getElementById("content-container");
    container.innerHTML = "Sphere";
    
    const fragment = (<h2 className="pink">About that</h2>);
    container.append(fragment);
    
    // this isnt eorking
    style = jssLite({
      ".pink" : {
        color: "pink",
        border: "solid 1px orange"
      }
    })
  
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true });
    const sphere = new THREE.Mesh(geometry, material);
    
    scene.add(sphere);
    currentSceneObjects.add(sphere);
}