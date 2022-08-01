import { RootState } from './../store/Store';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
