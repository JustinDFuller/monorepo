import * as THREE from 'three';
import Detector from './Detector';
import './index.css';

function start() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    console.log(renderer.domElement);
    document.body.appendChild(renderer.domElement);
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        // cube.rotation.x += 0.1;
        cube.rotation.y += 0.1;
        renderer.render(scene, camera);
    }

    if (Detector.webgl) {
        // Initiate function or other initializations here
        animate();
    } else {
        var warning = Detector.getWebGLErrorMessage();
        document.getElementById('container').appendChild(warning);
    }
}

start();

export default start;