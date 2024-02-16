import * as THREE from "three";

export default class Space {
    constructor({ gltf }) {
        this.experience = window.experience;
        this.scene = this.experience.scene;
        this.requestAnimation = this.experience.requestAnimation;

        this.gltf = gltf;

        this.setInstance();
    }

    setInstance() {
        let scale = 0.01;
        this.gltf.scene.scale.set(scale, scale, scale);

        this.scene.add(this.gltf.scene);
    }

    update() {}
}
