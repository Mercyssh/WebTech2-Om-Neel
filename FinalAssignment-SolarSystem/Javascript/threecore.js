import * as THREE from 'https://cdn.skypack.dev/three';

//Scene
const scene = new THREE.Scene();

//Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 5.35
camera.position.y = 14.1;
camera.position.z = 19.33;

//Update Renderer & Camera size when resizing window
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
});

//Prevent Middle Clicking
document.body.onmousedown = function (e) { if (e.button == 1) return false };

//Load Background Textures
const bgloader = new THREE.CubeTextureLoader();
const bgtexture1 = bgloader.load([
    './Assets/Sky/front.png', //Front : px
    './Assets/Sky/back.png', //Left : nx
    './Assets/Sky/top.png', //Top : py
    './Assets/Sky/bottom.png', //Bottom : ny
    './Assets/Sky/left.png', //Left : pz
    './Assets/Sky/right.png' //Right : nz
]);
const bgtexture2 = bgloader.load([
    './Assets/Sky3/front.png', //Front : px
    './Assets/Sky3/back.png', //Left : nx
    './Assets/Sky3/top.png', //Top : py
    './Assets/Sky3/bottom.png', //Bottom : ny
    './Assets/Sky3/left.png', //Left : pz
    './Assets/Sky3/right.png' //Right : nz
]);
const bgtexture3 = bgloader.load([
    './Assets/Sky2/front.png', //Front : px
    './Assets/Sky2/back.png', //Left : nx
    './Assets/Sky2/top.png', //Top : py
    './Assets/Sky2/bottom.png', //Bottom : ny
    './Assets/Sky2/left.png', //Left : pz
    './Assets/Sky2/right.png' //Right : nz
]);
const bgtextures = [bgtexture1, bgtexture2, bgtexture3];
scene.background = bgtextures[1];

export {
    camera,
    renderer,
    scene,
    bgtextures
};

