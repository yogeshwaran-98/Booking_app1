import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import "./createBooking.styles.scss";

const BookingForm = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const response = await fetch(`/api/bookings/bookedDates/${roomId}`);
        const data = await response.json();
        setBookedDates(data);
      } catch (error) {
        console.error("Error fetching booked dates:", error);
      }
    };

    fetchBookedDates();
  }, [roomId]);

  const disabledDates = bookedDates.flatMap(({ checkInDate, checkOutDate }) => {
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const dates = [];

    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  });

  const isDateDisabled = (date) => {
    return disabledDates.some(
      (disabledDate) =>
        date.getFullYear() === disabledDate.getFullYear() &&
        date.getMonth() === disabledDate.getMonth() &&
        date.getDate() === disabledDate.getDate()
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(roomId);

    const bookingData = {
      roomId: roomId,
      name: user.name,
      email: user.email,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      confirmed: true,
    };

    try {
      const response = await fetch("/api/bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Booking created successfully:", result);
        navigate("/bookings");
      } else {
        console.error("Failed to create booking");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Book a Room</h2>
      <div>
        <label>Room ID:</label>
        <input type="text" value={roomId} disabled />
      </div>
      <div>
        <label>Name:</label>
        <input type="text" value={user.name} disabled />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={user.email} disabled />
      </div>
      <div>
        <label>Check-In Date:</label>
        <DatePicker
          selected={checkInDate}
          onChange={(date) => setCheckInDate(date)}
          filterDate={(date) => !isDateDisabled(date)}
        />
      </div>
      <div>
        <label>Check-Out Date:</label>
        <DatePicker
          selected={checkOutDate}
          onChange={(date) => setCheckOutDate(date)}
          filterDate={(date) => !isDateDisabled(date)}
        />
      </div>
      <button type="submit">Confirm Booking</button>
    </form>
  );
};

export default BookingForm;
