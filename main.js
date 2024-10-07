import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//necessary import for GPE model for some reason, something about 3d meshes?
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

//renderer creation and color space decleration
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;

const renderer1 = new THREE.WebGLRenderer({ antialias: true });
renderer1.outputColorSpace = THREE.SRGBColorSpace;

const renderer2 = new THREE.WebGLRenderer({ antialias: true });
renderer2.outputColorSpace = THREE.SRGBColorSpace;

const renderer3 = new THREE.WebGLRenderer({ antialias: true });
renderer3.outputColorSpace = THREE.SRGBColorSpace;

//create renderer properties
renderer.setSize(600,450);
renderer.setClearColor(0x000000)

renderer1.setSize(600,450);
renderer1.setClearColor(0x000000)

renderer2.setSize(600,450);
renderer2.setClearColor(0x000000)

renderer3.setSize(600,450);
renderer3.setClearColor(0x000000)
// renderer.setPixelRatio(window.devicePixelRatio);

// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// document.body.appendChild(renderer.domElement);
// document.body.appendChild(renderer1.domElement);
// document.body.appendChild(renderer2.domElement);
// document.body.appendChild(renderer3.domElement);

document.getElementById('container1').appendChild(renderer1.domElement);
document.getElementById('container2').appendChild(renderer3.domElement);
document.getElementById('container3').appendChild(renderer2.domElement);
document.getElementById('container4').appendChild(renderer.domElement);


//scene creation 
const scene = new THREE.Scene();
const scene1 = new THREE.Scene();
const scene2 = new THREE.Scene();
const scene3 = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(4, 5, 11);

const camera1 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera1.position.set(4, 5, 11);

const camera2 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera2.position.set(4, 5, 11);

const camera3 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera3.position.set(4, 5, 11);

const controls = new OrbitControls(camera, renderer.domElement);
const controls1 = new OrbitControls(camera1, renderer1.domElement);
const controls2 = new OrbitControls(camera2, renderer2.domElement);
const controls3 = new OrbitControls(camera3, renderer3.domElement);
// controls.enableDamping = true;
// controls.enablePan = false;
controls.minDistance = 5;
controls.maxDistance = 20;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;

controls1.minDistance = 5;
controls1.maxDistance = 20;
controls1.minPolarAngle = 0.5;
controls1.maxPolarAngle = 1.5;

controls2.minDistance = 5;
controls2.maxDistance = 20;
controls2.minPolarAngle = 0.5;
controls2.maxPolarAngle = 1.5;

controls3.minDistance = 5;
controls3.maxDistance = 20;
controls3.minPolarAngle = 0.5;
controls3.maxPolarAngle = 1.5;
// controls.autoRotate = false;
// controls.target = new THREE.Vector3(0, 1, 0);
// controls.update();

const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
groundGeometry.rotateX(-Math.PI / 2);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x555555,
  side: THREE.DoubleSide
});

const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.castShadow = false;
groundMesh.receiveShadow = true;

const groundMesh1 = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.castShadow = false;
groundMesh.receiveShadow = true;

const groundMesh2 = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.castShadow = false;
groundMesh.receiveShadow = true;

const groundMesh3 = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.castShadow = false;
groundMesh.receiveShadow = true;

scene.add(groundMesh);
scene1.add(groundMesh1);
scene2.add(groundMesh2);
scene3.add(groundMesh3);

const spotLight = new THREE.SpotLight(0xffffff, 3000, 100, 0.22, 1);
spotLight.position.set(0, 25, 0);
spotLight.castShadow = true;
spotLight.shadow.bias = -0.0001;

const spotLight1 = new THREE.SpotLight(0xffffff, 3000, 100, 0.22, 1);
spotLight1.position.set(0, 25, 0);
spotLight1.castShadow = true;
spotLight1.shadow.bias = -0.0001;
scene1.add(spotLight1);

const spotLight2 = spotLight1.clone();
scene2.add(spotLight2);

const spotLight3 = spotLight1.clone();
scene3.add(spotLight3);

