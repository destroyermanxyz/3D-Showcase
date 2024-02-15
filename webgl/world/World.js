import Environment from "./Environment.js";
import FloorPath from "./FloorPath";
import Lights from "./Lights.js";
import Walls from "./Walls.js";

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

            // env & bg
            this.environment = new Environment({
                envMap: e.detail.envMap,
                background: e.detail.background,
            });

            // floor
            this.floorPath = new FloorPath({ gltf: e.detail.floorPath });

            // walls
            this.walls = new Walls({ gltf: e.detail.walls });
        });
    }

    resize() {}

    update() {
        // this.floorPath.update();
    }

    destroy() {}
}
