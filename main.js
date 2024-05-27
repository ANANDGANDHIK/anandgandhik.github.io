// =================================================================== THREEJS - MODULES =================================================================== //

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import TWEEN from '@tweenjs/tween.js';
import { gsap } from "gsap";

// =================================================================== WORLD - INITIALIZATION =================================================================== //

let scene, camera, renderer, controls, light, loader, bgTexture, gltfLoader, fontLoader, mouse, raycaster;

let mainDrone;

let images = [];
let projectImages = [];
let liveProjectImages = [];
let certImages = [];

let originalFov;
const hudAds = document.getElementById('hudAds');

function init() {
    // Create a scene
    scene = new THREE.Scene();

    // Add a camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 0);

    // Add a renderer and append it to the body
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);

    // Add orbit controls
    controls = new OrbitControls(camera, renderer.domElement);
    
    // To disable zoom
    controls.enableZoom = false;

    // To disable rotation
    controls.enableRotate = false;

    // To disable pan
    controls.enablePan = false;

    mouse = new THREE.Vector2();
    raycaster = new THREE.Raycaster();
}

// ------------------------------------------------------------------- WORLD - ELEMENTS ------------------------------------------------------------------- //

function addWorldElements() {
    // Create a directional light
    light = new THREE.AmbientLight(0xffffff);
    scene.add(light);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1, 1000);
    dirLight.position.set(5, 10, 8);
    scene.add(dirLight);

    // Enable shadows for the directional light
    dirLight.castShadow = true;

    // Set up shadow properties for the light
    dirLight.shadow.mapSize.width = 1024; // default
    dirLight.shadow.mapSize.height = 1024; // default
    dirLight.shadow.camera.left = -100;
    dirLight.shadow.camera.right = 100;
    dirLight.shadow.camera.top = 100;
    dirLight.shadow.camera.bottom = -100;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 50000;
    
    // Load a sky texture
    loader = new THREE.TextureLoader();
    bgTexture = loader.load('/assets/images/world/textures/skyTexture.jpg');
    scene.background = bgTexture;
}

// ------------------------------------------------------------------- WORLD - CONTROLS ------------------------------------------------------------------- //

function addWorldControls() {
    // Add an event listener for the mouse wheel event
    window.addEventListener('wheel', function(event) {
        // Determine the scroll direction (positive for scrolling up, negative for scrolling down)
        const scrollDirection = Math.sign(event.deltaY);

        if (camera.position.z > -186 || scrollDirection < 0) {
            camera.position.z -= scrollDirection;
            camera.lookAt(0, 0, 0);
            mainDrone.position.z -= scrollDirection;
        }

        // Define the target rotation based on the scroll direction
        const targetRotation = scrollDirection > 0 ? -0.6 : 0.6;

        // Use GSAP to animate the rotation smoothly
        gsap.to(mainDrone.rotation, {
            x: targetRotation,
            duration: 0.5, // duration of the animation in seconds
            ease: "power1.out" // easing function for a smooth animation
        });
    });

    window.addEventListener('click', (event) => {
        // Convert the mouse position to normalized device coordinates (-1 to +1)
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Update the picking ray with the camera and mouse position
        raycaster.setFromCamera(mouse, camera);

        // Calculate objects intersecting the picking ray
        const intersects = raycaster.intersectObjects(scene.children);

        // If an object was clicked, create a ripple at its position
        if (intersects.length > 0) {
            createRipple(intersects[0].point);
        }
    });
}


// =================================================================== 3D MODELS - INITIALIZATION =================================================================== //

