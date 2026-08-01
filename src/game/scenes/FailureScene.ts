import Phaser from "phaser";
import GameManager from "../GameManager";
import GameScene from "./GameScene";

export default class FailureScene extends Phaser.Scene {

    constructor() {
        super("FailureScene");
    }

    create() {

        this.cameras.main.setBackgroundColor("#202020");

        this.add.text(640, 220, "WRONG SIGN!", {
            fontSize: "56px",
            color: "#ff4444",
            fontStyle: "bold"
        }).setOrigin(0.5);

        const retry = this.add.text(640, 420, "TRY AGAIN", {
            fontSize: "40px",
            color: "#ffffff",
            backgroundColor: "#444444",
            padding: {
                left: 25,
                right: 25,
                top: 12,
                bottom: 12
            }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

        retry.on("pointerdown", () => {

            GameManager.restartLevel();
      
            this.scene.stop("FailureScene");
            this.scene.remove("GameScene");
            this.scene.add("GameScene", GameScene, true);

        });

    }

}