import * as THREE from "three";
export default class Environment {
    constructor({ envMap, background }) {
        this.experience = window.experience;
        this.scenes = this.experience.scenes;
        this.requestAnimation = this.experience.requestAnimation;

        this.envMap = envMap;
        this.background = background;

        this.setInstance();
    }

    setInstance() {
        this.envMap.mapping = THREE.EquirectangularReflectionMapping;

        // landing scene
        this.scenes.landing.environment = this.envMap;
        // this.scenes.landing.background = this.background;
        this.scenes.landing.background = new THREE.Color("black");

        // space scene
        this.scenes.space.environment = this.envMap;
        // this.scenes.space.background = this.background;
        this.scenes.space.background = new THREE.Color("#352763");

        // space tunnel scene
        this.scenes.spaceTunnel.environment = this.envMap;
        // this.scenes.spaceTunnel.background = this.background;
        this.scenes.spaceTunnel.background = new THREE.Color("black");
    }
}
