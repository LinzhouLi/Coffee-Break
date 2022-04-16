import * as THREE from '../lib/threejs/three.module.js';
import { loadTexture } from '../loaders.js';

class Poster {

    constructor(position, size, rotation) {

        this.position = position;
        this.size = size;
        this.rotation = rotation;

        const geometry = new THREE.BoxGeometry(...this.size);
        const material = new THREE.MeshLambertMaterial({ color: new THREE.Color(1, 1, 1) });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(...this.position);
        this.mesh.rotation.set(...this.rotation, "ZXY");
        this.mesh.poster = this;

    }

    async setImage(imagePath) {

        this.imagePath = imagePath;
        const texture = await loadTexture(imagePath);
        this.mesh.material = new THREE.MeshLambertMaterial({ map: texture });

    }

}

export { Poster };