function add3DModels() {
    // Load a GLTF model
    gltfLoader = new GLTFLoader();

// ------------------------------------------------------------------- 3D MODEL - 01 ------------------------------------------------------------------- //

    gltfLoader.load('/assets/models/bridge/bridge.glb', function(gltf) {
        gltf.scene.traverse(function(node) {
            if (node.isMesh) {
                node.receiveShadow = true;
            }
        });
        scene.add(gltf.scene);
        checkAssetsLoaded();
    });

// ------------------------------------------------------------------- 3D MODEL - 02 ------------------------------------------------------------------- //

    // Load the mainDrone model
    const mainDroneLoader = new GLTFLoader();
    mainDroneLoader.load('/assets/models/drone/drone.glb', function(gltf) {
        gltf.scene.traverse(function(node) {
            if (node.isMesh) {
                node.castShadow = true;
            }
        });
        mainDrone = gltf.scene;
        mainDrone.position.set(4, 8, 18);
        mainDrone.rotation.x = -0.6;
        scene.add(mainDrone);
        checkAssetsLoaded();
    });

// ------------------------------------------------------------------- 3D MODEL - 03 ------------------------------------------------------------------- //

    // Load the droneOne model
    const droneOneLoader = new GLTFLoader();
    droneOneLoader.load('/assets/models/spacecrafts/pelican_1.glb', function(gltf) {
        gltf.scene.traverse(function(node) {
            if (node.isMesh) {
                node.castShadow = true;
            }
        });
        const droneOne = gltf.scene;
        droneOne.position.set(-8, 2, -14);
        droneOne.rotation.y = Math.PI / -1.5;
        droneOne.scale.set(2, 2, 2);
        scene.add(droneOne);
        checkAssetsLoaded();
    });

// ------------------------------------------------------------------- 3D MODEL - 04 ------------------------------------------------------------------- //

    // Load the droneTwo model
    const droneTwoLoader = new GLTFLoader();
    droneTwoLoader.load('/assets/models/spacecrafts/pelican_2.glb', function(gltf) {
        gltf.scene.traverse(function(node) {
            if (node.isMesh) {
                node.castShadow = true;
            }
        });
        const droneTwo = gltf.scene;
        droneTwo.position.set(-1, 24, -122);
        droneTwo.rotation.y = Math.PI / 4;
        droneTwo.rotation.x = 0.6;
        droneTwo.scale.set(2, 2, 2);
        scene.add(droneTwo);
        checkAssetsLoaded();
    });

}

// =================================================================== IMAGES - INITIALIZATION =================================================================== //

