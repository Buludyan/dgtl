import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gameState, setValue } from '../../store/slices/gameSlice';
import './Key.scss';

type KeyPrpos = {
  value: number
}

type KeyState = {
  disabledValues: number[]
  isGameEnd: null | 'win' | 'lose'
}

export const Key: React.FC<KeyPrpos> = ({ value }) => {

  const { disabledValues, isGameEnd }: KeyState = useSelector(gameState);

  const [isDisabled, setDisabled] = useState<boolean>(false);
  const [btnSize, setBtnSize] = useState<string>('55px');

  useEffect(() => {
    if (disabledValues.find(num => num === value) !== undefined) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }

  }, [disabledValues, value]);

  const dispatch = useDispatch();

  const setValueHandler = (value: number) => {
    dispatch(setValue(value))
  }

  return (
    <button
      className='key'
      onClick={() => setValueHandler(value)}
      disabled={isGameEnd ? true : false}
      style={{
        visibility: isDisabled ? 'hidden' : 'visible',
      }}
      onMouseDown={() => setBtnSize('50px')}
      onMouseUp={() => setBtnSize('55px')}
      onMouseLeave={() => setBtnSize('55px')}
    >
      <div className='key__inner'
        style={{
          height: btnSize,
          width: btnSize
        }}
      >
        <div className='key__value'>
          {value}
        </div>
      </div>
    </button>
  )
}
