import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

export const usePokemonsSpecies = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [simpleListPokemon, setSimpleListPokemon] = useState([]);
    const dispatch = useDispatch();

    const { pokemonItem } = useSelector(state => state.pokemon);

    const getList = async () => {
        setIsLoading(true)
        const { data } = await axios.get(`${pokemonItem.url}`)
        const urlEspecies = data?.main_generation?.url;
        getPokemons(urlEspecies)
    }

    const getPokemons = async (url) => {
        const { data } = await axios.get(`${url}`)
        // https://pokeapi.co/api/v2/pokemon/bulbasaur

        const newArray = data?.pokemon_species.map((element) => {
            const urlParts = element.url.split('/');
            const id = urlParts[urlParts.length - 2];

            return {
                ...element,
                id: id,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
            }
        })

        setSimpleListPokemon(newArray)
        setIsLoading(false);
    }

    useEffect(() => {
        getList();
    }, [])

    return {
        simpleListPokemon,
        isLoading,
        getList
    }
}