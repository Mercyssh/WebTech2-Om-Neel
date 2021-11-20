//Import Stuff
import * as THREE from 'https://cdn.skypack.dev/three';
import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/TransformControls.js';

//Scene
const scene = new THREE.Scene();

//Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Camera & Orbit Controls
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

//Orbital and Transform Controls
const ocontrols = new OrbitControls(camera, renderer.domElement);
const tcontrols = new TransformControls(camera, renderer.domElement);

//Update Renderer & Camera size
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
});

//Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
tcontrols.attach(cube);

scene.add(tcontrols);

//Ambient Light
const ambientlight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientlight);

//Point Light
const pointlight1 = new THREE.PointLight(0xffffff, 1);
pointlight1.position.set(-1, 1, 3);
scene.add(pointlight1);
const pointLightHelper1 = new THREE.PointLightHelper(pointlight1, 1);
scene.add(pointLightHelper1);



//Enable Disable Orb Controls - Control Stuff
tcontrols.addEventListener('mouseDown', function () {
    ocontrols.enabled = false;
});
tcontrols.addEventListener('mouseUp', function () {
    ocontrols.enabled = true;
});

//tcontrols Handler
window.addEventListener('keydown', (e) => {
    switch (e.key) {

        //Hide
        case 'h':
            tcontrols.enabled = !tcontrols.enabled;
            tcontrols.showX = !tcontrols.showX;
            tcontrols.showY = !tcontrols.showY;
            tcontrols.showZ = !tcontrols.showZ;
            break;

        //Move
        case 'g':
            tcontrols.mode = "translate";
            break;

        //Scale
        case 's':
            tcontrols.mode = "scale";
            break;

        //Rotate
        case 'r':
            tcontrols.mode = "rotate";
            break;

        //Change Coord System
        case 'c':
            tcontrols.space = tcontrols.space == "world" ? "local" : "world";
            break;
    }
})


//Animate Cube
function updateCube() {
    // cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
}

//Animation Loop
function animate() {
    updateCube();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();