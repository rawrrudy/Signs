import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    const { width, height } = this.scale;
    this.add
      .text(width / 2, height / 2, "LEVEL 1", {
        fontSize: "48px",
        color: "#00ff88",
      })
      .setOrigin(0.5);
  }
}