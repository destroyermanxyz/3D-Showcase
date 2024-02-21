import * as THREE from "three";
import { types } from "@theatre/core";
import vertex from "../shaders/portal/vertex.glsl?raw";
import fragment from "../shaders/portal/fragment.glsl?raw";

export default class Space {
    constructor({ gltf }) {
        this.experience = window.experience;
        this.scenes = this.experience.scenes;
        this.requestAnimation = this.experience.requestAnimation;
        this.theatre = this.experience.theatre;

        this.gltf = gltf;

        this.setInstance();
        this.setAnimations();
        this.setPortal();
        // this.setTheatre();
    }

    setInstance() {
        let scale = 0.01;
        this.gltf.scene.scale.set(scale, scale, scale);

        this.scenes.space.add(this.gltf.scene);
    }

    setPortal() {
        this.spacePortal = this.gltf.scene.children.find(
            (child) => child.name === "Cylinder"
        );

        this.spacePortal.material = new THREE.ShaderMaterial({
            vertexShader: vertex,
            fragmentShader: fragment,
            uniforms: {
                tDiffuse: { value: null },
                uResolution: {
                    value: new THREE.Vector2(
                        window.innerWidth,
                        window.innerHeight
                    ),
                },
            },
        });
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

    resize() {
        this.spacePortal.material.uniforms.uResolution.value =
            new THREE.Vector2(window.innerWidth, window.innerHeight);
    }

    update() {
        this.updateAnimations(this.experience.requestAnimation.deltaTime);
    }

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
