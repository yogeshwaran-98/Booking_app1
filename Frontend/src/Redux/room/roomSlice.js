import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  rooms: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const createNewRoom = createAsyncThunk(
  "room/create",
  async (roomData, thunkApi) => {
    try {
      console.log("Inside create room actiob");
      console.log("Roomdata formdate", roomData);
      const res = await fetch("/api/rooms/create", {
        method: "POST",
        body: roomData,
      });

      if (!res.ok) {
        console.log("create room res not ok");
        const error = await res.json();
        return thunkApi.rejectWithValue(error);
      }

      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getRooms = createAsyncThunk("room/getall", async (_, thunkApi) => {
  try {
    const res = await fetch("/api/rooms");
    if (!res.ok) {
      const error = await res.json();
      return thunkApi.rejectWithValue(error);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error.message);
    return thunkApi.rejectWithValue(error.message);
  }
});

export const updateRoom = createAsyncThunk(
  "/room/update",
  async (roomData, thunkApi) => {
    try {
      const { roomId, ...rest } = roomData;
      const res = await fetch(`/api/rooms/${roomId}`, {
        headers: {
          "Content-type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(rest),
      });
      const data = await res.json();
      if (!res.ok) {
        return thunkApi.rejectWithValue(data);
      }

      return data;
    } catch (error) {
      console.log(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteRoom = createAsyncThunk(
  "room/delete",
  async (roomId, thunkApi) => {
    try {
      const res = await fetch(`/api/rooms/${roomId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        return thunkApi.rejectWithValue(data);
      }
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rooms = action.payload;
      })
      .addCase(createNewRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRooms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRooms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rooms = action.payload;
      })
      .addCase(getRooms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.rooms = action.payload;
      })
      .addCase(updateRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rooms = state.rooms.filter(
          (room) => room._id != action.payload.id
        );
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = roomSlice.actions;
export default roomSlice.reducer;
