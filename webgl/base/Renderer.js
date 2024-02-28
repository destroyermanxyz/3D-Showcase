import * as THREE from "three";

export default class Renderer {
    constructor() {
        this.experience = window.experience;
        this.canvas = this.experience.canvas;
        this.scenes = this.experience.scenes;
        this.camera = this.experience.camera.instance;

        this.setInstance();
    }

    setInstance() {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
        });
        this.instance.setSize(window.innerWidth, window.innerHeight);
        this.instance.setClearColor("black");
        this.instance.toneMapping = THREE.ACESFilmicToneMapping;
        this.instance.toneMappingExposure = 1;
    }

    resize() {
        this.instance.setSize(window.innerWidth, window.innerHeight);
    }

    update() {
        // this.instance.render(this.scenes.space, this.camera);
    }
}
