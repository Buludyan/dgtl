import { createSlice } from "@reduxjs/toolkit";

export type Initial = {
    secretNum: null | number[]
    disabledValues: number[]
    rowsCount: number[]
    ceilsCount: number[]
    tableData: Array<number[]>
    currentRow: number,
    curRowData: number[],
    isGameEnd: null | 'win' | 'lose',
    isStatsOpen: boolean
    gameMod: 'daily' | 'practice'
}

const initialState: Initial = {
    secretNum: null,
    disabledValues: [],
    rowsCount: [1, 2, 3, 4],
    ceilsCount: [1, 2, 3, 4, 5, 6],
    tableData: [], 
    currentRow: 1,
    curRowData: [],
    isGameEnd: null,
    isStatsOpen: false,
    gameMod: 'daily'
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setAllData: (state, action) => {
            const {
                secretNum,
                disabledValues,
                tableData,
                currentRow,
                curRowData,
                isGameEnd
            } = action.payload;

            state.secretNum = secretNum
            state.disabledValues= disabledValues
            state.tableData = tableData
            state.currentRow = currentRow
            state.curRowData = curRowData
            state.isGameEnd = isGameEnd
        },
        setSecretNum: (state, action) => {
            state.secretNum = action.payload
        },
        setDisabledValues: (state, action) => {
            state.disabledValues = [...state.disabledValues, ...action.payload]
        },
        setValue: (state, action) => {
            if (state.curRowData.length < state.ceilsCount.length) {
                state.curRowData.push(action.payload)
            }
        },
        removeValue: (state) => {
            if (state.curRowData.length > 0) {
                state.curRowData.pop()
            }
        },
        goNextRow: (state, action) => {
            state.currentRow = ++state.currentRow
            state.tableData.push(action.payload)
            state.curRowData = [];
        },
        setGameEnd: (state, action) => {
            state.isGameEnd = action.payload;
        },
        restartGame: (state, action) => {
            state.secretNum = action.payload
            state.disabledValues = []
            state.tableData = []
            state.currentRow = 1
            state.curRowData = []
            state.isGameEnd = null
        },
        setStatsOpen: (state, action) => {
            state.isStatsOpen = action.payload;
        },
        setGameMod: (state, action) => {
            state.gameMod = action.payload
        }
    }
})


export const {
    setAllData,
    setSecretNum,
    setDisabledValues,
    setValue,
    removeValue,
    goNextRow,
    setGameEnd,
    restartGame,
    setStatsOpen,
    setGameMod
} = gameSlice.actions;

export const gameState = (state: any) => state.game;