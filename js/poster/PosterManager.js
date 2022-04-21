import * as THREE from '../lib/threejs/three.module.js';
import { Poster } from './Poster.js';
import { posterParams } from './posterParam.js';

class PosterManager {

    constructor() {

        this.scene = new THREE.Object3D();

    }

    async loadPoster() {

        for (let i = 0; i < posterParams.length; i++) {
            let poster = new Poster(posterParams[i].position, posterParams[i].size, posterParams[i].rotation);
            poster.setImage(posterParams[i].src);
            this.scene.add(poster.mesh);
        }

    }

    clickIntersect(coords, camera) {

        let raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(coords, camera);
        const objs = raycaster.intersectObjects(this.scene.children, false);
        if (objs.length > 0) return objs[0].object.poster;
        else return null;

    }

}

export { PosterManager };