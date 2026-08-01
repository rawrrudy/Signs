import Phaser from "phaser";

export default class Hazard extends Phaser.GameObjects.Ellipse {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 80, 50, 0x3da9fc);

    scene.add.existing(this);
  }
}