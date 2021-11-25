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

//Background
const bgloader = new THREE.CubeTextureLoader();
const bgtexture = bgloader.load([
    './Assets/Sky/front.png',
    './Assets/Sky/back.png',
    './Assets/Sky/top.png',
    './Assets/Sky/bottom.png',
    './Assets/Sky/right.png',
    './Assets/Sky/left.png'
]);
scene.background = bgtexture;

export {
    camera,
    renderer,
    scene,
};

