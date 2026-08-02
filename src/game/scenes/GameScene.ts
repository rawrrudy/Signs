import Phaser from "phaser";
import NPC from "../entities/NPC";
import CameraOverlay from "../entities/Camera";
import Polaroid from "../entities/Polaroid";
import WarningSign from "../entities/WarningSign";
import SignUI from "../entities/SignUI";
import GameManager from "../GameManager";
import { GameState, type GameState as GameStateType } from "../types/GameState";
import { levels } from "../data/levels";
import EnvironmentManager from "../entities/EnvironmentManager";


export default class GameScene extends Phaser.Scene {


    private npc!: NPC;
    private camera!: CameraOverlay;
    private polaroid!: Polaroid;
    private warningSign!: WarningSign;
    private signUI!: SignUI;
    private environment!: EnvironmentManager;


    private currentLevel!: number;
    private hazardX!: number;


    private state: GameStateType = GameState.Walking;

    private decisionTimer?: Phaser.Time.TimerEvent;



    constructor(){

        super("GameScene");

    }



    create(){


        // RESET EVERYTHING WHEN LEVEL STARTS

        this.state = GameState.Walking;

        this.decisionTimer?.remove();

        this.decisionTimer = undefined;



        GameManager.registerScene(this);



        this.currentLevel = GameManager.getCurrentLevel();



        this.cameras.main.setBackgroundColor("#000000");



        const level = levels[this.currentLevel];



        this.hazardX = 780;



        const bg = this.add.image(
            640,
            360,
            level.background
        );

        bg.setDisplaySize(1280,720);



        this.camera = new CameraOverlay(this);



        this.npc = new NPC(
            this,
            120,
            360
        );


        // speed increases every level

        this.npc.speed = 120 + this.currentLevel * 15;



        this.warningSign = new WarningSign(
            this,
            this.hazardX + 170,
            330
        );



        this.polaroid = new Polaroid(this);



        this.signUI = new SignUI(this);
        this.environment = new EnvironmentManager(this);
        this.environment.startRandomEnvironment();



        // REMOVE OLD KEY LISTENERS

        this.input.keyboard?.removeAllListeners();



        this.input.keyboard?.on(
            "keydown-SPACE",
            ()=>{


                if(this.state !== GameState.Camera)
                    return;



                this.camera.capture();



                this.time.delayedCall(
                    220,
                    ()=>{


                        this.polaroid.show();



                        this.time.delayedCall(
                            2500,
                            ()=>{


                                console.log(
                                    "GOING TO COMPLETE"
                                );


                                this.scene.stop("GameScene");

                                this.scene.start(
                                    "LevelCompleteScene"
                                );


                            }
                        );


                    }
                );



                this.state = GameState.Success;


            }
        );

    }





    update(
        _:number,
        delta:number
    ){


        // NPC ALWAYS UPDATES WHILE WALKING

        this.npc.update(delta);



        if(
            this.state === GameState.Walking &&
            this.npc.x >= 300
        ){

            this.startDecisionPhase();

        }


    }





    private startDecisionPhase(){


        this.state = GameState.Decision;



        this.npc.stopWalking();



        this.signUI.show();



        let remaining =
            levels[this.currentLevel].time;



        this.signUI.updateTimer(
            remaining
        );



        this.time.addEvent({

            delay:100,

            repeat:Math.floor(
                remaining * 10
            ),

            callback:()=>{


                remaining -= 0.1;


                this.signUI.updateTimer(
                    Math.max(
                        remaining,
                        0
                    )
                );


            }

        });



        this.decisionTimer =
            this.time.delayedCall(

                remaining * 1000,

                ()=>this.failure()

            );


    }





    public chooseSign(sign:string){


        if(
            this.state !== GameState.Decision
        )
            return;



        if(
            sign === levels[this.currentLevel].answer
        ){

            this.correctChoice();

        }

        else{

            this.wrongChoice();

        }


    }





    private correctChoice(){


        this.decisionTimer?.remove();



        this.signUI.hide();



        this.warningSign.place();



        this.npc.resumeWalking();



        this.state = GameState.Camera;



        this.time.delayedCall(

            1000,

            ()=>{


                this.npc.stopWalking();



                this.camera.show();


            }

        );


    }





    private wrongChoice(){


        this.decisionTimer?.remove();


        this.failure();


    }





    private failure(){


        this.decisionTimer?.remove();



        this.signUI.hide();



        this.state = GameState.Failure;



        this.scene.start(
            "FailureScene"
        );


    }


}