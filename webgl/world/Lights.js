import * as THREE from "three";

export default class Lights {
    constructor() {
        this.experience = window.experience;
        this.scene = this.experience.scene;

        console.log(this.scene);

        this.setInstance();
    }

    setInstance() {
        const ambient = new THREE.AmbientLight();

        this.scene.add(ambient);
    }
}
