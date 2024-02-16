import GUI from "lil-gui";
import UnJoliTheatre from "../../UnJoliTheatre/main";

export default class Debug {
    constructor() {
        this.experience = window.experience;
        this.canvas = this.experience.canvas;
        this.scene = this.experience.scene;
        this.camera = this.experience.camera.instance;
        this.renderer = this.experience.renderer.instance;
        this.controls = this.experience.camera.controls;

        console.log(this.controls);

        this.active = window.location.hash === "#debug";

        if (this.active) {
            this.gui = new GUI();

            this.unJoliTheatre = new UnJoliTheatre({
                canvas: this.canvas,
                renderer: this.renderer,
                scene: this.scene,
                camera: this.camera,
                // orbit: this.controls, // if you use orbit control, add it here
                production: false, // set to false to enable the ui
            });
        }
    }

    update() {
        this.unJoliTheatre.update();
    }
}
