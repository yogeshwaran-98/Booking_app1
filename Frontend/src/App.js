import React from "react";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Booking from "./Pages/Booking/Booking";
import Rooms from "./Pages/Rooms/Rooms";
import CreateRoom from "./Pages/Room/CreateRoom";
import Room from "./Pages/Room/Room";
import Home from "./Pages/Home/Home";
import CreateBooking from "./Pages/Booking/CreateBooking";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bookings/:roomId" element={<CreateBooking />} />
          <Route path="/bookings" element={<Booking />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/create" element={<CreateRoom />} />
          <Route path="/rooms/all/:id" element={<Room />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
