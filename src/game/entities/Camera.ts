import Phaser from "phaser";

export default class CameraOverlay {

    private scene: Phaser.Scene;
    private flash: Phaser.GameObjects.Rectangle;
    private cameraSprite: Phaser.GameObjects.Image;

    constructor(scene: Phaser.Scene) {

        this.scene = scene;

        this.flash = scene.add.rectangle(
            640,
            360,
            1280,
            720,
            0xffffff
        );

        this.flash.setOrigin(0.5);
        this.flash.setAlpha(0);
        this.flash.setDepth(99999);
        this.flash.setScrollFactor(0);

        this.cameraSprite = scene.add.image(
            640,
            900,
            "camera"
        );

        this.cameraSprite.setScale(0.25);
        this.cameraSprite.setDepth(99998);
        this.cameraSprite.setScrollFactor(0);
    }

    show() {

        this.scene.tweens.add({
            targets: this.cameraSprite,
            y: 560,
            duration: 350,
            ease: "Back.Out"
        });

    }

    capture() {

        this.scene.tweens.add({
            targets: this.cameraSprite,
            scale: 0.22,
            duration: 50,
            yoyo: true
        });

        this.flash.setAlpha(1);

        this.scene.tweens.add({
            targets: this.flash,
            alpha: 0,
            duration: 180,
            ease: "Linear"
        });

    }

}