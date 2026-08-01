import Phaser from "phaser";
import NPC from "../entities/NPC";
import Hazard from "../entities/Hazard";
import CameraOverlay from "../entities/Camera";
import Polaroid from "../entities/Polaroid";
import GameManager from "../GameManager";
import { GameState, type GameState as GameStateType } from "../types/GameState";

export default class GameScene extends Phaser.Scene {

    private npc!: NPC;
    private camera!: CameraOverlay;
    private polaroid!: Polaroid;
    private hazardX = 780;
    private state: GameStateType = GameState.Walking;
    private decisionTimer?: Phaser.Time.TimerEvent;

    constructor() {
        super("GameScene");
    }

    create() {
        GameManager.registerScene(this);
        this.cameras.main.setBackgroundColor("#000000");

        this.camera = new CameraOverlay(this);

        const road = this.add.image(640, 360, "road");
        road.setDisplaySize(1280, 720);

        new Hazard(this, this.hazardX, 360);

        this.npc = new NPC(this, 120, 360);

        this.polaroid = new Polaroid(this);

        this.input.keyboard?.on("keydown-SPACE", () => {
            if (this.state !== GameState.Camera) return;

            this.camera.capture();

            this.time.delayedCall(220, () => {
                this.polaroid.show();
            });

            this.state = GameState.Success;
            console.log("Photo Captured!");
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
    }

    private startDecisionPhase() {

        this.state = GameState.Decision;
        GameManager.showSigns();
        this.npc.stopWalking();

        let remaining = 5;

        GameManager.updateTimer(remaining);

        this.time.addEvent({
            delay: 100,
            repeat: 49,

            callback: () => {
                remaining -= 0.1;
                GameManager.updateTimer(
                    Math.max(remaining, 0)
                );
            }
        });

        this.decisionTimer = this.time.delayedCall(5000, () => {
            this.failure();
        });
    }

    public chooseSign(sign: string) {

        if (this.state !== GameState.Decision) return;

        switch (sign) {

            case "slippery":
                this.correctChoice();
                break;

            default:
                this.wrongChoice();
                break;
        }
    }

    private correctChoice() {

        this.decisionTimer?.remove();
        GameManager.hideSigns();
        this.state = GameState.Camera;
        this.camera.show();

        this.time.delayedCall(800, () => {
            this.npc.resumeWalking();
        });
    }

    private wrongChoice() {
        this.decisionTimer?.remove();
        this.failure();
    }

    private failure() {
        GameManager.hideSigns();
        this.state = GameState.Failure;
        console.log("Wrong Sign!");
    }
}