// Find the latest version by visiting https://cdn.skypack.dev/three.

import * as THREE from 'https://cdn.skypack.dev/pin/three@v0.132.2-1edwuDlviJO0abBvWgKd/mode=imports,min/optimized/three.js';

// import { OrbitControls } from 'https://cdn.skypack.dev/pin/three@v0.132.2-1edwuDlviJO0abBvWgKd/mode=imports,min/optimized/three.js/examples/jsm/controls/OrbitControls.js';

// const controls = new OrbitControls();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

//create a blue LineBasicMaterial
const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

const points = [];
points.push(new THREE.Vector3(- 10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));
points.push(new THREE.Vector3(0, -10, 0));
points.push(new THREE.Vector3(-10, 0, 0));

const geometry = new THREE.BufferGeometry().setFromPoints(points);

const line = new THREE.Line(geometry, material);

scene.add(line);
renderer.render(scene, camera);

const geometry2 = new THREE.BoxGeometry();
const material2 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry2, material2);
scene.add(cube);
const geometry3 = new THREE.BoxGeometry();
const material3 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const cube3 = new THREE.Mesh(geometry3, material3);
cube3.position.set(0, -10, -10);
scene.add(cube3);
const cube4 = new THREE.Mesh(geometry3, material3);
cube4.position.set(0, 10, -10);
scene.add(cube4);

camera.position.z = 10;
function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.02;
	cube3.rotation.x += 0.01;
	cube3.rotation.z += 0.04;
	cube4.rotation.z += 0.06;
	camera.position.z += 0.01;
}
animate();






