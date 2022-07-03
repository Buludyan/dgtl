import React from 'react';
import './HelpMW.scss'

type GameEndMWPrpos = {
  isActive: boolean
  setActive: (status: boolean) => void
}

export const HelpMW: React.FC<GameEndMWPrpos> = ({ isActive, setActive }) => {
  return (
    <div
      className={isActive
        ? 'modalActive'
        : 'modal'}
      onClick={() => setActive(false)}
    >
      <div className='helpModalContent' onClick={(e) => e.stopPropagation()}>
        <div className='helpModalContent__text'>
          <div>Guess dgtl in 5 tries.</div>
          <div>
            Dgtl contains secret number with digits from 0 to 9.

            Digits can repeat!

            After each guess, the color of the cells will hint how
            close your guess was to the secret number.
          </div>

          <div>
            For example:
            <div>If the cell is <span style={{ color: 'green' }}>green</span> then you guessed the digit and
              it is already on its correct position.</div>
            <div> If the cell is <span style={{ color: 'orange' }}>yellow</span> then you guessed the digit,
              but its position is incorrect.</div>
            <div> If the cell is <span style={{ color: 'grey' }}>grey</span> then the secret
              does not contain that digit.</div>
          </div>
          <div>
            To win you need to guess all 6 digits simultaneously.

            Daily challenges will be available each day!
          </div>
        </div>
      </div>
    </div>
  )
}
