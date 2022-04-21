import * as THREE from '../lib/threejs/three.module.js';
import { loadGLB, loadTexture } from '../loaders.js';
// import * as SkeletonUtils from '../lib/threejs/SkeletonUtils.js';

class Avatar {

    constructor(position, rotation, modelPath, texturePath, hairTexturePath) {

        this.position = position;
        this.rotation = rotation;
        this.modelPath = modelPath;
        this.texturePath = texturePath;
        this.hairTexturePath = hairTexturePath;
        this.hasHair = hairTexturePath ? true : false;

        this.model;

        this.pace = 9.45; // 步行速度
        this.turnSpeed = Math.PI / 30;
        this.destinationIndex = 0;

    }

    async init() {

        // 模型
        const glb = await loadGLB(this.modelPath);
        this.model = glb.scene;
        this.model.position.set(...this.position);
        this.model.rotation.set(...this.rotation);

        // 材质
        const texture = await loadTexture(this.texturePath);
        texture.flipY = false;

        if (!this.hasHair) {
            this.model.children[1].castShadow = true; // shadow

            this.model.children[1].material = new THREE.MeshStandardMaterial({ // 人体
                map: texture,
                roughness: 0.450053632
            });
        }
        else {
            this.model.children[1].children[0].castShadow = true; // shadow
            this.model.children[1].children[1].castShadow = true; // shadow

            this.model.children[1].children[0].material = new THREE.MeshStandardMaterial({ // 人体
                map: texture,
                roughness: 0.450053632
            });
            const hairTexture = await loadTexture(this.hairTexturePath);
            hairTexture.flipY = false;
            this.model.children[1].children[1].material = new THREE.MeshStandardMaterial({ // 头发
                map: hairTexture,
                roughness: 0.450053632,
                transparent: true
            });
        }

    }

    walkTo(destination, deltaTime) {

        let startPos = this.model.position.clone();
        // const startRot = this.model.rotation.y;
        let endPos = new THREE.Vector3(...destination);
        let direction = new THREE.Vector3().addVectors(endPos, startPos.clone().negate());
        let endRot = Math.atan2(direction.x, direction.z);

        this.model.rotation.set(0, endRot, 0);

        const len =  this.pace * deltaTime;
        if (direction.length() < len) { // 到达目标点
            this.model.position.copy(endPos);
            return true;
        }
        else {
            startPos.addScaledVector(direction.normalize(), len);
            this.model.position.copy(startPos);
            return false;
        }

    }

}

export { Avatar };