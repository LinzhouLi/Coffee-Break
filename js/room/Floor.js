import * as THREE from '../lib/threejs/three.module.js';
import { loadTexture } from '../loaders.js';

class Floor {

    constructor(position, number, size, interval, thickness) {
        
        this.position = position;
        this.number = number;
        this.size = size;
        this.interval = interval;
        this.thickness = thickness;

        this.totalSize = [
            this.number[0] * size[0] + (this.number[0] - 1) * interval,
            this.number[1] * size[1] + (this.number[1] - 1) * interval
        ];

        this.scene = new THREE.Object3D();
        this.net = new THREE.Object3D();
        this.interval;

        this.createNet();

    }

    createNet() {

        this.net.position.set(...this.position);

        const material = new THREE.MeshLambertMaterial({ color: new THREE.Color(1, 1, 1) });
        const geometry = new THREE.BoxGeometry(this.size[0], this.thickness, this.size[1]);
        let box = new THREE.Mesh(geometry, material);

        let xPos, zPos;
        const xStart = -this.totalSize[0] / 2;
        const zStart = -this.totalSize[2] / 2;

        for (let i = 0; i < this.number[0]; i++) {

            if (i == 0) xPos = xStart + this.size[0] / 2;
            else xPos += this.size[0] + this.interval[0];

            for (let j = 0; j < this.number[1]; j++) {

                if (j == 0) zPos = zStart + this.size[1] / 2;
                else zPos += this.size[1] + this.interval[1];

                let tempBox = box.clone();
                tempBox.position.set(xPos, 0, zPos);
                this.net.add(tempBox);

            }
        }

        this.scene.add(this.net);

    }

    createInterval() {

        const material = new THREE.MeshLambertMaterial({ color: new THREE.Color(1, 1, 1) });
        const geometry = new THREE.BoxGeometry(this.size[0], this.thickness, this.size[1]);
        this.interval = new THREE.Mesh(geometry, material);
        this.interval.position.set(...this.position);
        this.scene.add(this.interval);

    }

    setIntervalColor(color) {

        this.interval.material.color = new THREE.Color(...color);
        this.interval.material.needsUpdate = true;

    }

    async setNetTexture(texturePath) {

        texture = await loadTexture(texturePath);
        this.net.children.forEach( mesh => {
            mesh.material = new THREE.MeshLambertMaterial({ map: texture });
        });

    }

}

export { Floor };