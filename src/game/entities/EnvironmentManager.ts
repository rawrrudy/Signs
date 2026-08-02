import Phaser from "phaser";

export default class EnvironmentManager {

    private scene: Phaser.Scene;

    private effects = [
        "rain",
        "snow",
        "fog",
        "lightning",
        "shake",
        "glitch",
        "darkness"
    ];


    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }


    startRandomEnvironment() {

        const amount = Phaser.Math.Between(1, 2);

        const selected =
            Phaser.Utils.Array.Shuffle(this.effects)
            .slice(0, amount);

        console.log("Environment:", selected);
        selected.forEach(effect => {

            switch(effect) {

                case "rain":
                    this.rain();
                    break;

                case "snow":
                    this.snow();
                    break;

                case "fog":
                    this.fog();
                    break;

                case "lightning":
                    this.lightning();
                    break;

                case "shake":
                    this.shake();
                    break;

                case "glitch":
                    this.glitch();
                    break;

                case "darkness":
                    this.darkness();
                    break;
            }
        });
    }

    private rain(){

        const rain = this.scene.add.graphics();

        rain.setDepth(100);

        for(let i = 0; i < 500; i++){

            const x = Phaser.Math.Between(0,1280);
            const y = Phaser.Math.Between(0,720);

            rain.lineStyle(
                2,
                0x77bbff,
                0.9
            );

            rain.lineBetween(
                x,
                y,
                x - 5,
                y + 45
            );
        }

        this.scene.tweens.add({
            targets: rain,
            y:100,
            duration:300,
            repeat:-1,
            onRepeat:()=>{

                rain.clear();

                for(let i=0;i<150;i++){

                    const x =
                    Phaser.Math.Between(0,1280);

                    const y =
                    Phaser.Math.Between(0,720);


                    rain.lineStyle(
                        2,
                        0x99ccff,
                        0.6
                    );


                    rain.lineBetween(
                        x,
                        y,
                        x-5,
                        y+20
                    );
                }
            } 
        });
    }



    private snow(){

        const snow =
            this.scene.add.graphics();
        snow.setDepth(100);

        for(let i=0;i<100;i++){
            snow.fillStyle(
                0xffffff,
                0.8
            );

            snow.fillCircle(
                Phaser.Math.Between(0,1280),
                Phaser.Math.Between(0,720),
                Phaser.Math.Between(2,5)
            );
        }

        this.scene.tweens.add({
            targets:snow,
            y:80,
            duration:5000,
            repeat:-1,
            yoyo:true
        });
    }



    private fog(){

        const fog =
            this.scene.add.rectangle(
                640,
                360,
                1280,
                720,
                0xffffff,
                0.45
            );

        fog.setDepth(999);

        this.scene.tweens.add({
            targets:fog,
            alpha:{
                from:0.25,
                to:0.55
            },

            duration:2000,
            yoyo:true,
            repeat:-1
        });
    }


    private lightning(){

        this.scene.time.addEvent({

            delay:Phaser.Math.Between(800,2000),

            loop:true,

            callback:()=>{

                this.scene.cameras.main.flash(
                    80,
                    255,
                    255,
                    255
                );
            }
        });
    }



    private shake(){

        this.scene.time.addEvent({
            delay:800,
            loop:true,

            callback:()=>{
                this.scene.cameras.main.shake(
                    300,
                    0.025
                );
            }
        });
    }

    private darkness(){

        const dark =
            this.scene.add.rectangle(
                640,
                360,
                1280,
                720,
                0x000000,
                0.55
            );

        dark.setDepth(95);
    }



    private glitch(){

        const overlay =
            this.scene.add.rectangle(
                640,
                360,
                1280,
                720,
                0xff0000,
                0.35
            );


        overlay.setDepth(200);



        this.scene.time.addEvent({
            delay:Phaser.Math.Between(3000,5000),
            loop:true,

            callback:()=>{
                overlay.setAlpha(
                    Phaser.Math.FloatBetween(
                        0.1,
                        0.4
                    )
                );


                this.scene.time.delayedCall(
                    100,
                    ()=>overlay.setAlpha(0)
                );

            }

        });

    }

}