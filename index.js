const app = document.querySelector("#app");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, 16 / 9, 0.2, 100);
const renderer = new THREE.WebGLRenderer();

camera.position.z = 10;
renderer.setSize(window.innerWidth, window.innerHeight);
app.appendChild(renderer.domElement);

const geometry = new THREE.CylinderBufferGeometry(2, 2, 0.5, 3);
const material = new THREE.MeshBasicMaterial({
  color: "#FEBE8C",
  wireframe: true,
});

const cylinder = new THREE.Mesh(geometry, material);

scene.add(cylinder);

const animate = () => {
  cylinder.rotation.x += 0.01;
  cylinder.rotation.y += 0.01;
  cylinder.rotation.z += 0.01;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

animate();
