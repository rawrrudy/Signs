import Phaser from "phaser";

export default class NPC extends Phaser.GameObjects.Rectangle {
  speed = 120;
  stopped = false;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 40, 60, 0x3498db);

    scene.add.existing(this);
  }

  update(delta: number) {
    if (this.stopped) return;

    this.x += this.speed * (delta / 1000);
  }

  stop() {
    this.stopped = true;
  }
}