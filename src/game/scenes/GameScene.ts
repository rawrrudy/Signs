import Phaser from "phaser";
import NPC from "../entities/NPC";
import Hazard from "../entities/Hazard";
import { GameState, type GameState as GameStateType } from "../types/GameState";
import CameraOverlay from "../entities/Camera";
import Polaroid from "../entities/Polaroid";
import GameManager from "../GameManager";

export default class GameScene extends Phaser.Scene {
  private npc!: NPC;
  private camera!: CameraOverlay;

  private hazardX = 780;

  private state: GameStateType = GameState.Walking;
  private decisionTimer?: Phaser.Time.TimerEvent;

  private polaroid!: Polaroid;

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


    // Correct Sign
    this.input.keyboard?.on("", () => {
      if (this.state !== GameState.Decision) return;
      this.correctChoice();
    });

    // Wrong Signs
    this.input.keyboard?.on("", () => {
      if (this.state !== GameState.Decision) return;
      this.wrongChoice();
    });

    this.input.keyboard?.on("", () => {
      if (this.state !== GameState.Decision) return;
      this.wrongChoice();
    });

    this.input.keyboard?.on("", () => {
      if (this.state !== GameState.Decision) return;
      this.wrongChoice();
    });

    // Camera
    this.input.keyboard?.on("keydown-SPACE", () => {
      if (this.state !== GameState.Camera) return;

      this.camera.capture();

      this.time.delayedCall(220,()=>{

          this.polaroid.show();

      });

      this.state = GameState.Success;

      console.log("Photo Captured");
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

    console.clear();
    console.log("⚠ DECISION");
    console.log("---------------------");
    console.log("1 - Slippery Surface");
    console.log("2 - Fire");
    console.log("3 - High Voltage");
    console.log("4 - Construction");
    console.log("---------------------");

    this.decisionTimer = this.time.delayedCall(5000, () => {
      this.failure();
    });
  }

  private correctChoice() {
    this.decisionTimer?.remove();

    console.log("Correct Sign");

    this.state = GameState.Camera;

    GameManager.hideSigns();

    this.camera.show();

    this.time.delayedCall(800, () => {
      this.npc.resumeWalking();
    });

    console.log("Press SPACE to take the picture.");
  }

  private wrongChoice() {
    this.decisionTimer?.remove();
    this.failure();
  }

  

  public chooseSign(sign: string) {

        console.log("GameScene received:", sign);

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

  private failure() {
    this.state = GameState.Failure;
    GameManager.hideSigns();

    console.log("Wrong");
  }
}