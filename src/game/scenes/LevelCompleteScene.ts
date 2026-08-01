import Phaser from "phaser";

export default class LevelCompleteScene extends Phaser.Scene {

    constructor() {
        super("LevelCompleteScene");
    }

    create() {

        this.cameras.main.setBackgroundColor("#202020");

        this.add.text(640, 170, "LEVEL COMPLETE!", {
            fontSize: "56px",
            color: "#ffffff",
            fontStyle: "bold"
        }).setOrigin(0.5);

        this.add.text(640, 260, "Great job!", {
            fontSize: "30px",
            color: "#dddddd"
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

            this.scene.start("GameScene");

        });

        retry.on("pointerdown", () => {

            this.scene.start("GameScene");

        });

    }

}