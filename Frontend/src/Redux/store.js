import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import roomReducer from "../Redux/room/roomSlice";
import bookingReducer from "../Redux/booking/bookingSlice";
import userReducer from "../Redux/user/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    room: roomReducer,
    booking: bookingReducer,
  },
});