function addImages() {
    
    // Load the image textures
    const imageLoader = new THREE.TextureLoader();
    
    // Project Images
    const projectImagePaths = [
        '/assets/images/portfolio/project/project1.png',
        '/assets/images/portfolio/project/project2.png'
    ];

    projectImagePaths.forEach((path, index) => {
        const texture = imageLoader.load(path);
        const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
        const geometry = new THREE.PlaneGeometry(1, 1);
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(18, 8, -86);
        mesh.rotation.y = Math.PI / 1;
        mesh.scale.set(18, 9, 5);

        if (index !== 0) mesh.visible = false; // Hide all images except the first one

        projectImages.push(mesh);
        scene.add(mesh);
    });

    // Live Project Images
    const liveProjectImagePaths = [
        '/assets/images/portfolio/liveProject/liveProject1.png',
        '/assets/images/portfolio/liveProject/liveProject2.png'
    ];

    liveProjectImagePaths.forEach((path, index) => {
        const texture = imageLoader.load(path);
        const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
        const geometry = new THREE.PlaneGeometry(1, 1);
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(18, 8, -106);
        mesh.rotation.y = Math.PI / 1;
        mesh.scale.set(18, 9, 5);

        if (index !== 0) mesh.visible = false; // Hide all images except the first one

        liveProjectImages.push(mesh);
        scene.add(mesh);
    });

    // Cert Images
    const certImagePaths = [
        '/assets/images/portfolio/cert/cert1.png',
        '/assets/images/portfolio/cert/cert2.png',
        '/assets/images/portfolio/cert/cert3.png',
        '/assets/images/portfolio/cert/cert4.png',
        '/assets/images/portfolio/cert/cert5.png',
        '/assets/images/portfolio/cert/cert6.png',
        '/assets/images/portfolio/cert/cert7.png'
    ];

    certImagePaths.forEach((path, index) => {
        const texture = imageLoader.load(path);
        const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
        const geometry = new THREE.PlaneGeometry(1, 1);
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(18, 8, -146);
        mesh.rotation.y = Math.PI / 1;
        mesh.scale.set(18, 9, 5);

        if (index !== 0) mesh.visible = false; // Hide all images except the first one

        certImages.push(mesh);
        scene.add(mesh);
    });
// ------------------------------------------------------------------- IMAGE - 01 ------------------------------------------------------------------- //

    const imageTexture11 = imageLoader.load('/assets/images/portfolio/aboutMe/aboutMe1.png'); // Replace with your image path

    // Create materials with the image textures
    const imageMaterial11 = new THREE.MeshBasicMaterial({
        map: imageTexture11,
        transparent: true, // This allows the PNG's transparency to be used
    });

    // Create plane geometries for the images
    const imageGeometry11 = new THREE.PlaneGeometry(1, 1); // You can adjust the size as needed

    // Create meshes with the geometries and materials
    const proImage11 = new THREE.Mesh(imageGeometry11, imageMaterial11);

    // Position the image meshes
    proImage11.position.set(18, 8, -25);

    // Rotate the image meshes
    proImage11.rotation.y = Math.PI / 1; // Rotate 90 degrees

    // Scale the image meshes
    proImage11.scale.set(18, 9, 5); // Scale the image by a factor of 2 on all axes

    images.push(proImage11); // For distance fade animation

    // Add the image meshes to the scene
    scene.add(proImage11);

// ------------------------------------------------------------------- IMAGE - 02 ------------------------------------------------------------------- //

    const imageTexture12 = imageLoader.load('/assets/images/portfolio/aboutMe/aboutMe2.png'); // Replace with your image path
    const imageMaterial12 = new THREE.MeshBasicMaterial({
        map: imageTexture12,
        transparent: true, // This allows the PNG's transparency to be used
    });

    const imageGeometry12 = new THREE.PlaneGeometry(1, 1); // You can adjust the size as needed
    
    const proImage12 = new THREE.Mesh(imageGeometry12, imageMaterial12);
    
    proImage12.position.set(18, 8, -45);
    proImage12.rotation.y += 0.01;
    proImage12.rotation.y = Math.PI / 1;

    proImage12.scale.set(18, 9, 5);

    images.push(proImage12);

    scene.add(proImage12);

// ------------------------------------------------------------------- IMAGE - 03 ------------------------------------------------------------------- //

    const imageTexture13 = imageLoader.load('/assets/images/portfolio/aboutMe/aboutMe3.png'); // Replace with your image path
    const imageMaterial13 = new THREE.MeshBasicMaterial({
        map: imageTexture13,
        transparent: true, // This allows the PNG's transparency to be used
    });

    const imageGeometry13 = new THREE.PlaneGeometry(1, 1); // You can adjust the size as needed
    
    const proImage13 = new THREE.Mesh(imageGeometry13, imageMaterial13);
    
    proImage13.position.set(18, 8, -66);
    proImage13.rotation.y += 0.01;
    proImage13.rotation.y = Math.PI / 1;

    proImage13.scale.set(18, 9, 5);

    images.push(proImage13);

    scene.add(proImage13);

// ------------------------------------------------------------------- IMAGE - 04 ------------------------------------------------------------------- //

const imageTexture14 = imageLoader.load('/assets/images/portfolio/misc/pc_building.png'); // Replace with your image path
const imageMaterial14 = new THREE.MeshBasicMaterial({
    map: imageTexture14,
    transparent: true, // This allows the PNG's transparency to be used
});

const imageGeometry14 = new THREE.PlaneGeometry(1, 1); // You can adjust the size as needed

const proImage14 = new THREE.Mesh(imageGeometry14, imageMaterial14);

proImage14.position.set(18, 8, -126);
proImage14.rotation.y += 0.01;
proImage14.rotation.y = Math.PI / 1;

proImage14.scale.set(18, 9, 5);

images.push(proImage14);

scene.add(proImage14);


// ------------------------------------------------------------------- IMAGE - 04 ------------------------------------------------------------------- //

const imageTexture15 = imageLoader.load('/assets/images/portfolio/aboutMe/aboutMe4.png'); // Replace with your image path
const imageMaterial15 = new THREE.MeshBasicMaterial({
    map: imageTexture15,
    transparent: true, // This allows the PNG's transparency to be used
});

const imageGeometry15 = new THREE.PlaneGeometry(1, 1); // You can adjust the size as needed

const proImage15 = new THREE.Mesh(imageGeometry15, imageMaterial15);

proImage15.position.set(18, 8, -166);
proImage15.rotation.y += 0.01;
proImage15.rotation.y = Math.PI / 1;

proImage15.scale.set(18, 9, 5);

images.push(proImage15);

scene.add(proImage15);

}

