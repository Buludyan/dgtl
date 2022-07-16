import { FC, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@mui/material';

import { practiceSecretNumGenerator } from '../../../helpers/secretNumGenerators';
import { gameState, restartGame, setStatsOpen } from '../../../slices/gameSlice';
import { Statistic } from '../../keyboard/Keyboard';

import { Timer } from '../../timer/Timer';

import './GameEndMW.scss';

type GameEndMWState = {
    isGameEnd: null | 'win' | 'lose',
    isStatsOpen: boolean,
    gameMod: 'daily' | 'practice'
    secretNum: number[]
}

export const GameEndMW: FC = () => {

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

    const { isGameEnd, isStatsOpen, gameMod, secretNum }: GameEndMWState = useSelector(gameState);

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

        if (window.location.href === `${process.env.REACT_APP_BASE_URL}/` || gameMod === 'daily') {
            setStat(statistic.daily);
        }

        if (window.location.href === `${process.env.REACT_APP_BASE_URL}/practice` || gameMod === 'practice') {
            setStat(statistic.practice);
        }
    }, [isGameEnd, gameMod]);

    const onRestartHandler = () => {
        dispatch(restartGame(practiceSecretNumGenerator()));
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
                    <div
                        className='modalContent__resultText'
                    >
                        {isActive.result === 'win'
                            ? 'Congratulations, you won!'
                            :
                            'Next time will be better!'
                        }
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <p style={{
                                fontSize: '25px',
                                marginTop: '5px'
                            }}>
                                Secret number
                            </p>
                            <p style={{
                                fontSize: '50px'
                            }}>
                                {secretNum.join('')}
                            </p>
                        </div>
                    </div>
                }
                <div className='statistic'>
                    <p className='statistic__headline'>Your statistics</p>
                    <div className='statistic__data'>
                        <div className='statistic__dataItem'>
                            <div>{stat?.allGames || '0'}</div>
                            <p>Played</p>
                        </div>
                        <div className='statistic__dataItem'>
                            <div>{Math.floor((stat?.win / stat?.allGames) * 100) || '0'}
                                <span style={{ fontSize: '25px' }}> % </span>
                            </div>
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
                {(window.location.href === `${process.env.REACT_APP_BASE_URL}/practice` || gameMod === 'practice')
                    &&
                    <Button
                        variant='contained'
                        onClick={onRestartHandler}
                    >
                        Restart game
                    </Button>}
                {
                    isGameEnd
                    &&
                    (window.location.href === `${process.env.REACT_APP_BASE_URL}/` && gameMod === 'daily')
                    &&
                    <div
                        style={{
                            display: 'flex',
                            width: '170px',
                            justifyContent: 'space-between'
                        }}>
                        <p>NEXT GAME: </p>
                        <Timer />
                    </div>
                }
            </div>
        </div >
    )
};