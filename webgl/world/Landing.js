import * as THREE from "three";

export default class Landing {
    constructor({ gltf }) {
        this.experience = window.experience;
        this.scenes = this.experience.scenes;
        this.requestAnimation = this.experience.requestAnimation;

        this.gltf = gltf;

        this.setInstance();
        this.setAnimations();
    }

    setInstance() {
        this.gltf.scene.scale.set(0.01, 0.01, 0.01);

        this.scenes.landing.add(this.gltf.scene);
    }

    setAnimations() {
        const mixer = new THREE.AnimationMixer(this.gltf.scene); // put the gltf.scene
        const clips = this.gltf.animations; // only gltf there

        const clip = THREE.AnimationClip.findByName(clips, "animation_0");

        const action = mixer.clipAction(clip);

        action.play();

        this.updateAnimations = function (deltaTime) {
            mixer.update(deltaTime);
        };
    }

    update() {
        this.updateAnimations(this.requestAnimation.deltaTime);
    }
}
