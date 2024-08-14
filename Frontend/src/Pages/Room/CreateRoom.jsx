import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createNewRoom, reset } from "../../Redux/room/roomSlice";
import "../Room/createRoom.styles.css";

function CreateRoom() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { isSuccess } = useSelector((state) => state.room);

  const [formData, setFormData] = useState({
    roomtype: "",
    description: "",
    price: "",
    roomnumber: "",
  });

  const { roomtype, description, price, roomnumber } = formData;

  const [files, setFiles] = useState(null);

  useEffect(() => {
    if (isSuccess) {
      navigate("/rooms");
      dispatch(reset());
    }
  }, [isSuccess]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("roomtype", roomtype);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("roomnumber", roomnumber);

    formData.append("image", files);

    const dataToSubmit = {
      roomtype: "dpubel",
      description: "ssss",
      price: 555,
      roomnumber: 454,
      files,
    };
    console.log("files", files);
    console.log("roomtype:", formData.get("roomtype"));
    console.log("description:", formData.get("description"));
    console.log("price:", formData.get("price"));
    console.log("roomnumber:", formData.get("roomnumber"));
    console.log("image:", formData.get("image"));

    dispatch(createNewRoom(formData));
  };

  return (
    <div className="container">
      <h1 className="heading center"></h1>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="input-group">
            <label htmlFor="name">Room Type</label>
            <input
              type="text"
              placeholder="Enter Room Type"
              name="roomtype"
              value={roomtype}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Description</label>
            <input
              type="text"
              placeholder="Enter Room Description"
              name="description"
              value={description}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Price</label>
            <input
              type="text"
              placeholder="Enter price"
              name="price"
              value={price}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Room Number</label>
            <input
              type="text"
              placeholder="Enter Room Number"
              name="roomnumber"
              value={roomnumber}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateRoom;
