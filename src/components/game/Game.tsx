import { FC } from 'react';

import { useAppSelector } from '../../hooks/storeSelector';
import { Table } from '../Table/Table';
import { Keyboard } from '../Keyboard/Keyboard';

import './Game.scss';

export const Game: FC = () => {
  const { isGameEnd, secretNum } = useAppSelector((state) => state.game);

  return (
    <div className="game">
      <Table />
      {isGameEnd === 'lose' ? (
        <div className="game__secretNum">
          {secretNum.map((num, idx) => {
            return (
              <div key={idx} className="game__ceil">
                {num}
              </div>
            );
          })}
        </div>
      ) : isGameEnd === 'win' ? (
        <div
          style={{
            height: '152px',
          }}
        />
      ) : (
        <Keyboard />
      )}
    </div>
  );
};
