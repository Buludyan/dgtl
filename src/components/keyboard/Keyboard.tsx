import { FC, useCallback, useEffect } from 'react';

import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/storeSelector';

import { Key } from './Key/Key';
import { RowData } from '../../types/types';

import './Keyboard.scss';

export type Statistic = {
  allGames: number;
  win: number;
  curStreak: number;
  maxStreak: number;
};

export const Keyboard: FC = () => {
  const { goNextRow, removeValue, setDisabledValues, setGameEnd, setValue } = useActions();

  const { secretNum, curRowData, rowsCount, ceilsCount, currentRow, isGameEnd, gameMod } =
    useAppSelector((state) => state.game);

  const checkIsGameEnd = useCallback(
    (rowData: RowData) => {
      const prevStats = JSON.parse(localStorage.getItem('statistic') || '{}');

      if (!rowData.find((ceilData) => ceilData.status !== '#00AD79')) {
        setGameEnd('win');
        if (window.location.href === `${process.env.REACT_APP_BASE_URL}/` || gameMod === 'daily') {
          let { allGames, win, curStreak } = prevStats.daily;
          const maxStreak = prevStats.daily.maxStreak;

          localStorage.setItem(
            'statistic',
            JSON.stringify({
              daily: {
                allGames: ++allGames,
                win: ++win,
                curStreak: ++curStreak,
                maxStreak: Math.max(curStreak, maxStreak),
              },
              practice: {
                ...prevStats.practice,
              },
            })
          );
        }
        if (
          window.location.href === `${process.env.REACT_APP_BASE_URL}/practice` ||
          gameMod === 'practice'
        ) {
          let { allGames, win, curStreak } = prevStats.practice;
          const maxStreak = prevStats.daily.maxStreak;

          localStorage.setItem(
            'statistic',
            JSON.stringify({
              practice: {
                allGames: ++allGames,
                win: ++win,
                curStreak: ++curStreak,
                maxStreak: Math.max(curStreak, maxStreak),
              },
              daily: {
                ...prevStats.daily,
              },
            })
          );
        }
        return;
      }
      if (currentRow === rowsCount.length) {
        setGameEnd('lose');
        if (window.location.href === `${process.env.REACT_APP_BASE_URL}` || gameMod === 'daily') {
          let { allGames } = prevStats.daily;

          localStorage.setItem(
            'statistic',
            JSON.stringify({
              daily: {
                ...prevStats.daily,
                curStreak: 0,
                allGames: ++allGames,
              },
              practice: {
                ...prevStats.practice,
              },
            })
          );
        }
        if (
          window.location.href === `${process.env.REACT_APP_BASE_URL}/practice` ||
          gameMod === 'practice'
        ) {
          let { allGames } = prevStats.practice;

          localStorage.setItem(
            'statistic',
            JSON.stringify({
              practice: {
                ...prevStats.practice,
                curStreak: 0,
                allGames: ++allGames,
              },
              daily: {
                ...prevStats.daily,
              },
            })
          );
        }
      }
    },
    [currentRow, rowsCount.length, setGameEnd, gameMod]
  );

  const onEnterHandler = useCallback(() => {
    const rowData: RowData = [];

    const secretNumUsed: (0 | 1)[] = [0, 0, 0, 0, 0, 0];

    for (let i = 0; i < curRowData.length; ++i) {
      let status: '#00AD79' | '#707070' = '#707070';
      if (curRowData[i] === secretNum[i]) {
        status = '#00AD79';
        secretNumUsed[i] = 1;
      }
      rowData.push({
        value: curRowData[i],
        status: status,
      });
    }

    for (let i = 0; i < curRowData.length; ++i) {
      if (rowData[i].status !== '#00AD79') {
        for (let j = 0; j < secretNum.length; ++j) {
          if (secretNumUsed[j] === 1) {
            continue;
          }
          if (rowData[i].value !== secretNum[j]) {
            continue;
          }
          rowData[i].status = '#E0CA00';
          secretNumUsed[j] = 1;
          break;
        }
      }
    }

    const disabledNums: number[] = [];

    for (let i = 0; i < rowData.length; ++i) {
      if (secretNum.find((num) => num === rowData[i].value) === undefined) {
        disabledNums.push(rowData[i].value);
      }
    }

    if (rowData.length === ceilsCount.length) {
      goNextRow(rowData);
      setDisabledValues(Array.from(new Set(disabledNums)));
      checkIsGameEnd(rowData);
    }
  }, [ceilsCount.length, checkIsGameEnd, goNextRow, setDisabledValues, curRowData, secretNum]);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (isGameEnd) return;

      if (!isNaN(+event.key)) {
        setValue(+event.key);
      }

      if (event.key === 'Backspace') {
        removeValue();
      }

      if (event.key === 'Enter') {
        event.preventDefault();
        onEnterHandler();
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [onEnterHandler, removeValue, setValue, isGameEnd]);

  return (
    <div className="keyboard">
      <div className="keyboard__inner">
        <div className="keyboard__firstLine">
          {[0, 1, 2, 3, 4, 5].map((value: number, idx: number) => {
            return <Key key={idx} value={value} />;
          })}
        </div>
        <div className="keyboard__secondLine">
          <button className="keyboard__delete" onClick={() => removeValue()}>
            <div className="keyboard__delete_inner">
              <div
                className="keyboard__delete_value"
                style={{
                  paddingBottom: '3px',
                }}
              >
                {'←'}
              </div>
            </div>
          </button>
          {[6, 7, 8, 9].map((value: number, idx: number) => {
            return <Key key={idx} value={value} />;
          })}
          <button className="keyboard__enter" onClick={onEnterHandler}>
            <div className="keyboard__enter_inner">
              <div className="keyboard__enter_value">{'↵'}</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
