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
        this.scene = this.experience.scene;
        this.renderer = this.experience.renderer;
        this.camera = this.experience.camera;

        this.setInstance();
        this.setDebug();
    }

    setInstance() {
        const renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, { samples: 8})
        this.composer = new EffectComposer(this.renderer.instance, renderTarget);


        const renderPass = new RenderPass(this.scene, this.camera.instance);
        this.composer.addPass(renderPass);

        this.bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            0.3,
            0.6,
            0.8
        );
        this.composer.addPass(this.bloomPass);

        const dotScreenShader = new ShaderPass(DotScreenShader);
        this.composer.addPass(dotScreenShader);

        const outputPass = new OutputPass();
        this.composer.addPass(outputPass);
    }

    resize() {
        this.composer.setSize(window.innerWidth, window.innerHeight);
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
