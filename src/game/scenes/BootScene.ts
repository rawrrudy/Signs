import Phaser from "phaser";

export default class BootScene extends Phaser.Scene {

  constructor() {
    super("BootScene");
  }

  preload() {

    this.load.image("hc", "assets/hc.png");
    this.load.image("logo", "assets/logo.png");
    this.load.image("arcana", "assets/arcana.jpg");

    this.load.image("road", "assets/road.png");
    this.load.image("camera", "assets/camera.png");
    this.load.image("caution", "assets/cautionsign.png");

    this.load.image("run1", "assets/runframe1.png");
    this.load.image("run2", "assets/runframe2.png");
    this.load.image("run3", "assets/runframe3.png");
    this.load.image("run4", "assets/runframe4.png");
    this.load.image("run5", "assets/runframe5.png");

    this.load.image("pothole", "assets/pothole.png");

    
    this.load.image("fireroad", "assets/fireroad.png");
    this.load.image("waterroad", "assets/waterroad.png");
    this.load.image("thunderroad", "assets/thunderroad.png");
    this.load.image("brokenroad", "assets/brokenroad.png");

    this.load.image(
      "brokenelectricity",
      "assets/brokenelectricity.png"
    );

    this.load.image(
      "finalboss",
      "assets/finalboss.png"
    );

    this.load.image(
      "firebuilding",
      "assets/firebuilding.png"
    );

    this.load.image(
      "floodroad",
      "assets/floodroad.png"
    );

    this.load.image("water", "assets/water.png");
    this.load.image("fire", "assets/fire.png");
    this.load.image("thunder", "assets/thunder.png");
    this.load.image("construction", "assets/construction.png");


    // AUDIO
    this.load.audio(
      "background",
      "audio/background.mp3"
    );

    this.load.audio(
      "lvlup",
      "audio/lvlup.mp3"
    );

    this.load.audio(
      "lvlfail",
      "audio/lvlfail.mp3"
    );

    this.load.audio(
      "finalboss",
      "audio/finalboss.mp3"
    );

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