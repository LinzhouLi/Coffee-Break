import * as THREE from '../lib/threejs/three.module.js';
import { Avatar } from './Avatar.js';
import { loadGLB } from '../loaders.js';
import { maleAvatarParams, femaleAvatarParams } from './avatarParam.js';

class AvatarManager {

    constructor() {

        this.maleModelPath = "assets/avatar/model/male.glb";
        this.femaleModelPath = "assets/avatar/model/female.glb";
        
        this.scene = new THREE.Object3D();
        this.maleModel;
        this.maleAnimations;
        this.femaleModel;
        this.femaleAnimations;

    }

    async loadModel() {

        const glb1 = await loadGLB(this.maleModelPath);
        this.maleModel = glb1.scene.children[0];
        this.maleAnimations = glb1.animations;
        const glb2 = await loadGLB(this.femaleModelPath);
        this.femaleModel = glb2.scene.children[0];
        this.femaleAnimations = glb2.animations;

        for (let i = 1; i < maleAvatarParams.length; i++) {
            let p = maleAvatarParams[i];
            let avatar = new Avatar("male", this.maleModel, p.position, p.rotation,
                this.maleAnimations[p.animationType], p.texturePath);
            await avatar.init();
            this.scene.add(avatar.scene);
        }

        for (let i = 1; i < femaleAvatarParams.length; i++) {
            let p = femaleAvatarParams[i];
            let avatar = new Avatar("female", this.femaleModel, p.position, p.rotation,
                this.femaleAnimations[p.animationType], p.texturePath, p.hairPath);
            await avatar.init();
            this.scene.add(avatar.scene);
        }

    }

}

export { AvatarManager };