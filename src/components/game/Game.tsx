import React from 'react'
import './Game.scss'
import { Keyboard } from '../keyboard/Keyboard'
import { Table } from '../table/Table'
import { useSelector } from 'react-redux'
import { gameState } from '../store/slices/gameSlice'

type GameState = {
  isGameEnd: null | 'win' | 'lose',
  secretNum: number[]
};

export const Game: React.FC = () => {

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
          <Keyboard />
      }
    </div>
  )
};
