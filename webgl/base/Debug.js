import GUI from "lil-gui";
// import studio from "@theatre/studio";
import { getProject, types, val } from "@theatre/core";
import projectState from "../../projectState.json"

export default class Debug {
    constructor() {
        this.experience = window.experience;
        this.canvas = this.experience.canvas;
        this.scene = this.experience.scene;
        this.camera = this.experience.camera.instance;
        this.renderer = this.experience.renderer.instance;
        this.controls = this.experience.camera.controls;

        this.active = window.location.hash === "#debug";

        this.smoothScroll = 0;

        if (this.active) {
            this.gui = new GUI();

            // studio.initialize();
            const project = getProject("THREE.js x Theatre.js", { state: projectState});
            this.sheet = project.sheet("Scene");

            const camera = this.sheet.object("Camera", {
                position: types.compound({
                    z: types.number(this.camera.position.z, {
                        nudgeMultiplier: 0.01,
                    }),
                }),
            });

            camera.onValuesChange(({ position }) => {
                this.camera.position.z = position.z;
            });
        }
    }

    update() {
        if (!this.active) return;

        const sequenceLength = val(this.sheet.sequence.pointer.length);

        let scrollNormalized =
            (document.documentElement.scrollTop + document.body.scrollTop) /
            (document.documentElement.scrollHeight -
                document.documentElement.clientHeight);

        this.smoothScroll +=
            (scrollNormalized - this.smoothScroll) *
            (this.experience.requestAnimation.deltaTime * 5);

        this.sheet.sequence.position = this.smoothScroll * sequenceLength;
    }
}
