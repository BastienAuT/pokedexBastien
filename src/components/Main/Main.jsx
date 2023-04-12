import React, { useState } from "react";
import "./Main.scss";
import Left from "../Left/Left";
import Right from "./../Right/Right";

const Main = () => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  console.log("Selected Pokemon in Main: ", selectedPokemon);
  return (
    <div className="container">
      <Left setSelectedPokemon={setSelectedPokemon} />
      <Right selectedPokemon={selectedPokemon} />
    </div>
  );
};

export default Main;
