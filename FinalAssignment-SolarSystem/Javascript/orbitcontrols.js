//Import Stuff
import * as THREE from 'https://cdn.skypack.dev/three';
import { camera, renderer } from './threecore.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';
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
    focus: solarsystem[0]
}
customzoom.zoom0 = customzoom.zoom;

// console.log(solarsystem[1].mesh.geometry.parameters.radius)

//Update the zoom / Smooth Zoom
let dirvector = new THREE.Vector3(0, 0, 0);
function UpdateZoomControls() {
    ocontrols.target.copy(customzoom.focus.mesh.position);
    customzoom.zoom0 = lerp(customzoom.zoom0, customzoom.zoom, customzoom.zoomfactor);

    dirvector.subVectors(camera.position, ocontrols.target);
    dirvector = getVectorByMagnitude(ocontrols.target, dirvector, customzoom.zoom0);

    //Dolly Camera
    camera.position.x = dirvector.x;
    camera.position.y = dirvector.y;
    camera.position.z = dirvector.z;

    //Old Reset Target code
    // customzoom.focus = solarsystem[0].mesh.position;
    // ocontrols.target.x = customzoom.focus.mesh.position.x;
    // ocontrols.target.y = customzoom.focus.mesh.position.y;
    // ocontrols.target.z = customzoom.focus.mesh.position.z;

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