import * as THREE from "three";
export default class Environment {
    constructor(hdri) {
        this.experience = window.experience;
        this.scene = this.experience.scene;
        this.requestAnimation = this.experience.requestAnimation;

        this.hdri = hdri;

        this.setInstance();
    }

    setInstance() {
        this.hdri.mapping = THREE.EquirectangularReflectionMapping;

        this.scene.environment = this.hdri;
        this.scene.background = this.hdri;
    }
}
