import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

export const useGetRegions = () => {
    const [simpleRegions, setSimpleRegions] = useState([]);
    const dispatch = useDispatch();

    const getList = async () => {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/region`)
        const { results } = data;

        const newData = results.map((value) => {
            return {
                ...value,
                urlImage: `https://res.cloudinary.com/dd0myqhyb/image/upload/v1664082977/Apps/PokemonPlaces/${value.name}.png`,
            }
        })
        setSimpleRegions(newData)
        return newData
    }

    useEffect(() => {
        getList();
    }, [])

    return {
        simpleRegions
    }
}