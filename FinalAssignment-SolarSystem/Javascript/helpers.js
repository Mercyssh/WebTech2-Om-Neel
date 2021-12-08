// This file includes New custom functions that can be used across the codebase
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
    let m = new THREE.LineBasicMaterial({ color: color, transparent: false, opacity: opacity });
    let l = new THREE.Line(g, m);
    l.rotation.x = radians(90);
    return l
}

//Function to return random value between a range
function randomrange(min, max) {
    return Math.random() * (max - min) + min;
}

// Function to return a position vector given direction, magnitude and starting vector
function getVectorByMagnitude(
    startpoint = new THREE.Vector3(0, 0, 0),
    direction = new THREE.Vector3(0, 0, 0),
    magnitude = 1
) {
    //Prepare direction
    direction.normalize();
    direction = direction.multiplyScalar(magnitude)
    let endpoint = direction.addVectors(startpoint, direction)
    return endpoint
}

//Linear Interpolation
function lerp(a, b, f) {
    let x = (b - a) * f;
    x = a + x;
    return x
}

export {
    c3OrbitGeometry,
    radians,
    randomrange,
    getVectorByMagnitude,
    lerp
};