import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gameState, goNextRow, removeValue, setDisabledValues, setGameEnd, setValue } from '../store/slices/gameSlice';
import { Key } from './key/Key';
import './Keyboard.scss';

type KeyboardState = {
    secretNum: number[]
    curRowData: number[]
    rowsCount: number[]
    ceilsCount: number[]
    currentRow: number
    isGameEnd: null | 'win' | 'lose',
    gameMod: 'daily' | 'practice'
}

type RowData = {
    value: number
    status: 'green' | 'yellow' | 'grey'
}[]

export type Statistic = {
    allGames: number,
    win: number,
    curStreak: number,
    maxStreak: number
}

export const Keyboard: React.FC = () => {

    const dispatch = useDispatch();
    const [deleteSize, setDeleteSize] = useState<string>('55px');
    const [enterSize, setEnterSize] = useState<string>('55px');

    const {
        secretNum,
        curRowData,
        rowsCount,
        ceilsCount,
        currentRow,
        isGameEnd,
        gameMod,
    }: KeyboardState = useSelector(gameState);

    const checkIsGameEnd = useCallback(
        (rowData: RowData) => {
            const prevStats = JSON.parse(localStorage.getItem('statistic') || '{}');

            if (!rowData.find(ceilData => ceilData.status !== 'green')) {
                dispatch(setGameEnd('win'))
                if (window.location.href === `${process.env.REACT_APP_BASE_URL}/` || gameMod === 'daily') {
                    let { allGames, win, curStreak, maxStreak } = prevStats.daily

                    localStorage.setItem('statistic', JSON.stringify({
                        daily: {
                            allGames: ++allGames,
                            win: ++win,
                            curStreak: ++curStreak,
                            maxStreak: Math.max(curStreak, maxStreak)
                        },
                        practice: {
                            ...prevStats.practice
                        }
                    }))
                }
                if (window.location.href === `${process.env.REACT_APP_BASE_URL}/practice` || gameMod === 'practice') {
                    let { allGames, win, curStreak, maxStreak } = prevStats.practice

                    localStorage.setItem('statistic', JSON.stringify({
                        practice: {
                            allGames: ++allGames,
                            win: ++win,
                            curStreak: ++curStreak,
                            maxStreak: Math.max(curStreak, maxStreak)
                        },
                        daily: {
                            ...prevStats.daily
                        }
                    }))
                }
                return;
            }
            if (currentRow === rowsCount.length) {
                dispatch(setGameEnd('lose'))
                if (window.location.href === `${process.env.REACT_APP_BASE_URL}` || gameMod === 'daily') {
                    let { allGames } = prevStats.daily

                    localStorage.setItem('statistic', JSON.stringify({
                        daily: {
                            ...prevStats.daily,
                            curStreak: 0,
                            allGames: ++allGames,
                        },
                        practice: {
                            ...prevStats.practice
                        }
                    }))
                } 
                if (window.location.href === `${process.env.REACT_APP_BASE_URL}/practice` || gameMod === 'practice') {
                    let { allGames } = prevStats.practice

                    localStorage.setItem('statistic', JSON.stringify({
                        practice: {
                            ...prevStats.practice,
                            curStreak: 0,
                            allGames: ++allGames,
                        },
                        daily: {
                            ...prevStats.daily
                        }
                    }))
                }
            }
        }, [currentRow, dispatch, rowsCount.length, gameMod]);


    const onEnterHandler = useCallback(
        () => {
            const rowData: RowData = [];

            const secretNumUsed: (0 | 1)[] = [0, 0, 0, 0, 0, 0];

            for (let i = 0; i < curRowData.length; ++i) {
                let status: 'green' | 'grey' = 'grey';
                if (curRowData[i] === secretNum[i]) {
                    status = 'green';
                    secretNumUsed[i] = 1;
                }
                rowData.push({
                    value: curRowData[i],
                    status: status
                });
            }

            for (let i = 0; i < curRowData.length; ++i) {
                if (rowData[i].status !== 'green') {
                    for (let j = 0; j < secretNum.length; ++j) {
                        if (secretNumUsed[j] === 1) {
                            continue;
                        }
                        if (rowData[i].value !== secretNum[j]) {
                            continue;
                        }
                        rowData[i].status = 'yellow';
                        secretNumUsed[j] = 1;
                        break;
                    }
                }
            }

            const disabledNums: number[] = [];

            for (let i = 0; i < rowData.length; ++i) {
                if (secretNum.find(num => num === rowData[i].value) === undefined) {
                    disabledNums.push(rowData[i].value)
                }
            }

            if (rowData.length === ceilsCount.length) {
                dispatch(goNextRow(rowData));
                dispatch(setDisabledValues(Array.from(new Set(disabledNums))))
                checkIsGameEnd(rowData);
            }
        }, [ceilsCount.length, checkIsGameEnd, curRowData, dispatch, secretNum]);


    useEffect(() => {
        const keyDownHandler = (event: any) => {
            if (isGameEnd) return

            if (!isNaN(+event.key)) {
                dispatch(setValue(+event.key))
            }

            if (event.key === 'Backspace') {
                dispatch(removeValue());
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
    }, [dispatch, onEnterHandler, isGameEnd]);


    return (
        <div className='keyboard'>
            <div className='keyboard__inner'>
                <div className='keyboard__firstLine'>
                    {
                        [0, 1, 2, 3, 4, 5].map((value: number, idx: number) => {
                            return (
                                <Key
                                    key={idx}
                                    value={value}
                                />
                            )
                        })
                    }
                </div>
                <div className='keyboard__secondLine'>
                    <button
                        className='keyboard__delete'
                        onClick={() => dispatch(removeValue())}
                        onMouseDown={() => setDeleteSize('50px')}
                        onMouseUp={() => setDeleteSize('55px')}
                        onMouseLeave={() => setDeleteSize('55px')}
                    >
                        <div
                            className='keyboard__delete_inner'
                            style={{
                                height: deleteSize,
                                width: deleteSize
                            }}
                        >
                            <div className='keyboard__delete_value'
                                style={{
                                    paddingBottom: '3px'
                                }}
                            >
                                {'←'}
                            </div>
                        </div>
                    </button>
                    {
                        [6, 7, 8, 9].map((value: number, idx: number) => {
                            return (
                                <Key
                                    key={idx}
                                    value={value}
                                />
                            )
                        })
                    }
                    <button
                        className='keyboard__enter'
                        onClick={onEnterHandler}
                        onMouseDown={() => setEnterSize('50px')}
                        onMouseUp={() => setEnterSize('55px')}
                        onMouseLeave={() => setEnterSize('55px')}
                    >
                        <div
                            className='keyboard__enter_inner'
                            style={{
                                height: enterSize,
                                width: enterSize
                            }}
                        >
                            <div className='keyboard__enter_value'>
                                {'↵'}
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}