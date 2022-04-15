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
        await floor.setNetTexture("assets/room/texture/marble.jpg");
        this.scene.add(floor.scene);

        // 两面墙

        const wall1 = new Floor([3, 4], [2, 2], [0, 0], 0.01);
        wall1.scene.position.set(-16.7, 2, 2);
        wall1.scene.rotation.z = -Math.PI / 2;
        await wall1.setNetTexture("assets/room/texture/wood2.jpg");
        this.scene.add(wall1.scene);

        const wall2 = new Floor([2, 3], [2, 2], [0, 0], 0.01);
        wall2.scene.position.set(17.7, 1.8, 6.3);
        wall2.scene.rotation.z = Math.PI / 2;
        await wall2.setNetTexture("assets/room/texture/wood2.jpg");
        this.scene.add(wall2.scene);

        // 海报

        const logo1 = new Image3D([1.47, 1.46]);
        logo1.scene.position.set(-4.14, 1.82, 0.06);
        logo1.scene.rotation.y = -Math.PI / 2;
        await logo1.loadImage("assets/room/texture/CASA_poster3.jpg");
        this.scene.add(logo1.scene);

        const logo2 = new Image3D([0.8, 0.8]);
        logo2.scene.position.set(16.49, 2.06, -7.2);
        logo2.scene.rotation.y = -Math.PI / 2;
        await logo2.loadImage("assets/room/texture/CASA_poster3.jpg");
        this.scene.add(logo2.scene);

        const poster1 = new Image3D([3.96, 2.2]);
        poster1.scene.position.set(-8.915, 1.9, -9.27);
        await poster1.loadImage("assets/room/texture/CASA_poster2.png");
        this.scene.add(poster1.scene);

        const poster2 = new Image3D([2.35, 1.45]);
        poster2.scene.position.set(-3.7, 1.89, 0);
        poster2.scene.rotation.y = Math.PI / 2;
        await poster2.loadImage("assets/room/texture/Nanjing.jpg");
        this.scene.add(poster2.scene);

        const poster3 = new Image3D([1.7, 1]);
        poster3.scene.position.set(13.39, 1.9, 8.91);
        poster3.scene.rotation.y = Math.PI;
        await poster3.loadImage("assets/room/texture/CASA_poster.jpg");
        this.scene.add(poster3.scene);

        // 展厅中央柱子

        const img1 = new Image3D([0.9979, 0.7051]);
        img1.scene.position.set(5.7235, 2.8786, -1.5859);
        img1.scene.rotation.set(-0.4392, Math.PI, 0, "ZXY");
        await img1.loadImage("assets/room/texture/1.jpg");
        this.scene.add(img1.scene);

        const img2 = new Image3D([0.9832, 0.6995]);
        img2.scene.position.set(5.7235, 1.5645, -1.0816);
        img2.scene.rotation.set(-0.2427, Math.PI, 0, "ZXY");
        await img2.loadImage("assets/room/texture/2.jpg");
        this.scene.add(img2.scene);

        const img3 = new Image3D([0.9979, 0.6853]);
        img3.scene.position.set(7.2455, 2.8703, -0.0182);
        img3.scene.rotation.set(0, Math.PI / 2, -0.4369, "ZXY");
        await img3.loadImage("assets/room/texture/3.jpg");
        this.scene.add(img3.scene);

        const img4 = new Image3D([0.9832, 0.7037]);
        img4.scene.position.set(6.7180, 1.5717, -0.0182);
        img4.scene.rotation.set(0, Math.PI / 2, -0.2580, "ZXY");
        await img4.loadImage("assets/room/texture/4.jpg");
        this.scene.add(img4.scene);

        const img5 = new Image3D([1.0151, 0.7841]);
        img5.scene.position.set(5.6751, 2.8753, 1.4996);
        img5.scene.rotation.set(0.4288, 0, 0, "ZXY");
        await img5.loadImage("assets/room/texture/5.jpg");
        this.scene.add(img5.scene);

        const img6 = new Image3D([0.9832, 0.7037]);
        img6.scene.position.set(5.6751, 1.5512, 0.9820);
        img6.scene.rotation.set(0.2602, 0, 0, "ZXY");
        await img6.loadImage("assets/room/texture/6.jpg");
        this.scene.add(img6.scene);

        const img7 = new Image3D([0.9832, 0.6893]);
        img7.scene.position.set(4.1594, 2.8774, -0.0583);
        img7.scene.rotation.set(0, -Math.PI / 2, 0.4318, "ZXY");
        await img7.loadImage("assets/room/texture/7.jpg");
        this.scene.add(img7.scene);

        const img8 = new Image3D([0.9832, 0.7037]);
        img8.scene.position.set(4.6866, 1.5703, -0.0583);
        img8.scene.rotation.set(0, -Math.PI / 2, 0.2513, "ZXY");
        await img8.loadImage("assets/room/texture/8.jpg");
        this.scene.add(img8.scene);

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