scene.add(spotLight);
scene1.add(spotLight1);
scene2.add(spotLight2);
scene3.add(spotLight3);


//make loader
const loader = new GLTFLoader();
const loader1 = new GLTFLoader();
const loader2 = new GLTFLoader();
const loader3 = new GLTFLoader();
//make dracoloader for meshes or whatever and set decoder location to that addy
const draco = new DRACOLoader();
const draco1 = new DRACOLoader();
const draco2 = new DRACOLoader();
const draco3 = new DRACOLoader();
draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
draco1.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
draco2.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
draco3.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
// make the standar loader a draco loader
loader.setDRACOLoader(draco);
loader1.setDRACOLoader(draco1);
loader2.setDRACOLoader(draco2);
loader3.setDRACOLoader(draco3);



loader1.load( 'public/gpe_testone/scene.gltf', function ( gltf ) {
  //for car model
  gltf.scene.rotation.x -= 1.55; //for car 
  
  //drivetrain
  // gltf.scene.scale.multiplyScalar(5);
  // gltf.scene.position.set(8, 1.2, 0); // Resetgin (or other coordinates)

  //frame
  // gltf.scene.rotation.x -=1.55;
  // gltf.scene.scale.multiplyScalar(2);
  //gltf.scene.position.set(8, 1.2, 0); // Resetgin (or other coordinates)

  //default
	scene1.add( gltf.scene  );

}, undefined, function ( error ) {

	console.error( error );

} );

