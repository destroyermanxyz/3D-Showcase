export default class Walls {
    constructor({ gltf }) {
        this.experience = window.experience;
        this.scene = this.experience.scene;
        this.gui = this.experience.debug.gui;

        this.gltf = gltf;

        this.setInstance();
        this.setDebug();
    }

    setInstance() {
        let scale = 0.01;
        this.gltf.scene.scale.set(scale, scale, scale);

        this.scene.add(this.gltf.scene);
    }

    // debug work because this file load when resources are loaded (it takes time)
    setDebug() {
        console.log(this.experience);

        this.gui
            .add(this.gltf.scene.scale, "x", 0, 0.1, 0.001)
            .onChange((val) => {
                console.log(val);
                this.gltf.scene.scale.set(val, val, val);
            });

        this.gui.add(this.gltf.scene.position, "x", -10, 10);
        this.gui.add(this.gltf.scene.position, "y", -10, 10);
        this.gui.add(this.gltf.scene.position, "z", -10, 10);
    }
}
