import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { gameState } from '../../../store/slices/gameSlice';
import './Ceil.scss';

type CeilProps = {
  key: number
  row: number
  ceil: number
}

type CeilData = {
  value: number
  status: string
}

type CeilState = {
  secretNum: null | string[]
  currentRow: number
  curRowData: number[]
  tableData: Array<CeilData[]>
  isGameEnd: null | 'win' | 'lose',
}

export const Ceil: React.FC<CeilProps> = ({ row, ceil }) => {

  const [bgColor, setBgColor] = useState<string>('#363636')

  const { currentRow, curRowData, tableData, isGameEnd }: CeilState = useSelector(gameState);

  useEffect(() => {
    if (tableData[row - 1]) {
      if (tableData[row - 1][ceil - 1].status === 'green') setBgColor('#00AD79')
      if (tableData[row - 1][ceil - 1].status === 'yellow') setBgColor('#E0CA00')
      if (tableData[row - 1][ceil - 1].status === 'grey') setBgColor('#707070')
    } else {
      setBgColor('#363636')
    }
    if (currentRow === row) {
      isGameEnd ? setBgColor('#363636') : setBgColor('#EDEDED')
    }
  }, [currentRow, row, tableData, ceil]);

  return (
    <div className='ceil'>
      <div
        className='ceil__inner'
        style={{
          backgroundColor: bgColor
        }}
      >
        {
          tableData[row - 1] ?
            tableData[row - 1][ceil - 1].value
            :
            row === currentRow && curRowData[ceil - 1]
        }
      </div>
    </div>
  )
}
