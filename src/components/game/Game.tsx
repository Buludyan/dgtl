import React from 'react'
import './Game.scss'
import { Keyboard } from '../keyboard/Keyboard'
import { Table } from '../table/Table'

export const Game: React.FC = () => {
  return (
    <div className='game'>
        <Table />
        <Keyboard />
    </div>
  )
}
