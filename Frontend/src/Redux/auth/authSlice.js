import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkApi) => {
    try {
      const res = await fetch("/api/users/register", {
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const err = await res.json();
        return thunkApi.rejectWithValue(err);
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkApi) => {
    try {
      console.log("Inide login action");
      const res = await fetch("/api/users/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        console.log(res);
        const err = await res.json();
        return thunkApi.rejectWithValue(err);
      }

      const data = await res.json();

      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (userData, thunkApi) => {
    try {
      const res = await fetch("/api/users/logout", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const err = await res.json();
        return thunkApi.rejectWithValue(err);
      }

      const data = await res.json();

      localStorage.removeItem("user", JSON.stringify(data));
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

const initialState = {
  user: user ? user : null,
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isFailure = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isFailure = true;
        state.message = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isFailure = true;
        state.message = action.payload;
      })

      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isFailure = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
