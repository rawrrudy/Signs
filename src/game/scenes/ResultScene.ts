import Phaser from "phaser";

export default class ResultScene extends Phaser.Scene {
  constructor() {
    super("ResultScene");
  }
  create() {
    this.add.text(100, 100, "Results");
  }
}