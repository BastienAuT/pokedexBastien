import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Left.scss";

const Left = ({ setSelectedPokemon }) => {
  const [pokemonList, setPokemonList] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://pokebuildapi.fr/api/v1/pokemon/generation/1?lang=fr"
        );
        setPokemonList(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const typeColors = {
    normal: "#A8A878",
    feu: "#F08030",
    combat: "#C03028",
    eau: "#6890F0",
    vol: "#A890F0",
    plante: "#78C850",
    poison: "#A040A0",
    électrik: "#F8D030",
    sol: "#E0C068",
    psy: "#F85888",
    roche: "#B8A038",
    glace: "#98D8D8",
    insecte: "#A8B820",
    dragon: "#7038F8",
    spectre: "#705898",
    ténèbres: "#705848",
    acier: "#B8B8D0",
    fée: "#EE99AC",
  };

  function handleClick(pokemon) {
    setSelectedPokemon(pokemon);
  }

  if (!pokemonList) {
    return (
      <div className="loader">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="left">
      {pokemonList.map((pokemon) => {
        const bgBorder = `10px double rgba(0, 0, 0, 0.4)`;
        const bgColor =
          pokemon.apiTypes.length > 1
            ? typeColors[pokemon.apiTypes[1].name.toLowerCase()]
            : typeColors[pokemon.apiTypes[0].name.toLowerCase()];
        return (
          <div
            className={`card ${pokemon.apiTypes
              .map((typeObj) => typeObj.name.toLowerCase())
              .join(" ")}`}
            key={pokemon.id}
            onClick={() => handleClick(pokemon)}
            style={{
              backgroundColor: bgColor,
              border: bgBorder,
            }}
          >
            <div className="number">{pokemon.number}</div>
            <img className="image" src={pokemon.image} alt={pokemon.name} />
            <span className="name">{pokemon.name}</span>
            <div className="types">
              
              {pokemon.apiTypes.map((typeObj, index) => (
                <div
                  key={index}
                  className={`type ${typeObj.name.toLowerCase()}`}
                  style={{
                    textShadow: `rgba(0,0,0,0.8)`,
                    
                  }}
                >
                  {typeObj.name}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Left;
