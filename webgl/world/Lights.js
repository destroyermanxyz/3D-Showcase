import * as THREE from "three";

export default class Lights {
    constructor() {
        this.experience = window.experience;
        this.scenes = this.experience.scenes;

        this.setInstance();
        if (window.location.hash === "#debug") this.setDebug();
    }

    setInstance() {
        this.landingAmbient = new THREE.AmbientLight();
        this.scenes.landing.add(this.landingAmbient);

        this.spaceAmbient = new THREE.AmbientLight();
        this.scenes.space.add(this.spaceAmbient);

        this.spaceTunnelAmbient = new THREE.AmbientLight();
        this.scenes.spaceTunnel.add(this.spaceTunnelAmbient);
    }

    setDebug() {
        this.gui = this.experience.debug.gui;

        const lights = this.gui.addFolder("Lights");
        lights
            .add(this.landingAmbient, "intensity", 0, 10)
            .name("landing intensity");

        lights
            .add(this.spaceAmbient, "intensity", 0, 10)
            .name("space intensity");

        lights
            .add(this.spaceTunnelAmbient, "intensity", 0, 10)
            .name("space intensity");
    }
}
