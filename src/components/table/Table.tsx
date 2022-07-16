import { FC } from 'react';

import { useSelector } from 'react-redux';

import { gameState } from '../../slices/gameSlice';

import { Row } from './row/Row';

import './Table.scss';

type TableState = {
  rowsCount: number[]
}

export const Table: FC = () => {

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
