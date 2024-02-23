import Environment from "./Environment.js";
import Space from "./Space.js";
import Lights from "./Lights.js";
import Pointer from "./utils/Pointer.js";
import Theatre from "./utils/Theatre.js";
import PostProcessing from "./PostProcessing.js";
import SpaceTunnel from "./SpaceTunnel.js";
import Landing from "./Landing.js";

export default class World {
    constructor() {
        this.experience = window.experience;
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.experience.world = this;

        /**
         * Utils
         */
        this.pointer = new Pointer();
        this.theatre = new Theatre();

        /**
         * World
         */
        this.postProcessing = new PostProcessing();
        this.lights = new Lights();

        // Wait for resources
        this.resources.addEventListener("resourcesLoaded", (e) => {
            console.log(e.detail); // take items from resources.js

            // env & bg
            this.environment = new Environment({
                envMap: e.detail.envMap,
                background: e.detail.background,
            });

            // landing
            this.landing = new Landing({ gltf: e.detail.landing });

            // space scene
            this.space = new Space({ gltf: e.detail.space });

            // space tunnel scene
            this.spaceTunnel = new SpaceTunnel({ gltf: e.detail.spaceTunnel });
        });
    }

    resize() {
        this.postProcessing.resize();

        if (this.space) this.space.resize();
        if (this.spaceTunnel) this.spaceTunnel.resize();
    }

    update() {
        // this.floorPath.update();
        this.theatre.update();
        this.postProcessing.update();
        if (this.landing) this.landing.update();
        if (this.space) this.space.update();
        if (this.spaceTunnel) this.spaceTunnel.update();
    }

    destroy() {}
}
