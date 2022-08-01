import { FC, useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import icon from '../src/icon/icon.jpg';
import { dailySecretNumGenerator, practiceSecretNumGenerator } from './helpers/secretNumGenerators';
import { useAppSelector } from './hooks/storeSelector';
import { useActions } from './hooks/actions';

import { Game } from './components/Game/Game';
import { Header } from './components/Header/Header';
import { GameEndMW } from './components/ModalWIndows/GameEndMW/GameEndMw';

import './App.scss';

const App: FC = () => {
  const { secretNum, disabledValues, tableData, currentRow, curRowData, isGameEnd, gameMod } =
    useAppSelector((state) => state.game);

  const { setAllData, setSecretNum, setStatsOpen } = useActions();

  useEffect(() => {
    const currData = JSON.parse(localStorage.getItem('currentData') || '{}');

    let currentData = {};

    if (window.location.href === `${process.env.REACT_APP_BASE_URL}/`) {
      currentData = {
        daily: {
          secretNum: [],
          disabledValues,
          tableData,
          currentRow,
          curRowData,
          isGameEnd,
        },
        practice: {
          ...currData.practice,
        },
      };
    }

    if (window.location.href === `${process.env.REACT_APP_BASE_URL}/practice`) {
      currentData = {
        daily: {
          ...currData.daily,
        },
        practice: {
          secretNum,
          disabledValues,
          tableData,
          currentRow,
          curRowData,
          isGameEnd,
        },
      };
    }

    if (secretNum?.length) {
      localStorage.setItem('currentData', JSON.stringify(currentData));
    }
  }, [curRowData, currentRow, disabledValues, isGameEnd, secretNum, tableData]);

  useEffect(() => {
    const stats = JSON.parse(localStorage.getItem('statistic') || '{}');
    const currentData = JSON.parse(localStorage.getItem('currentData') || '{}');

    if (!Object.entries(stats).length) {
      const statsTemplate = {
        allGames: 0,
        win: 0,
        curStreak: 0,
        maxStreak: 0,
      };

      localStorage.setItem(
        'statistic',
        JSON.stringify({
          daily: { ...statsTemplate },
          practice: { ...statsTemplate },
        })
      );
    }

    if (!Object.entries(currentData).length) {
      const gameTemplate = {
        curRowData: [],
        currentRow: 1,
        disabledValues: [],
        isGameEnd: null,
        secretNum: [],
        tableData: [],
      };

      localStorage.setItem(
        'currentData',
        JSON.stringify({
          daily: { ...gameTemplate },
          practice: { ...gameTemplate },
        })
      );

      localStorage.setItem(
        'date',
        JSON.stringify({
          date: new Date().setHours(0, 0, 0, 0),
        })
      );
    }
  }, []);

  useEffect(() => {
    const currentData = JSON.parse(localStorage.getItem('currentData') || '{}');

    if (window.location.href === `${process.env.REACT_APP_BASE_URL}/practice`) {
      setAllData(currentData.practice);
    }

    if (window.location.href === `${process.env.REACT_APP_BASE_URL}/`) {
      setAllData({
        ...currentData.daily,
        secretNum: dailySecretNumGenerator(),
      });
    }
  }, []);

  useEffect(() => {
    const currentData = JSON.parse(localStorage.getItem('currentData') || '{}');

    if (window.location.href === `${process.env.REACT_APP_BASE_URL}/practice`) {
      if (!currentData.practice.secretNum.length) setSecretNum(practiceSecretNumGenerator());
    }

    if (window.location.href === `${process.env.REACT_APP_BASE_URL}/`) {
      if (!currentData.practice.secretNum.length) setSecretNum(dailySecretNumGenerator());
    }
  }, [setSecretNum]);

  useEffect(() => {
    const currData = JSON.parse(localStorage.getItem('currentData') || '{}');

    const pattern = {
      curRowData: [],
      currentRow: 1,
      disabledValues: [],
      isGameEnd: null,
      secretNum: [],
      tableData: [],
    };

    const interval = setInterval(() => {
      const date = JSON.parse(localStorage.getItem('date') || '{}');
      if (new Date().setHours(0, 0, 0, 0) !== date.date) {
        localStorage.setItem(
          'date',
          JSON.stringify({
            date: new Date().setHours(0, 0, 0, 0),
          })
        );
        if (window.location.href === `${process.env.REACT_APP_BASE_URL}/` && gameMod === 'daily') {
          setAllData({
            ...pattern,
            secretNum: dailySecretNumGenerator(),
          });

          setStatsOpen(false);
        } else {
          localStorage.setItem(
            'currentData',
            JSON.stringify({
              daily: {
                ...pattern,
                secretNum: dailySecretNumGenerator(),
              },
              practice: {
                ...currData.practice,
              },
            })
          );
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [gameMod, setAllData, setStatsOpen]);

  return (
    <div className="app">
      <Helmet>
        <meta charSet="utf-8" />
        <title>dgtl</title>
        <link rel="shortcut icon" href={icon} />
      </Helmet>
      <div className="app__inner">
        <Header />
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/practice" element={<Game />} />
        </Routes>
      </div>
      <GameEndMW />
    </div>
  );
};

export default App;
