import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Right.scss";

const Right = ({ selectedPokemon }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemon, setPokemon] = useState(null);
  const [evo, setEvo] = useState({});
  const [hasEvolutions, setHasEvolutions] = useState(false);


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
  const fetchEvoData = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon.id + 1}`);
      const data = await response.json();
      const sprite = data.sprites.front_default;
      setEvo({ ...data, sprite });
    } catch (error) {
      console.log(error);
    }
  };
  fetchEvoData();
}, [selectedPokemon]);


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
    return <div className="select">Choisissez un pokemon de la liste afin d'avoir ses stats et son evolution...</div>;
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
        <img className="bigPicture" src={pokemon.image} alt={pokemon.name} />
        <div className="stats">
          <span>HP : {hp}</span>
          <span>ATTACK : {attack}</span>
          <span>DEFENSE : {defense}</span>
          <span>ATTK. SPE : {specialAttack}</span>
          <span>DEF. SPE : {specialDefense}</span>
          <span>VITESSE : {speed}</span>
        </div>
      </div>
      <p>{pokemon.description}</p>
      {pokemon.apiEvolutions && pokemon.apiEvolutions.length > 0 ? (
        <div className="evolutions">
          {evo.sprite && <img className="sprite" src={evo.sprite} alt={`${evo.name} sprite`} />}
          {pokemon.apiEvolutions.map((evo) => (
            <div key={evo.id}>
              {evo.sprite && (
                <img className="sprite" src={evo.sprite} alt={`${evo.name} sprite`} />
              )}
              <span>Evolue en : {evo.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-evolutions">Ce pokemon n'a pas d'évolutions.</div>
      )}
    </div>
  );
};

export default Right;
