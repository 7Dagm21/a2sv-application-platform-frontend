import { configureStore } from '@reduxjs/toolkit';
import applicantReducer from '@/src/app/applicant/applicantSlice';

export const store = configureStore({
  reducer: {
    applicant: applicantReducer, // only your scope
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
