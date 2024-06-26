import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.157.0/three.module.js';
import { scene } from './threecore.js';
import { c3OrbitGeometry, randomrange, radians } from './helpers.js';
import { textures } from './textures.js';
// import { ocontrols } from './orbitcontrols.js';

//## Define the Solarsystem as Objects ##
// Values which get multilpied with each Planet Property
const mfactors = {
    planetradius: .06,
    orbitradius: 8,
    revolutionspeed: .01
}

//### DEFINE PLANETS ###
const solarsystem = [
    {
        name: "Sun",

        info: {
            infoImage: "Assets/Thumbnails/earth.png",
            infoType: "Yellow Dwarf Star",
            infoDescription: "The Sun is a yellow dwarf star, a hot ball of glowing gases at the heart of our solar system. Its gravity holds everything from the biggest planets to tiny debris in its orbit.",
            infoYearLength: "230 Million Earth Years",
            infoTemperature: "5,778 K",
        },

        position: new THREE.Vector3(0, 0, 0),
        geometry: new THREE.SphereGeometry(1 * mfactors.planetradius, 24, 24),
        material: textures["Sun"],
        orbit: null,
        orbitmesh: null,
        mesh: {
            position: {
                x: 0,
                y: 0,
                z: 0
            }
        }
    },
    {
        name: "Mercury",

        info: {
            infoImage: "Assets/Thumbnails/mercury.png",
            infoType: "Terrestrial Planet",
            infoDescription: "Mercury—the smallest planet in our solar system and closest to the Sun—is only slightly larger than Earth's Moon. Mercury is the fastest planet, zipping around the Sun every 88 Earth days.            ",
            infoYearLength: "88 Earth Days",
            infoOrbitRadius: "0.4 AU",
            infoMoons: "0 Moons",
            infoDiameter: "4880 km",
        },

        position: new THREE.Vector3(0, 0, 0),
        geometry: new THREE.SphereGeometry(.383 * mfactors.planetradius, 32, 32),
        material: textures["Mercury"],
        orbit: {
            x: 0,
            y: 0,
            theta: randomrange(0, 360),
            radius: 0.38 * mfactors.orbitradius,
            revolutionspeed: (1 / 0.24) * mfactors.revolutionspeed,
            rotationspeed: 1,
            color: 0xffffff,
            opacity: 0.1,
            resolution: 100
        },
        mesh: {
            position: {
                x: 0,
                y: 0,
                z: 0
            }
        }

    },
    {
        name: "Venus",

        info: {
            infoImage: "Assets/Thumbnails/venus.png",
            infoType: "Terrestrial Planet",
            infoDescription: "Venus spins slowly in the opposite direction from most planets. A thick atmosphere traps heat in a runaway greenhouse effect, making it the hottest planet in our solar system.",
            infoYearLength: "225 Earth Days",
            infoOrbitRadius: "0.7 AU",
            infoMoons: "0 Moons",
            infoDiameter: "12103 km",
        },

        position: new THREE.Vector3(0, 0, 0),
        geometry: new THREE.SphereGeometry(.95 * mfactors.planetradius, 32, 32),
        material: textures["Venus"],
        orbit: {
            x: 0,
            y: 0,
            theta: randomrange(0, 360),
            radius: 0.7 * mfactors.orbitradius,
            revolutionspeed: (1 / 0.6) * mfactors.revolutionspeed,
            rotationspeed: 1,
            color: 0xffffff,
            opacity: 0.1,
            resolution: 100
        },
        mesh: {
            position: {
                x: 0,
                y: 0,
                z: 0
            }
        }
    },
    {
        name: "Earth",

        info: {
            infoImage: "Assets/Thumbnails/earth.png",
            infoType: "Terrestrial Planet",
            infoDescription: "Earth—our home planet—is the only place we know of so far that’s inhabited by living things. It's also the only planet in our solar system with liquid water on the surface.",
            infoYearLength: "365.25 Days",
            infoOrbitRadius: "1 AU",
            infoMoons: "1 Moon",
            infoDiameter: "12742",
        },

        position: new THREE.Vector3(0, 0, 0),
        geometry: new THREE.SphereGeometry(1 * mfactors.planetradius, 32, 32),
        material: textures["Earth"],
        orbit: {
            x: 0,
            y: 0,
            theta: randomrange(0, 360),
            radius: 1 * mfactors.orbitradius,
            revolutionspeed: (1 / 1) * mfactors.revolutionspeed,
            rotationspeed: 1,
            color: 0xffffff,
            opacity: 0.1,
            resolution: 100
        },
        mesh: {
            position: {
                x: 0,
                y: 0,
                z: 0
            }
        }
    },
    {
        name: "Mars",

        info: {
            infoImage: "Assets/Thumbnails/mars.png",
            infoType: "Terrestrial Planet",
            infoDescription: "Mars is a dusty, cold, desert world with a very thin atmosphere. There is strong evidence Mars was—billions of years ago—wetter and warmer, with a thicker atmosphere.",
            infoYearLength: "1.88 Earth Years",
            infoOrbitRadius: "1.5 AU",
            infoMoons: "2 Moons",
            infoDiameter: "6,779 km",
        },

        position: new THREE.Vector3(0, 0, 0),
        geometry: new THREE.SphereGeometry(.532 * mfactors.planetradius, 32, 32),
        material: textures["Mars"],
        orbit: {
            x: 0,
            y: 0,
            theta: randomrange(0, 360),
            radius: 1.524 * mfactors.orbitradius,
            revolutionspeed: (1 / 1.88) * mfactors.revolutionspeed,
            rotationspeed: 1,
            color: 0xffffff,
            opacity: 0.1,
            resolution: 100
        },
        mesh: {
            position: {
                x: 0,
                y: 0,
                z: 0
            }
        }
    },
    {
        name: "Jupiter",

        info: {
            infoImage: "Assets/Thumbnails/jupiter.png",
            infoType: "Gas Giant",
            infoDescription: "Jupiter is more than twice as massive than the other planets of our solar system combined. The giant planet's Great Red spot is a centuries-old storm bigger than Earth.",
            infoYearLength: "11.86 Earth Years",
            infoOrbitRadius: "5.2 AU",
            infoMoons: "79 Moons",
            infoDiameter: "142984 km",
        },

        position: new THREE.Vector3(0, 0, 0),
        geometry: new THREE.SphereGeometry(10.9 * mfactors.planetradius, 32, 32),
        material: textures["Jupiter"],
        orbit: {
            x: 0,
            y: 0,
            theta: randomrange(0, 360),
            radius: 5.2 * mfactors.orbitradius,
            revolutionspeed: (1 / 11.86) * mfactors.revolutionspeed,
            rotationspeed: 1,
            color: 0xffffff,
            opacity: 0.1,
            resolution: 100
        },
        mesh: {
            position: {
                x: 0,
                y: 0,
                z: 0
            }
        }
    },
    {
        name: "Saturn",

        info: {
            infoImage: "Assets/Thumbnails/saturn.png",
            infoType: "Gas Giant",
            infoDescription: "Adorned with a dazzling, complex system of icy rings, Saturn is unique in our solar system. The other giant planets have rings, but none are as spectacular as Saturn's.",
            infoYearLength: "29.45 Earth Years",
            infoOrbitRadius: "9.5 AU",
            infoMoons: "62 Moons",
            infoDiameter: "120536 km",
        },

        position: new THREE.Vector3(0, 0, 0),
        geometry: new THREE.SphereGeometry(9.14 * mfactors.planetradius, 32, 32),
        material: textures["Saturn"],
        rings: new THREE.Mesh(new THREE.PlaneGeometry(2.3, 2.3), textures["SaturnRings"]),
        orbit: {
            x: 0,
            y: 0,
            theta: randomrange(0, 360),
            radius: 9.53 * mfactors.orbitradius,
            revolutionspeed: (1 / 29.4) * mfactors.revolutionspeed,
            rotationspeed: 1,
            color: 0xffffff,
            opacity: 0.1,
            resolution: 100
        },
        mesh: {
            position: {
                x: 0,
                y: 0,
                z: 0
            }
        }
    },
    {
        name: "Uranus",

        info: {
            infoImage: "Assets/Thumbnails/uranus.png",
            infoType: "Gas Giant",
            infoDescription: "Uranus—seventh planet from the Sun—rotates at a nearly 90-degree angle from the plane of its orbit. This unique tilt makes Uranus appear to spin on its side.",
            infoYearLength: "84 Earth Years",
            infoOrbitRadius: "19.8 AU",
            infoMoons: "27 Moons",
            infoDiameter: "51118 km",
        },

        position: new THREE.Vector3(0, 0, 0),
        geometry: new THREE.SphereGeometry(4 * mfactors.planetradius, 32, 32),
        material: textures["Uranus"],
        orbit: {
            x: 0,
            y: 0,
            theta: randomrange(0, 360),
            radius: 19.1 * mfactors.orbitradius,
            revolutionspeed: (1 / 84) * mfactors.revolutionspeed,
            rotationspeed: 1,
            color: 0xffffff,
            opacity: 0.1,
            resolution: 100
        },
        mesh: {
            position: {
                x: 0,
                y: 0,
                z: 0
            }
        }
    },
    {
        name: "Neptune",

        info: {
            infoImage: "Assets/Thumbnails/neptune.png",
            infoType: "Gas Giant",
            infoDescription: "Neptune—the eighth and most distant major planet orbiting our Sun—is dark, cold and whipped by supersonic winds. It was the first planet located through mathematical calculations, rather than by telescope",
            infoYearLength: "64.81 Earth Years",
            infoOrbitRadius: "30.1 AU",
            infoMoons: "14 Moons",
            infoDiameter: "49528 km",
        },

        position: new THREE.Vector3(0, 0, 0),
        geometry: new THREE.SphereGeometry(3.8 * mfactors.planetradius, 32, 32),
        material: textures["Neptune"],
        orbit: {
            x: 0,
            y: 0,
            theta: randomrange(0, 360),
            radius: 30 * mfactors.orbitradius,
            revolutionspeed: (1 / 164.8) * mfactors.revolutionspeed,
            rotationspeed: 1,
            color: 0xffffff,
            opacity: 0.1,
            resolution: 100
        },
        mesh: {
            position: {
                x: 0,
                y: 0,
                z: 0
            }
        }
    }
];

//Add Saturn Rings
scene.add(solarsystem[6].rings);

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



//Exports
export {
    solarsystem
}