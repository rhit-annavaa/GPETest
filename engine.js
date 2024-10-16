import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//necessary import for GPE model for some reason, something about 3d meshes?
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

//renderer creation and color space decleration
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;

//create renderer properties
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

//scene creation 
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(4, 5, 11);

const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.enablePan = false;
controls.minDistance = 5;
controls.maxDistance = 20;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
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
scene.add(groundMesh);

const spotLight = new THREE.SpotLight(0xffffff, 3000, 100, 0.22, 1);
spotLight.position.set(0, 25, 0);
spotLight.castShadow = true;
spotLight.shadow.bias = -0.0001;
scene.add(spotLight);




//make loader
const loader = new GLTFLoader();
//make dracoloader for meshes or whatever and set decoder location to that addy
const draco = new DRACOLoader();
draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
// make the standar loader a draco loader
loader.setDRACOLoader(draco);

loader.load( 'public/gpe_testengine/scene.gltf', function ( gltf ) {
    gltf.scene.scale.multiplyScalar(3);
    gltf.scene.position.set(4, -2, -2);   // gltf.scene.rotation.y += 0.1;

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

  function createMesh(geometry, material, x, y, z, name){
    const mesh = new THREE.Mesh(geometry, material.clone());
    mesh.position.set(x,y,z);
    mesh.name= name;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

//   //adding more stuff for testing clicks

//   const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2);
//   const material = new THREE.MeshLambertMaterial();
//   const cylinders = new THREE.Group();
//   cylinders.add(createMesh(cylinderGeometry, material, 3, 1, 0, 'Cylinder'));
//   scene.add(cylinders);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
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