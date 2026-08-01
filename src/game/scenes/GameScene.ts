import Phaser from "phaser";
import NPC from "../entities/NPC";
import Hazard from "../entities/Hazard";

export default class GameScene extends Phaser.Scene {

    private npc!: NPC;

    constructor() {
        super("GameScene");
    }

    create() {

      this.cameras.main.setBackgroundColor("#E8E6E3");

      // ground
      this.add.rectangle(640,360,1280,720,0xe8e6e3);

      // road
      this.add.rectangle(640,360,1280,140,0x7d7d7d);

      // footpath
      this.add.rectangle(640,260,1280,40,0xcfcfcf);

      // hazard
      new Hazard(this,950,360);

      this.add.line(
        0,
        0,
        900,
        320,
        900,
        400,
        0xff0000
      ).setLineWidth(4);

      // NPC
      this.npc = new NPC(this,120,360);
  }

    update(_: number, delta: number) {

        this.npc.update(delta);

    }

}