import * as THREE from 'https://cdn.skypack.dev/three';
import { camera, renderer } from './threecore.js';
import { solarsystem } from './objects.js';

const body = document.body;
const dynamicgui = document.querySelector("#dynamicgui");
const debuggui = document.querySelector("#debuggui");
const templateplanetlabel = document.querySelector("#template-planetlabel");
let frustum = new THREE.Frustum();

const planetLabels = {}

for (const planet of solarsystem) {
    const node = templateplanetlabel.content.cloneNode(true);
    node.querySelector('.planetlabel').id = `planetlabel-${planet.name}`
    dynamicgui.appendChild(node);

    let newLabel = document.querySelector(`#planetlabel-${planet.name}`)
    newLabel.querySelector(`.planetname`).innerText = planet.name

    planetLabels[planet.name] = newLabel
}

//Update Labels
function updateLabels() {
    for (const i in solarsystem) {
        const planet = solarsystem[i]
        const vec3 = new THREE.Vector3(
            planet.mesh.position.x,
            planet.mesh.position.y,
            planet.mesh.position.z,
        )
        camera.updateMatrix();
        camera.updateMatrixWorld();

        //Get frustrum and hide things outside view from camera
        frustum.setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));
        if (frustum.containsPoint(vec3)) {
            planetLabels[planet.name].style.visibility = `visible`;
        } else {
            planetLabels[planet.name].style.visibility = `hidden`;
        }

        vec3.project(camera); // `camera` is a THREE.PerspectiveCamera
        vec3.x = (vec3.x + 1) * renderer.domElement.width / 2;
        vec3.y = - (vec3.y - 1) * renderer.domElement.height / 2;

        // console.log(planetLabels[planet.name])
        planetLabels[planet.name].style.top = `${vec3.y - 12.5}px`;
        planetLabels[planet.name].style.left = `${vec3.x - 12.5}px`;

    }
}

//Debug UI
function updateDebug() {
    debuggui.innerText = `
    -Camera-
    X position : ${Math.round(camera.position.x)}
    Y position : ${Math.round(camera.position.y)}
    Z position : ${Math.round(camera.position.z)}
    `
}

// Generate
export {
    updateDebug,
    updateLabels
}

