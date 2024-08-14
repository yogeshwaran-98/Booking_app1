import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getBookings,
  getBookingsByUser,
  reset,
} from "../../Redux/booking/bookingSlice";
import BookingList from "../../Components/BookingList/BookingList";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { bookings, isSuccess } = useSelector(
    (state) => state.booking.bookings
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }
  }, [isSuccess]);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    dispatch(getBookingsByUser(user));
    console.log(bookings);
  }, [user]);
  return (
    <div>
      <h1 className="heading center">Dashboard</h1>

      {bookings && bookings.length > 0 ? <BookingList data={bookings} /> : null}
    </div>
  );
};

export default Dashboard;
