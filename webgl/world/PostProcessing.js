import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { DotScreenShader } from "./utils/DotScreenShader";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import * as THREE from "three";

export default class PostProcessing {
    constructor() {
        this.experience = window.experience;
        this.scenes = this.experience.scenes;
        this.renderer = this.experience.renderer;
        this.camera = this.experience.camera;

        this.setInstance();
        if (window.location.hash === "#debug") this.setDebug();
    }

    setInstance() {
        const renderTarget = new THREE.WebGLRenderTarget(
            window.innerWidth,
            window.innerHeight,
            { samples: 8 }
        );
        this.composer = new EffectComposer(
            this.renderer.instance,
            renderTarget
        );

        this.renderPass = new RenderPass(
            this.scenes.landing,
            this.camera.instance
        );
        this.composer.addPass(this.renderPass);

        this.bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            0.3,
            0.6,
            0.8
        );
        // this.composer.addPass(this.bloomPass);

        this.dotScreenShader = new ShaderPass(DotScreenShader);
        // this.composer.addPass(this.dotScreenShader);

        const outputPass = new OutputPass();
        this.composer.addPass(outputPass);
    }

    resize() {
        this.composer.setSize(window.innerWidth, window.innerHeight);
    }

    update() {
        // if (this.camera.instance.position.z < -16) {
        //     if (this.renderPass.scene !== this.scenes.spaceTunnel) {
        //         this.renderPass.scene = this.scenes.spaceTunnel;
        //         console.log("tunnel");
        //     }
        // } else {
        //     if (this.renderPass.scene !== this.scenes.space) {
        //         this.renderPass.scene = this.scenes.space;
        //         console.log("space");
        //     }
        // }
        this.composer.render();
    }

    setDebug() {
        this.gui = this.experience.debug.gui;

        const postPro = this.gui.addFolder("PostProcessing");

        const bloom = postPro.addFolder("Bloom");
        bloom.add(this.bloomPass, "strength", 0, 1);
        bloom.add(this.bloomPass, "radius", 0, 3);
        bloom.add(this.bloomPass, "threshold", 0, 1);

        const dot = postPro.addFolder("dot");
        dot.add(
            this.dotScreenShader.material.uniforms.uSize,
            "value",
            0,
            0.1
        ).name("size");
    }
}
