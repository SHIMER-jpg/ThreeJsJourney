import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as lil from "lil-gui";
import gsap from "gsap";

/**
 * Tweaks
 */
const gui = new lil.GUI();
const Box = gui.addFolder("Box");
const Triangle = gui.addFolder("Triangle");
const Random = gui.addFolder("Random Object");
const Animation = gui.addFolder("Animation");

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

// window.addEventListener("dblclick", () => {
//   if (!document.fullscreenElement) {
//     canvas.requestFullscreen();
//   } else {
//     document.exitFullscreen();
//   }
// });

// Scene
const scene = new THREE.Scene();

//Triangle
const positionArray = new Float32Array([2, 0, 0, 0, 2, 0, 0, 0, 2]);
const positionAttribute = new THREE.BufferAttribute(positionArray, 3);
// new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", positionAttribute);

const triangle = new THREE.Mesh(
  geometry,
  new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
);

// Object
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 15, 15, 15),
  new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
);

const parameters = {
  spin: () => {
    gsap.to(mesh.rotation, {
      duration: 1,
      y: mesh.rotation.y + 10,
      x: mesh.rotation.x + 10,
    });
  },
};

Box.add(parameters, "spin");
Box.add(mesh.position, "x").min(-2).max(2).step(0.01).name("Horizontal");
Box.add(mesh.position, "y").min(-2).max(2).step(0.01).name("Elevation");
Box.add(mesh.position, "z").min(-2).max(2).step(0.01).name("Closeness");
Box.add(mesh.material, "wireframe");
Box.add(mesh, "visible");
Box.addColor(mesh.material, "color");

//Random Figure
const cant = 50; // desired triangles * 3 triangles vertex * 3 points to describe a vertex
const randGeometry = new THREE.BufferGeometry();
const randPositionArray = new Float32Array(cant * 3 * 3).map(
  () => (Math.random() - 0.5) * 3
);
const randomPositionAttribute = new THREE.BufferAttribute(randPositionArray, 3);
randGeometry.setAttribute("position", randomPositionAttribute);

const randObject = new THREE.Mesh(
  randGeometry,
  new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
);

const group = new THREE.Group();
group.add(randObject);
group.add(triangle);
group.add(mesh);

scene.add(group);
mesh.rotation.y = ((2 * Math.PI) / 360) * 45;
mesh.rotation.x = ((2 * Math.PI) / 360) * 45;
// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.target.y = 1;
// controls.update();

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
  group.rotation.x += 0.005 * Math.sin(elapsed);
  group.rotation.y += 0.005 * Math.sin(elapsed);
  // camera.lookAt(mesh);
  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

window.addEventListener("keydown", ({ key }) => {
  if (key.toLowerCase() === "h") gui._hidden ? gui.show() : gui.hide();
});
