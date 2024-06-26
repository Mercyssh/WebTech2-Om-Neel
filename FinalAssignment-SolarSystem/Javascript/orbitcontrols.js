//Import Stuff
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.157.0/three.module.js';
import { camera, renderer } from './threecore.js';
// import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';
import { OrbitControls } from 'https://unpkg.com/three@0.119.1/examples/jsm/controls/OrbitControls.js';
import { getVectorByMagnitude, lerp } from './helpers.js';
import { solarsystem } from './objects.js';

//Orbital Controls
const ocontrols = new OrbitControls(camera, renderer.domElement);

//Set Basics
ocontrols.enableDamping = true;
ocontrols.dampingFactor = .04;
ocontrols.enablePan = false;
ocontrols.enableZoom = false;

const customzoom = {
    zoom: 24,
    zoomspeed: .6,
    zoomfactor: .2,
    min: .2,
    max: 400,
    focus: solarsystem[0],
    // target0: new THREE.Vector3(0, 0, 0)
}
customzoom.zoom0 = customzoom.zoom;

//Update the zoom / Smooth Zoom
let dirvector = new THREE.Vector3(0, 0, 0);
function UpdateZoomControls() {
    // customzoom.target0.lerpVectors(customzoom.target0, customzoom.focus.mesh.position, .1);
    // ocontrols.target.copy(customzoom.target0);
    ocontrols.target.copy(customzoom.focus.mesh.position);
    customzoom.zoom0 = lerp(customzoom.zoom0, customzoom.zoom, customzoom.zoomfactor);

    dirvector.subVectors(camera.position, ocontrols.target);
    dirvector = getVectorByMagnitude(ocontrols.target, dirvector, customzoom.zoom0);

    //Dolly Camera
    camera.position.x = dirvector.x;
    camera.position.y = dirvector.y;
    camera.position.z = dirvector.z;

    camera.updateMatrix();
    camera.updateMatrixWorld();
}

//Increment Decrement Custom Zooming
window.addEventListener('wheel', function (e) {
    //Increment Decremenet Zoom Level
    let dir = Math.sign(e.deltaY) == -1 ? "up" : "down";
    customzoom.zoom = dir == "up" ? customzoom.zoom -= customzoom.zoomspeed + Math.sqrt((customzoom.zoom)) : customzoom.zoom += customzoom.zoomspeed + Math.pow((customzoom.zoom / 40), 2);
    customzoom.zoom = Math.min(customzoom.zoom, customzoom.max);
    customzoom.zoom = Math.max(customzoom.zoom, customzoom.min);
})

export {
    ocontrols,
    customzoom,
    UpdateZoomControls
};