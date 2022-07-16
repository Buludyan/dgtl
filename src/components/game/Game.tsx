import {FC} from 'react';

import { useSelector } from 'react-redux';

import { gameState } from '../../slices/gameSlice';

import { Table } from '../table/Table';
import { Keyboard } from '../keyboard/Keyboard';

import './Game.scss';

type GameState = {
  isGameEnd: null | 'win' | 'lose',
  secretNum: number[]
};

export const Game: FC = () => {

  const { isGameEnd, secretNum }: GameState = useSelector(gameState);

  return (
    <div className='game'>
      <Table />
      {
        isGameEnd === 'lose'
          ?
          <div className='game__secretNum'>
            {secretNum.map((num, idx) => {
              return (
                <div
                  key={idx}
                  className='game__ceil'
                >
                  {num}
                </div>
              )
            })}
          </div>
          :
          isGameEnd === 'win'
          ?
          <div 
            style={{
              height: '152px'
            }}
          />
          :
          <Keyboard />
      }
    </div>
  )
};
