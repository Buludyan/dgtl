import { gameSlice } from '../slices/gameSlice';
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        game: gameSlice.reducer
    }
})