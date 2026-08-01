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
      scene: {
        create() {
          this.add
            .text(640, 360, "SIGNS", {
              fontSize: "48px",
              color: "#ffffff",
            })
            .setOrigin(0.5);
        },
      },
    };

    gameRef.current = new Phaser.Game(config);

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, []);

  return <div ref={containerRef} />;
}