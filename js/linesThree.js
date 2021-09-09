// Find the latest version by visiting https://cdn.skypack.dev/three.

// import * as THREE from 'https://cdn.skypack.dev/pin/three@v0.132.2-1edwuDlviJO0abBvWgKd/mode=imports,min/optimized/three.js';

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

// const points = [];
// points.push(new THREE.Vector3(- 10, 0, 0));
// points.push(new THREE.Vector3(0, 10, 0));
// points.push(new THREE.Vector3(10, 0, 0));
// points.push(new THREE.Vector3(0, -10, 0));
// points.push(new THREE.Vector3(-10, 0, 0));

// const geometry = new THREE.BufferGeometry().setFromPoints(points);

// const line = new THREE.Line(geometry, material);

// scene.add(line);
renderer.render(scene, camera);

const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
scene.add(light);

let zDir = 0.01;

const loader = new THREE.GLTFLoader();

loader.load('./models/scene.gltf', function (gltf) {



	let sinX = 0;
	let xv = 0;
	function pAnimate() {
		requestAnimationFrame(animate);
		renderer.render(scene, camera);
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.02;
		cube3.rotation.x += 0.01;
		cube3.rotation.z += 0.04;
		cube4.rotation.z += 0.06;
		if (camera.position.z > 20) {
			zDir = -0.01;
		} else if (camera.position.z < 0) {
			zDir = 0.01;
		}
		camera.position.z += zDir;
		xv++;
		sinX = Math.sin(xv);
		gltf.scene.position.set(2 * xv, 0, 0);
		scene.add(gltf.scene);
	}
	//pAnimate();

}, undefined, function (error) {

	console.error(error);

});

let cubeArray = [];
const arraySize = 60;

function addCubes(dimensions) {
	for (let i = 0; i < dimensions; i++) {
		let cubeSubArray = [];
		cubeArray.push(cubeSubArray);
		for (let j = 0; j < dimensions; j++) {

			const geometryT = new THREE.BoxGeometry(1.75, 0.075, 5.75);
			const materialT = new THREE.MeshStandardMaterial({ color: 0x00ffff, emissive: 0x000101, roughness: 0.75, metalness: 0.95, vertexColors: true });
			materialT.color.setRGB(i / (5 * dimensions), j / (5 * dimensions), (i + j) / (10 * dimensions));
			// materialT.emissive.setRGB(i / (5 * dimensions), j / (5 * dimensions), (i + j) / (10 * dimensions));
			const cubeT = new THREE.Mesh(geometryT, materialT);
			cubeArray[i].push(cubeT);
			cubeT.position.set(i, j, Math.sin(i + j + 1) * 1.5);
			scene.add(cubeT);
		}
	}
}
addCubes(arraySize);

camera.position.x = arraySize / 2;
camera.position.y = arraySize / 2;
camera.position.z = arraySize / 2;

let redValue = 0;
let greenValue = 0.33;
let blueValue = 0.66;
let redPulse = 0.01;
let greenPulse = 0.01;
let bluePulse = 0.01;
zDir = -0.01 * arraySize;
let angle = 0;
let angleObj = 0;

const decimalWrap = (decimalNum) => {
	return ((decimalNum * 100) % 100) / 100;
}

const modifyCubes = function (element, i, element2, j) {
	element2.rotation.z += 0.001 * i; 
	element2.rotation.y += 0.001 * j; 
	element2.rotation.x += 0.001 * (i+j);
	// element2.position.set(i, j, Math.sin((i + j + 10) / 5) * 8); 
	element2.position.set(i - arraySize / 2, j - arraySize / 2, Math.sin((i * j) / 625 + angleObj) * 8); 
	element2.material.color.setRGB((i / arraySize + redValue) / 2, (j / arraySize + greenValue) / 2, ((i + j) / 2 * arraySize + blueValue) / 2);
	element2.material.emissive.setRGB((i / arraySize + redValue) / 2, (j / arraySize + greenValue) / 2, ((i + j) / 2 * arraySize + blueValue) / 2);
	// element2.material.emissive.setRGB(i / (5 * arraySize) * redValue, j / (5 * arraySize) * greenValue, (i + j) / (10 * arraySize) * blueValue);
}

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	cubeArray.forEach((element, i) => element.forEach((element2, j) => modifyCubes(element, i, element2, j)));
	if (camera.position.z > arraySize) {
		zDir = -0.001 * arraySize;
	} else if (camera.position.z < arraySize / 2) {
		zDir = 0.001 * arraySize;
	}
	if (redValue > 1) {
		redPulse = -0.01;
	} else if (redValue < 0) {
		redPulse = 0.01;
	}
	if (greenValue > 1) {
		greenPulse = -0.01;
	} else if (greenValue < 0) {
		greenPulse = 0.01;
	}
	if (blueValue > 1) {
		bluePulse = -0.01;
	} else if (blueValue < 0) {
		bluePulse = 0.01;
	}
	redValue += redPulse;
	greenValue += greenPulse;
	blueValue += bluePulse;

	angle = (angle + 0.01) % 360;
	angleObj = (angleObj + 0.1) % 360;
	camera.position.x = Math.cos(angle) * arraySize * 2;
	camera.position.z = Math.sin(angle) * arraySize * 2;
	camera.position.y = 0;
	camera.lookAt(0, 0, 0);
	// camera.position.z += zDir;
}
animate();


// const sayName = function (name) {
// 	alert(name);
// }
// sayName("Hal");


const apple = {
	color: 'red',
	cultivar: 'honeycrisp'
}