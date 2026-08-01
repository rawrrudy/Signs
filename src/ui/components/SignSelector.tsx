import GameManager from "../../game/GameManager";
import SignButton from "./SignButton";
import water from "../../assets/water.png";
import fire from "../../assets/fire.png";
import thunder from "../../assets/thunder.png";
import construction from "../../assets/construction.png";
import { useEffect, useState } from "react";
import Timer from "./Timer";

export default function SignSelector() {

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    GameManager.subscribe(setVisible);
  }, []);


  const [time,setTime]=useState(5);

  useEffect(()=>{
 
      GameManager.subscribeTimer(setTime);

  },[]);

if (!visible) return null;

  return (
  <>
    
    <Timer time={time}/>

    <div
      style={{
        position: "fixed",
        bottom: 25,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: 24,
        zIndex: 999999,
      }}
    >
      <SignButton
        image={water}
        label="Slippery"
        onClick={() => GameManager.chooseSign("slippery")}
      />

      <SignButton
        image={fire}
        label="Fire"
        onClick={() => GameManager.chooseSign("fire")}
      />

      <SignButton
        image={thunder}
        label="Electric"
        onClick={() => GameManager.chooseSign("electric")}
      />

      <SignButton
        image={construction}
        label="Construction"
        onClick={() => GameManager.chooseSign("construction")}
      />
    </div>
  </>
  );
}