import * as THREE from 'https://cdn.skypack.dev/three';
import { scene } from './threecore.js';


//Convert degrees to radians
function radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}

//Function to create OrbitGeometry
function c3OrbitGeometry(x = 0, y = 0, radius = 5, resolution = 100, color = 0xffffff, opacity = 0.05) {
    let pts = new THREE.Path().absarc(x, y, radius, 0, Math.PI * 2).getPoints(resolution);
    let g = new THREE.BufferGeometry().setFromPoints(pts);
    let m = new THREE.LineBasicMaterial({ color: color, transparent: true, opacity: opacity });
    let l = new THREE.Line(g, m);
    l.rotation.x = radians(90);
    return l
}

export {
    c3OrbitGeometry,
    radians
};