import { IconButton } from '@mui/material';
import ReplayCircleFilledRoundedIcon from '@mui/icons-material/ReplayCircleFilledRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import CoffeeRoundedIcon from '@mui/icons-material/CoffeeRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import React, { useState } from 'react';
import './Header.scss';
import { useDispatch, useSelector } from 'react-redux';
import { gameState, restartGame, setAllData, setGameMod, setSecretNum, setStatsOpen } from '../store/slices/gameSlice';
import { HelpMW } from '../modalWIndows/helpMW/HelpMW';
import { NavLink } from 'react-router-dom';

type HeaderState = {
  gameMod: 'daily' | 'practice'
}

export const Header = () => {

  const dispatch = useDispatch();

  const [isActive, setActive] = useState<boolean>(false);

  const { gameMod }: HeaderState = useSelector(gameState);

  const onRestartHandler = () => {
    const secretNum: number[] = (Math.floor(Math.random() * 1000000) + '').split('').map(e => +e)
    dispatch(restartGame(secretNum))
  };

  const onDailyClick = () => {
    const currentData = JSON.parse(localStorage.getItem('currentData') || '{}')
    const secretNum: number[] = (Math.floor(Math.random() * 1000000) + '').split('').map(e => +e)
    dispatch(setAllData(currentData.daily))
    if (!currentData.daily.secretNum.length) dispatch(setSecretNum(secretNum))
    dispatch(setGameMod('daily'))
  }

  const onPracticeClick = () => {
    const currentData = JSON.parse(localStorage.getItem('currentData') || '{}')
    const secretNum: number[] = (Math.floor(Math.random() * 1000000) + '').split('').map(e => +e)
    dispatch(setAllData(currentData.practice))
    if (!currentData.practice.secretNum.length) dispatch(setSecretNum(secretNum))
    dispatch(setGameMod('practice'))
  }

  return (
    <div className='header'>
      <div className='header__inner'>
        <div className='header__left'>
          <IconButton
            onClick={() => setActive(true)}
          >
            <HelpRoundedIcon
              fontSize='large'
              sx={{
                color: '#fff'
              }}
            />
          </IconButton>
          <div className='header__links'>
            <NavLink to={'/'}>
              <button
                onClick={onDailyClick}
                className='header__navBtns'
                style={{
                  backgroundColor: window.location.href === `${process.env.REACT_APP_BASE_URL}/`
                    && gameMod === 'daily' ? '#334051' : '#07131e'
                }}
              >
                Daily
              </button>
            </NavLink>
            <NavLink to={'/practice'}>
              <button
                onClick={onPracticeClick}
                className='header__navBtns'
                style={{
                  backgroundColor: window.location.href === `${process.env.REACT_APP_BASE_URL}/practice`
                    || gameMod === 'practice' ? '#334051' : '#07131e'
                }}
              >
                Practice
              </button>
            </NavLink>
          </div>
        </div>
        <h1 className='header__logo'>dgtl</h1>
        <div className='header__right'>
          <IconButton
            href="https://www.buymeacoffee.com/dgtl"
            target="_blank"
            rel="noreferrer"
          >
            <CoffeeRoundedIcon
              fontSize='large'
              sx={{
                color: '#fff'
              }}
            />
          </IconButton>
          <IconButton
            onClick={() => dispatch(setStatsOpen(true))}
          >
            <BarChartRoundedIcon
              fontSize='large'
              sx={{
                color: '#fff'
              }}
            />
          </IconButton>
          {(gameMod === 'practice' || window.location.href === `${process.env.REACT_APP_BASE_URL}/practice`) &&
            <IconButton
              onClick={onRestartHandler}
            >
              <ReplayCircleFilledRoundedIcon
                fontSize='large'
                sx={{
                  color: '#fff'
                }}
              />
            </IconButton>
          }
        </div>
      </div>
      <HelpMW
        isActive={isActive}
        setActive={setActive}
      />
    </div>
  )
}
