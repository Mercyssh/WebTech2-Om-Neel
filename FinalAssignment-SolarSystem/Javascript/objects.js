import * as THREE from 'https://cdn.skypack.dev/three';
import { camera, renderer, scene } from './threecore.js';
import { c3OrbitGeometry, radians } from './helpers.js';
import { ocontrols } from './orbitcontrols.js';

//## Define the Solarsystem as Objects ##
/*Template
    name: Name of Heavenly Body,
    position: Vector3(x,y,z positions),
    geometry: THREEjs Geometry Object,
    material: THREEjs Material Object,
    orbit (optional): Vector3(Radius of Orbit, Point in Orbit, Speed) 
*/

// Values which get multilpied with each Planet Property
const mfactors = {
    planetradius: .06,
    orbitradius: 8,
    revolutionspeed: .1
}

//### DEFINE PLANETS ###
const solarsystem = [
    {
        name: "Sun",
        position: new THREE.Vector3(0, 0, 0),
        geometry: new THREE.SphereGeometry(1 * mfactors.planetradius, 24, 24),
        material: new THREE.MeshBasicMaterial({ color: 0xff0000 }),
        orbit: null,
        orbitmesh: null
    },
    {
        name: "Mercury",
        position: new THREE.Vector3(0, 0, 0),
        geometry: new THREE.SphereGeometry(.383 * mfactors.planetradius, 32, 32),
        material: new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
        orbit: {
            x: 0,
            y: 0,
            theta: 0,
            radius: 0.38 * mfactors.orbitradius,
            revolutionspeed: (1 / 0.24) * mfactors.revolutionspeed,
            rotationspeed: 1,
            color: 0xffffff,
            opacity: 0.1,
            resolution: 100
        }
    },
    {
        name: "Venus",
        position: new THREE.Vector3(5, 0, 0),
        geometry: new THREE.SphereGeometry(.95 * mfactors.planetradius, 32, 32),
        material: new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
        orbit: {
            x: 0,
            y: 0,
            theta: 0,
            radius: 0.7 * mfactors.orbitradius,
            revolutionspeed: (1 / 0.6) * mfactors.revolutionspeed,
            rotationspeed: 1,
            color: 0xffffff,
            opacity: 0.1,
            resolution: 100
        }
    },
    {
        name: "Earth",
        position: new THREE.Vector3(5, 0, 0),
        geometry: new THREE.SphereGeometry(1 * mfactors.planetradius, 32, 32),
        material: new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
        orbit: {
            x: 0,
            y: 0,
            theta: 0,
            radius: 1 * mfactors.orbitradius,
            revolutionspeed: (1 / 1) * mfactors.revolutionspeed,
            rotationspeed: 1,
            color: 0xffffff,
            opacity: 0.1,
            resolution: 100
        }
    },
    {
        name: "Mars",
        position: new THREE.Vector3(5, 0, 0),
        geometry: new THREE.SphereGeometry(.532 * mfactors.planetradius, 32, 32),
        material: new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
        orbit: {
            x: 0,
            y: 0,
            theta: 0,
            radius: 1.524 * mfactors.orbitradius,
            revolutionspeed: (1 / 1.88) * mfactors.revolutionspeed,
            rotationspeed: 1,
            color: 0xffffff,
            opacity: 0.1,
            resolution: 100
        }
    },
    {
        name: "Jupiter",
        position: new THREE.Vector3(5, 0, 0),
        geometry: new THREE.SphereGeometry(10.9 * mfactors.planetradius, 32, 32),
        material: new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
        orbit: {
            x: 0,
            y: 0,
            theta: 0,
            radius: 5.2 * mfactors.orbitradius,
            revolutionspeed: (1 / 11.86) * mfactors.revolutionspeed,
            rotationspeed: 1,
            color: 0xffffff,
            opacity: 0.1,
            resolution: 100
        }
    },
    {
        name: "Saturn",
        position: new THREE.Vector3(5, 0, 0),
        geometry: new THREE.SphereGeometry(9.14 * mfactors.planetradius, 32, 32),
        material: new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
        orbit: {
            x: 0,
            y: 0,
            theta: 0,
            radius: 9.53 * mfactors.orbitradius,
            revolutionspeed: (1 / 29.4) * mfactors.revolutionspeed,
            rotationspeed: 1,
            color: 0xffffff,
            opacity: 0.1,
            resolution: 100
        }
    },
    {
        name: "Uranus",
        position: new THREE.Vector3(5, 0, 0),
        geometry: new THREE.SphereGeometry(4 * mfactors.planetradius, 32, 32),
        material: new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
        orbit: {
            x: 0,
            y: 0,
            theta: 0,
            radius: 19.1 * mfactors.orbitradius,
            revolutionspeed: (1 / 84) * mfactors.revolutionspeed,
            rotationspeed: 1,
            color: 0xffffff,
            opacity: 0.1,
            resolution: 100
        }
    },
    {
        name: "Neptune",
        position: new THREE.Vector3(5, 0, 0),
        geometry: new THREE.SphereGeometry(3.8 * mfactors.planetradius, 32, 32),
        material: new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
        orbit: {
            x: 0,
            y: 0,
            theta: 0,
            radius: 30 * mfactors.orbitradius,
            revolutionspeed: (1 / 164.8) * mfactors.revolutionspeed,
            rotationspeed: 1,
            color: 0xffffff,
            opacity: 0.1,
            resolution: 100
        }
    }
];

//Load Meshes and Add to Scene
for (var planet of solarsystem) {

    //Generate Orbit Meshes
    if (planet.name != "Sun") {
        planet.orbitmesh = c3OrbitGeometry(
            planet.orbit.x,
            planet.orbit.y,
            planet.orbit.radius,
            planet.orbit.resolution,
            planet.orbit.color,
            planet.orbit.opacity);
        scene.add(planet.orbitmesh);
    }

    //Generate Planet Mesh
    let mesh = new THREE.Mesh(planet.geometry, planet.material);
    mesh.position.x = planet.position.x;
    mesh.position.y = planet.position.y;
    mesh.position.z = planet.position.z;
    planet.mesh = mesh;

    //Add to Scene
    scene.add(planet.mesh);
}



//## Animate Functions ##
//Orbits
function animateOrbits() {
    for (var planet of solarsystem) {
        if (planet.name != "Sun") {
            //Move in a circle
            planet.mesh.position.x = planet.orbit.x + Math.sin(radians(planet.orbit.theta)) * planet.orbit.radius;
            planet.mesh.position.z = planet.orbit.y + Math.cos(radians(planet.orbit.theta)) * planet.orbit.radius;

            //Increment Theta & Loop Back around
            planet.orbit.theta += planet.orbit.revolutionspeed;
            if (planet.orbit.theta + planet.orbit.revolutionspeed > 360) planet.orbit.theta = planet.orbit.theta - 360;
        }
    }
}

//Axis Helper
// const axesHelper = new THREE.AxesHelper(3);
// scene.add(axesHelper);

//## Animation Loop ##
function animate() {

    //Call Animation Functions
    animateOrbits();

    //Update Scene
    ocontrols.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();