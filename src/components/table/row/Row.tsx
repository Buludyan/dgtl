import { FC } from 'react';

import { useAppSelector } from '../../../hooks/storeSelector';

import { Ceil } from './Ceil/Ceil';

import './Row.scss';

type RowProps = {
  row: number;
  key: number;
};

export const Row: FC<RowProps> = ({ row }) => {
  const { ceilsCount } = useAppSelector((state) => state.game);

  return (
    <div className="row">
      <div className="row__inner">
        {ceilsCount.map((num: number) => {
          return <Ceil key={num} row={row} ceil={num} />;
        })}
      </div>
    </div>
  );
};
