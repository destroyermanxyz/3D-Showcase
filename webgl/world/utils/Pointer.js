export default class Pointer {
    constructor() {
        this.experience = window.experience;
        this.experience.world.pointer = this;

        this.x = 0;
        this.y = 0;

        window.addEventListener("pointermove", (e) => {
            this.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.y = (-e.clientY / window.innerHeight) * 2 + 1;
        });
    }
}
