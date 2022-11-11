import "./style.css";

import * as THREE from "three";

const app = document.querySelector("#app");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  0.2,
  100
);
const renderer = new THREE.WebGL1Renderer();
const geometry = new THREE.CylinderGeometry();
const material = new THREE.MeshBasicMaterial({
  color: "#FEBE8C",
  wireframe: true,
});
const cylinder = new THREE.Mesh(geometry, material);

camera.position.z = 10;
renderer.setSize(window.innerWidth, window.innerHeight);
app?.appendChild(renderer.domElement);
scene.add(cylinder);

const animate = () => {
  requestAnimationFrame(animate);

  cylinder.rotation.x += 0.01;
  cylinder.rotation.y += 0.01;
  cylinder.rotation.z += 0.01;

  renderer.render(scene, camera);
};

animate();
