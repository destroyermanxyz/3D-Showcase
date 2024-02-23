import * as THREE from "three";

export default class SpaceTunnel {
    constructor({ gltf }) {
        this.experience = window.experience;
        this.scenes = this.experience.scenes;
        this.renderer = this.experience.renderer.instance;
        this.camera = this.experience.camera.instance;
        this.world = this.experience.world;
        this.requestAnimation = this.experience.requestAnimation;

        this.spacePortal = this.world.space.spacePortal;

        this.gltf = gltf;

        this.setInstance();
        this.setRenderTarget();
        if (window.location.hash === "#debug") this.setDebug();
    }

    setInstance() {
        this.gltf.scene.position.z = -80;
        this.gltf.scene.scale.set(0.01, 0.01, 0.01);

        this.gltf.scene.traverse((child) => {
            child.random = Math.random();
        });

        this.scenes.spaceTunnel.add(this.gltf.scene);
    }

    animations() {
        this.gltf.scene.traverse((child) => {
            if (child.isMesh) {
                if (child.name === "FENETRE") return;
                // console.log(child);
                child.position.y =
                    Math.sin(this.requestAnimation.elapsedTime * child.random) *
                    100 *
                    child.random;
            }

            // if (child.isMesh) {
            //     // console.log(child);
            //     child.rotation.y = this.requestAnimation.elapsedTime;
            // }
        });
    }

    setRenderTarget() {
        this.renderTarget = new THREE.RenderTarget(
            window.innerWidth,
            window.innerHeight,
            { samples: 3 }
        );
    }

    resize() {
        this.renderTarget.setSize(window.innerWidth, window.innerHeight);
    }

    update() {
        this.renderer.setRenderTarget(this.renderTarget);
        this.renderer.render(this.scenes.spaceTunnel, this.camera);

        this.spacePortal.material.uniforms.tDiffuse.value =
            this.renderTarget.texture;

        this.renderer.setRenderTarget(null);

        /**
         * Animations
         */
        this.animations();
    }

    setDebug() {
        this.gui = this.experience.debug.gui;

        const parameters = {
            intensity: 1,
        };

        const updateMaterials = (value) => {
            this.scenes.spaceTunnel.traverse((child) => {
                if (child.isMesh) {
                    child.material.envMapIntensity = value;
                }
            });
        };

        const envMap = this.gui.folders.find(
            (folder) => folder._title === "envMap"
        );

        envMap
            .add(parameters, "intensity", 0, 3)
            .onChange((value) => updateMaterials(value))
            .name("spaceTunnel intensity");
    }
}
