import BootScene from "../game/scenes/BootScene";
import MenuScene from "../game/scenes/MenuScene";
import ResultScene from "../game/scenes/ResultScene";
import GameScene from "../game/scenes/GameScene";
import { useEffect, useRef } from "react";
import Phaser from "phaser";

export default function GameCanvas() {
  const gameRef = useRef<Phaser.Game | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gameRef.current || !containerRef.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 1280,
      height: 720,
      backgroundColor: "#1b1b1b",
      parent: containerRef.current,
      scene: [
        BootScene,
        MenuScene,
        GameScene,
        ResultScene,
      ],
    };

    gameRef.current = new Phaser.Game(config);

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, []);

  return <div ref={containerRef} />;
}