import "./style.css";
import * as THREE from "three";

function main() {
  // Camera
  const fov = 30;
  const aspectRatio = window.innerWidth / window.innerHeight;

  // Mesh
  const color = "blue";
  const wireframe = true;

  const app = document.querySelector("#app");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(fov, aspectRatio);
  const renderer = new THREE.WebGL1Renderer();
  const geometry = new THREE.CylinderGeometry();
  const material = new THREE.MeshBasicMaterial({ color, wireframe });
  const cylinder = new THREE.Mesh(geometry, material);

  camera.position.z = 15;
  renderer.setSize(window.innerWidth, window.innerHeight);
  scene.add(cylinder);

  const animate = () => {
    requestAnimationFrame(animate);

    cylinder.rotation.x += 0.01;
    cylinder.rotation.y += 0.01;
    cylinder.rotation.z += 0.01;

    renderer.render(scene, camera);
  };

  app?.appendChild(renderer.domElement);
  animate();
}

main();
