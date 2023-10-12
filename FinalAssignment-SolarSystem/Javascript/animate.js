//Handles the Animation Loop
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.157.0/three.module.js';
import { scene, renderer, camera } from './threecore.js'
import { solarsystem } from './objects.js';
import { radians, getVectorByMagnitude } from './helpers.js';
import { ocontrols, UpdateZoomControls, customzoom } from './orbitcontrols.js';
import { updateDebug, updateLabels } from './interface.js';


//## Animate Functions ##

//Add Rings to a group
const ringpivot = new THREE.Group();
scene.add(ringpivot);
ringpivot.add(solarsystem[6].rings)

// Animate Orbits
function animateOrbits() {
    for (var planet of solarsystem) {
        if (planet.name != "Sun") {
            //Move in a circle
            planet.mesh.position.x = planet.orbit.x + Math.sin(radians(planet.orbit.theta)) * planet.orbit.radius;
            planet.mesh.position.z = planet.orbit.y + Math.cos(radians(planet.orbit.theta)) * planet.orbit.radius;
            planet.mesh.updateMatrix();
            planet.mesh.updateMatrixWorld();

            //Increment Theta & Loop Back around
            planet.orbit.theta += planet.orbit.revolutionspeed;
            if (planet.orbit.theta + planet.orbit.revolutionspeed > 360) planet.orbit.theta = planet.orbit.theta - 360;
        }
    }

    ringpivot.rotation.set(radians(0), radians(solarsystem[6].orbit.theta), radians(0));
    solarsystem[6].rings.rotation.set(radians(90 - 20), radians(0), radians(0));
    ringpivot.position.x = solarsystem[6].mesh.position.x;
    ringpivot.position.y = solarsystem[6].mesh.position.y;
    ringpivot.position.z = solarsystem[6].mesh.position.z;
}

// console.log(solarsystem[3].group)


//## Animation Loop ##
function animate() {

    //Call Animation Functions
    animateOrbits();

    //Update UI
    updateLabels();

    //Update DOM
    // updateDebug();

    //Update Scene
    ocontrols.update();
    UpdateZoomControls();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();