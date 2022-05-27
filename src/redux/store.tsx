import { configureStore } from '@reduxjs/toolkit';
import classReducer from './slice';

export const store = configureStore({ 
  reducer: { 
    records: classReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;