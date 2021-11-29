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
    min: .08,
    max: 200,
    focus: solarsystem[0].mesh.position
}
customzoom.zoom0 = customzoom.zoom;

//Update the zoom / Smooth Zoom
let dirvector = new THREE.Vector3(0, 0, 0);
function UpdateZoomControls() {
    customzoom.zoom0 = lerp(customzoom.zoom0, customzoom.zoom, customzoom.zoomfactor);

    dirvector.x = 0; dirvector.y = 0; dirvector.z = 0;
    dirvector.subVectors(camera.position, ocontrols.target).normalize();
    dirvector = getVectorByMagnitude(ocontrols.target, dirvector, customzoom.zoom0);

    //Dolly Camera
    camera.position.x = dirvector.x;
    camera.position.y = dirvector.y;
    camera.position.z = dirvector.z;

    //Reset Target
    customzoom.focus = solarsystem[0].mesh.position;
    ocontrols.target.x = customzoom.focus.x;
    ocontrols.target.y = customzoom.focus.y;
    ocontrols.target.z = customzoom.focus.z;

    camera.updateMatrix();
    camera.updateMatrixWorld();
}

//Increment Decrement Custom Zooming
window.addEventListener('wheel', function (e) {

    //Increment Decremenet Zoom Level
    let dir = Math.sign(e.deltaY) == -1 ? "up" : "down";
    customzoom.zoom = dir == "up" ? customzoom.zoom -= customzoom.zoomspeed : customzoom.zoom += customzoom.zoomspeed;
    customzoom.zoom = Math.min(customzoom.zoom, customzoom.max);
    customzoom.zoom = Math.max(customzoom.zoom, customzoom.min);

    // //Calculate New Pointvector.
    //Get Direction Vector, Normalize it
    //New point = Old point + (Direction * Magnitude)
    // dirvector.x = 0; dirvector.y = 0; dirvector.z = 0;
    // dirvector.subVectors(camera.position, ocontrols.target).normalize();
    // dirvector = getVectorByMagnitude(ocontrols.target, dirvector, customzoom.zoom0);

    // //Dolly Camera
    // camera.position.x = dirvector.x;
    // camera.position.y = dirvector.y;
    // camera.position.z = dirvector.z;

    // //Reset Target
    // customzoom.focus = solarsystem[0].mesh.position;
    // ocontrols.target.x = customzoom.focus.x;
    // ocontrols.target.y = customzoom.focus.y;
    // ocontrols.target.z = customzoom.focus.z;

    // camera.updateMatrix();
    // camera.updateMatrixWorld();
})

/*
directionvector.x = ocontrols.target.x - camera.position.x;
directionvector.y = ocontrols.target.y - camera.position.y;
directionvector.z = ocontrols.target.z - camera.position.z;
console.log(directionvector);
directionvector.normalize();
directionvector.multiplyScalar(24.516);
console.log(directionvector);
*/

export {
    ocontrols,
    UpdateZoomControls
};