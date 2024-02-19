import Environment from "./Environment.js";
import Space from "./Space.js";
import Lights from "./Lights.js";
import Pointer from "./utils/Pointer.js";

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

        /**
         * World
         */
        this.lights = new Lights();

        // Wait for resources
        this.resources.addEventListener("resourcesLoaded", (e) => {
            console.log(e.detail); // take items from resources.js

            // env & bg
            this.environment = new Environment({
                envMap: e.detail.envMap,
                background: e.detail.background,
            });

            // scene 1
            this.space = new Space({ gltf: e.detail.space });
        });
    }

    resize() {}

    update() {
        // this.floorPath.update();
    }

    destroy() {}
}
