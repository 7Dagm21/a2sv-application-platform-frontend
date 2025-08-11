import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";

export interface Application {
  id: string;
  status: string;
  school: string;
  degree: string;
  leetcode_handle: string;
  codeforces_handle: string;
  essay_why_a2sv: string;
  essay_about_you: string;
  resume_url: string;
  submitted_at: string;
  updated_at: string;
  student_id?: string;
  country?: string;
}

interface ApplicationState {
  data: Application | null;
  current: Application | null;
  loading: boolean;
  error: string | null;
}

const initialState: ApplicationState = {
  current: null,
  loading: false,
  error: null,
  data: null,
};

export const fetchApplication = createAsyncThunk<
  Application,
  string,
  { rejectValue: string }
>("application/fetchApplication", async (applicationId, thunkAPI) => {
  try {
    const token = localStorage.getItem("accessToken") || "";
    const res = await fetch(
      `https://a2sv-application-platform-backend-team6.onrender.com/applications/${applicationId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const json = await res.json();
    if (!json.success) throw new Error(json.message || "Failed to fetch application");
    return json.data as Application;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue("Unknown Error");
  }
});

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setApplication: (state, action: PayloadAction<Application>) => {
      state.current = action.payload;
    },
    clearApplication: (state) => {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch application";
      });
  },
});

export const { setApplication, clearApplication } = applicationSlice.actions;
export const selectCurrentApplication = (state: RootState) => state.application.current;
export default applicationSlice.reducer;
