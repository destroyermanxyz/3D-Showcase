import * as THREE from "three";
export default class Environment {
    constructor({ envMap, background }) {
        this.experience = window.experience;
        this.scene = this.experience.scene;
        this.requestAnimation = this.experience.requestAnimation;

        this.envMap = envMap;
        this.background = background;

        this.setInstance();
    }

    setInstance() {
        this.envMap.mapping = THREE.EquirectangularReflectionMapping;

        this.scene.environment = this.envMap;
        this.scene.background = this.background;
        this.scene.background = new THREE.Color("#0F0B1C");
    }
}
