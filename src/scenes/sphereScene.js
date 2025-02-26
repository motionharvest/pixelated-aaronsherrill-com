import * as THREE from "three";

export function createSphereScene(scene, currentSceneObjects) {
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true });
    const sphere = new THREE.Mesh(geometry, material);
    
    scene.add(sphere);
    currentSceneObjects.add(sphere);
}