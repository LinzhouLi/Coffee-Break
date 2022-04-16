import * as THREE from '../lib/threejs/three.module.js';
import { loadTexture } from '../loaders.js';
import * as SkeletonUtils from '../lib/threejs/SkeletonUtils.js';

class Avatar {

    constructor(sex, model, position, rotation, animationClip, texturePath, hairTexturePath) {

        this.sex = sex;
        this.animationClip  = animationClip;
        this.texturePath = texturePath;
        this.hairTexturePath = hairTexturePath;
        this.hasHair = hairTexturePath ? true : false;

        this.scene = new THREE.Object3D();
        this.scene.position.set(...position);
        this.scene.rotation.set(...rotation);
        this.model = SkeletonUtils.clone(model);

    }

    async init() {

        const texture = await loadTexture(this.texturePath);
        texture.flipY = false;
        if (this.sex == "male") {
            this.model.children[1].material = new THREE.MeshStandardMaterial({
                map: texture,
                roughness: 0.450053632
            });
        }
        else {
            this.model.children[1].children[0].material = new THREE.MeshStandardMaterial({
                map: texture,
                roughness: 0.450053632
            });
        }
        this.scene.add(this.model);

        if (this.hasHair) {
            const hairTexture = await loadTexture(this.hairTexturePath);
            hairTexture.flipY = false;
            this.model.children[1].children[1].material = new THREE.MeshStandardMaterial({
                map: hairTexture,
                roughness: 0.450053632,
                transparent: true
            });
            this.scene.add(this.hairMesh);
        }
        else if (this.sex == "female") {
            this.model.children[1].children.splice(1, 1);
        }

    }

}

export { Avatar };