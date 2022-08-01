import { FC } from 'react';

import { useActions } from '../../../hooks/actions';
import { useAppSelector } from '../../../hooks/storeSelector';

import './Key.scss';

type KeyPrpos = {
  value: number;
};

export const Key: FC<KeyPrpos> = ({ value }) => {
  const { disabledValues, isGameEnd } = useAppSelector((state) => state.game);
  const { setValue } = useActions();

  const setValueHandler = (value: number) => {
    setValue(value);
  };

  return (
    <button
      className="key"
      onClick={() => setValueHandler(value)}
      disabled={isGameEnd ? true : false}
      style={{
        visibility:
          disabledValues.find((num) => num === value) !== undefined ? 'hidden' : 'visible',
      }}
    >
      <div className="key__inner">
        <div className="key__value">{value}</div>
      </div>
    </button>
  );
};
