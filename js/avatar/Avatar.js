import * as THREE from '../lib/threejs/three.module.js';
import { loadGLB, loadTexture } from '../loaders.js';
import * as SkeletonUtils from '../lib/threejs/SkeletonUtils.js';

class Avatar {

    constructor(position, rotation, modelPath, texturePath, hairTexturePath) {

        this.position = position;
        this.rotation = rotation;
        this.modelPath = modelPath;
        this.texturePath = texturePath;
        this.hairTexturePath = hairTexturePath;
        this.hasHair = hairTexturePath ? true : false;

        this.model;

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

}

export { Avatar };