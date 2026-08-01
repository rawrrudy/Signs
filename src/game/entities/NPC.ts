import Phaser from "phaser";

export default class NPC extends Phaser.GameObjects.Sprite {
    speed = 120;
    stopped = false;

    constructor(scene: Phaser.Scene, x:number, y:number){
        super(scene,x,y,"run1");
        scene.add.existing(this);
        this.play("run");
    }

    update(delta: number) {

        if (this.stopped) {
            console.log("STOPPED");
            return;
        }

        console.log("MOVING");

        this.x += this.speed * delta / 1000;

    }

    stopWalking(){
        this.stopped = true;
        this.anims.pause();
    }

    resumeWalking(){
        this.stopped = false;
        this.anims.resume();
    }
}