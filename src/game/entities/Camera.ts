import Phaser from "phaser";

export default class CameraOverlay extends Phaser.GameObjects.Container {

    private flash: Phaser.GameObjects.Rectangle;
    private cameraSprite: Phaser.GameObjects.Image;

    constructor(scene: Phaser.Scene){
        super(scene);
        scene.add.existing(this);
        this.setDepth(10000);
        this.cameraSprite = scene.add.image(640,850,"camera");
        this.cameraSprite.setScale(0.35);
        this.flash = scene.add.rectangle(
            640,
            360,
            1280,
            720,
            0xffffff,
            0
        );

        this.add(this.flash);
        this.add(this.cameraSprite);
    }

    show(){
        this.scene.tweens.add({
            targets:this.cameraSprite,
            y:600,
            duration:350,
            ease:"Back.Out"
        });

    }

    capture(){
        this.scene.tweens.add({
            targets:this.flash,
            alpha:1,
            duration:70,
            yoyo:true
        });
    }
}