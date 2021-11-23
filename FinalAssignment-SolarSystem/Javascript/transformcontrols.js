import { camera, renderer } from './threecore.js';
import { ocontrols } from './orbitcontrols.js';
import { TransformControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/TransformControls.js';
const tcontrols = new TransformControls(camera, renderer.domElement);

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