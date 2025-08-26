import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { AuthState, User } from "../../types";
import { register, login } from "../../apis/auth.api";

const initialState: AuthState = {
  user: null,
  // token: localStorage.getItem("dam_token"),
  isLoading: false,
  isAuthenticated: !!localStorage.getItem("dam_token"),
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    const response = await login(email, password);
    // localStorage.setItem("dam_token", response.token);
    return response;
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({
    name,
    email,
    password,
    confirmPassword,
  }: {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
  }) => {
    const response = await register(name, email, password, confirmPassword);
    // localStorage.setItem("dam_token", response.token);
    return response;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      // state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("dam_token");
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearError: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        // state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        // state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        // state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        // state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, setUser, clearError } = authSlice.actions;
export default authSlice.reducer;
