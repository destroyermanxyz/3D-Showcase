import GUI from "lil-gui";

export default class Debug {
    constructor() {
        this.experience = window.experience;
        this.canvas = this.experience.canvas;
        this.scene = this.experience.scene;
        this.renderer = this.experience.renderer.instance;
        this.controls = this.experience.camera.controls;

        this.active = window.location.hash === "#debug";

        if (this.active) {
            this.gui = new GUI();
        }
    }
}
