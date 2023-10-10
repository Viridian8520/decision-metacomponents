import { configureStore } from '@reduxjs/toolkit';
import earlyWarningOptionSlice from './earlyWarningOptionSlice';
import earlyWarningReturnSlice from './earlyWarningReturnSlice';

const store = configureStore({
  reducer: {
    earlyWarningOption: earlyWarningOptionSlice,
    earlyWarningReturn: earlyWarningReturnSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;