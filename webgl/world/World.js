import Environment from "./Environment.js";
import FloorPath from "./FloorPath";
import Lights from "./Lights.js";

export default class World {
    constructor() {
        this.experience = window.experience;
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.experience.world = this;

        this.lights = new Lights();

        // Wait for resources
        this.resources.addEventListener("resourcesLoaded", (e) => {
            console.log(e.detail); // take items from resources.js

            this.environment = new Environment(e.detail.envMap);

            this.floorPath = new FloorPath(e.detail.floorPath);
        });
    }

    resize() {}

    update() {
        // this.floorPath.update();
    }

    destroy() {}
}
