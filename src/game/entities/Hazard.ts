import Phaser from "phaser";

export default class Hazard extends Phaser.GameObjects.Ellipse {

    constructor(scene: Phaser.Scene,x:number,y:number){
        super(scene,x,y,120,70,0x4aa3ff);
        scene.add.existing(this);
        scene.add.text(x,y-70,"💧",{
            fontSize:"32px"
        }).setOrigin(0.5);
    }
}