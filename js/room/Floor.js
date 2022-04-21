import * as THREE from '../lib/threejs/three.module.js';
import { loadTexture } from '../loaders.js';

class Floor {

    constructor(number, size, interval, thickness) {
        
        this.number = number;
        this.size = size;
        this.interval = interval;
        this.thickness = thickness;

        this.totalSize = [
            this.number[0] * size[0] + (this.number[0] - 1) * interval[0],
            this.number[1] * size[1] + (this.number[1] - 1) * interval[1]
        ];

        this.scene = new THREE.Object3D();
        this.net = new THREE.Object3D();
        this.background;

        this.createNet();
        this.createBackground();

    }

    createNet() {

        const material = new THREE.MeshLambertMaterial({ color: new THREE.Color(1, 1, 1) });
        const geometry = new THREE.BoxGeometry(this.size[0], this.thickness, this.size[1]);
        let box = new THREE.Mesh(geometry, material);

        let xPos, zPos;
        const xStart = -this.totalSize[0] / 2;
        const zStart = -this.totalSize[1] / 2;

        for (let i = 0; i < this.number[0]; i++) {

            if (i == 0) xPos = xStart + this.size[0] / 2;
            else xPos += this.size[0] + this.interval[0];

            for (let j = 0; j < this.number[1]; j++) {

                if (j == 0) zPos = zStart + this.size[1] / 2;
                else zPos += this.size[1] + this.interval[1];

                let tempBox = box.clone();
                tempBox.receiveShadow = true; // shadow
                tempBox.position.set(xPos, 0, zPos);
                this.net.add(tempBox);

            }
        }

        this.scene.add(this.net);

    }

    createBackground() {

        const material = new THREE.MeshLambertMaterial({ color: new THREE.Color(1, 1, 1) });
        const geometry = new THREE.BoxGeometry(this.totalSize[0], this.thickness, this.totalSize[1]);
        this.background = new THREE.Mesh(geometry, material);
        // this.background.receiveShadow = true; // shadow
        this.background.position.set(0, -this.thickness / 5, 0);
        this.scene.add(this.background);

    }

    setBackgroundColor(color) {

        this.background.material.color = new THREE.Color(...color);
        this.background.material.needsUpdate = true;

    }

    async setNetTexture(texturePath) {

        const texture = await loadTexture(texturePath);
        this.net.children.forEach( mesh => {
            mesh.material = new THREE.MeshLambertMaterial({ map: texture });
        });

    }

}

export { Floor };