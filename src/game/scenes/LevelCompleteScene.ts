import Phaser from "phaser";
import GameManager from "../GameManager";
import { levels } from "../data/levels";
import GameScene from "./GameScene";

export default class LevelCompleteScene extends Phaser.Scene {

    constructor() {
        super("LevelCompleteScene");
    }

    create() {

        this.cameras.main.setBackgroundColor("#202020");

        const card = this.add.graphics();

        card.fillStyle(0xffffff, 0.95);
        card.lineStyle(5, 0x111111);

        card.fillRoundedRect(320, 70, 640, 580, 28);
        card.strokeRoundedRect(320, 70, 640, 580, 28);

        const levelNumber = GameManager.getCurrentLevel() + 1;

        this.add.text(640, 150, `LEVEL ${levelNumber} COMPLETE!`, {
            fontFamily: "League Spartan",
            fontSize: "54px",
            color: "#111111",
            fontStyle: "bold"
        }).setOrigin(0.5);

        this.add.text(640, 225, "Great job!", {
            fontFamily: "League Spartan",
            fontSize: "26px",
            color: "#555555"
        }).setOrigin(0.5);

        const next = this.add.text(640, 420, "NEXT LEVEL", {
            fontSize: "40px",
            color: "#00ff66",
            backgroundColor: "#333333",
            padding: {
                left: 25,
                right: 25,
                top: 12,
                bottom: 12
            }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

        const retry = this.add.text(640, 520, "TRY AGAIN", {
            fontSize: "32px",
            color: "#ff5555",
            backgroundColor: "#333333",
            padding: {
                left: 20,
                right: 20,
                top: 10,
                bottom: 10
            }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

        next.on("pointerdown", () => {

            GameManager.nextLevel();

            this.scene.stop("LevelCompleteScene");

            if (GameManager.getCurrentLevel() >= levels.length) {

                GameManager.resetGame();
                this.scene.start("ResultScene");

            } else {

                this.scene.remove("GameScene");
                this.scene.add("GameScene", GameScene, true);

            }

        });

        retry.on("pointerdown", () => {
           
            this.scene.stop("LevelCopleteScene");
            this.scene.remove("GameScene");
            this.scene.add("GameScene", GameScene, true);

        });
    }
}

