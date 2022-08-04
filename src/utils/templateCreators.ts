import { GameType, StatsType } from '../types/types';

export const getStatsTemplate = (): StatsType => {
  return {
    allGames: 0,
    win: 0,
    curStreak: 0,
    maxStreak: 0,
  };
};

export const getGameTemplate = (): GameType => {
  return {
    curRowData: [],
    currentRow: 1,
    disabledValues: [],
    isGameEnd: null,
    secretNum: [],
    tableData: [],
  };
};
