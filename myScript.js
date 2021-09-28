import * as THREE from './build/three.module.js';

import { GLTFLoader } from './examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from './examples/jsm/loaders/RGBELoader.js';
import { DRACOLoader } from './examples/jsm/loaders/DRACOLoader.js';
import { MeshoptDecoder } from './examples/jsm/libs/meshopt_decoder.module.js';
// import {OrbitControls} from './examples/jsm/controls/OrbitControls.js';

// SCENE, CAMERA, RENDERER
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 4000, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
antialias: true,
alpha: true
});
const container = document.querySelector('body');
renderer.setSize(window.innerWidth, 4000);
container.appendChild(renderer.domElement);

scene.position.y = 10;
camera.position.x = 0;
camera.position.z = 150;
camera.rotation.x = -0.5


// const orbits = new OrbitControls(camera, renderer.domElement);

//RAYCASTER
let raycaster, mouse;
let currentIntersection = null;
let selectedItem = null;

raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();

//LOADING MANAGER
const manager = new THREE.LoadingManager();

// RGBE LOADER
new RGBELoader()
.setPath('files/')
.load('moonless_golf_1k.hdr', function (texture) {
texture.mapping = THREE.EquirectangularReflectionMapping;
scene.environment = texture;
// scene.background = texture
})

//DRACO LOADER + DECODER
const loaderDRACO = new DRACOLoader();
loaderDRACO.setDecoderPath('./examples/js/libs/draco/');
loaderDRACO.preload()

//GLTF LOADER + DECODER
const loaderGLTF = new GLTFLoader(manager);
loaderGLTF.setDRACOLoader(loaderDRACO);
loaderGLTF.setMeshoptDecoder(MeshoptDecoder);

// DOM EVENTS LIB
let domEvents = new THREEx.DomEvents(camera, renderer.domElement);


const goLeft = document.querySelector('.go-left');
const goRight = document.querySelector('.go-right');
const slide = document.querySelector('.slide-number');
const canvas = document.querySelector('canvas')
const body = document.querySelector('body');
const loadingScreen = document.querySelector('.loading-screen')
loadingScreen.style.opacity = 1;

var gl = canvas.getContext('webgl');


const texture1 = new THREE.TextureLoader();
texture1.load('./files/airpods/textures/case_0.png')

//TWEEN LOADING SCREEN OPACITY
let loadingScreenOpacity = new TWEEN.Tween(loadingScreen.style).to({ opacity: 0 }, 500).easing(TWEEN.Easing.Exponential.Out)
function loadingScreenFade() {
requestAnimationFrame(loadingScreenFade);
loadingScreenOpacity.update();
if (loadingScreen.style.opacity == 0) {
// goRight.style.zIndex = 8;
// goLeft.style.zIndex = 8;
}
loadingScreen.style.display = 'none';
}
//LOADING MANAGER ONLOAD LISTENER
manager.onLoad = function () {
camera.position.z = 17;
camera.rotation.x = 0;
body.classList.remove('overflow')
loadingScreenOpacity.start();
loadingScreenFade();
}

// HZ CHE ETO
renderer.shadowMap.enabled = true;
renderer.outputEncoding = THREE.LinearEncoding;

//SCROLL VARIABLES

let scrolled = 0;
let scrollable = 1;


