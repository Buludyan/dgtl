import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Statistic } from '../../keyboard/Keyboard';
import { gameState, restartGame, setStatsOpen } from '../../store/slices/gameSlice';
import { Timer } from '../../timer/Timer';
import './GameEndMW.scss'

type GameEndMWState = {
    isGameEnd: null | 'win' | 'lose',
    isStatsOpen: boolean,
    gameMod: 'daily' | 'practice'
}

export const GameEndMW: React.FC = () => {

    const [isActive, setActive] = useState<{ status: boolean, result: string }>({
        status: false,
        result: 'not'
    });

    const [stat, setStat] = useState<Statistic>({
        allGames: 0,
        win: 0,
        curStreak: 0,
        maxStreak: 0
    })

    const dispatch = useDispatch();

    const { isGameEnd, isStatsOpen, gameMod }: GameEndMWState = useSelector(gameState);

    useEffect(() => {
        if (isGameEnd === 'win') {
            setActive({ status: true, result: 'win' })
        }
        if (isGameEnd === 'lose') {
            setActive({ status: true, result: 'lose' })
        }
        if (!isGameEnd) {
            setActive({ status: false, result: 'not' })
        }

        const statistic = JSON.parse(localStorage.getItem('statistic') || '{}');

        if (window.location.href === 'http://localhost:3000/' || gameMod === 'daily') {
            setStat(statistic.daily);
        }

        if (window.location.href === 'http://localhost:3000/practice' || gameMod === 'practice') {
            setStat(statistic.practice);
        }
    }, [isGameEnd, gameMod]);

    const onRestartHandler = () => {
        const secretNum: number[] = (Math.floor(Math.random() * 1000000) + '').split('').map(e => +e)
        dispatch(restartGame(secretNum));
        dispatch(setStatsOpen(false));
        setActive({ status: false, result: 'not' })
    };

    const onMWCloseHandler = () => {
        setActive({ ...isActive, status: false })
        dispatch(setStatsOpen(false))
    }

    return (
        <div
            className={isActive.status || isStatsOpen
                ? 'modalActive'
                : 'modal'}
            onClick={onMWCloseHandler}
        >
            <div className='modalContent' onClick={(e) => e.stopPropagation()}>
                {
                    isGameEnd
                    &&
                    <p
                        className='modalContent__resultText'
                    >
                        {isActive.result === 'win' ? 'Congratulations, you won!' : 'Next time will be better!'}
                    </p>
                }
                <div className='statistic'>
                    <p className='statistic__headline'>Your statistics</p>
                    <div className='statistic__data'>
                        <div className='statistic__dataItem'>
                            <div>{stat?.allGames || '0'}</div>
                            <p>Played</p>
                        </div>
                        <div className='statistic__dataItem'>
                            <div>{Math.floor((stat?.win / stat?.allGames) * 100) || '0'} %</div>
                            <p>Win</p>
                        </div>
                        <div className='statistic__dataItem'>
                            <div>{stat?.curStreak || '0'}</div>
                            <p>Current Streak</p>
                        </div>
                        <div className='statistic__dataItem'>
                            <div>{stat?.maxStreak || '0'}</div>
                            <p>Max Streak</p>
                        </div>
                    </div>
                </div>
                {<Button
                    variant='contained'
                    onClick={onRestartHandler}
                >
                    Restart game
                </Button>}
                {
                    isGameEnd 
                    && 
                    (window.location.href === 'http://localhost:3000/' || gameMod === 'daily')
                    &&
                    <div style={{
                        display: 'flex',
                        width: '170px',
                        justifyContent: 'space-between'
                    }}>
                        <p>NEXT GAME: </p>
                        <Timer countdownTimestampMs={1659986400000} />
                    </div>
                }
            </div>
        </div>
    )
};