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
        const newArray = data?.pokemon_species.map((element) => {
            const urlParts = element.url.split('/');
            const id = urlParts[urlParts.length - 2];

            return {
                ...element,
                id: id,
                isSelected: false,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
            }
        })

        setSimpleListPokemon(newArray)
        setIsLoading(false);
    }

    const changeStatus = (id) => {
        // console.log('id ', simpleListPokemon[id])
        const ab = simpleListPokemon.filter(value => value.id === id)
        ab.map(e => { e.isSelected = true }
            // console.log('value ', value)
        )



    }

    useEffect(() => {
        getList();
    }, [])

    return {
        simpleListPokemon,
        isLoading,
        getList,
        changeStatus
    }
}