let macBookTwo;
loaderGLTF.load('./files/macbook_old_two/scene_pack.glb', function (gltf) {
macBookTwo = gltf.scene;
scene.add(macBookTwo);
macBookTwo.position.x = 28;
macBookTwo.position.y = -0.2;
macBookTwo.scale.set(7, 7, 7)
macBookTwo.rotation.x = 0.8;

let macBook;
loaderGLTF.load('./files/macbook_old/scene_pack.glb', function (gltf) {
macBook = gltf.scene;
scene.add(macBook);
macBook.position.x = 24;
macBook.scale.set(6, 6, 6);
macBook.rotation.x = 0.8;
macBook.position.y = 0;

let airPodsMax;
loaderGLTF.load('./files/airpods_max/scene_draco.glb', function (gltf) {
airPodsMax = gltf.scene;
scene.add(airPodsMax);
airPodsMax.position.x = -24;
airPodsMax.position.y = -0.5;
airPodsMax.rotation.x = 0.5;
airPodsMax.scale.set(12, 12, 12)

let iPhone13
loaderGLTF.load('./files/iphone_13/scene.glb', function (gltf) {
iPhone13 = gltf.scene;
scene.add(gltf.scene);
iPhone13.scale.set(2.8, 2.8, 2.8)
iPhone13.position.x = -2;
iPhone13.rotation.x = 0.5;
iPhone13.rotation.y = Math.PI;
scene.add(iPhone13);


let iPhone13two;
loaderGLTF.load('./files/iphone_13/scene_nice.glb', function (gltf) {
iPhone13two = gltf.scene;
scene.add(iPhone13two);
iPhone13two.scale.set(3.1, 3.1, 3.1)
iPhone13two.position.x = 2;
iPhone13two.rotation.x = 0.5;
iPhone13two.rotation.y = Math.PI;

iPhone13two.traverse(function (child) {
if (child.isMesh) {
}
})

let airPods;
loaderGLTF.load('./files/airpods/source/airpodblendswap.glb', function (gltf) {
airPods = gltf.scene;
scene.add(airPods);
airPods.scale.set(0.25, 0.25, 0.25)
airPods.position.x = -28;
airPods.rotation.x = 1;
airPods.position.y = -0.5;
// airPods.rotation.y = Math.PI / 2 ;
airPods.children[0].position.y = -3.7;
airPods.children[1].position.y = 3.6500000000000004;
airPods.children[4].rotation.x = 0;


//AIRPODS TRAVERSE
airPods.traverse(function (child) {
airPods.castShadow = true;
airPods.recieveShadow = true;
if (child.isMesh) {
child.castShadow = true;
child.recieveShadow = true;
child.material.castShadow = true;
child.material.recieveShadow = true;
}
})
//RAYCASTER EVENT
renderer.domElement.addEventListener('mouseup', onMouseMove, false);

//RAYCASTER FUNCTION
function onMouseMove(event) {
mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
raycaster.setFromCamera(mouse, camera);
const intersects = raycaster.intersectObject(airPods, true);
if (intersects.length > 0) {
//открывается крышка
if (airPods.children[4].rotation.x == 0) {
tweenCapOpen.start();
FtweenCapOpen();
}
//вылетает первый наушник
if (airPods.children[4].rotation.x == -2 && airPods.children[0].position.y == -3.7) {
tweenAirPodOut.start();
FtweenAirPodOut();
}
//вылетает второй наушник
if (airPods.children[4].rotation.x == -2 && airPods.children[0].position.y == 1 && airPods.children[1].position.y == 3.6500000000000004) {
tweenAirPodSecOut.start();
FtweenAirPodSecOut();
}
//залетают оба, закрывается крышка
if (airPods.children[4].rotation.x == -2 && airPods.children[0].position.y == 1 && airPods.children[1].position.y == 8) {
tweenAirPodBack.start();
tweenAirPodSecBack.start();
tweenCapClose.start();
FtweenBothAirpodsBack();
}
}
}

//AIRPODS LIGHT
const spotLight1 = new THREE.SpotLight(0xffdfb8, 0.5);
spotLight1.position.set(-26, 5, 15);
spotLight1.angle = 0.80;
spotLight1.penumbra = 0.8;
scene.add(spotLight1);
spotLight1.target.position.set(-26, 0, 0);
scene.add(spotLight1.target)


//IPHONES LIGHT
const spotLight2 = new THREE.SpotLight(0xffdfb8, 2);

spotLight2.angle = 0.6;
scene.add(spotLight2);
spotLight2.target.position.set(0, 8, 0);
scene.add(spotLight2.target)
spotLight2.penumbra = 0.8;

spotLight2.position.z = 25;

spotLight2.angle = 0.8 + scrolled / 5000
spotLight2.intensity = 2 - scrolled / 3000

//MACBOOKS LIGHT
const spotLight3 = new THREE.SpotLight(0xffdfb8, 4);
spotLight3.position.set(26, 5, 15);
spotLight3.angle = 0.75;
scene.add(spotLight3);
spotLight3.penumbra = 0.8;
spotLight3.target.position.set(26, 0, 0);
scene.add(spotLight3.target)

//TWEEN AIRPODS PARTS
let tweenCapOpen = new TWEEN.Tween(airPods.children[4].rotation).to({ x: -2 }, 1000).easing(TWEEN.Easing.Exponential.Out)
let tweenAirPodOut = new TWEEN.Tween(airPods.children[0].position).to({ y: 1 }, 1000).easing(TWEEN.Easing.Exponential.Out)
let tweenAirPodSecOut = new TWEEN.Tween(airPods.children[1].position).to({ y: 8 }, 1000).easing(TWEEN.Easing.Exponential.Out)
let tweenAirPodBack = new TWEEN.Tween(airPods.children[0].position).to({ y: airPods.children[0].position.y }, 1000).easing(TWEEN.Easing.Exponential.Out)
let tweenAirPodSecBack = new TWEEN.Tween(airPods.children[1].position).to({ y: 3.65 }, 1000).easing(TWEEN.Easing.Exponential.Out)
let tweenCapClose = new TWEEN.Tween(airPods.children[4].rotation).to({ x: 0 }, 1000).easing(TWEEN.Easing.Exponential.Out).delay(500)

function FtweenBothAirpodsBack() {
requestAnimationFrame(FtweenBothAirpodsBack);
tweenAirPodBack.update();
tweenAirPodSecBack.update();
tweenCapClose.update();
}

function FtweenAirPodSecOut() {
requestAnimationFrame(FtweenAirPodSecOut);
tweenAirPodSecOut.update();
}

function FtweenAirPodOut() {
requestAnimationFrame(FtweenAirPodOut);
tweenAirPodOut.update();
}

function FtweenCapOpen() {
requestAnimationFrame(FtweenCapOpen);
tweenCapOpen.update();
};



function modelsAnimation() {
requestAnimationFrame(modelsAnimation);
//ROTATION
iPhone13.rotation.y -= 0.01;
iPhone13two.rotation.y += 0.01;
airPods.rotation.y -= 0.01;
airPodsMax.rotation.y += 0.01;
macBook.rotation.y -= 0.01;
macBookTwo.rotation.y += 0.01;

// IPHONES YYY SCROLL
if (camera.position.x == 0) {
iPhone13.position.x = - 2 + scrolled / -250;
iPhone13two.position.x = 2 + scrolled / 250;
if (iPhone13two.position.x >= 3.5) {
    iPhone13two.position.x = 3.5
    iPhone13.position.x = -3.5;
}
}

//AIRPODS YYY SCROLL
if (camera.position.x == -26) {
airPods.position.x = - 28 + scrolled / -250;
airPodsMax.position.x = -24 + scrolled / 250;

if (airPodsMax.position.x >= -23) {
    airPodsMax.position.x = -23
    airPods.position.x = -29
}
}

//MACS YYY SCROLL
if (camera.position.x == 26) {

macBook.position.x = 24 + scrolled / -250;
macBookTwo.position.x = 28 + scrolled / 250;

if (macBookTwo.position.x >= 29.5) {
    macBookTwo.position.x = 29.5;
    macBook.position.x = 22.5;
}
}
}
modelsAnimation()


// let ambLightNew = new THREE.AmbientLight(0xfcffd9, 2);
// scene.add(ambLightNew);



window.addEventListener('scroll', function () {
scrolled = window.scrollY;
scrollable = document.documentElement.scrollHeight - window.innerHeight;
})

//CAMERA SLIDER
goLeft.addEventListener('click', function () {
if (camera.position.x == 26) {
tweenRightToCenter.start();
cameraMoveRightToCenter();
}
if (camera.position.x == 0) {
tweenCenterToLeft.start();
cameraMoveCenterToLeft();
}
if (camera.position.x == -26) {
tweenFirstToVoid.start();
cameraFirstToVoid();
}
})

goRight.addEventListener('click', function () {
if (camera.position.x == 0) {
tweenCenterToRight.start();
cameraMoveCenterToRight();
}
if (camera.position.x == -26) {
tweenLeftToCenter.start();
cameraMoveLeftToCenter();
}
if (camera.position.x == 26) {
tweenLastToVoid.start();
cameraLastToVoid();
}
})

// function renderScene() {
//     requestAnimationFrame(renderScene);
//     renderer.render(scene, camera);
// }
// renderScene();

function animate() {
requestAnimationFrame(animate);
render();
}
animate()

function render() {
renderer.render(scene, camera);
}


//TWEEN TWEEN TWEEN 

var tweenLeftToCenter = new TWEEN.Tween(camera.position).to({ x: 0 }, 2000).easing(TWEEN.Easing.Circular.Out);
var tweenCenterToRight = new TWEEN.Tween(camera.position).to({ x: 26 }, 2000).easing(TWEEN.Easing.Circular.Out);

var tweenRightToCenter = new TWEEN.Tween(camera.position).to({ x: 0 }, 2000).easing(TWEEN.Easing.Circular.Out);
var tweenCenterToLeft = new TWEEN.Tween(camera.position).to({ x: -26 }, 2000).easing(TWEEN.Easing.Circular.Out);


var tweenLastToVoid = new TWEEN.Tween(camera.position).to({ x: 49.95 }, 700).easing(TWEEN.Easing.Circular.Out);
var tweenVoidToFirst = new TWEEN.Tween(camera.position).to({ x: -26 }, 700).easing(TWEEN.Easing.Circular.Out);

var tweenVoidToLast = new TWEEN.Tween(camera.position).to({ x: 26 }, 700).easing(TWEEN.Easing.Circular.Out);
var tweenFirstToVoid = new TWEEN.Tween(camera.position).to({ x: -50 }, 700).easing(TWEEN.Easing.Circular.Out);

function cameraVoidToLast() {
let rAF = requestAnimationFrame(cameraVoidToLast);
if (camera.position.x == -50) {
camera.position.x = 50
}
if (camera.position.x == 50) {
tweenVoidToLast.start();
}
cancelAnimationFrame(rAF);
tweenVoidToLast.update();
}

function cameraFirstToVoid() {
requestAnimationFrame(cameraFirstToVoid);
tweenFirstToVoid.update()
cameraVoidToLast();
}


function cameraVoidToFirst() {
let rAF = requestAnimationFrame(cameraVoidToFirst);
if (camera.position.x == 49.95) {
camera.position.x = -49.95
tweenVoidToFirst.start();
}
cancelAnimationFrame(rAF);
tweenVoidToFirst.update();
}


function cameraLastToVoid() {
requestAnimationFrame(cameraLastToVoid);
tweenLastToVoid.update();
cameraVoidToFirst();
}

function cameraMoveFirstToLast() {
requestAnimationFrame(cameraMoveFirstToLast);
tweenFirstToLast.update();
}

function cameraMoveLeftToCenter() {
requestAnimationFrame(cameraMoveLeftToCenter);
tweenLeftToCenter.update();
slideNumber()
}

function cameraMoveCenterToRight() {
requestAnimationFrame(cameraMoveCenterToRight);
tweenCenterToRight.update();
slideNumber()
}

function cameraMoveRightToCenter() {
requestAnimationFrame(cameraMoveRightToCenter);
tweenRightToCenter.update();
slideNumber()
}

function cameraMoveCenterToLeft() {
requestAnimationFrame(cameraMoveCenterToLeft);
tweenCenterToLeft.update();
slideNumber()
}

function cameraMoveLastToFirst() {
requestAnimationFrame(cameraMoveLastToFirst);
tweenLastToFirst.update();
}

function slideNumber() {
if (camera.position.x == -26) {
slide.textContent = ('Slide 1')
}
if (camera.position.x == 0) {
slide.textContent = ('Slide 2');
}
if (camera.position.x == 26) {
slide.textContent = ('Slide 3');
}
}
slideNumber();

let ambient = new THREE.AmbientLight(0xffffff, 0.2)
scene.add(ambient)



// const spotLightHelper1 = new THREE.SpotLightHelper( spotLight1 );
// scene.add( spotLightHelper1 );



// const spotLightHelper2 = new THREE.SpotLightHelper( spotLight2 );
// scene.add( spotLightHelper2 );


// const spotLightHelper3 = new THREE.SpotLightHelper( spotLight3 );
// scene.add( spotLightHelper3 );


})
})
})
})
})
})
