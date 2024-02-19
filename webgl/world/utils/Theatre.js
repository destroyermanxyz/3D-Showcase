// import studio from "@theatre/studio";
import { getProject, types, val } from "@theatre/core";
import projectState from "../../../projectState.json";

export default class Theatre {
    constructor() {
        this.experience = window.experience;
        this.camera = this.experience.camera.instance;

        this.setInstance();
        this.setSmoothScroll();
    }

    setInstance() {
        // studio.initialize();
        const project = getProject("THREE.js x Theatre.js", {
            state: projectState,
        });
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

    setSmoothScroll() {
        this.smoothScroll = 0;
    }

    update() {
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
