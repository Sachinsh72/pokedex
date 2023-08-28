import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PokemonDetails.css'
import usePokemonList from "../../hooks/usePokemonList";

function PokemonDetails(){

    const {id} = useParams();
    // console.log(id);
    const [pokemon, setPokemon] = useState({});
    async function downloadPokemon(){
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        setPokemon({
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map((t)=> t.type.name)
        })
    }

    const {pokemonListState} = usePokemonList('https://pokeapi.co/api/v2/type/fire', true);
    
    useEffect(()=>{
        downloadPokemon();
        console.log("List: ",pokemonListState);
    }, []);

    return(
        <div className="pokemon-defaults-wrapper">
            <img className="pokemon-deatils-image" src={pokemon.image}/>
            <div className="pokeemon-deatils-name"><span>{pokemon.name}</span> </div>
            <div className="pokeemon-deatils-name">Height: {pokemon.height}</div>
            <div className="pokeemon-deatils-name">Weight:{pokemon.weight}</div>
            <div className="pokemon-deatils-types">
                {pokemon.types && pokemon.types.map((t)=> <div key={t}>{t}</div>)}
            </div>

            <div> 
                more fire type pokemons
                <ul>
                    {pokemonListState.pokemonList && pokemonListState.pokemonList.map((p) => <li key={p.pokemon.url}>{p.pokemon.name}</li>)}
                </ul>
            </div>
        </div>
    )
}

export default PokemonDetails;