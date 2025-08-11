import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSession } from "next-auth/react";

interface Cycle {
  id: number;
  name: string;
  description?: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  country: string;
  created_at: string;
}

interface CyclesResponse {
  cycles: Cycle[];
  total_count: number;
  page: number;
  limit: number;
}

interface CycleState {
  cycles: Cycle[];
  currentCycle: Cycle | null;
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  limit: number;
}

const initialState: CycleState = {
  cycles: [],
  currentCycle: null,
  loading: false,
  error: null,
  total: 0,
  page: 1,
  limit: 8,
};

export const fetchCycleById = createAsyncThunk(
  "cycles/fetchById",
  async (cycleId: number, { rejectWithValue }) => {
    try {
      const session = await getSession();
      if (!session?.accessToken) {
        return rejectWithValue("Not authenticated");
      }

      const response = await fetch(
        `https://a2sv-application-platform-backend-team6.onrender.com/cycles/${cycleId}`,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch cycle");
      return data.data as Cycle;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchCycles = createAsyncThunk(
  "cycles/fetchAll",
  async (
    { page = 1, limit = 8 }: { page?: number; limit?: number },
    { rejectWithValue }
  ) => {
    try {
      const session = await getSession();
      if (!session?.accessToken) {
        return rejectWithValue("Not authenticated");
      }

      const response = await fetch(
        `https://a2sv-application-platform-backend-team6.onrender.com/cycles?page=${page}&limit=${limit}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch cycles");
      }
      return data.data as CyclesResponse;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const createNewCycle = createAsyncThunk(
  "cycles/create",
  async (cycleData: Omit<Cycle, "id" | "created_at">, { rejectWithValue }) => {
    try {
      const session = await getSession();
      if (!session?.accessToken) {
        return rejectWithValue("Not authenticated");
      }

      const response = await fetch(
        "https://a2sv-application-platform-backend-team6.onrender.com/admin/cycles",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`,
          },
          body: JSON.stringify(cycleData),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to create cycle");
      }
      return data.data as Cycle;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const cycleSlice = createSlice({
  name: "cycles",
  initialState,
  reducers: {
    resetCycleState: (state) => {
      state.loading = false;
      state.error = null;
    },
    clearCurrentCycle: (state: CycleState) => {
      state.currentCycle = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCycleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCycleById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCycle = action.payload;
      })
      .addCase(fetchCycleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCycles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCycles.fulfilled, (state, action) => {
        state.loading = false;
        state.cycles = action.payload.cycles;
        state.total = action.payload.total_count;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(fetchCycles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createNewCycle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewCycle.fulfilled, (state, action) => {
        state.loading = false;
        state.cycles = [action.payload, ...state.cycles];
        state.total += 1;
      })
      .addCase(createNewCycle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetCycleState, clearCurrentCycle } = cycleSlice.actions;
export default cycleSlice.reducer;
