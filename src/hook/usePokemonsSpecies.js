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
        // const { results } = data;
        // const newData = results.map((value) => {
        //     return {
        //         ...value,
        //         urlImage: `https://res.cloudinary.com/dd0myqhyb/image/upload/v1664082977/Apps/PokemonPlaces/${value.name}.png`,
        //     }
        // })
        // setSimpleRegions(newData)
        getPokemons(urlEspecies)
    }

    const getPokemons = async (url) => {
        const { data } = await axios.get(`${url}`)
        setSimpleListPokemon(data?.pokemon_species)
        setIsLoading(false);
    }

    useEffect(() => {
        getList();
    }, [])

    return {
        simpleListPokemon,
        isLoading
    }
}