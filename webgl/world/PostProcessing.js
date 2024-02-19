import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { DotScreenShader } from "./utils/DotScreenShader";
import { FXAAShader } from "three/addons/shaders/FXAAShader.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import * as THREE from "three";

export default class PostProcessing {
    constructor() {
        this.experience = window.experience;
        this.scene = this.experience.scene;
        this.renderer = this.experience.renderer;
        this.camera = this.experience.camera;

        this.setInstance();
        this.setDebug();
    }

    setInstance() {
        this.composer = new EffectComposer(this.renderer.instance);

        const renderPass = new RenderPass(this.scene, this.camera.instance);
        this.composer.addPass(renderPass);

        this.bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            0.3,
            0.9,
            1
        );
        this.composer.addPass(this.bloomPass);

        const dotScreenShader = new ShaderPass(DotScreenShader);
        this.composer.addPass(dotScreenShader);

        // // FXAA to fix aliasing
        const pixelRatio = this.renderer.instance.getPixelRatio();
        const fxaaPass = new ShaderPass(FXAAShader);
        fxaaPass.material.uniforms["resolution"].value.x =
            1 / (window.innerWidth * pixelRatio);
        fxaaPass.material.uniforms["resolution"].value.y =
            1 / (window.innerHeight * pixelRatio);

        this.composer.addPass(fxaaPass);

        const outputPass = new OutputPass();
        this.composer.addPass(outputPass);
    }

    update() {
        this.composer.render();
    }

    setDebug() {
        // setTimeout(() => {
        //     this.gui = this.experience.debug.gui;
        //     console.log(this.bloomPass);
        //     this.gui.add(this.bloomPass, "strength", 0, 1);
        //     this.gui.add(this.bloomPass, "threshold", 0, 1);
        //     this.gui.add(this.bloomPass, "radius", 0, 3);
        // }, 500);
    }
}
