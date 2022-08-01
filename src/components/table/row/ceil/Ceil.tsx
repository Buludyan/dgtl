import { FC } from 'react';

import { useAppSelector } from '../../../../hooks/storeSelector';

import './Ceil.scss';

type CeilProps = {
  row: number;
  ceil: number;
};

export const Ceil: FC<CeilProps> = ({ row, ceil }) => {
  const { currentRow, curRowData, tableData, isGameEnd } = useAppSelector((state) => state.game);

  return (
    <div className="ceil">
      <div
        className="ceil__inner"
        style={{
          backgroundColor:
            currentRow === row && isGameEnd
              ? '#363636'
              : currentRow === row
              ? '#EDEDED'
              : tableData[row - 1]
              ? tableData[row - 1][ceil - 1].status
              : '#363636',
        }}
      >
        {tableData[row - 1]
          ? tableData[row - 1][ceil - 1].value
          : row === currentRow && curRowData[ceil - 1]}
      </div>
    </div>
  );
};
