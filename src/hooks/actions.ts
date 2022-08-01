import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { gameActions } from '../slices/gameSlice';

const actions = {
  ...gameActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};
