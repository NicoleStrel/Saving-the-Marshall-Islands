import { GLTFLoader } from '../../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from '../../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import * as THREE from '../../../node_modules/three/src/Three.js';

//to do
//-figure out how to adjust water size to gltf
//-bad solution: create an array of all the water relative sizes


//--------------------------set up-------------------------------
var scene= new THREE.Scene();
var camera= new THREE.PerspectiveCamera( 75, 2, 0.1, 1000);
camera.position.z=17; 


var renderer= new THREE.WebGLRenderer ({ canvas: islandCanvas});
renderer.setClearColor("#ffffff"); 
//renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio( window.devicePixelRatio );
//renderer.setSize( window.innerWidth, window.innerHeight );
//renderer.setSize( 900, 500 );
//renderer.setSize(canvasContainer.width, canvasContainer.height);
//canvasContainer.appendChild(renderer.domElement);
//renderer.setSize( 400, 400 ); 
//document.body.appendChild(renderer.domElement);

//--------------------------orbit control-------------------------------
var controls= new OrbitControls(camera,renderer.domElement );
controls.addEventListener ('change', renderer);

//--------------------------responsiveness-------------------------------
function resizeCanvasToDisplaySize() {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (canvas.width !== width ||canvas.height !== height) {
      // you must pass false here or three.js sadly fights the browser
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
  

    }
  }

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
mesh2.scale.x=25; 
mesh2.scale.z=25;
scene.add(mesh2);


//--------------------------initialize GLTF-------------------------------
var loader = new GLTFLoader();
loader.load(`assets/blender-files/${atollName}.glb`, function(gltf){
  var island=gltf.scene.children[1];
  island.scale.set(0.5,0.5,0.5);
  window.prevgltf=gltf; 
  //window.parentgltf=island.parent;
  console.log ("gltf" , prevgltf);
  //parentgltf.add(island);
  scene.add(gltf.scene);
});

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
window.render= function() {
    if (changed){

      console.log("changing gltf to ",atollName, "... ");

      loader.load(`assets/blender-files/${atollName}.glb`, function(gltf){
        var island=gltf.scene.children[1];
        island.scale.set(0.5,0.5,0.5);
        scene.add(gltf.scene);
        prevgltf=gltf;
      });
      changed=false;
      console.log("changed");
    }
    //.........animations
    var tl =new TimelineMax().delay(1);
    tl.to(mesh2.scale, 1, {y:scaleby});
    scene.rotation.set(Math.PI*(1/180),0,0);    //rotate to see the animation
    
    //...........render
    resizeCanvasToDisplaySize();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    //});
    
}

window.renderInitial=function(){
  //.........animations
  var tl =new TimelineMax().delay(1);
  tl.to(mesh2.scale, 1, {y:scaleby});
  scene.rotation.set(Math.PI*(1/180),0,0);    //rotate to see the animation
  resizeCanvasToDisplaySize();
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}



window.deleteOld= function(){
  console.log('deleting old scene..');
  scene.remove(prevgltf.scene);
  console.log("removed: ", prevgltf);
}



renderInitial();