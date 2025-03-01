import * as THREE from "three";
import gsap from 'gsap';

let material;

export function destroyCubeScene(onComplete) {
  gsap.to(material, {
    opacity: 0,
    duration: .5,
    onComplete: onComplete
  })
}
export function createCubeScene(camera, currentSceneObjects) {
  camera.position.z = 5;
  let container = document.getElementById("content-container");
    container.innerHTML = "Cube";
    
    const geometry = new THREE.BoxGeometry();
    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true });
    const cube = new THREE.Mesh(geometry, material);
    
    camera.lookAt(cube.position);
    
    currentSceneObjects.add(cube);
    
    gsap.from(material, {
      opacity: 0,
      duration: 1
    })
    
    gsap.from(cube.position, {
      y: 5,
      duration: .5
    })
}