type GameSceneAPI = {
    chooseSign: (sign: string) => void;
};

class GameManager {

    private scene: GameSceneAPI | null = null;
    private currentLevel = 0;

    registerScene(scene: GameSceneAPI) {
        this.scene = scene;
    }

    chooseSign(sign: string) {
        this.scene?.chooseSign(sign);
    }

    getCurrentLevel() {
        return this.currentLevel;
    }

    nextLevel() {
        this.currentLevel++;
    }

    restartLevel() {}

    resetGame() {
        this.currentLevel = 0;
    }

}

export default new GameManager();