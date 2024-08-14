import { useEffect, useState } from "react";
import "./booking.styles.scss";
import { useParams, useNavigate } from "react-router-dom";
import {
  confirmBooking,
  deleteBooking,
  reset,
} from "../../Redux/booking/bookingSlice";
import { useDispatch, useSelector } from "react-redux";

const Booking = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.booking
  );

  const user = useSelector((state) => state.auth.user);

  const [booking, setBooking] = useState([]);

  // useEffect(() => {
  //   if (isSuccess) {
  //     dispatch(reset());
  //     navigate("/dashboard");
  //   }
  // }, [isSuccess, isLoading, message, isError]);
  useEffect(() => {
    dispatch(reset());
    const getBooking = async () => {
      try {
        const res = await fetch(`/api/bookings/mybookings`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user.email }),
        });

        console.log("After fetching for booking");

        const data = await res.json();
        console.log(data);
        setBooking(data);
        console.log(booking);
      } catch (error) {
        console.log(error.message);
      }
    };
    getBooking();
  }, [isSuccess]);

  const handleDelete = (bookingId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this booking?"
    );
    if (confirmed) {
      dispatch(deleteBooking(bookingId));
    }
  };

  const handleEdit = () => {
    dispatch(confirmBooking(id));
  };
  return (
    <div id="booking">
      <h1 className="heading center">My Bookings</h1>

      {booking.length > 0 ? (
        booking.map((booking) => (
          <div key={booking._id} className="content-wrapper">
            <div className="text-wrapper">
              <h1 className="heading"> {booking.name} </h1>
              <p className="email">Room ID: {booking.roomId} </p>
              <p className="email">Booking ID: {booking._id} </p>
              <p className="email">Email: {booking.email} </p>
              <p className="email">Check-In: {booking.checkInDate} </p>
              <p className="email">Check-Out: {booking.checkOutDate} </p>
            </div>

            <div className="cta-wrapper">
              <button onClick={() => handleEdit(booking._id)}>Edit date</button>
              <button
                className="danger"
                onClick={() => handleDelete(booking._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default Booking;
