import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/auth';
import pokemonReducer from '../features/pokemon/pokemon';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        pokemon: pokemonReducer,
    },
});
