import Phaser from "phaser";
import NPC from "../entities/NPC";
import CameraOverlay from "../entities/Camera";
import Polaroid from "../entities/Polaroid";
import GameManager from "../GameManager";
import { GameState, type GameState as GameStateType } from "../types/GameState";
import { levels } from "../data/levels";
import WarningSign from "../entities/WarningSign";

export default class GameScene extends Phaser.Scene {

    private npc!: NPC;
    private camera!: CameraOverlay;
    private polaroid!: Polaroid;

    private currentLevel!: number;
    private hazardX = 780;

    private state: GameStateType = GameState.Walking;
    private decisionTimer?: Phaser.Time.TimerEvent;
    private warningSign!: WarningSign;

    constructor() {
        super("GameScene");
    }

    create() {
        console.log("NEW GameScene instance", Math.random());

        GameManager.registerScene(this);

        this.currentLevel = GameManager.getCurrentLevel();

        // Clean up when leaving this scene
        this.events.once("shutdown", () => {
            this.input.keyboard?.removeAllListeners();
            this.time.removeAllEvents();
        });

        this.cameras.main.setBackgroundColor("#000000");

        const level = levels[this.currentLevel];

        const bg = this.add.image(640, 360, level.background);
        bg.setDisplaySize(1280, 720);

        this.camera = new CameraOverlay(this);

        this.npc = new NPC(this, 120, 360);

        this.warningSign = new WarningSign(
            this,
            this.hazardX,
            360
        );

this.polaroid = new Polaroid(this);

        // Camera capture
        this.input.keyboard?.on("keydown-SPACE", () => {

            if (this.state !== GameState.Camera) return;

            this.camera.capture();

            this.time.delayedCall(220, () => {

                this.polaroid.show();

                this.time.delayedCall(3000, () => {

                    this.scene.start("LevelCompleteScene");

                });

            });

            this.state = GameState.Success;

        });

    }

    update(_: number, delta: number) {

        this.npc.update(delta);

        if (
            this.state === GameState.Walking &&
            this.npc.x >= this.hazardX - 180
        ) {
            this.startDecisionPhase();
        }

        if (
            this.state === GameState.Success &&
            this.npc.x >= this.hazardX + 150
        ) {

            this.state = GameState.Camera;

            this.camera.show();

        }

    }

    private startDecisionPhase() {
        console.log("START DECISION", this.currentLevel);
        console.log("Calling showSigns()");
        GameManager.showSigns();

        this.state = GameState.Decision;

        GameManager.showSigns();

        this.npc.stopWalking();

        let remaining = levels[this.currentLevel].time;

        GameManager.updateTimer(remaining);

        this.time.addEvent({

            delay: 100,
            repeat: Math.floor(remaining * 10),

            callback: () => {

                remaining -= 0.1;

                GameManager.updateTimer(
                    Math.max(remaining, 0)
                );

            }

        });

        this.decisionTimer = this.time.delayedCall(
            remaining * 1000,
            () => this.failure()
        );

    }

    public chooseSign(sign: string) {

        if (this.state !== GameState.Decision) return;

        if (sign === levels[this.currentLevel].answer) {

            this.correctChoice();

        } else {

            this.wrongChoice();

        }

    }

    private correctChoice() {

        this.decisionTimer?.remove();

        GameManager.hideSigns();

        this.warningSign.place();

        this.npc.resumeWalking();

        this.state = GameState.Success;

    }

    private wrongChoice() {

        this.decisionTimer?.remove();

        this.failure();

    }

    private failure() {

        GameManager.hideSigns();

        this.state = GameState.Failure;

        console.log("Wrong Sign");

    }

}