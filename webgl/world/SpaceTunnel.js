import * as THREE from "three";

export default class SpaceTunnel {
    constructor({ gltf }) {
        this.experience = window.experience;
        this.scenes = this.experience.scenes;
        this.renderer = this.experience.renderer.instance;
        this.camera = this.experience.camera.instance;
        this.world = this.experience.world;

        this.spacePortal = this.world.space.spacePortal;

        console.log(this.spacePortal);

        this.gltf = gltf;

        this.setInstance();
        this.setRenderTarget();
    }

    setInstance() {
        this.gltf.scene.scale.set(0.01, 0.01, 0.01);
        this.gltf.scene.position.z = -10;
        this.scenes.spaceTunnel.add(this.gltf.scene);
    }

    setRenderTarget() {
        this.renderTarget = new THREE.RenderTarget(
            window.innerWidth,
            window.innerHeight,
            { samples: 3 }
        );
    }

    update() {
        this.renderer.setRenderTarget(this.renderTarget);
        this.renderer.render(this.scenes.spaceTunnel, this.camera);

        this.spacePortal.material.uniforms.tDiffuse.value =
            this.renderTarget.texture;

        this.renderer.setRenderTarget(null);
    }
}
