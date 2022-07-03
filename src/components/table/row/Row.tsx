import React from 'react';
import { useSelector } from 'react-redux';
import { gameState } from '../../store/slices/gameSlice';
import { Ceil } from './ceil/Ceil';
import './Row.scss';

type RowProps = {
    row: number
    key: number
}

type RowState = {
    ceilsCount: number[]
}

export const Row: React.FC<RowProps> = ({ row }) => {

    const { ceilsCount }: RowState = useSelector(gameState);

    return (
        <div className='row'>
            <div className='row__inner'>
                {ceilsCount.map((num: number) => {
                    return (
                        <Ceil 
                            key={num}
                            row={row}
                            ceil={num}
                        />
                    )
                })}
            </div>
        </div>
    )
}
