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
            state.pokemons.push(action.payload);
        },
        deletePokemons: (state, action) => {
            const index = state.pokemons?.findIndex(i => i.id === action.payload);
            state.pokemons.splice(index, 1);
        },
        deleteAllPokemons: (state) => {
            state.pokemons.splice(0);
        },
    },
});

export const { selectItemPokemon, addPokemons, deletePokemons, deleteAllPokemons } =
    authSlice.actions;
export default authSlice.reducer;
