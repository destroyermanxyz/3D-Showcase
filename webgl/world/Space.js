import * as THREE from "three";
import { types } from "@theatre/core";

export default class Space {
    constructor({ gltf }) {
        this.experience = window.experience;
        this.scene = this.experience.scene;
        this.requestAnimation = this.experience.requestAnimation;
        this.theatre = this.experience.theatre;

        this.gltf = gltf;

        this.setInstance();
        // this.setTheatre();
    }

    setInstance() {
        let scale = 0.01;
        this.gltf.scene.scale.set(scale, scale, scale);

        this.gltf.scene.traverse((child) => {
            if (child.isMesh) {
                console.log(child);
            }
        })

        this.scene.add(this.gltf.scene);
    }

    update() {}

    setTheatre() {
        this.spaceSheet = this.theatre.project.sheet("Space");

        this.gltf.scene.traverse((child) => {
            if (child.isMesh) {
                const sheetobj = this.spaceSheet.object(child.name, {
                    position: types.compound({
                        y: types.number(0, {
                            nudgeMultiplier: 0.01,
                        }),
                    }),
                });

                sheetobj.onValuesChange(({ position }) => {
                    child.position.y = position.y;
                });
            }
        });
    }
}
