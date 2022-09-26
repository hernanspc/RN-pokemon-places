import { Alert } from 'react-native'
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    pokemonItem: [],
    pokemons: []
};

const authSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        selectItemPokemon: (state, action) => {
            state.pokemonItem = action.payload;
        },
        addPokemons: (state, action) => {
            // console.log('length', state.pokemons.length)

            // if (state.pokemons.length < 3) {
            //     Alert.alert('Por favor seleccione como mínimo 3 pokemones')
            // } else if (state.pokemons.length <= 6) {
            //     state.pokemons.push(action.payload);
            // } else {
            //     Alert.alert('No puede agregar mas de 6 pokemones')
            // }
            state.pokemons.push(action.payload);

        },
    },
});

export const { selectItemPokemon, addPokemons } =
    authSlice.actions;
export default authSlice.reducer;
