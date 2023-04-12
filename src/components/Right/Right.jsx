import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Right.scss";

const Right = ({ selectedPokemon }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://pokebuildapi.fr/api/v1/pokemon/generation/1"
        );
        setPokemonData(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    console.log("selectedPokemon:", selectedPokemon);
    console.log("pokemonData:", pokemonData);

    if (pokemonData && selectedPokemon) {
      const pokemon = pokemonData.find((p) => p.id === selectedPokemon.id);
      console.log("pokemon:", pokemon);
      setPokemon(pokemon);
    }
  }, [pokemonData, selectedPokemon]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  const hp = pokemon.stats.HP;
  const attack = pokemon.stats.attack;
  const defense = pokemon.stats.defense;
  const specialAttack = pokemon.stats.special_attack;
  const specialDefense = pokemon.stats.special_defense;
  const speed = pokemon.stats.speed;

  return (
    <div className="right">
      <div className="pokemon">
        <span className="name">{pokemon.name}</span>
        <div className="number">{pokemon.number}</div>
        <div className="picture">
          <img className="bigPicture" src={pokemon.image} alt={pokemon.name} />
        </div>

        <div className="stats">
          <span>HP : {hp}</span>
          <span>ATTACK : {attack}</span>
          <span>DEFENSE : {defense}</span>
          <span>ATTK. SPE{specialAttack}</span>
          <span>DEF. SPE{specialDefense}</span>
          <span>VITESSE{speed}</span>
          <span>TOTAL{pokemon.stats.total}</span>
        </div>
      </div>
      <p>{pokemon.description}</p>
    </div>
  );
};

export default Right;
