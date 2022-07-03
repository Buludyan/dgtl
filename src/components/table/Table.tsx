import React from 'react';
import { useSelector } from 'react-redux';
import './Table.scss'
import { gameState } from '../store/slices/gameSlice'
import { Row } from './row/Row';

type TableState = {
  rowsCount: number[]
}

export const Table: React.FC = () => {

  const { rowsCount }: TableState = useSelector(gameState)

  return (
    <div className='table'>
      <div className='table__inner'>
        {
          rowsCount.map((num: number) => {
            return (
              <Row
                key={num}
                row={num}
              />
            )
          })
        }
      </div>
    </div>
  )
}
