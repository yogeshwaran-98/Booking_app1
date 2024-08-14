import "./room.styles.scss";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset, deleteRoom } from "../../Redux/room/roomSlice";

//import Carousel from "../../component/Carousel/Carousel";

const Room = () => {
  const { user } = useSelector((state) => state.auth);
  const { isSuccess } = useSelector((state) => state.room);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    if (isSuccess) {
      navigate("/rooms");

      dispatch(reset());
    }
  }, [isSuccess]);
  useEffect(() => {
    const getRoom = async () => {
      try {
        const res = await fetch(`/api/rooms/${id}`);

        if (res.ok) {
          const data = await res.json();
          setRoom(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getRoom();
  }, []);
  const handleDelete = () => {
    dispatch(deleteRoom(id));
  };

  return (
    <div id="room">
      <div className="container">
        {room ? (
          <div>
            <div className="img-container">
              <div className="img-wrapper">
                {/*<Carousel data={room.img} /> */}

                <img
                  src={`http://localhost:5000/images/${room.image}`}
                  alt=""
                />
              </div>
            </div>
            <div className="text-wrapper">
              <h1 className="heading center"> {room.roomtype} </h1>
              <p> {room.description} </p>
              <h2> ${room.price.toFixed(2)} </h2>
            </div>

            <div className="book_button">
              <Link to={`/bookings/${room._id}`}>
                <h3>Book now</h3>
              </Link>
            </div>

            {/* {user && user.isAdmin ? (
              <div className="cta-wrapper">
                <Link to={`/edit/rooms/${room._id}`}>Edit Room</Link>
                <button onClick={handleDelete}>Delete Room</button>
              </div>
            ) : null} */}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Room;
