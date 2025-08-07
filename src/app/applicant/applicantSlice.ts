import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ApplicantFormState {
  idNumber: string;
  schoolName: string;
  degreeProgram: string;
  codeforces: string;
  leetcode: string;
  github: string;
  essay1: string;
  essay2: string;
  resume: File | null;
}

const initialState: ApplicantFormState = {
  idNumber: '',
  schoolName: '',
  degreeProgram: '',
  codeforces: '',
  leetcode: '',
  github: '',
  essay1: '',
  essay2: '',
  resume: null,
};

const applicantFormSlice = createSlice({
  name: 'applicantForm',
  initialState,
  reducers: {
    setField: (state, action: PayloadAction<{ field: keyof ApplicantFormState; value: any }>) => {
      state[action.payload.field] = action.payload.value;
    },
    resetForm: () => initialState,
  },
});

export const { setField, resetForm } = applicantFormSlice.actions;
export default applicantFormSlice.reducer;
