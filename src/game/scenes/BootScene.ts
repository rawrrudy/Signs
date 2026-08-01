import Phaser from "phaser";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }
  preload() {

    this.load.image("road", "src/assets/road.png");
    this.load.image("camera", "src/assets/camera.png");  
    this.load.image("caution", "src/assets/cautionsign.png");
    this.load.image("run1", "src/assets/runframe1.png");
    this.load.image("run2", "src/assets/runframe2.png");
    this.load.image("run3", "src/assets/runframe3.png");
    this.load.image("run4", "src/assets/runframe4.png");
    this.load.image("run5", "src/assets/runframe5.png");
    this.load.image("pothole", "src/assets/pothole.png");
    this.load.image("fireroad", "src/assets/fireroad.png");
    this.load.image("waterroad", "src/assets/waterroad.png");
    this.load.image("thunderroad", "src/assets/thunderroad.png");
    this.load.image("brokenroad", "src/assets/brokenroad.png");

  }
  create() {
    this.anims.create({

        key: "run",

        frames: [
            { key: "run1" },
            { key: "run2" },
            { key: "run3" },
            { key: "run4" },
            { key: "run5" },
        ],

        frameRate: 10,

        repeat: -1,
 
    });
    this.scene.start("MenuScene");
  }
}



