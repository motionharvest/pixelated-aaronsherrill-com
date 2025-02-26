import * as THREE from "three";

export function createCubeScene(scene, currentSceneObjects) {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true });
    const cube = new THREE.Mesh(geometry, material);
    
    scene.add(cube);
    currentSceneObjects.add(cube);
}