// ------------------------------------------------------------------- IMAGE SET - LOOP ANIMATION ------------------------------------------------------------------- //

function onMouseClick(event) {
    // Normalize mouse position to -1 to +1 range
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObjects([...projectImages, ...liveProjectImages, ...certImages]);

    if (intersects.length > 0) {
        let clickedMesh = intersects[0].object;

        // Check if clicked mesh is in projectImages
        let projectImageIndex = projectImages.indexOf(clickedMesh);
        if (projectImageIndex !== -1) {
            let currentImage = projectImages.splice(projectImageIndex, 1)[0];
            currentImage.visible = false;
            projectImages.push(currentImage);
            projectImages[0].visible = true;
        }

        // Check if clicked mesh is in liveProjectImages
        let liveProjectImageIndex = liveProjectImages.indexOf(clickedMesh);
        if (liveProjectImageIndex !== -1) {
            let currentImage = liveProjectImages.splice(liveProjectImageIndex, 1)[0];
            currentImage.visible = false;
            liveProjectImages.push(currentImage);
            liveProjectImages[0].visible = true;
        }

        // Check if clicked mesh is in certImages
        let certImageIndex = certImages.indexOf(clickedMesh);
        if (certImageIndex !== -1) {
            let currentImage = certImages.splice(certImageIndex, 1)[0];
            currentImage.visible = false;
            certImages.push(currentImage);
            certImages[0].visible = true;
        }
    }
}

window.addEventListener('click', onMouseClick, false);


// =================================================================== TEXT - INITIALIZATION =================================================================== //
function addText() {
    // Load a font and create a TextGeometry
    fontLoader = new FontLoader();

    fontLoader.load('/assets/font/ronduitLight.json', function(font) {
        const geometry = new TextGeometry('Anand G', {
            font: font,
            size: 1,
            depth: 0.1,
        });
        const material = new THREE.MeshBasicMaterial({ 
            color: 0xF5F5F5, // Set the color of the text
            opacity: 1, // Set the initial opacity
            transparent: true // Enable transparency
        });
        const textMeshIntro = new THREE.Mesh(geometry, material);
        textMeshIntro.position.set(-8, 3, -2); // Set the position of the text
        textMeshIntro.rotation.y = Math.PI / 4; // Rotate the text by 90 degrees
        textMeshIntro.castShadow = true;
        scene.add(textMeshIntro);
        checkAssetsLoaded();
    });
}

// =================================================================== ANIMATIONS - MISCELANIOUS =================================================================== //

function createRipple(position) {
    // Create a circular geometry
    const geometry = new THREE.CircleGeometry(1, 32);

    // Create a basic material and set its transparency to true
    const material = new THREE.MeshBasicMaterial({ transparent: true });

    // Create a mesh using the geometry and material
    const ripple = new THREE.Mesh(geometry, material);

    // Position the ripple at the provided position
    ripple.position.copy(position);

    // Rotate the ripple so it's parallel to the x-z plane
    ripple.rotation.x = -Math.PI / 2;

    // Add the ripple to the scene
    scene.add(ripple);

    // Use GSAP to animate the ripple
    gsap.to(ripple.scale, {
        x: 10, // expand the ripple
        y: 10, // expand the ripple
        duration: 1, // over 1 second
        ease: "power1.out", // use a smooth easing function
        onComplete: () => scene.remove(ripple) // remove the ripple from the scene when the animation completes
    });

    // Fade out the ripple over the same duration
    gsap.to(ripple.material, {
        opacity: 0, // fade to transparent
        duration: 1, // over 1 second
    });
}


