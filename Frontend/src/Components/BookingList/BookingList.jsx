import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./bookingList.styles.scss";

const BookingList = ({ data }) => {
  if (!data || data.length === 0) {
    return null;
  }
  const handleAction = (id, action) => {
    console.log(`${action} user with ID ${id}`);
  };

  return (
    <div className="container">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Room</th>
              <th>Confirmed</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data
              ? data.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.roomId.name}</td>
                    <td>{item.confirmed ? "Yes" : "No"}</td>
                    <td>
                      <Link to={`/bookings/${item._id}`}> View</Link>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>{" "}
      *
    </div>
  );
};

export default BookingList;
