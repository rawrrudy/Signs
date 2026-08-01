import Phaser from "phaser";
import GameManager from "../GameManager";

export default class SignUI {

    private scene: Phaser.Scene;
    private container: Phaser.GameObjects.Container;
    private timerText: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene) {

        this.scene = scene;

        this.container = scene.add.container(0, 0);
        this.container.setDepth(999999);
        this.container.setVisible(false);

        // Timer background
        const timerBg = scene.add.rectangle(
            640,
            70,
            170,
            70,
            0x222222
        );

        timerBg.setStrokeStyle(4, 0xffffff);

        this.timerText = scene.add.text(
            640,
            70,
            "5.0",
            {
                fontSize: "34px",
                color: "#ffffff"
            }
        ).setOrigin(0.5);

        this.container.add([
            timerBg,
            this.timerText
        ]);

        this.createButton(350, 620, "water", "slippery");
        this.createButton(520, 620, "fire", "fire");
        this.createButton(690, 620, "thunder", "electric");
        this.createButton(860, 620, "construction", "construction");
    }

    private createButton(
        x:number,
        y:number,
        texture:string,
        sign:string
    ){

        const bg=this.scene.add.rectangle(
            x,
            y,
            120,
            120,
            0xf4f4f4
        );

        bg.setStrokeStyle(4,0x222222);

        bg.setInteractive({useHandCursor:true});

        bg.on("pointerdown",()=>{

            GameManager.chooseSign(sign);

        });

        const img=this.scene.add.image(
            x,
            y,
            texture
        );

        img.setScale(0.18);

        this.container.add([
            bg,
            img
        ]);

    }

    show(){

        this.container.setVisible(true);

    }

    hide(){

        this.container.setVisible(false);

    }

    updateTimer(time:number){

        this.timerText.setText(time.toFixed(1));

    }

}