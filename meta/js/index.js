import * as THREE from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

let camera, scene, renderer;

init();
render();

function init() {
  const container = document.createElement("div");
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight,
    0.25, 20
  );
  camera.position.set(0, 2, 10);

  scene = new THREE.Scene();

  const groundTexture = new THREE.TextureLoader().load('./assets/texture/texture.jpeg');
  groundTexture.wrapS = THREE.RepeatWrapping;
  groundTexture.wrapT = THREE.RepeatWrapping;
  const material = new THREE.MeshLambertMaterial({map: groundTexture})
  
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), material);
  plane.overdraw = true;
  plane.position.set(0, .5, 0)
  plane.rotateX(- Math.PI / 2)
  plane.receiveShadow = true;
  scene.add(plane)

  const loader = new THREE.TextureLoader()
  loader.load('./assets/skybox/stars.jpg', function (texture) {
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearFilter
    
    scene.background = texture

    render();

    // tshirt #1 / Right
    const soldOutLoader = new FontLoader();

    soldOutLoader.load( './assets/fonts/helvetiker_regular.typeface.json', function ( font ) {
      const textGeo = new TextGeometry( 'SOLD OUT', {
        font: font,
        size: .2,
        height: .05,
      });
      
      const textMesh = new THREE.Mesh( textGeo, [
        new THREE.MeshPhongMaterial({ color: 0xC5283D }), // font
        new THREE.MeshPhongMaterial({ color: 0xC5283D }) // side
      ])
      
      textMesh.castShadow = true;
      textMesh.position.z = 0;
      textMesh.position.x = 4.3;
      textMesh.position.y = 1.2;
      scene.add( textMesh );
    });

    // tshirt #2 / Middle
    const loader2 = new GLTFLoader().setPath(
      ('./assets/shirts/')
    );
    loader2.load('tshirt.gltf', function (gltf) {

      const root = gltf.scene
      scene.add(root);

      root.updateMatrixWorld();
      root.position.set(0, 0, 0);

      render(); 
    })
    
    // tshirt #3 / Left
    const loader3 = new GLTFLoader().setPath(
      ('./assets/shirts/')
    );
    loader3.load('blackShirt.gltf', function (gltf) {
        
      const root = gltf.scene;
      scene.add(root);

      root.updateMatrixWorld();
      root.position.set(-5, 0, 0);

      render(); 
    })
      
    // Text Middle Tshirt 
    const fontLoader = new FontLoader();
    fontLoader.load( './assets/fonts/helvetiker_regular.typeface.json', function ( font ) {
      const textGeo = new TextGeometry( 'Color: White \nPrice: 29.99 $', {
        font: font,
        size: .1,
        height: .05,
      });
      
      const textMesh = new THREE.Mesh( textGeo, [
        new THREE.MeshPhongMaterial({ color: 0xffffff }), // font
        new THREE.MeshPhongMaterial({ color: 0xffffff }) // side
      ])
      
      textMesh.castShadow = true;
      textMesh.position.z = 0;
      textMesh.position.x = -0.4;
      textMesh.position.y = 2;
      scene.add( textMesh );
    });

    // Text Right Tshirt 
    const fontLoader2 = new FontLoader();

    fontLoader2.load( './assets/fonts/helvetiker_regular.typeface.json', function ( font ) {
      const textGeo = new TextGeometry( 'Color: Grey \nPrice: 29.99 $', {
        font: font,
        size: .1,
        height: .05,
      });
      
      const textMesh = new THREE.Mesh( textGeo, [
        new THREE.MeshPhongMaterial({ color: 0xffffff }), // font
        new THREE.MeshPhongMaterial({ color: 0xffffff }) // side
      ])
      
      textMesh.castShadow = true;
      textMesh.position.z = 0;
      textMesh.position.x = 4.6;
      textMesh.position.y = 2;
      scene.add( textMesh );
    });

    // Text Left Tshirt 
    const fontLoader3 = new FontLoader();

    fontLoader3.load( './assets/fonts/helvetiker_regular.typeface.json', function ( font ) {
      const textGeo = new TextGeometry( 'Color: Black \nPrice: 29.99 $', {
        font: font,
        size: .1,
        height: .05,
      });
      
      const textMesh = new THREE.Mesh( textGeo, [
        new THREE.MeshPhongMaterial({ color: 0xffffff }), // font
        new THREE.MeshPhongMaterial({ color: 0xffffff }) // side
      ])
      
      textMesh.castShadow = true;
      textMesh.position.z = 0;
      textMesh.position.x = -5.4;
      textMesh.position.y = 2;
      scene.add( textMesh );
    });
    // Light
    // Hemisphere Light
    {
      const skyColor = 0x999999;  
      const groundColor = 0xffffff;  
      const intensity = 1;
      const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
      light.power = 740;
      scene.add(light);

    } 
    // Directional Light
    {
      const color = 0xE7F8FF;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.castShadow = true;
      scene.add(light);
    }
    // Point Light
    {
      const pointLight = new THREE.PointLight( 0x101010, 1 );
      pointLight.position.set( 0, 5, -1 );
      pointLight.power = 700;
      scene.add(pointLight)
    }
    {
      const pointLight = new THREE.PointLight( 0x101010, 1 );
      pointLight.position.set( -6, 5, -1 );
      pointLight.power = 740;
      scene.add(pointLight)
    }
    {
      const pointLight = new THREE.PointLight( 0x101010, 1 );
      pointLight.position.set( 7, 5, -1 );
      pointLight.power = 740;
      scene.add(pointLight)
    }
  })

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
  renderer.physicallyCorrectLights = true;

  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", render);
  controls.minDistance = 2;
  controls.maxDistance = 10;
  controls.target.set(0, 0.5, -0.2);
  controls.update();

  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  render();
}

function render() {
  renderer.render(scene, camera);
}