window.addEventListener('mousedown', function(event) {
    if (event.button === 2) { // Right mouse button
    event.preventDefault();

        // Store the original field of view
        originalFov = camera.fov;

        // Start zooming in
        gsap.to(camera, {fov: camera.fov - 20, duration: 0.5, onUpdate: () => camera.updateProjectionMatrix()});

        // Show the HUD image with a fade-in animation
        hudAds.style.display = 'block'; // Make the image visible
        gsap.to(hudAds.style, {opacity: 0.5, duration: 0.5}); // Adjust the opacity value to change the transparency
    }
});

window.addEventListener('mouseup', function(event) {
    if (event.button === 2) { // Right mouse button
        event.preventDefault();
        // Reset the field of view to its original value
        gsap.to(camera, {fov: originalFov, duration: 0.5, onUpdate: () => camera.updateProjectionMatrix()});

        // Hide the HUD image with a fade-out animation
        gsap.to(hudAds.style, {opacity: 0, duration: 0.5, onComplete: () => hudAds.style.display = 'none'}); // Hide the image after the fade-out animation
    }
});

// =================================================================== AUDIO - ELEMENT =================================================================== //

let audioPlaying = false;
let audioMuted = false;
const audioElement = document.getElementById('ambientAudio');

document.getElementById('goButton').addEventListener('click', function() {
    audioElement.play();
    audioPlaying = true;
});

window.addEventListener('keydown', function(event) {
    if (event.key === 'm' || event.key === 'M') {
        if (audioPlaying) {
            if (audioMuted) {
                audioElement.muted = false;
                audioMuted = false;
            } else {
                audioElement.muted = true;
                audioMuted = true;
            }
        }
    }
});


// =================================================================== ANIMATIONS - LOOP =================================================================== //

function animate() {
    requestAnimationFrame(animate);

    // Update TWEEN animations
    TWEEN.update();

    // Iterate over each image
    [...projectImages, ...liveProjectImages, ...images, ...certImages].forEach((image) => {
        // Calculate the distance between the camera and the image
        const distance = camera.position.distanceTo(image.position);

        // Define the distance at which the image should start to fade
        const fadeStartDistance = 22; // Adjust as needed

        // Define the distance at which the image should be fully transparent
        const fadeEndDistance = 26; // Adjust as needed

        // Calculate the opacity based on the distance
        let opacity = 1;
        if (distance > fadeStartDistance) {
            const fadeAmount = (distance - fadeStartDistance) / (fadeEndDistance - fadeStartDistance);
            opacity = 1 - Math.min(fadeAmount, 1);
        }

        // Set the opacity of the image's material
        image.material.opacity = opacity;
    });
    
    // Render the scene
    renderer.render(scene, camera);
}

// Show the loading screen until everything is loaded
const loadingScreen = document.getElementById('loadingScreen');
const goButton = document.getElementById('goButton');
goButton.style.display = 'none';
goButton.addEventListener('click', function() {
    // Hide the loading screen and 'Go' button
    loadingScreen.style.display = 'none';
    goButton.style.display = 'none';

    // Play the audio
    new Audio('/assets/audios/ping.mp3').play();

    // Move the camera smoothly
    new TWEEN.Tween(camera.position)
        .to({ x: 18, y: 8, z: 8 }, 2000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => camera.lookAt(0, 0, -1))
        .start();
});

let assetsLoaded = 0;
function checkAssetsLoaded() {
    assetsLoaded++;
    if (assetsLoaded === 2) { // Change this number to the total number of assets
        goButton.style.display = 'block';
    }
}

// =================================================================== CALLING THE FUNCTION =================================================================== //

init();
addWorldElements();
addWorldControls();
add3DModels();
addImages();
addText();
animate();