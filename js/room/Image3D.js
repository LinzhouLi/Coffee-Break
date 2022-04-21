import * as THREE from '../lib/threejs/three.module.js';
import { loadTexture } from '../loaders.js';

class Image3D {

    constructor(size) {

        this.size = size;
        this.scene = new THREE.Object3D();

    }

    async loadImage(imagePath, flipY = true) {

        const texture = await loadTexture(imagePath);
        texture.flipY = flipY;
        const material = new THREE.MeshPhongMaterial({
            map: texture,
            transparent: true
        });
        const geometry = new THREE.PlaneGeometry(...this.size);
        const mesh = new THREE.Mesh(geometry, material);
        this.scene.add(mesh);

    }

}

export { Image3D };