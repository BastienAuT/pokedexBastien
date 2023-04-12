import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Left.scss";

const Left = ({ setSelectedPokemon }) => {
  const [pokemonList, setPokemonList] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://pokebuildapi.fr/api/v1/pokemon/generation/1"
        );
        setPokemonList(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const handleClick = (pokemon) => {
    setSelectedPokemon(pokemon);
    console.log("Selected Pokemon: ", pokemon);
  };

  if (!pokemonList) {
    return <div>Loading...</div>;
  }

  return (
    <div className="left">
      {pokemonList.map((pokemon) => (
        <div
          className="card"
          key={pokemon.id}
          onClick={() => handleClick(pokemon)}
        >
          <div className="number">{pokemon.number}</div>
          <img className="image" src={pokemon.image} alt={pokemon.name} />
          <span className="name">{pokemon.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Left;
