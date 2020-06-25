import { GLTFLoader } from '/node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls.js';
import * as THREE from '/node_modules/three/src/Three.js';

//to do
//-figure out how to adjust water size to gltf
//-bad solution: create an array of all the water relative sizes


//--------------------------set up-------------------------------
var scene= new THREE.Scene();
var camera= new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000);

camera.position.z=8; 

var renderer= new THREE.WebGLRenderer ({antialias: true});
renderer.setClearColor("#ffffff"); 
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//--------------------------orbit control-------------------------------
var controls= new OrbitControls(camera,renderer.domElement );
controls.addEventListener ('change', renderer);

//--------------------------responsiveness-------------------------------
window.addEventListener('resize', ()=> {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect =window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix(); 
});

//---------------------------water--------------------------------
var size=1; //WATER WIDTH
var geometry =new THREE.BoxGeometry(size, size, size); 
geometry.translate( 0, size/2, 0 ); 
var material2 = new THREE.MeshPhongMaterial({
    color: 0x4185FB, //feel free to change this color
    opacity: 0.5,
    transparent: true,
});
var mesh2= new THREE.Mesh(geometry, material2);
mesh2.rotation.set(0, 45, 0);
mesh2.scale.y=0;
scene.add(mesh2);

//-----------------get size----------------------

var mroot = mesh2;
var box = new THREE.Box3().setFromObject(mroot);
var sizebox = box.getSize(new THREE.Vector3());
console.log("getsize box", sizebox);

//^maybe scale according to this

//--------------------------Load GLTF-------------------------------
var loader = new GLTFLoader();

loader.load('blender-files/Majuro.glb', function(gltf){
	var island=gltf.scene.children[0];
	island.scale.set(1,1,1);
    scene.add(gltf.scene);
    var box = new THREE.Box3().setFromObject(gltf.scene );
    console.log(  "getsize gltf", box.getSize() );
});

mesh2.scale.x=9.5; //need to calculate these numbers somehow
mesh2.scale.z=9.5;

//--------------------------lights-------------------------------

var light= new THREE.PointLight(0xFFFFFF, 1, 1000);
light.position.set(0, 10, 25);
scene.add(light);

var light2= new THREE.PointLight(0xFFFFFF, 1, 1000);
light2.position.set(25, 5, 0);
scene.add(light2);

var light3= new THREE.PointLight(0xFFFFFF, 1, 1000);
light3.position.set(0, 5, -25);
scene.add(light3);

var light4= new THREE.PointLight(0xFFFFFF, 1, 1000);
light4.position.set(-25, 10, 25);
scene.add(light4)

var lightambient = new THREE.AmbientLight( 0x404040 ); 
scene.add(lightambient);


//--------------------------render-------------------------------
var render= function() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

//--------------------------animations-------------------------------
var scaleby=0.08; //WATER HEIGHT
var tl =new TimelineMax().delay(1);
tl.to(mesh2.scale, 1, {y:scaleby});

//rotate to see the animation
scene.rotation.set(Math.PI*(4/180),0,0);

render();