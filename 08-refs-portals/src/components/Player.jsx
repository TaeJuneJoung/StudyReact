import { useState, useRef } from "react";

export default function Player() {
  const playerName = useRef();
  const [editPlayerName, setEditPlayerName] = useState(null);

  function handlerClick() {
    setEditPlayerName(playerName.current.value);
  }

  return (
    <section id="player">
      <h2>Welcome {editPlayerName ?? "unknown entity"}</h2>
      <p>
        <input type="text" ref={playerName} />
        <button onClick={handlerClick}>Set Name</button>
      </p>
    </section>
  );
}
