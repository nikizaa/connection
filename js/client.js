import * as THREE from 'three'
// import Stats from './three/examples/jsm/libs/stats.module'
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';
// import { RectAreaLightHelper} from './three/examples/jsm/helpers/RectAreaLightHelper.js';
// import {RectAreaLightUniformsLib} from './three/examples/jsm/lights/RectAreaLightUniformsLib.js';
let renderer, scene, camera;
			let stats;

			init();

			function init() {

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.setAnimationLoop( animation );
				renderer.outputEncoding = THREE.sRGBEncoding;
				document.body.appendChild( renderer.domElement );

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.set( 0, 5, - 15 );

				scene = new THREE.Scene();

				RectAreaLightUniformsLib.init();

				const rectLight1 = new THREE.RectAreaLight( 0xff0000, 5, 4, 10 );
				rectLight1.position.set( - 5, 5, 5 );
				scene.add( rectLight1 );

				const rectLight2 = new THREE.RectAreaLight( 0x00ff00, 5, 4, 10 );
				rectLight2.position.set( 0, 5, 5 );
				scene.add( rectLight2 );

				const rectLight3 = new THREE.RectAreaLight( 0x0000ff, 5, 4, 10 );
				rectLight3.position.set( 5, 5, 5 );
				scene.add( rectLight3 );

				scene.add( new RectAreaLightHelper( rectLight1 ) );
				scene.add( new RectAreaLightHelper( rectLight2 ) );
				scene.add( new RectAreaLightHelper( rectLight3 ) );

				const geoFloor = new THREE.BoxGeometry( 2000, 0.1, 2000 );
				const matStdFloor = new THREE.MeshStandardMaterial( { color: 0x808080, roughness: 0.1, metalness: 0 } );
				const mshStdFloor = new THREE.Mesh( geoFloor, matStdFloor );
				scene.add( mshStdFloor );

				const geoKnot = new THREE.TorusKnotGeometry( 1.5, 0.5, 200, 16 );
				const matKnot = new THREE.MeshStandardMaterial( { color: 0xffffff, roughness: 0, metalness: 0 } );
				const meshKnot = new THREE.Mesh( geoKnot, matKnot );
				meshKnot.name = 'meshKnot';
				meshKnot.position.set( 0, 5, 0 );
				scene.add( meshKnot );

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.target.copy( meshKnot.position );
				controls.update();

				//

				window.addEventListener( 'resize', onWindowResize );

				stats = new Stats();
				document.body.appendChild( stats.dom );

			}

			function onWindowResize() {

				renderer.setSize( window.innerWidth, window.innerHeight );
				camera.aspect = ( window.innerWidth / window.innerHeight );
				camera.updateProjectionMatrix();

			}

			function animation( time ) {

				const mesh = scene.getObjectByName( 'meshKnot' );
				mesh.rotation.y = time / 1000;

				renderer.render( scene, camera );

				stats.update();

			}
