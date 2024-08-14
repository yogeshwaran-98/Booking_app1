import "./header.styles.scss";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser, reset } from "../../Redux/auth/authSlice";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

const Header = () => {
  const [user, setUser] = useState(getCookie("jwt"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getCookie("jwt"));
  }, []);

  const handleLogout = async () => {
    dispatch(logoutUser());
    dispatch(reset());
    setUser(null);
    navigate("/");
  };
  return (
    <header className="main-header">
      <div className="container">
        <Link to="/">
          <h1 className="logo">LandBNB</h1>
        </Link>

        <nav>
          <Link to="/rooms">Rooms</Link>
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/rooms/create">Create</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
