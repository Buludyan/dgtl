import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RowData } from '../types/types';

export type Initial = {
  secretNum: number[];
  disabledValues: number[];
  rowsCount: number[];
  ceilsCount: number[];
  tableData: RowData[];
  currentRow: number;
  curRowData: number[];
  isGameEnd: null | 'win' | 'lose';
  isStatsOpen: boolean;
  gameMod: 'daily' | 'practice';
};

const initialState: Initial = {
  secretNum: [],
  disabledValues: [],
  rowsCount: [1, 2, 3, 4, 5],
  ceilsCount: [1, 2, 3, 4, 5, 6],
  tableData: [],
  currentRow: 1,
  curRowData: [],
  isGameEnd: null,
  isStatsOpen: false,
  gameMod: 'daily',
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setAllData: (state, action) => {
      const { secretNum, disabledValues, tableData, currentRow, curRowData, isGameEnd } =
        action.payload;

      state.secretNum = secretNum;
      state.disabledValues = disabledValues;
      state.tableData = tableData;
      state.currentRow = currentRow;
      state.curRowData = curRowData;
      state.isGameEnd = isGameEnd;
    },
    setSecretNum: (state, action: PayloadAction<number[]>) => {
      state.secretNum = action.payload;
    },
    setDisabledValues: (state, action: PayloadAction<number[]>) => {
      state.disabledValues = [...state.disabledValues, ...action.payload];
    },
    setValue: (state, action: PayloadAction<number>) => {
      if (state.curRowData.length < state.ceilsCount.length) {
        state.curRowData.push(action.payload);
      }
    },
    removeValue: (state) => {
      if (state.curRowData.length > 0) {
        state.curRowData.pop();
      }
    },
    goNextRow: (state, action: PayloadAction<RowData>) => {
      state.currentRow = ++state.currentRow;
      state.tableData.push(action.payload);
      state.curRowData = [];
    },
    setGameEnd: (state, action: PayloadAction<'win' | 'lose'>) => {
      state.isGameEnd = action.payload;
    },
    restartGame: (state, action: PayloadAction<number[]>) => {
      state.secretNum = action.payload;
      state.disabledValues = [];
      state.tableData = [];
      state.currentRow = 1;
      state.curRowData = [];
      state.isGameEnd = null;
    },
    setStatsOpen: (state, action: PayloadAction<boolean>) => {
      state.isStatsOpen = action.payload;
    },
    setGameMod: (state, action: PayloadAction<'daily' | 'practice'>) => {
      state.gameMod = action.payload;
    },
  },
});

export const gameActions = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
