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
    },
});

export const { selectItemPokemon, addPokemons } =
    authSlice.actions;
export default authSlice.reducer;