loader3.load( 'public/gpe_testframe/scene.gltf', function ( gltf ) {
  //for car model
  // gltf.scene.rotation.x -= 1.55; //for car 
  
  //drivetrain
  // gltf.scene.scale.multiplyScalar(5);
  // gltf.scene.position.set(8, 1.2, 0); // Resetgin (or other coordinates)

  //frame
  gltf.scene.rotation.x -=1.55;
  gltf.scene.scale.multiplyScalar(2);
  //gltf.scene.position.set(8, 1.2, 0); // Resetgin (or other coordinates)

  //default
	scene3.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

loader.load( 'public/gpe_testdrivetrain/scene.gltf', function ( gltf ) {
  //for car model
  // gltf.scene.rotation.x -= 1.55; //for car 
  
  //drivetrain
  gltf.scene.scale.multiplyScalar(5);
  gltf.scene.position.set(8, 1.2, 0); // Resetgin (or other coordinates)

  //frame
  // gltf.scene.rotation.x -=1.55;
  // gltf.scene.scale.multiplyScalar(2);
  //gltf.scene.position.set(8, 1.2, 0); // Resetgin (or other coordinates)

  //default
	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

loader2.load( 'public/gpe_testengine/scene.gltf', function ( gltf ) {
  //for car model
  // gltf.scene.rotation.x -= 1.55; //for car 
  
  //drivetrain
  gltf.scene.scale.multiplyScalar(3);
  gltf.scene.position.set(4, -2, -2); // Resetgin (or other coordinates)

  //frame
  // gltf.scene.rotation.x -=1.55;
  // gltf.scene.scale.multiplyScalar(2);
  //gltf.scene.position.set(8, 1.2, 0); // Resetgin (or other coordinates)

  //default
	scene2.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );



  function createMesh(geometry, material, x, y, z, name){
    const mesh = new THREE.Mesh(geometry, material.clone());
    mesh.position.set(x,y,z);
    mesh.scale.set(2,2,2);
    mesh.name= name;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

//   //adding more stuff for testing clicks

  const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2);
  const material = new THREE.MeshLambertMaterial();
  const cylinders = new THREE.Group();
  // cylinders.add(createMesh(cylinderGeometry, material, 3, 1, 0, 'Cylinder'));
  // scene.add(cylinders);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener('resize', () => {
  camera1.aspect = window.innerWidth / window.innerHeight;
  camera1.updateProjectionMatrix();
  renderer1.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener('resize', () => {
  camera2.aspect = window.innerWidth / window.innerHeight;
  camera2.updateProjectionMatrix();
  renderer2.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener('resize', () => {
  camera3.aspect = window.innerWidth / window.innerHeight;
  camera3.updateProjectionMatrix();
  renderer3.setSize(window.innerWidth, window.innerHeight);
});

// function animate() {
//   requestAnimationFrame(animate);
//   controls.update();
//   controls1.update();
//   controls2.update();
//   controls3.update();

//   renderer.render(scene, camera);
//   renderer1.render(scene1, camera1);
//   renderer2.render(scene2, camera2);
//   renderer3.render(scene3, camera3);
// }
function animate() {
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);

  controls1.update();
  renderer1.render(scene1, camera1);

  controls2.update();
  renderer2.render(scene2, camera2);

  controls3.update();
  renderer3.render(scene3, camera3);
}

//Raycasting setup attempt (detecting mouse clicks)
const raycaster = new THREE.Raycaster();  

document.addEventListener('mousedown', onMouseDown);

function onMouseDown(event){
  console.log("Click!");
  const coords = new THREE.Vector2(
    (event.clientX / renderer.domElement.clientWidth) * 2 -1,
    -((event.clientY / renderer.domElement.clientHeight) * 2 - 1),
  );
  raycaster.setFromCamera(coords, camera);

  const intersections = raycaster.intersectObjects(scene.children, true);
  if (intersections.length > 0){
    console.log(intersections);
    const selectedObject = intersections[0].object;
    const color = new THREE.Color(Math.random(), Math.random(), Math.random());
    selectedObject.material.color = color;
    console.log(`${selectedObject.name} was clicked!`);
  }
}

//ENDOLDJS

animate();

// import * as THREE from 'three';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// // Four renderers, cameras, and scenes
// const renderers = [];
// const cameras = [];
// const scenes = [];
// const containers = ['container1', 'container2', 'container3', 'container4'];

// // Model paths and scaling factors for each scene
// const modelDetails = [
//   { path: 'public/gpe_testone/scene.gltf', scale: 1.5 },
//   { path: 'public/gpe_testframe/scene.gltf', scale: 2.0 },
//   { path: 'public/gpe_testengine/scene.gltf', scale: 1.2 },
//   { path: 'public/gpe_testdrivetrain/scene.gltf', scale: 3.0 }
// ];

// // Initialize four scenes with different models
// for (let i = 0; i < 4; i++) {
//   // Create a new scene
//   const scene = new THREE.Scene();
//   scenes.push(scene);

//   // Create a new camera
//   const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//   cameras.push(camera);
//   camera.position.z = 5;

//   // Create a new renderer
//   const renderer = new THREE.WebGLRenderer({ antialias: true });
//   renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
//   renderers.push(renderer);

//   // Append renderer to the appropriate container
//   document.getElementById(containers[i]).appendChild(renderer.domElement);

//   // Load a unique GLTF model into each scene
//   const loader = new GLTFLoader();
//   const draco = new DRACOLoader();
//   draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
//   // // make the standar loader a draco loader
//   loader.setDRACOLoader(draco);
//   const modelInfo = modelDetails[i];
//   loader.load(modelInfo.path, function (gltf) {
//     // gltf.scene.scale.set(modelInfo.scale, modelInfo.scale, modelInfo.scale);  // Apply model-specific scale
//     scene.add(gltf.scene);  // Add the model to the scene
//   }, undefined, function (error) {
//     console.error('Error loading GLTF model', error);
//   });
// }

// // Resize handling
// window.addEventListener('resize', () => {
//   for (let i = 0; i < 4; i++) {
//     cameras[i].aspect = window.innerWidth / window.innerHeight;
//     cameras[i].updateProjectionMatrix();
//     renderers[i].setSize(window.innerWidth / 2, window.innerHeight / 2);
//   }
// });

// // Animation loop to render all scenes
// function animate() {
//   requestAnimationFrame(animate);

//   for (let i = 0; i < 4; i++) {
//     renderers[i].render(scenes[i], cameras[i]);
//   }
// }

// animate();
