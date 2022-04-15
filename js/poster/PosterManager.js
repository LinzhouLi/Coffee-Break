import * as THREE from '../lib/threejs/three.module.js';
import { Poster } from './Poster.js';
import { posterParams } from './posterParam.js';

class PosterManager {

    constructor() {

        this.posters = []
        this.scene = new THREE.Object3D();

    }

    async loadPoster() {

        for (let i = 0; i < posterParams.length; i++) {
            let poster = new Poster(posterParams[i].position, posterParams[i].size, posterParams[i].rotation);
            poster.setImage(posterParams[i].src);
            this.posters.push(poster);
            this.scene.add(poster.mesh);
        }

    }

}

export { PosterManager };