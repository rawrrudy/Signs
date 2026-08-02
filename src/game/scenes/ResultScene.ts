import Phaser from "phaser";
import GameManager from "../GameManager";

export default class ResultScene extends Phaser.Scene {

    constructor() {
        super("ResultScene");
    }


    create() {


        this.cameras.main.setBackgroundColor("#050505");


        this.add.rectangle(
            640,
            360,
            1280,
            720,
            0x000000,
            0.55
        );


        const card = this.add.graphics();


        card.fillStyle(
            0xffffff,
            0.96
        );


        card.lineStyle(
            5,
            0x111111
        );


        card.fillRoundedRect(
            300,
            70,
            680,
            580,
            35
        );


        card.strokeRoundedRect(
            300,
            70,
            680,
            580,
            35
        );

        this.add.text(
            640,
            150,
            "GAME COMPLETE",
            {
                fontFamily:"League Spartan",
                fontSize:"52px",
                color:"#111111",
                fontStyle:"bold"
            }

        ).setOrigin(0.5);



        this.add.text(
            640,
            215,
            "ALL CAUTIONS 'CARDED'",
            {
                fontFamily:"League Spartan",
                fontSize:"28px",
                color:"#555555"
            }

        ).setOrigin(0.5);


        this.add.rectangle(
            640,
            265,
            450,
            3,
            0x111111
        );


        this.add.text(
            640,
            320,
            "RESULT",
            {
                fontFamily:"League Spartan",
                fontSize:"24px",
                color:"#333333",
                fontStyle:"bold"
            }

        ).setOrigin(0.5);



        const stats = [
            "ALPHA CAUTIONS     10 / 10",
            "BETA CAUTION percentage              100%",
            "AURA       EXCELLENT",
            "STATUS                CHUD"
        ];



        stats.forEach((text,index)=>{


            this.add.text(
                640,
                380 + index * 45,
                text,
                {
                    fontFamily:"League Spartan",
                    fontSize:"22px",
                    color:"#222222"
                }

            ).setOrigin(0.5);


        });


        const badge =
            this.add.graphics();


        badge.fillStyle(
            0xffb13b,
            1
        );


        badge.fillRoundedRect(
            490,
            560,
            300,
            55,
            18
        );


        badge.lineStyle(
            4,
            0x111111
        );


        badge.strokeRoundedRect(
            490,
            560,
            300,
            55,
            18
        );



        this.add.text(
            640,
            588,
            " CHUD DUD BLUD ",
            {
                fontFamily:"League Spartan",
                fontSize:"24px",
                color:"#111111",
                fontStyle:"bold"
            }

        ).setOrigin(0.5);




        const button =
            this.add.text(
                640,
                660,
                "PLAY AGAIN",
                {
                    fontFamily:"League Spartan",
                    fontSize:"32px",
                    color:"#ffffff",
                    backgroundColor:"#111111",
                    padding:{
                        left:35,
                        right:35,
                        top:15,
                        bottom:15
                    }
                }
            )
            .setOrigin(0.5)
            .setInteractive({
                useHandCursor:true
            });



        button.on(
            "pointerdown",
            ()=>{

                GameManager.resetGame();

                this.scene.start(
                    "GameScene"
                );

            }
        );


    }

}