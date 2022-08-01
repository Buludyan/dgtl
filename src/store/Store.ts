import { gameReducer } from './../slices/gameSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
