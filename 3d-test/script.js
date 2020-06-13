//--------------------------set up-------------------------------
var scene= new THREE.Scene();
var camera= new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z=5; 
var renderer= new THREE.WebGLRenderer ({antialias: true});
renderer.setClearColor("#ffffff"); 
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//--------------------------orbit control-------------------------------
controls= new THREE.OrbitControls(camera);
controls.addEventListener ('change', renderer);

//--------------------------responsiveness-------------------------------
window.addEventListener('resize', ()=> {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect =window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix(); 
});

//--------------------------shapes-------------------------------
//land 
var geometry =new THREE.BoxGeometry(1, 1, 1); 
var material= new THREE.MeshLambertMaterial({color: 0x0FBA1B});
var mesh= new THREE.Mesh(geometry, material);
mesh.rotation.set(0, 45, 0);
scene.add(mesh);

//water
var size=1.5; //WATER WIDTH
var geometry2 =new THREE.BoxGeometry(size, size, size); 
geometry2.translate( 0, size/2, 0 ); 
var material2 = new THREE.MeshPhongMaterial({
    color: 0x48CCFB,
    opacity: 0.5,
    transparent: true,
});
var mesh2= new THREE.Mesh(geometry2, material2);
mesh2.rotation.set(0, 45, 0);
mesh2.position.setY(-0.5);
mesh2.scale.y=0;
scene.add(mesh2);


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
var scaleby=0.3; //WATER HEIGHT
this.tl =new TimelineMax().delay(1);
this.tl.to(this.mesh2.scale, 1, {y:scaleby});


render();