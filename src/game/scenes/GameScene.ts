import Phaser from "phaser";
import NPC from "../entities/NPC";
import Hazard from "../entities/Hazard";

export default class GameScene extends Phaser.Scene {

    private npc!: NPC;

    create() {

        this.cameras.main.setBackgroundColor("#dcdcdc");

        this.npc = new NPC(this,100,360);

        new Hazard(this,900,360);

    }

    update(_:number,delta:number){

        this.npc.update(delta);

    }

}