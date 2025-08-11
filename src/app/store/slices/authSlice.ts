// "use client";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  // Add other user fields as needed
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
  loading: false,
  error: null,
};

// ✅ Login API Call
export const login = createAsyncThunk<
  { accessToken: string; user: User },
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, credentials, {
      withCredentials: true, // in case refresh tokens are in cookies
    });
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
    return rejectWithValue("Login failed");
  }
});

// ✅ Fetch User Profile
export const fetchUserProfile = createAsyncThunk<
  User,
  void,
  { rejectValue: string; state: { auth: AuthState } }
>("auth/fetchUserProfile", async (_, { getState, rejectWithValue }) => {
  const token = getState().auth.accessToken;
  if (!token) return rejectWithValue("No token available");

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch profile");
    }
    return rejectWithValue("Failed to fetch profile");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      state.error = null;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = action.payload || "Failed to load profile";
      });
  },
});

export const { logout, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
