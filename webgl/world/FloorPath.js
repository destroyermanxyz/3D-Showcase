import * as THREE from "three";
import vertex from "../shaders/vertex.glsl?raw";
import fragment from "../shaders/fragment.glsl?raw";

export default class Plane {
    constructor(gltf) {
        this.experience = window.experience;
        this.scene = this.experience.scene;
        this.requestAnimation = this.experience.requestAnimation;

        this.gltf = gltf;

        this.setInstance();
    }
    setInstance() {
        this.instance = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({ color: "red" })
        );

        this.scene.add(this.gltf.scene);
    }

    update() {
        this.instance.rotation.y += this.requestAnimation.deltaTime;
    }
}
