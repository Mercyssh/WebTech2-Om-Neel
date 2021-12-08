import * as THREE from 'https://cdn.skypack.dev/three';
import { camera, renderer } from './threecore.js';
import { solarsystem } from './objects.js';
import { ocontrols, customzoom } from './orbitcontrols.js';

//Selectors for DOM elements
const dynamicgui = document.querySelector("#dynamicgui");
const debuggui = document.querySelector("#debuggui");
const planetinfo = document.querySelector("#planetinfo");
const suninfo = document.querySelector("#suninfo");
const body = document.body;
const templateplanetlabel = document.querySelector("#template-planetlabel");

//Functional variables
let frustum = new THREE.Frustum();  //Used to check if an object is on screen or not
const mousecoord = new THREE.Vector2(0, 0);
let mreleased = true;

const planetLabels = {}

//Create labels and add to DOM
for (const i in solarsystem) {
    const planet = solarsystem[i];
    const node = templateplanetlabel.content.cloneNode(true);
    node.querySelector('.planetlabel').id = `planetlabel-${i}`
    dynamicgui.appendChild(node);

    let newLabel = document.querySelector(`#planetlabel-${i}`)
    //Add event listener to each label
    // newLabel.addEventListener('click', focusPlanet)
    newLabel.querySelector(`.planetname`).innerText = planet.name

    planetLabels[planet.name] = newLabel
}

//Update Labels Position
const planetpositionvec3 = new THREE.Vector3(0, 0, 0)
function updateLabels() {
    for (const i in solarsystem) {
        const planet = solarsystem[i]
        planetpositionvec3.x = planet.mesh.position.x
        planetpositionvec3.y = planet.mesh.position.y
        planetpositionvec3.z = planet.mesh.position.z
        camera.updateMatrix();
        camera.updateMatrixWorld();

        //Get frustrum and hide things outside view from camera
        frustum.setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));
        if (frustum.containsPoint(planetpositionvec3)) {
            planetLabels[planet.name].style.visibility = `visible`;
        } else {
            planetLabels[planet.name].style.visibility = `hidden`;
        }

        planetpositionvec3.project(camera); // `camera` is a THREE.PerspectiveCamera
        planetpositionvec3.x = (planetpositionvec3.x + 1) * renderer.domElement.width / 2;
        planetpositionvec3.y = - (planetpositionvec3.y - 1) * renderer.domElement.height / 2;

        // console.log(planetLabels[planet.name])
        planetLabels[planet.name].style.top = `${planetpositionvec3.y - 12.5}px`;
        planetLabels[planet.name].style.left = `${planetpositionvec3.x - 12.5}px`;

    }
}

//Debug UI
function updateDebug() {
    debuggui.innerText = `
    -Camera-
    X position : ${Math.round(camera.position.x)}
    Y position : ${Math.round(camera.position.y)}
    Z position : ${Math.round(camera.position.z)}
    Zoom : ${ocontrols}
    `
}


//###HANDLE INTERACFTIVITY###

//Add event listeners
for (var i in planetLabels) {
    let label = planetLabels[i];
    label.addEventListener('click', function (e) { focusPlanet(e, this) })
}
body.addEventListener('mousedown', (e) => {
    if (mreleased) {
        mousecoord.x = e.clientX;
        mousecoord.y = e.clientY;
        mreleased = false;
    }
})
body.addEventListener('mouseup', (e) => {
    if (e.clientX == mousecoord.x && e.clientY == mousecoord.y) {
        unfocusPlanet();
    }
    mreleased = true;
})


//Runs on Label Onclick > Focuses appropriate planet into view
function focusPlanet(e, ele) {

    //Update Camera
    let index = parseInt(ele.id.replace("planetlabel-", ""));   //Index in sol array
    customzoom.zoom = 2 //Create a formula to dynamically adjust this please, based on planet size/radius (you can get radius from solarsystem array)
    customzoom.focus = solarsystem[index]

    //Update Static GUI
    // planetinfo.style.visibility = 'visible';
    let info = solarsystem[index].info;
    //Planet Case
    if (index != 0) {
        planetinfo.classList.add("show-me");
        planetinfo.querySelector(".infoplanetname").innerHTML = solarsystem[index].name;
        planetinfo.querySelector(".planetclass").innerText = info.infoType;
        planetinfo.querySelector(".planetimage").src = info.infoImage;
        planetinfo.querySelector(".planetdescription").innerText = info.infoDescription;
        planetinfo.querySelector(".infoyearlength").innerText = info.infoYearLength;
        planetinfo.querySelector(".infodistance").innerText = info.infoOrbitRadius;
        planetinfo.querySelector(".infomoons").innerText = info.infoMoons;
        planetinfo.querySelector(".infodiameter").innerText = info.infoDiameter;
        suninfo.classList.remove("show-me");
    } else {
        suninfo.classList.add("show-me");
    }
}
function unfocusPlanet() {
    customzoom.zoom = 24;
    customzoom.focus = solarsystem[0];
    planetinfo.classList.remove("show-me");
    suninfo.classList.remove("show-me");
}


// Export all Information
export {
    updateDebug,
    updateLabels
}