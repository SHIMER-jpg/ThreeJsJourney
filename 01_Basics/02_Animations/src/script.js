import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const reRender = () => renderer.render(scene, camera);
const origin = new THREE.Vector3(0, 0, 0);

gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });

const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  // Update objects
  mesh.rotation.x += 0.01 * Math.tan(elapsedTime);
  mesh.rotation.y -= 0.05 * Math.tan(elapsedTime);

  mesh.position.x = 1 * Math.cos(elapsedTime);
  mesh.position.y = 1 * Math.sin(elapsedTime);
  camera.lookAt(mesh.position);

  reRender();
  window.requestAnimationFrame(tick);
};

tick();
