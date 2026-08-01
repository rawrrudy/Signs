import { useEffect, useRef } from "react";
import Phaser from "phaser";
import LevelCompleteScene from "../game/scenes/LevelCompleteScene";
import BootScene from "../game/scenes/BootScene";
import MenuScene from "../game/scenes/MenuScene";
import GameScene from "../game/scenes/GameScene";
import ResultScene from "../game/scenes/ResultScene";
import FailureScene from "../game/scenes/FailureScene";

export default function GameCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!containerRef.current || gameRef.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,

      parent: containerRef.current,

      backgroundColor: "#000000",

      pixelArt: true,

      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 720,
      },

      scene: [
        BootScene,
        MenuScene,
        GameScene,
        LevelCompleteScene,
        FailureScene,
        ResultScene,
      ],
    };

    gameRef.current = new Phaser.Game(config);

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#000",
      }}
    />
  );
}