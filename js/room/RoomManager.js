import * as THREE from '../lib/threejs/three.module.js';
import { loadGLB, loadTexture } from '../loaders.js';
import { Floor } from './Floor.js';
import { Image3D } from './Image3D.js';

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

        for (let i = 1; i < 12; i++) {
            let glb = await loadGLB(`assets/room/model/new${i}.gltf`);
            this.traverseGLB(glb);
            this.scene.add(glb.scene);
        }

    }

    async createObjects() {

        // 地板

        const floor = new Floor([11, 7], [3, 3], [0.11, 0.11], 0.01);
        floor.scene.position.set(0.3, 0, 1.3);
        floor.setBackgroundColor([0.4, 0.4, 0.4]);
        await floor.setNetTexture("assets/room/texture/marble.webp");
        this.scene.add(floor.scene);

        // 两面墙

        const wall1 = new Floor([3, 4], [2, 2], [0, 0], 0.01);
        wall1.scene.position.set(-16.7, 2, 2);
        wall1.scene.rotation.z = -Math.PI / 2;
        await wall1.setNetTexture("assets/room/texture/wood2.webp");
        this.scene.add(wall1.scene);

        const wall2 = new Floor([2, 3], [2, 2], [0, 0], 0.01);
        wall2.scene.position.set(17.7, 1.8, 6.3);
        wall2.scene.rotation.z = Math.PI / 2;
        await wall2.setNetTexture("assets/room/texture/wood2.webp");
        this.scene.add(wall2.scene);

        // 海报

        const logo1 = new Image3D([1.47, 1.46]);
        logo1.scene.position.set(-4.14, 1.82, 0.06);
        logo1.scene.rotation.y = -Math.PI / 2;
        await logo1.loadImage("assets/room/texture/Chinagraph_poster3.webp");
        this.scene.add(logo1.scene);

        const logo2 = new Image3D([0.8, 0.8]);
        logo2.scene.position.set(16.49, 2.06, -7.2);
        logo2.scene.rotation.y = -Math.PI / 2;
        await logo2.loadImage("assets/room/texture/Chinagraph_poster3.webp");
        this.scene.add(logo2.scene);

        const poster1 = new Image3D([3.96, 2.2]);
        poster1.scene.position.set(-8.915, 1.9, -9.27);
        await poster1.loadImage("assets/room/texture/Chinagraph_poster2.webp");
        this.scene.add(poster1.scene);

        const poster2 = new Image3D([2.35, 1.45]);
        poster2.scene.position.set(-3.7, 1.89, 0);
        poster2.scene.rotation.y = Math.PI / 2;
        await poster2.loadImage("assets/room/texture/Qinghai.webp");
        this.scene.add(poster2.scene);

        const poster3 = new Image3D([1.7, 1]);
        poster3.scene.position.set(13.39, 1.9, 8.91);
        poster3.scene.rotation.y = Math.PI;
        await poster3.loadImage("assets/room/texture/Chinagraph_poster.webp");
        this.scene.add(poster3.scene);

    }

    traverseGLB(glb) {

        glb.scene.traverse( node => {
            if (node instanceof THREE.Mesh) {
                node.receiveShadow = true; // shadow
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
