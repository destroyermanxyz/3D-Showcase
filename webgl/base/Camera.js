import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
    constructor() {
        this.experience = window.experience;
        this.canvas = this.experience.canvas;

        this.setInstance();
        // this.setControls();
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(
            22,
            window.innerWidth / window.innerHeight,
            0.01,
            1000
        );
        this.instance.position.set(0, 0, 19);

        this.vFov = THREE.MathUtils.degToRad(this.instance.fov);
        this.viewportHeight =
            2 * Math.tan(this.vFov / 2) * this.instance.position.z;
        this.viewportWidth = this.viewportHeight * this.instance.aspect;
    }

    setControls() {
        this.controls = new OrbitControls(this.instance, this.canvas);
        this.controls.enableDamping = true;
        this.controls.target.set(0, 0, -13);
    }

    resize() {
        this.instance.aspect = window.innerWidth / window.innerHeight;
        this.instance.updateProjectionMatrix();

        this.vFov = THREE.MathUtils.degToRad(this.instance.fov);
        this.viewportHeight =
            2 * Math.tan(this.vFov / 2) * this.instance.position.z;
        this.viewportWidth = this.viewportHeight * this.instance.aspect;
    }

    update() {
        // this.controls.update();
        // this.instance.position.x +=
        //     (this.experience.world.pointer.x * 0.2 - this.instance.position.x) *
        //     (this.experience.requestAnimation.deltaTime * 5);
        // this.instance.position.y +=
        //     (this.experience.world.pointer.y * 0.2 -
        //         this.instance.position.y -
        //         0.4) *
        //     (this.experience.requestAnimation.deltaTime * 5);
    }
}
