import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

//scene=============================================================
const scene = new THREE.Scene();

//camera============================================================
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  500,
);
camera.position.set(0, 0, 13);
camera.lookAt(0, 0, 0);

//Object============================================================
var MonObjet3D;

// Instantiate a loader
const loader = new GLTFLoader();
var loaded = false;
loader.load(
  // resource URL
  "Assets/trotinette.glb",

  // called when the resource is loaded
  function (gltf) {
    scene.add(gltf.scene);
    MonObjet3D = gltf.scene;
    MonObjet3D.scale.set(0.5, 0.5, 0.5);
    MonObjet3D.position.y = -2;
    MonObjet3D.position.x = 5;
    loaded = true;
  },
  // called while loading is progressing
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  // called when loading has errors
  function (error) {
    console.log("An error happened");
  },
);

scene.add(MonObjet3D);

//eventListener=====================================================

window.addEventListener("keypress", (event) => {
  if (event.key === "z") {
    MonObjet3D.rotation.y += 0.3;
  } else if (event.key === "s") {
    MonObjet3D.rotation.y += -0.3;
  }
});
//lights============================================================
const light = new THREE.PointLight(0x8888ff, 3, 18);
light.position.set(0, 8, 11);
const light2 = new THREE.PointLight(0xff8888, 3, 18);
light2.position.set(5, 3, 11);
scene.add(light, light2);

//systeme de rendu==================================================
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x2a1b2a);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.render(scene, camera);

//Animation=========================================================
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  //Ici se trouve le code qui sera exécuté à chaque frame
}
animate();
