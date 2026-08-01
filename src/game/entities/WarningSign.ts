import Phaser from "phaser";

export default class WarningSign extends Phaser.GameObjects.Image {

    constructor(scene: Phaser.Scene, x: number, y: number) {

        super(scene, x, y - 40, "caution");

        scene.add.existing(this);

        this.setScale(0.45);

        this.setDepth(20);

        this.setVisible(false);
    }

    place() {

        this.setVisible(true);

        this.setScale(0);

        this.scene.tweens.add({
            targets: this,
            scale: 0.5,
            duration: 250,
            ease: "Back.Out"
        });

    }

}