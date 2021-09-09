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

function addCubes() {
	for (let i = 0; i < 100; i++) {
		let cubeSubArray = [];
		cubeArray.push(cubeSubArray);
		for (let j = 0; j < 100; j++) {

			const geometryT = new THREE.BoxGeometry();
			const materialT = new THREE.MeshStandardMaterial({ color: 0x00ffff, emissive: 0x000101, roughness: 0.75, metalness: 0.95, vertexColors: true });
			materialT.color.setRGB(i / 500, j / 500, (i + j) / 1000);
			materialT.emissive.setRGB(i / 500, j / 500, (i + j) / 1000);
			const cubeT = new THREE.Mesh(geometryT, materialT);
			cubeArray[i].push(cubeT);
			cubeT.position.set(i, j, Math.sin(i+j+1) * 1.5);
			scene.add(cubeT);
		}
	}
}
addCubes();

camera.position.x = 50;
camera.position.y = 50;
camera.position.z = 50;

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	cubeArray.forEach((element, i) => element.forEach((element2, j) => {element2.rotation.z += 0.001 * i; element2.rotation.y += 0.001 * j; element2.position.set(i - 5, j - 5, Math.sin((i+j+10) / 5) * 800 * zDir);}));
	if (camera.position.z > 100) {
		zDir = -0.01;
	} else if (camera.position.z < 40) {
		zDir = 0.01;
	}	

	camera.position.z += zDir;
}
animate();






