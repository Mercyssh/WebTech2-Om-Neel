//Handles the Animation Loop
import { scene, renderer, camera } from './threecore.js'
import { solarsystem } from './objects.js';
import { radians } from './helpers.js';
import { ocontrols } from './orbitcontrols.js';
import { updateDebug, updateLabels } from './interface.js';


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


//## Animation Loop ##
function animate() {

    //Call Animation Functions
    animateOrbits();

    //Update UI
    updateLabels();

    //Update DOM
    updateDebug();

    //Update Scene
    ocontrols.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();