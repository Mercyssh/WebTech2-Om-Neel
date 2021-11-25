//Import Stuff
import * as THREE from 'https://cdn.skypack.dev/three';
import { camera, renderer } from './threecore.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';

//Orbital Controls
const ocontrols = new OrbitControls(camera, renderer.domElement);

ocontrols.enableDamping = true;
ocontrols.dampingFactor = .1;
ocontrols.enablePan = false;

/*
window.addEventListener("keydown", function (e) {
    if (e.key == "p") {
        console.log("Saved")
        ocontrols.saveState();
    }
    if (e.key == "o") {
        console.log("restored");
        ocontrols.reset();
    }
})
*/

export { ocontrols };