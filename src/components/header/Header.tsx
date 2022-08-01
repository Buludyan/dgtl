import { FC, useState } from 'react';

import { NavLink } from 'react-router-dom';

import { IconButton } from '@mui/material';
import ReplayCircleFilledRoundedIcon from '@mui/icons-material/ReplayCircleFilledRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import CoffeeRoundedIcon from '@mui/icons-material/CoffeeRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';

import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/storeSelector';
import {
  dailySecretNumGenerator,
  practiceSecretNumGenerator,
} from '../../helpers/secretNumGenerators';

import { HelpMW } from '../ModalWIndows/HelpMW/HelpMW';

import './Header.scss';

export const Header: FC = () => {
  const { setAllData, setGameMod, restartGame, setSecretNum, setStatsOpen } = useActions();
  const { gameMod } = useAppSelector((state) => state.game);

  const [isActive, setActive] = useState(false);

  const onRestartHandler = () => {
    restartGame(practiceSecretNumGenerator());
  };

  const onDailyClick = () => {
    const currentData = JSON.parse(localStorage.getItem('currentData') || '{}');
    setAllData(currentData.daily);
    if (!currentData.daily.secretNum.length) setSecretNum(dailySecretNumGenerator());
    setGameMod('daily');
  };

  const onPracticeClick = () => {
    const currentData = JSON.parse(localStorage.getItem('currentData') || '{}');
    setAllData(currentData.practice);
    if (!currentData.practice.secretNum.length) setSecretNum(practiceSecretNumGenerator());
    setGameMod('practice');
  };

  return (
    <div className="header">
      <div className="header__inner">
        <div className="header__left">
          <IconButton onClick={() => setActive(true)}>
            <HelpRoundedIcon
              fontSize="large"
              sx={{
                color: '#fff',
              }}
            />
          </IconButton>
          <div className="header__links">
            <NavLink to={'/'}>
              <button
                onClick={onDailyClick}
                className="header__navBtns"
                style={{
                  backgroundColor:
                    window.location.href === `${process.env.REACT_APP_BASE_URL}/` &&
                    gameMod === 'daily'
                      ? '#334051'
                      : '#07131e',
                }}
              >
                Daily
              </button>
            </NavLink>
            <NavLink to={'/practice'}>
              <button
                onClick={onPracticeClick}
                className="header__navBtns"
                style={{
                  backgroundColor:
                    window.location.href === `${process.env.REACT_APP_BASE_URL}/practice` ||
                    gameMod === 'practice'
                      ? '#334051'
                      : '#07131e',
                }}
              >
                Practice
              </button>
            </NavLink>
          </div>
        </div>
        <h1 className="header__logo">dgtl</h1>
        <div className="header__right">
          <IconButton href="https://www.buymeacoffee.com/dgtl" target="_blank" rel="noreferrer">
            <CoffeeRoundedIcon
              fontSize="large"
              sx={{
                color: '#fff',
              }}
            />
          </IconButton>
          <IconButton onClick={() => setStatsOpen(true)}>
            <BarChartRoundedIcon
              fontSize="large"
              sx={{
                color: '#fff',
              }}
            />
          </IconButton>
          {(gameMod === 'practice' ||
            window.location.href === `${process.env.REACT_APP_BASE_URL}/practice`) && (
            <IconButton onClick={onRestartHandler}>
              <ReplayCircleFilledRoundedIcon
                fontSize="large"
                sx={{
                  color: '#fff',
                }}
              />
            </IconButton>
          )}
        </div>
      </div>
      <HelpMW isActive={isActive} setActive={setActive} />
    </div>
  );
};
