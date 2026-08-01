type GameSceneAPI = {
    chooseSign: (sign: string) => void;
};

class GameManager {

    private scene: GameSceneAPI | null = null;

    private signListeners: ((v: boolean) => void)[] = [];
    private timerListeners: ((t: number) => void)[] = [];

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

    restartLevel() {

    }

    resetGame() {
        this.currentLevel = 0;
    }

    subscribe(listener: (v: boolean) => void) {
        this.signListeners.push(listener);
    }

    showSigns() {
        this.signListeners.forEach(listener => listener(true));
    }

    hideSigns() {
        this.signListeners.forEach(listener => listener(false));
    }


    subscribeTimer(listener: (t: number) => void) {
        this.timerListeners.push(listener);
    }

    updateTimer(time: number) {
        this.timerListeners.forEach(listener => listener(time));
    }

}

export default new GameManager();