import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

export const useGetRegions = () => {
    const [simpleRegions, setSimpleRegions] = useState([]);
    const dispatch = useDispatch();

    const getList = async () => {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/region`)
        const { results } = data;
        setSimpleRegions(results)
        // const response = {
        //     // ...data,
        //     id: id,
        //     title: title,
        //     description: description,
        //     name: name,
        //     data: data[id][0]
        // }
        return results
    }

    useEffect(() => {
        getList();
    }, [])

    return {
        simpleRegions
    }
}