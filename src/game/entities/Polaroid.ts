import Phaser from "phaser";

export default class Polaroid {

    private scene: Phaser.Scene;
    private frame: Phaser.GameObjects.Container;

    constructor(scene: Phaser.Scene){

        this.scene = scene;

        this.frame = scene.add.container(640,-500);
        this.frame.setDepth(999999);

        const border = scene.add.rectangle(
            0,
            0,
            300,
            360,
            0xffffff
        );

        const photo = scene.add.rectangle(
            0,
            -30,
            250,
            220,
            0x333333
        );

        const caption = scene.add.text(
            0,
            120,
            "PERFECT SHOT",
            {
                color:"#000",
                fontSize:"24px"
            }
        ).setOrigin(0.5);

        this.frame.add([
            border,
            photo,
            caption
        ]);
    }

    show(){

        this.frame.y = -500;
        this.frame.angle = 0;
        this.frame.alpha = 1;

        this.scene.tweens.add({
            targets:this.frame,
            y:340,
            angle:-8,
            duration:700,
            ease:"Back.Out"
        });

        this.scene.time.delayedCall(2200,()=>{

            this.scene.tweens.add({
                targets:this.frame,
                y:-500,
                alpha:0,
                duration:500,
                ease:"Back.In"
            });

        });

    }

}