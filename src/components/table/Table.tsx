import { FC } from 'react';

import { useAppSelector } from '../../hooks/storeSelector';

import { Row } from './Row/Row';

import './Table.scss';

export const Table: FC = () => {
  const { rowsCount } = useAppSelector((state) => state.game);

  return (
    <div className="table">
      <div className="table__inner">
        {rowsCount.map((num: number) => {
          return <Row key={num} row={num} />;
        })}
      </div>
    </div>
  );
};
