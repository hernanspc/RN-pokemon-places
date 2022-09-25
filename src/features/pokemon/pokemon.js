import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    pokemonItem: [],
};

const authSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        selectItemPokemon: (state, action) => {
            state.pokemonItem = action.payload;
        },
    },
});

export const { selectItemPokemon } =
    authSlice.actions;
export default authSlice.reducer;
