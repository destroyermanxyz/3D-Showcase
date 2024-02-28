import * as THREE from "three";
import { types } from "@theatre/core";

export default class Landing {
    constructor({ gltf }) {
        this.experience = window.experience;
        this.scenes = this.experience.scenes;
        this.requestAnimation = this.experience.requestAnimation;
        this.theatre = this.experience.theatre;
        this.sheet = this.theatre.sheet;

        this.gltf = gltf;

        this.setInstance();
        this.setAnimations();
        if (window.location.hash === "#debug") this.setDebug();
    }

    setInstance() {
        this.gltf.scene.scale.set(0.01, 0.01, 0.01);

        this.gltf.scene.traverse((child) => {
            if (child.isMesh && child.name === "PORTAIL1") {
                const diamondSheet = this.sheet.object("Landing Diamond", {
                    position: types.compound({
                        y: types.number(child.position.y, {
                            nudgeMultiplier: 10,
                        }),
                    }),
                });

                diamondSheet.onValuesChange(({ position }) => {
                    child.position.y = position.y;
                });
            }

            if (child.isMesh && child.name === "MUR") {
                child.material = new THREE.MeshBasicMaterial({
                    color: "#201d20",
                });
            }
        });

        this.scenes.landing.add(this.gltf.scene);
    }

    setAnimations() {
        const mixer = new THREE.AnimationMixer(this.gltf.scene); // put the gltf.scene
        const clips = this.gltf.animations; // only gltf there

        const clip = THREE.AnimationClip.findByName(clips, "animation_0");

        const action = mixer.clipAction(clip);

        action.play();

        this.updateAnimations = function (deltaTime) {
            mixer.update(deltaTime);
        };
    }

    update() {
        this.updateAnimations(this.requestAnimation.deltaTime);
    }

    setDebug() {
        this.gui = this.experience.debug.gui;

        const parameters = {
            intensity: 1,
        };

        const updateMaterials = (value) => {
            this.scenes.landing.traverse((child) => {
                if (child.isMesh) {
                    child.material.envMapIntensity = value;
                }
            });
        };

        const envMap = this.gui.addFolder("envMap");

        envMap
            .add(parameters, "intensity", 0, 3)
            .onChange((value) => updateMaterials(value))
            .name("landing intensity");

        // this.gui.add(this.gltf2.scene.position, "y", -100, 0);
        // this.gui.add(this.gltf2.scene.position, "z", -100, 0);
    }
}
