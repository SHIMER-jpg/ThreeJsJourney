import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/**
 * Tweaks
 */

/**
 * Textures
 */
const loadingManager = new THREE.LoadingManager();
// loadingManager.onStart = () => {
//   console.log("onStart");
// };
// loadingManager.onProgress = () => {
//   console.log("onProgress");
// };
// loadingManager.onLoad = () => {
//   console.log("onLoad");
// };
// loadingManager.onError = (param) => {
//   console.log("onError", param);
// };

const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load("/textures/checkerboard-8x8.png");
const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const heightTexture = textureLoader.load("/textures/door/height.jpg");
const normalTexture = textureLoader.load("/textures/door/normal.jpg");
const ambientOcclusion = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
colorTexture.magFilter = THREE.NearestFilter; //Gives a sharp format to loaded textures
colorTexture.repeat.x = 5;
colorTexture.repeat.y = 5;
colorTexture.wrapS = "repeat";
colorTexture.wrapT = "repeat";
/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//Resizing
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  //UPDATE CAMERA
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  //UPDATE RENDERER
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2);
});

// Scene
const scene = new THREE.Scene();

// Object
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 15, 15, 15),
  // new THREE.TorusGeometry(1, 0.5, 100, 100, Math.PI * 2),
  new THREE.MeshBasicMaterial({ map: colorTexture })
);

const group = new THREE.Group();
group.add(mesh);

scene.add(group);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();
// Animate
const tick = () => {
  //   // Render
  const elapsed = clock.getElapsedTime();
  controls.update();
  renderer.render(scene, camera);

  // camera.lookAt(mesh);
  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
