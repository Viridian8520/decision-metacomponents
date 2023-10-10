import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;  // 获取存储在store里的值
export const useAppDispatch = () => useDispatch<AppDispatch>();  // 派发事件，如更新存储在store里的值