import Phaser from "phaser";

export default class Hazard extends Phaser.GameObjects.Sprite {

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "pothole");
        scene.add.existing(this);

        this.setOrigin(0.5);
        this.setScale(2.0);
    }

}