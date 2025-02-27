import * as THREE from "three";
import gsap from 'gsap';

let material;

export function destroyCubeScene(onComplete) {
  console.log("called destroy cube scene")
  gsap.to(material, {
    opacity: 0,
    duration: .5,
    onComplete: onComplete
  })
}
export function createCubeScene(scene, camera, currentSceneObjects) {
  
  let container = document.getElementById("content-container");
    container.innerHTML = "Cube";
    
    const geometry = new THREE.BoxGeometry();
    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true });
    const cube = new THREE.Mesh(geometry, material);
    
    camera.lookAt(cube.position);
    
    scene.add(cube);
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