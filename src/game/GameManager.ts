type GameSceneAPI = {
  chooseSign: (sign: string) => void;
};

class GameManager {

  private scene: GameSceneAPI | null = null;
  private signListeners: ((v:boolean)=>void)[] = [];
  private timerListeners: ((t:number)=>void)[] = [];

  registerScene(scene: GameSceneAPI){
    this.scene = scene;
  }
  chooseSign(sign:string){
    this.scene?.chooseSign(sign);
  }
  subscribe(listener:(v:boolean)=>void){
    this.signListeners.push(listener);
  }
  subscribeTimer(listener:(t:number)=>void){
    this.timerListeners.push(listener);
  }
  showSigns(){
    this.signListeners.forEach(l=>l(true));
  }
  hideSigns(){
    this.signListeners.forEach(l=>l(false));
  }
  updateTimer(time:number){
    this.timerListeners.forEach(l=>l(time));
  }
}

export default new GameManager();