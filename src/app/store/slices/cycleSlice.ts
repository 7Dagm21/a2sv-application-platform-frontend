import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";

export interface Cycle {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

interface CycleState {
  cycles: Cycle[];
  loading: boolean;
  error: string | null;
}

const initialState: CycleState = {
  cycles: [],
  loading: false,
  error: null,
};

export const fetchCycles = createAsyncThunk<Cycle[], void, { rejectValue: string }>(
  "cycle/fetchCycles",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("https://a2sv-application-platform-backend-team6.onrender.com/cycles");
      if (!res.ok) throw new Error("Failed to fetch cycles");
      const json = await res.json();
      return Array.isArray(json.data) ? json.data : [];
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch cycles");
    }
  }
);

const cycleSlice = createSlice({
  name: "cycle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCycles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCycles.fulfilled, (state, action: PayloadAction<Cycle[]>) => {
        state.loading = false;
        state.cycles = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchCycles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch cycles";
      });
  },
});

export const selectActiveCycle = (state: RootState) => {
  const cycles = state.cycle.cycles;
  return Array.isArray(cycles) ? cycles.find((cycle) => cycle.is_active) : undefined;
};

export default cycleSlice.reducer;



