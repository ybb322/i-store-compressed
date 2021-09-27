import * as THREE from './build/three.module.js';

import {GLTFLoader} from './examples/jsm/loaders/GLTFLoader.js';
import {RGBELoader} from './examples/jsm/loaders/RGBELoader.js';
import {DRACOLoader} from './examples/jsm/loaders/DRACOLoader.js';
import {MeshoptDecoder} from './examples/jsm/libs/meshopt_decoder.module.js';
// import {OrbitControls} from './examples/jsm/controls/OrbitControls.js';

// SCENE, CAMERA, RENDERER
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 4000, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    antialias:true,
    alpha: true
});
const container = document.querySelector('body');
renderer.setSize(window.innerWidth, 4000 );
container.appendChild(renderer.domElement);

// const orbits = new OrbitControls(camera, renderer.domElement);

//LOADING MANAGER
const manager = new THREE.LoadingManager();

// RGBE LOADER
new RGBELoader()
.setPath('files/')
.load('moonless_golf_1k.hdr', function (texture){
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

//TWEEN LOADING SCREEN OPACITY
let loadingScreenOpacity = new TWEEN.Tween(loadingScreen.style).to({opacity:0},500).easing(TWEEN.Easing.Exponential.Out)
function loadingScreenFade () {
    requestAnimationFrame(loadingScreenFade);
    loadingScreenOpacity.update();
    if (loadingScreen.style.opacity == 0) {
        // goRight.style.zIndex = 8;
        // goLeft.style.zIndex = 8;
        loadingScreen.style.display = 'none';
    }
}
//LOADING MANAGER ONLOAD LISTENER
manager.onLoad = function () {
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

//DETECTOR BOXES MATERIAL
const material = new THREE.MeshStandardMaterial({ color: 0xf45544, transparent: true });

// let iPhoneNew
//     loaderGLTF.load('./files/iphone_xs/scene.gltf', function (gltf) {
//         iPhoneNew = gltf.scene;
//         scene.add(iPhoneNew);
//         iPhoneNew.scale.set (0.5,0.5,0.5)
//         iPhoneNew.position.y = -2;
//         iPhoneNew.traverse(function(child){
//             if (child.isMesh) {
//                 child.material.metalness = 1;
//             }
//         })
//     })


let iMac;
    loaderGLTF.load('./files/macbook_old/scene_pack.glb', function (gltf){
    iMac = gltf.scene;
    scene.add(iMac);
    iMac.position.x = 28;
    iMac.position.y = -0.2;
    iMac.scale.set (7,7,7)
    iMac.rotation.x = 0.8;
    // iMac.rotation.y = Math.PI
    const iMacGeo = new THREE.BoxGeometry (2,1.9,1.5);
    const iMacBox = new THREE.Mesh(iMacGeo, material);
    // scene.add(iMacBox);
    iMacBox.position.x = iMac.position.x;
    iMacBox.position.z = iMac.position.z;
    iMacBox.position.y = iMac.position.y + 1;
    iMacBox.rotation.x = iMac.rotation.x;
    console.log (iMac)

let macBook;
    loaderGLTF.load('./files/macbook_old/scene_pack.glb', function (gltf){
    macBook = gltf.scene;
    scene.add(macBook);
    macBook.position.x = 24;
    macBook.scale.set(6,6,6);
    macBook.rotation.x = 0.8;
    macBook.position.y = 0;
    //MACBOOK DETECTOR BOX
    const macBookGeo = new THREE.BoxGeometry(1.8, 1.8, 2.3);
    const macBookBox = new THREE.Mesh(macBookGeo, material);
    // scene.add(macBookBox)
    macBookBox.position.x = macBook.position.x;
    macBookBox.rotation.x = macBook.rotation.x;
    macBookBox.position.y = macBook.position.y + 0.5;

let airPodsMax;
    loaderGLTF.load('./files/airpods_max/scene_draco.glb', function (gltf) {
    airPodsMax = gltf.scene;
    scene.add(airPodsMax);
    airPodsMax.position.x = -24;
    airPodsMax.position.y = -0.5;
    airPodsMax.rotation.x = 0.5;
    airPodsMax.scale.set (12,12,12)

let iPhone13
    loaderGLTF.load( './files/iphone_13/scene.glb', function ( gltf ) {
    iPhone13 = gltf.scene;
	scene.add( gltf.scene );
    iPhone13.scale.set(2.8,2.8,2.8)
    iPhone13.position.x = -2;
    iPhone13.rotation.x = 0.5;
    iPhone13.rotation.y = Math.PI;
    scene.add( iPhone13 );


let iPhone13two;
    loaderGLTF.load( './files/iphone_13/scene_nice.glb', function ( gltf ) {
    iPhone13two = gltf.scene;
	scene.add( iPhone13two );
    iPhone13two.scale.set(3.1,3.1,3.1)
    iPhone13two.position.x = 2;
    iPhone13two.rotation.x = 0.5;
    iPhone13two.rotation.y = Math.PI;

    iPhone13two.traverse(function(child){
        if (child.isMesh) {
        }
    })

let airPods;
    loaderGLTF.load( './files/airpods/source/airpodblendswap.glb', function ( gltf ) {
    airPods = gltf.scene;
    scene.add( airPods );
    airPods.scale.set (0.2, 0.2, 0.2)
    airPods.position.x = -28;
    airPods.rotation.x = 1;
    airPods.position.y = -0.5;
    // airPods.rotation.y = Math.PI / 2 ;
    airPods.children[0].position.y = -3.7;
    airPods.children[1].position.y = 3.6500000000000004;
    airPods.children[4].rotation.x = 0;
    
    
    //AIRPODS TRAVERSE
    airPods.traverse(function(child){
        airPods.castShadow = true;
        airPods.recieveShadow = true;
        if (child.isMesh) {
            child.castShadow = true;
            child.recieveShadow= true;
            child.material.castShadow = true;
            child.material.recieveShadow = true;
        }
    })

    //AIRPODS LIGHT
    const spotLight1 = new THREE.SpotLight( 0xffdfb8, 0.7 );
    spotLight1.position.set( -26, 5, 15 );
    spotLight1.angle = 0.80;
    spotLight1.penumbra = 0.8;
    scene.add( spotLight1 );
    spotLight1.target.position.set (-26,0,0);
    scene.add(spotLight1.target)


    //IPHONES LIGHT
    const spotLight2= new THREE.SpotLight( 0xffdfb8, 2 );

    spotLight2.angle = 0.6;
    scene.add( spotLight2 );
    spotLight2.target.position.set (0,8,0);
    scene.add(spotLight2.target)
    spotLight2.penumbra = 0.8;

    spotLight2.position.z = 25;
    spotLight2.angle = 0.8 + scrolled / 5000
    spotLight2.intensity = 2 - scrolled / 3000
    
    //MACBOOKS LIGHT
    const spotLight3= new THREE.SpotLight( 0xffdfb8, 7 );
    spotLight3.position.set( 26, 5, 15 );
    spotLight3.angle = 0.75;
    scene.add( spotLight3 );
    spotLight3.penumbra = 0.8;
    spotLight3.target.position.set (26,0,0);
    scene.add(spotLight3.target)

        
    // MOUSEMOVE EVENT

    //AIRPODS HOVER
    domEvents.addEventListener(airPods,'click', function () {
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
            FtweenAirPodSecOut ();
        }
        //залетают оба, закрывается крышка
        if (airPods.children[4].rotation.x == -2 && airPods.children[0].position.y == 1 && airPods.children[1].position.y == 8) {
            tweenAirPodBack.start();
            tweenAirPodSecBack.start();
            tweenCapClose.start();
            FtweenBothAirpodsBack();
        }
    })

    //TWEEN AIRPODS PARTS
    let tweenCapOpen = new TWEEN.Tween(airPods.children[4].rotation).to({x:-2},1000).easing(TWEEN.Easing.Exponential.Out)
    let tweenAirPodOut = new TWEEN.Tween(airPods.children[0].position).to({y:1},1000).easing(TWEEN.Easing.Exponential.Out)
    let tweenAirPodSecOut = new TWEEN.Tween(airPods.children[1].position).to({y:8},1000).easing(TWEEN.Easing.Exponential.Out)
    let tweenAirPodBack = new TWEEN.Tween (airPods.children[0].position).to({y:airPods.children[0].position.y},1000).easing(TWEEN.Easing.Exponential.Out)
    let tweenAirPodSecBack = new TWEEN.Tween (airPods.children[1].position).to({y:3.65},1000).easing(TWEEN.Easing.Exponential.Out)
    let tweenCapClose = new TWEEN.Tween(airPods.children[4].rotation).to({x:0},1000).easing(TWEEN.Easing.Exponential.Out).delay(500)

    function FtweenBothAirpodsBack () {
        requestAnimationFrame(FtweenBothAirpodsBack);
        tweenAirPodBack.update();
        tweenAirPodSecBack.update();
        tweenCapClose.update();
    }
    
    function FtweenAirPodSecOut () {
        requestAnimationFrame (FtweenAirPodSecOut);
        tweenAirPodSecOut.update();
    }
    
    function FtweenAirPodOut () {
        requestAnimationFrame(FtweenAirPodOut);
        tweenAirPodOut.update();
    }
    
    function FtweenCapOpen() {
        requestAnimationFrame(FtweenCapOpen);
        tweenCapOpen.update();
    };

    //AIRPODS-MAX DETECTOR BOX
    const airPodsMaxGeo = new THREE.BoxGeometry(2.5, 2.7, 1.4);
    const airPodsMaxBox = new THREE.Mesh(airPodsMaxGeo, material);
    // scene.add(airPodsMaxBox);
    airPodsMaxBox.material.opacity = 0;
    airPodsMaxBox.position.x = airPodsMax.position.x;
    airPodsMaxBox.position.y = airPodsMax.position.y + 0.6;

    //AIRPODS DETECTOR BOX
    const airPodsGeo = new THREE.BoxGeometry(1.2, 1.2, 0.7);
    const airPodsBox = new THREE.Mesh(airPodsGeo, material);
    scene.add(airPodsBox);
    airPodsBox.position.x = airPods.position.x;
    airPodsBox.position.y = airPods.position.y+ 0.6;
    airPodsBox.rotation.x = airPods.rotation.x;
    //DETECTOR BOXES ROTATION
    function BoxRotation () {
        requestAnimationFrame (BoxRotation);
        iMacBox.rotation.y += 0.01;
        airPodsBox.rotation.y -= 0.01;
        airPodsMaxBox.rotation.y += 0.01;
        macBookBox.rotation.y -= 0.01;
    }
    BoxRotation ()
    
    //TWEEN IMAC SIZE 
    let tweeniMacBigger = new TWEEN.Tween(iMac.scale).to({x:4,y:4,z:4},250).easing(TWEEN.Easing.Exponential.Out);
    let tweeniMacSmaller = new TWEEN.Tween(iMac.scale).to({x:3,y:3,z:3},250).easing(TWEEN.Easing.Exponential.Out)

    function FtweeniMacSmaller () {
        requestAnimationFrame(FtweeniMacSmaller);
        tweeniMacSmaller.update();
    }

    function FtweeniMacBigger () {
        requestAnimationFrame(FtweeniMacBigger);
        tweeniMacBigger.update();
    }

    //IMAC BOX LISTENERS
    domEvents.addEventListener(iMacBox,'mouseover',function () {
        tweeniMacBigger.start();
        FtweeniMacBigger();
        iMacBox.scale.set(1.2,1.4,1.2)
    })

    domEvents.addEventListener(iMacBox,'mouseout',function () {
        tweeniMacSmaller.start();
        FtweeniMacSmaller();
        iMacBox.scale.set(1,1,1)
    })


    //BOX.AIRPODS-MAX.LISTENERS
    domEvents.addEventListener(airPodsMaxBox,'mouseover',function () {
        tweenAirPodsMaxBigger.start();
        FtweenAirPodsMaxBigger();
        airPodsMaxBox.scale.set(1.4,1.4,1.4)
    })

    domEvents.addEventListener(airPodsMaxBox,'mouseout',function () {
        tweenAirPodsMaxSmaller.start();
        FtweenAirPodsMaxSmaller();
        airPodsMaxBox.scale.set(1,1,1)
    })
    //TWEEN AIRPODS-MAX SIZE
    let tweenAirPodsMaxBigger = new TWEEN.Tween(airPodsMax.scale).to({x:15,y:15,z:15},250).easing(TWEEN.Easing.Exponential.Out);
    let tweenAirPodsMaxSmaller = new TWEEN.Tween(airPodsMax.scale).to({x:12,y:12,z:12},250).easing(TWEEN.Easing.Exponential.Out)

    function FtweenAirPodsMaxSmaller () {
        requestAnimationFrame(FtweenAirPodsMaxSmaller);
        tweenAirPodsMaxSmaller.update();
    }

    function FtweenAirPodsMaxBigger () {
        requestAnimationFrame(FtweenAirPodsMaxBigger);
        tweenAirPodsMaxBigger.update();
    }


    //BOX.AIRPODS.LISTENERS
    domEvents.addEventListener(airPodsBox,'mouseover',function () {
        tweenAirPodsBigger.start();
        FtweenAirPodsBigger();
        airPodsBox.scale.set(1.4,1.4,1.4)
    })

    domEvents.addEventListener(airPodsBox,'mouseout',function () {
        tweenAirPodsSmaller.start();
        FtweenAirPodsSmaller();
        airPodsBox.scale.set(1,1,1)
    })

    

    //TWEEN AIRPODS SIZE
    let tweenAirPodsBigger = new TWEEN.Tween(airPods.scale).to({x:0.3,y:0.3,z:0.3},250).easing(TWEEN.Easing.Exponential.Out);
    let tweenAirPodsSmaller = new TWEEN.Tween(airPods.scale).to({x:0.2,y:0.2,z:0.2},250).easing(TWEEN.Easing.Exponential.Out)

    function FtweenAirPodsSmaller () {
        requestAnimationFrame(FtweenAirPodsSmaller);
        tweenAirPodsSmaller.update();
    }

    function FtweenAirPodsBigger () {
        requestAnimationFrame(FtweenAirPodsBigger);
        tweenAirPodsBigger.update();
    }
    
    //TWEEN MACBOOK SIZE 
    let tweenMacBookBigger = new TWEEN.Tween(macBook.scale).to({x:8,y:8,z:8},250).easing(TWEEN.Easing.Exponential.Out);
    let tweenMacBookSmaller = new TWEEN.Tween(macBook.scale).to({x:6,y:6,z:6},250).easing(TWEEN.Easing.Exponential.Out)

    function FtweenMacBookSmaller () {
        requestAnimationFrame(FtweenMacBookSmaller);
        tweenMacBookSmaller.update();
    }

    function FtweenMacBookBigger () {
        requestAnimationFrame(FtweenMacBookBigger);
        tweenMacBookBigger.update();
    }

    //MACBOOK BOX LISTENERS
    domEvents.addEventListener(macBookBox,'mouseover',function () {
        tweenMacBookBigger.start();
        FtweenMacBookBigger();
        macBookBox.scale.set(1.2,1.2,1.2)
    })

    domEvents.addEventListener(macBookBox,'mouseout',function () {
        tweenMacBookSmaller.start();
        FtweenMacBookSmaller();
        macBookBox.scale.set(1,1,1)
    })

    scene.position.y = 10;
    camera.position.x = 26;
    camera.position.z = 17;
    
    camera.rotation.x = 0;

    function modelsAnimation () {
        requestAnimationFrame(modelsAnimation);
        //ROTATION
        iPhone13.rotation.y -= 0.01;
        iPhone13two.rotation.y += 0.01;
        airPods.rotation.y -= 0.01;
        airPodsMax.rotation.y += 0.01;
        macBook.rotation.y -= 0.01;
        iMac.rotation.y += 0.01;

        // IPHONES YYY SCROLL
        if (camera.position.x == 0) {
        iPhone13.position.y = scrolled / -105;
        iPhone13two.position.y = scrolled / -105;
        iPhone13.position.x = - 2 + scrolled / -250;
        iPhone13two.position.x = 2 + scrolled / 250;
        iPhone13.rotation.x = 0.5 - scrolled / 5000;
        iPhone13two.rotation.x = 0.5 - scrolled / 5000;
        camera.position.y = scrolled / -320;
        if (iPhone13two.position.x >= 3.5) {
            iPhone13two.position.x = 3.5
            iPhone13.position.x = -3.5;
        }
        spotLight2.position.z = 25;
        spotLight2.position.y = iPhone13.position.y;
        spotLight2.angle = 0.8 + scrolled / 5000
        spotLight2.intensity = 2 - scrolled / 3000

        }

        //AIRPODS YYY SCROLL
        if (camera.position.x == -26) {
        airPodsBox.rotation.x = airPods.rotation.x
        airPodsBox.position.x = airPods.position.x;
        airPodsBox.position.y = airPods.position.y + 0.6;
        airPodsBox.position.z = airPods.position.z;

        airPodsMaxBox.rotation.x = airPodsMax.rotation.x;
        airPodsMaxBox.position.x = airPodsMax.position.x;
        airPodsMaxBox.position.y = airPodsMax.position.y + 0.6;
        airPodsMaxBox.position.z = airPodsMax.position.z;

        camera.position.y = scrolled / -320;

        airPods.position.y = -0.5 + scrolled / -105;
        airPodsMax.position.y = -0.5 + scrolled / -105;

        airPods.position.x = - 28 + scrolled / -250;
        airPodsMax.position.x = -24 + scrolled / 250;
        
        airPods.rotation.x = 1 - scrolled / 2000;
        airPodsMax.rotation.x = 0.5 - scrolled / 2000;

        if (airPodsMax.position.x >= -23) {
            airPodsMax.position.x = -23
            airPods.position.x = -30
        }
        }

        //MACS YYY SCROLL
        if (camera.position.x == 26) {
        macBookBox.rotation.x = macBook.rotation.x;
        macBookBox.position.x = macBook.position.x;
        macBookBox.position.y = macBook.position.y + 0.5;

        iMacBox.rotation.x = iMac.rotation.x;
        iMacBox.position.x = iMac.position.x;
        iMacBox.position.y = iMac.position.y + 1;
        
        camera.position.y = scrolled / -320;

        macBook.position.y = 0 + scrolled / -105;
        iMac.position.y = -0.2 + scrolled / -105;

        macBook.position.x = 24 + scrolled / -250;
        iMac.position.x = 28 + scrolled / 250;

        if (iMac.position.x >= 29.5) {
            iMac.position.x = 29.5;
            macBook.position.x = 22.5;
        }
        
        macBook.rotation.x = 0.8 - scrolled / 2000;
        iMac.rotation.x = 0.8 - scrolled / 2000; 
        }
    }
    modelsAnimation ()


// let ambLightNew = new THREE.AmbientLight(0xfcffd9, 2);
// scene.add(ambLightNew);



window.addEventListener ('scroll', function (){
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
    requestAnimationFrame( animate );
    render();
}
animate()

  function render() {
      renderer.render( scene, camera );
}


//TWEEN TWEEN TWEEN 

var tweenLeftToCenter = new TWEEN.Tween(camera.position).to({x:0},2000).easing(TWEEN.Easing.Circular.Out);
var tweenCenterToRight = new TWEEN.Tween(camera.position).to({x:26},2000).easing(TWEEN.Easing.Circular.Out);

var tweenRightToCenter = new TWEEN.Tween(camera.position).to({x:0},2000).easing(TWEEN.Easing.Circular.Out);
var tweenCenterToLeft = new TWEEN.Tween(camera.position).to({x:-26},2000).easing(TWEEN.Easing.Circular.Out);


var tweenLastToVoid = new TWEEN.Tween(camera.position).to({x:49.95},700).easing(TWEEN.Easing.Circular.Out);
var tweenVoidToFirst = new TWEEN.Tween(camera.position).to({x:-26},700).easing(TWEEN.Easing.Circular.Out);

var tweenVoidToLast = new TWEEN.Tween(camera.position).to({x:26},700).easing(TWEEN.Easing.Circular.Out);
var tweenFirstToVoid = new TWEEN.Tween(camera.position).to({x:-50},700).easing(TWEEN.Easing.Circular.Out);

function cameraVoidToLast () {
    let rAF = requestAnimationFrame (cameraVoidToLast);
    if (camera.position.x == -50) {
        camera.position.x = 50
    }
    if (camera.position.x == 50) {
        tweenVoidToLast.start();
    }
    cancelAnimationFrame(rAF);
    tweenVoidToLast.update();
}

function cameraFirstToVoid () {
    requestAnimationFrame (cameraFirstToVoid);
    tweenFirstToVoid.update ()
    cameraVoidToLast();
}


function cameraVoidToFirst () {
    let rAF = requestAnimationFrame (cameraVoidToFirst);
    if (camera.position.x == 49.95) {
        camera.position.x = -49.95
        tweenVoidToFirst.start();
    }
    cancelAnimationFrame(rAF);
    tweenVoidToFirst.update();
}


function cameraLastToVoid () {
    requestAnimationFrame (cameraLastToVoid);
    tweenLastToVoid.update();
    cameraVoidToFirst();
}

function cameraMoveFirstToLast () {
    requestAnimationFrame (cameraMoveFirstToLast);
    tweenFirstToLast.update();
}

function cameraMoveLeftToCenter () {
    requestAnimationFrame(cameraMoveLeftToCenter);
    tweenLeftToCenter.update();
    slideNumber() 
}

function cameraMoveCenterToRight() {
    requestAnimationFrame(cameraMoveCenterToRight);
    tweenCenterToRight.update();
    slideNumber() 
}

function cameraMoveRightToCenter () {
    requestAnimationFrame(cameraMoveRightToCenter);
    tweenRightToCenter.update();
    slideNumber() 
}

function cameraMoveCenterToLeft() {
    requestAnimationFrame(cameraMoveCenterToLeft);
    tweenCenterToLeft.update();
    slideNumber() 
}

function cameraMoveLastToFirst () {
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

let ambient = new THREE.AmbientLight (0xffffff, 0.2)
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
