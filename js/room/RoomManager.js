import * as THREE from '../lib/threejs/three.module.js';
import { loadGLB } from '../loaders.js';

class RoomManager {

    constructor() {

        this.scene = new THREE.Object3D();

    }

    async loadFirstResource() {

        let glb = await loadGLB("assets/room/model/room.glb");
        this.traverseGLB(glb);
        this.scene.add(glb.scene);

    }

    async loadOtherResource() {

        for (let i = 0; i < 12; i++) {
            let glb = await loadGLB(`assets/room/model/new${i}.gltf`);
            this.traverseGLB(glb);
            this.scene.add(glb.scene);
        }

    }

    traverseGLB(glb) {

        glb.scene.traverse( node => {
            if (node instanceof THREE.Mesh) {
                if (node.material.map) {
                    node.material.map.wrapS = THREE.RepeatWrapping;
                    node.material.map.wrapT = THREE.RepeatWrapping;
                    node.material.map.needsUpdate = true;
                }
                if (node.material.normalMap) {
                    node.material.normalMap.wrapS = THREE.RepeatWrapping;
                    node.material.normalMap.wrapT = THREE.RepeatWrapping;
                    node.material.normalMap.needsUpdate = true;
                }
            }
        });

    }

}

export { RoomManager };
