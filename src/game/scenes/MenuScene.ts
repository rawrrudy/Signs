import Phaser from "phaser";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  create() {
    const { width, height } = this.scale;
    this.add
      .text(width / 2, height / 2 - 80, "SIGNS", {
        fontSize: "64px",
        color: "#ffffff",
      })
      .setOrigin(0.5);
    this.add
      .text(width / 2, height / 2 + 20, "Click to Start", {
        fontSize: "28px",
        color: "#bbbbbb",
      })
      .setOrigin(0.5);
    this.input.once("pointerdown", () => {
      this.scene.start("GameScene");
    });
  }
}