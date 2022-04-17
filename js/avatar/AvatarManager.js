import * as THREE from '../lib/threejs/three.module.js';
import { Avatar } from './Avatar.js';
import { loadGLB } from '../loaders.js';
import { avatarParams } from './avatarParam.js';

class AvatarManager {

    constructor() {

        this.maleModelPath = "assets/avatar/model/male.glb";
        this.femaleModelPath = "assets/avatar/model/female.glb";
        
        this.scene = new THREE.Object3D();
        this.animations = {
            male: null,
            female: null
        }

        this.clock = new THREE.Clock(false);
        this.mixer = new THREE.AnimationMixer();
        this.actions = new Array(avatarParams.length);
        this.avatars = new Array(avatarParams.length);

    }

    async loadModel() {

        const glb1 = await loadGLB(this.maleModelPath);
        this.animations.male = glb1.animations
        const glb2 = await loadGLB(this.femaleModelPath);
        this.animations.female = glb2.animations

        for (let i = 0; i < avatarParams.length; i++) {
            let p = avatarParams[i];

            let avatar = new Avatar(p.position, p.rotation, p.modelPath, p.texturePath, p.hairPath);
            await avatar.init();
            this.scene.add(avatar.model);

            this.avatars[i] = avatar;
            this.actions[i] = this.mixer.clipAction(this.animations[p.sex][p.animationType], avatar.model);
            this.actions[i].play();
        }

        this.clock.start();
        let playAnimations = () => {
            this.mixer.update(this.clock.getDelta());
            requestAnimationFrame(playAnimations);
        }
        playAnimations();

    }

}

export { AvatarManager };