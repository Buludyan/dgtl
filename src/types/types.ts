export type RowData = {
  value: number;
  status: '#00AD79' | '#E0CA00' | '#707070';
}[];

export type StatsType = {
  allGames: number;
  win: number;
  curStreak: number;
  maxStreak: number;
};

export type GameType = {
  curRowData: number[];
  currentRow: number;
  disabledValues: number[];
  isGameEnd: null;
  secretNum: number[];
  tableData: RowData[];
};
