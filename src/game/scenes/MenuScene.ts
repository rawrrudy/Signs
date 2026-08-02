import Phaser from "phaser";

export default class MenuScene extends Phaser.Scene {

  constructor() {
    super("MenuScene");
  }


  create() {


    const bg = this.add.image(640, 360, "arcana");
    bg.setDisplaySize(1280, 720);


    this.add.rectangle(
        640,
        360,
        1280,
        720,
        0x000000,
        0.45
    );



    const card = this.add.graphics();

    card.fillStyle(0xffffff, 0.92);
    card.lineStyle(5, 0x111111);

    card.fillRoundedRect(
        330,
        120,
        620,
        420,
        28
    );

    card.strokeRoundedRect(
        330,
        120,
        620,
        420,
        28
    );



    const logo = this.add.image(
        640,
        330,
        "logo"
    );

    logo.setDisplaySize(
        560,
        360
    );



    const playButton = this.add.graphics();


    playButton.fillStyle(
        0xffb13b,
        1
    );

    playButton.lineStyle(
        5,
        0x111111
    );


    playButton.fillRoundedRect(
        470,
        550,
        340,
        70,
        22
    );


    playButton.strokeRoundedRect(
        470,
        550,
        340,
        70,
        22
    );



    const playText = this.add.text(
        640,
        585,
        "PLAY",
        {
            fontFamily:"League Spartan",
            fontSize:"38px",
            color:"#111111",
            fontStyle:"bold"
        }
    )
    .setOrigin(0.5);




    const hitbox = this.add.rectangle(
        640,
        585,
        340,
        70,
        0x000000,
        0
    );


    hitbox.setInteractive({
        useHandCursor:true
    });



    hitbox.on(
        "pointerover",
        ()=>{

            playButton.clear();


            playButton.fillStyle(
                0xffc45c,
                1
            );


            playButton.lineStyle(
                5,
                0x111111
            );


            playButton.fillRoundedRect(
                470,
                550,
                340,
                70,
                22
            );


            playButton.strokeRoundedRect(
                470,
                550,
                340,
                70,
                22
            );


            playText.setScale(1.05);

        }
    );




    hitbox.on(
        "pointerout",
        ()=>{

            playButton.clear();


            playButton.fillStyle(
                0xffb13b,
                1
            );


            playButton.lineStyle(
                5,
                0x111111
            );


            playButton.fillRoundedRect(
                470,
                550,
                340,
                70,
                22
            );


            playButton.strokeRoundedRect(
                470,
                550,
                340,
                70,
                22
            );


            playText.setScale(1);

        }
    );





    hitbox.on(
        "pointerdown",
        ()=>{


            if(!this.sound.get("background")){


                const music =
                    this.sound.add(
                        "background",
                        {
                            volume:0.35,
                            loop:true
                        }
                    );


                music.play();

            }



            this.scene.start(
                "GameScene"
            );

        }
    );


  }

}