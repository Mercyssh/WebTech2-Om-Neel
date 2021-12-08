import * as THREE from 'https://cdn.skypack.dev/three';
import { scene } from './threecore.js';


//Set up Sun
const sunlight = new THREE.PointLight(0xffffff, 1, 0, 0);
sunlight.position.set(0, 0, 0);
scene.add(sunlight);


//Texture Loader
const textureLoader = new THREE.TextureLoader();

//Load all textures
const textureSun = new THREE.MeshBasicMaterial({
    map: textureLoader.load('./Assets/Textures/Sun/sun-color.jpg')
})

const textureMercury = new THREE.MeshStandardMaterial({
    map: textureLoader.load('./Assets/Textures/Mercury/mercury-color.jpg'),
    normalMap: textureLoader.load('./Assets/Textures/Mercury/mercury-normal.png'),
})

const textureVenus = new THREE.MeshStandardMaterial({
    map: textureLoader.load('./Assets/Textures/Venus/venus-color.jpg'),
    normalMap: textureLoader.load('./Assets/Textures/Venus/venus-normal.png'),
})

const textureEarth = new THREE.MeshStandardMaterial({
    map: textureLoader.load('./Assets/Textures/Earth/earth-color-combined.png'),
    normalMap: textureLoader.load('./Assets/Textures/Earth/earth-normal.png'),
    roughnessMap: textureLoader.load('./Assets/Textures/Earth/earth-roughness.png'),
})

const textureMars = new THREE.MeshStandardMaterial({
    map: textureLoader.load('./Assets/Textures/Mars/mars-color.jpg'),
    normalMap: textureLoader.load('./Assets/Textures/Mars/mars-normal.jpg'),
})

const textureJupiter = new THREE.MeshStandardMaterial({
    map: textureLoader.load('./Assets/Textures/Jupiter/jupiter-color.jpg')
})

const textureSaturn = new THREE.MeshStandardMaterial({
    map: textureLoader.load('./Assets/Textures/Saturn/saturn-color.jpg')
})

const textureUranus = new THREE.MeshStandardMaterial({
    map: textureLoader.load('./Assets/Textures/Uranus/uranus-color.jpg')
})

const textureNeptune = new THREE.MeshStandardMaterial({
    map: textureLoader.load('./Assets/Textures/Neptune/neptune-color.jpg')
})


const textures = {
    Sun: textureSun,
    Mercury: textureMercury,
    Venus: textureVenus,
    Earth: textureEarth,
    Mars: textureMars,
    Jupiter: textureJupiter,
    Saturn: textureSaturn,
    Uranus: textureUranus,
    Neptune: textureNeptune
}

export {
    textures
}