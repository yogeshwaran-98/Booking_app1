import "./roomList.styles.scss";
import { Link } from "react-router-dom";
import Carousel from "../Carousel/Carousel";

const RoomList = ({ data }) => {
  return (
    <div id="room-list">
      {data.map((item, index) => {
        return (
          <div>
            <Link
              to={`/rooms/all/${item._id}`}
              key={item._id}
              className="room-unit"
            >
              <div className="img-wrapper">
                <img
                  src={`http://localhost:5000/images/${item.image}`}
                  alt=""
                />
              </div>
              <p className="name"> {item.roomtype} </p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default RoomList;
