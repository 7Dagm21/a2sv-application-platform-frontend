import { configureStore } from '@reduxjs/toolkit';
import applicantReducer from '@/src/app/store/slices/applicantSlice';
import profileReducer from "./slices/profileSlice";
import cycleReducer from "./slices/cycleSlice";
import applicationReducer from "./slices/applicationSlice";
import { useDispatch, UseDispatch } from 'react-redux';
import authReducer from "@/src/app/store/slices/authSlice";

export const store = configureStore({
  reducer: {
    applicant: applicantReducer,
    profile: profileReducer,
    cycle: cycleReducer,
    application: applicationReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();



