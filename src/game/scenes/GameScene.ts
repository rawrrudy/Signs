import Phaser from "phaser";
import NPC from "../entities/NPC";
import Hazard from "../entities/Hazard";
import { GameState, type GameState as GameStateType } from "../types/GameState";

export default class GameScene extends Phaser.Scene {
  private npc!: NPC;
  private hazardX = 950;
  private state: GameStateType = GameState.Walking;
  private decisionTimer?: Phaser.Time.TimerEvent;

  constructor() {
    super("GameScene");
  }

  create() {
    this.cameras.main.setBackgroundColor("#E8E6E3");

    this.add.rectangle(640, 360, 1280, 720, 0xe8e6e3);
    this.add.rectangle(640, 360, 1280, 140, 0x7d7d7d);
    this.add.rectangle(640, 260, 1280, 40, 0xcfcfcf);
    new Hazard(this, this.hazardX, 360);
    this.npc = new NPC(this, 120, 360);

    // keyboard inp.

    // correct
    this.input.keyboard?.on("keydown-ONE", () => {
      if (this.state !== GameState.Decision) return;

      this.correctChoice();
    });

    // wrong 
    this.input.keyboard?.on("keydown-TWO", () => {
      if (this.state !== GameState.Decision) return;

      this.wrongChoice();
    });

    this.input.keyboard?.on("keydown-THREE", () => {
      if (this.state !== GameState.Decision) return;

      this.wrongChoice();
    });

    this.input.keyboard?.on("keydown-FOUR", () => {
      if (this.state !== GameState.Decision) return;

      this.wrongChoice();
    });
  }

  update(_: number, delta: number) {
    this.npc.update(delta);

    if (
      this.state === GameState.Walking &&
      this.npc.x >= this.hazardX - 200
    ) {
      this.startDecisionPhase();
    }
  }

  private startDecisionPhase() {
    this.state = GameState.Decision;

    this.npc.stop();

    console.log("⚠ Choose the correct warning sign!");
    console.log("1 = Slippery");
    console.log("2 = Fire");
    console.log("3 = High Voltage");
    console.log("4 = Construction");

    this.decisionTimer = this.time.delayedCall(5000, () => {
      this.failure();
    });
  }

  private correctChoice() {
    this.decisionTimer?.remove();

    console.log("Correct!");

    this.state = GameState.Camera;

    this.time.delayedCall(800, () => {
      this.npc.resume();

      this.state = GameState.Success;

      console.log("Click on the button to capture");
    });
  }

  private wrongChoice() {
    this.decisionTimer?.remove();

    this.failure();
  }

  private failure() {
    this.state = GameState.Failure;

    console.log("Wrong choice!");
  }
}