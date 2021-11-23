//Import Stuff
import { camera, renderer } from './threecore.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';

//Orbital Controls
const ocontrols = new OrbitControls(camera, renderer.domElement);

ocontrols.enableDamping = true;
ocontrols.dampingFactor = .1;
ocontrols.enablePan = false;

export { ocontrols };