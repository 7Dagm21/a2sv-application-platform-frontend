import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ApplicantFormState {
  idNumber: string;
  schoolName: string;
  degreeProgram: string;
  codeforces: string;
  leetcode: string;
  github: string;
  country?: string;
  essay1: string;
  essay2: string;
}

const initialState: ApplicantFormState = {
  idNumber: '',
  schoolName: '',
  degreeProgram: '',
  codeforces: '',
  leetcode: '',
  github:'',
  country: '',
  essay1: '',
  essay2: '',
};

const applicantFormSlice = createSlice({
  name: 'applicant',
  initialState,
  reducers: {
    setField: (state, action: PayloadAction<{ field: keyof ApplicantFormState; value: string }>) => {
      state[action.payload.field] = action.payload.value;
    },
    resetForm: () => initialState,
    setAllFields: (state, action: PayloadAction<Partial<ApplicantFormState>>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setField, resetForm, setAllFields } = applicantFormSlice.actions;
export default applicantFormSlice.reducer;
